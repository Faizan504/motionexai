import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { INDUSTRIES } from '@/content/industries';
import { LEAD_OPTIONS } from '@/content/site';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INDUSTRY_NAMES = new Set([...INDUSTRIES.map((i) => i.name), 'Other']);
const GENERIC_TYPES = ['consultation', 'partnership', 'waitlist', 'career', 'contact', 'demo'] as const;
type GenericType = (typeof GENERIC_TYPES)[number];

const str = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const pick = (v: unknown, allowed: string[]) => (typeof v === 'string' && allowed.includes(v) ? v : '');

/** Accept a flat object of short string fields (max 20 keys) from config-driven forms. */
function cleanFields(v: unknown): Record<string, string> {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return {};
  const out: Record<string, string> = {};
  for (const [k, val] of Object.entries(v as Record<string, unknown>).slice(0, 20)) {
    if (/^[a-zA-Z][a-zA-Z0-9_]{0,40}$/.test(k)) out[k] = str(val, 4000);
  }
  return out;
}

// Simple in-memory rate limit per IP (resets on server restart)
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 8;
}

/**
 * Lead capture endpoint for every form on the site (scope §7 — lead qualification fields).
 * Types: inquiry (3-step project form), newsletter, consultation, partnership, waitlist, career, contact, demo.
 * - Validates and normalises the payload.
 * - Forwards to LEAD_WEBHOOK_URL (CRM / automation) when configured.
 * - Otherwise appends to .data/leads.jsonl (local development only).
 */
export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local';
  if (limited(ip)) return NextResponse.json({ error: 'Too many requests. Please try again in a minute.' }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const rawType = str(body.type, 30);
  const type: 'inquiry' | 'newsletter' | GenericType =
    rawType === 'newsletter' ? 'newsletter' : (GENERIC_TYPES as readonly string[]).includes(rawType) ? (rawType as GenericType) : 'inquiry';

  const email = str(body.email, 254).toLowerCase();
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'Please enter a valid business email.' }, { status: 422 });

  let lead: Record<string, unknown> & { type: string; email: string };
  if (type === 'newsletter') {
    lead = { type, email, source: str(body.source, 120) };
  } else if (type === 'inquiry') {
    lead = {
      type,
      email,
      industry: INDUSTRY_NAMES.has(str(body.industry)) ? str(body.industry) : '',
      services: Array.isArray(body.services)
        ? body.services.filter((s): s is string => typeof s === 'string' && LEAD_OPTIONS.services.includes(s))
        : [],
      company: str(body.company, 160),
      timeline: pick(body.timeline, LEAD_OPTIONS.timeline),
      budget: pick(body.budget, LEAD_OPTIONS.budget),
      method: pick(body.method, LEAD_OPTIONS.method),
      requirements: str(body.challenge, 4000),
      source: str(body.source, 120),
      page: str(body.page, 200),
    };
    if (!lead.industry) return NextResponse.json({ error: 'Please select your industry.' }, { status: 422 });
  } else {
    const fields = cleanFields(body.fields);
    if (!fields.name) return NextResponse.json({ error: 'Please enter your name.' }, { status: 422 });
    lead = { type, email, ...fields, source: str(body.source, 120), page: str(body.page, 200) };
  }

  const record = { ...lead, receivedAt: new Date().toISOString() };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error('[leads] webhook delivery failed', err);
      return NextResponse.json({ error: 'We could not submit your request right now. Please try again.' }, { status: 502 });
    }
  } else {
    try {
      const dir = path.join(process.cwd(), '.data');
      await fs.mkdir(dir, { recursive: true });
      await fs.appendFile(path.join(dir, 'leads.jsonl'), JSON.stringify(record) + '\n', 'utf8');
    } catch (err) {
      // Read-only filesystems (e.g. serverless): log only. Configure LEAD_WEBHOOK_URL in production.
      console.warn('[leads] could not persist lead locally', err);
    }
    console.info('[leads] received', record.type, record.email);
  }

  return NextResponse.json({ ok: true });
}
