import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { INDUSTRIES } from '@/content/industries';
import { LEAD_OPTIONS } from '@/content/site';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INDUSTRY_NAMES = new Set([...INDUSTRIES.map((i) => i.name), 'Other']);

const str = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const pick = (v: unknown, allowed: string[]) => (typeof v === 'string' && allowed.includes(v) ? v : '');

/**
 * Lead capture endpoint (scope §7 — lead qualification fields).
 * - Validates and normalises the payload.
 * - Forwards to LEAD_WEBHOOK_URL (CRM / automation) when configured.
 * - Otherwise appends to .data/leads.jsonl (local development only).
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const type = body.type === 'newsletter' ? 'newsletter' : 'inquiry';
  const email = str(body.email, 254).toLowerCase();
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'Please enter a valid business email.' }, { status: 422 });

  const lead =
    type === 'newsletter'
      ? { type, email, source: str(body.source, 120) }
      : {
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

  if (lead.type === 'inquiry' && !('industry' in lead && lead.industry)) {
    return NextResponse.json({ error: 'Please select your industry.' }, { status: 422 });
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
      return NextResponse.json({ error: 'We could not submit your inquiry right now. Please try again.' }, { status: 502 });
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
