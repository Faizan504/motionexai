'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';

export type FieldDef =
  | { name: string; label: string; type: 'text' | 'email' | 'tel' | 'date' | 'url'; required?: boolean; placeholder?: string; autoComplete?: string; half?: boolean }
  | { name: string; label: string; type: 'textarea'; required?: boolean; placeholder?: string }
  | { name: string; label: string; type: 'select'; options: string[]; required?: boolean; half?: boolean; defaultValue?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Config-driven form for consultations, partnerships, waitlists, careers and general contact.
 * Posts to /api/leads/ with a `type`, the page source and the field values.
 */
export default function LeadForm({
  type,
  title,
  fields,
  submitLabel = 'Submit',
  source,
  successTitle = 'Thank you, we have received your request.',
  successText = 'A member of our team will reply within one business day.',
  hidden = {},
}: {
  type: 'consultation' | 'partnership' | 'waitlist' | 'career' | 'contact' | 'demo';
  title?: string;
  fields: FieldDef[];
  submitLabel?: string;
  source: string;
  successTitle?: string;
  successText?: string;
  hidden?: Record<string, string>;
}) {
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState('');
  const [invalid, setInvalid] = useState<string[]>([]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const values: Record<string, string> = { ...hidden };
    fields.forEach((f) => (values[f.name] = String(fd.get(f.name) || '').trim()));
    const bad = fields
      .filter((f) => (f.required && !values[f.name]) || (f.type === 'email' && values[f.name] && !EMAIL_RE.test(values[f.name])))
      .map((f) => f.name);
    setInvalid(bad);
    if (bad.length) {
      setError('Please complete the highlighted fields.');
      e.currentTarget.querySelector<HTMLElement>(`[name="${bad[0]}"]`)?.focus();
      return;
    }
    setError('');
    setState('sending');
    try {
      const { email, ...rest } = values;
      const res = await fetch('/api/leads/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, email, fields: rest, source, page: window.location.pathname }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Submission failed');
      setState('done');
    } catch (err) {
      setState('idle');
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    }
  }

  if (state === 'done') {
    return (
      <div className="lead-form glass done" role="status">
        <div className="lf-ok">
          <Icon id="i-check" />
        </div>
        <h3>{successTitle}</h3>
        <p>{successText}</p>
      </div>
    );
  }

  return (
    <form className="lead-form glass" noValidate onSubmit={onSubmit}>
      {title && (
        <div className="builder-h">
          <b>
            <Icon id="i-sparkle" style={{ width: 20, height: 20, color: 'var(--cyan)' }} />
            {title}
          </b>
        </div>
      )}
      <div className="lf-grid">
        {fields.map((f) => {
          const err = invalid.includes(f.name);
          const style = err ? { borderColor: '#f87171' } : undefined;
          const half = 'half' in f && f.half;
          return (
            <label className={`field${half ? ' half' : ''}`} key={f.name}>
              <span>
                {f.label}
                {f.required && <em aria-hidden="true"> *</em>}
              </span>
              {f.type === 'textarea' ? (
                <textarea name={f.name} placeholder={f.placeholder} required={f.required} style={style} aria-invalid={err} />
              ) : f.type === 'select' ? (
                <select name={f.name} defaultValue={f.defaultValue ?? ''} required={f.required} style={style} aria-invalid={err}>
                  {!f.defaultValue && <option value="">Select…</option>}
                  {f.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              ) : (
                <input
                  name={f.name}
                  type={f.type}
                  placeholder={f.placeholder}
                  autoComplete={f.autoComplete}
                  required={f.required}
                  style={style}
                  aria-invalid={err}
                />
              )}
            </label>
          );
        })}
      </div>
      <p className="form-note">Please don&apos;t include confidential business data or sensitive personal information.</p>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-primary" style={{ marginTop: 18 }} disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : submitLabel} <Icon id="i-send" />
      </button>
    </form>
  );
}
