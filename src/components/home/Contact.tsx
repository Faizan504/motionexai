'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/Icon';
import { INDUSTRIES } from '@/content/industries';
import { LEAD_OPTIONS } from '@/content/site';
import { prefersReducedMotion, scrollToTarget } from '@/lib/motion';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_CTA = "Let's engineer AI for your industry";

type Form = {
  industry: string;
  services: string[];
  company: string;
  timeline: string;
  budget: string;
  method: string;
  challenge: string;
  email: string;
};

const initialForm: Form = {
  industry: '',
  services: [],
  company: '',
  timeline: LEAD_OPTIONS.timeline[0],
  budget: LEAD_OPTIONS.budget[0],
  method: LEAD_OPTIONS.method[0],
  challenge: '',
  email: '',
};

const shake = (el: HTMLElement | null) =>
  el?.animate([{ transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'none' }], { duration: 300 });

/**
 * 12. CTA — industry-aware, 3-step lead form (scope §7).
 * Any element with [data-industry] (and optional [data-source]) pre-fills the industry and source
 * and scrolls here, so every industry CTA connects to this form.
 */
export default function Contact() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Form>(initialForm);
  const [source, setSource] = useState('Homepage');
  const [errors, setErrors] = useState<{ industry?: boolean; email?: boolean }>({});
  const [briefLines, setBriefLines] = useState<[string, string][]>([]);
  const [submitError, setSubmitError] = useState('');
  const [sending, setSending] = useState(false);
  const indRef = useRef<HTMLSelectElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const ind = INDUSTRIES.find((x) => x.name === form.industry);
  const ctaWords = (ind ? ind.primaryCta : DEFAULT_CTA).split(' ');
  const ctaH = ctaWords.slice(0, -2).join(' ');
  const ctaH2 = ctaWords.slice(-2).join(' ');

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  // Delegated listener: industry CTAs anywhere on the page pre-fill the form
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLElement>('[data-industry], a[href="#contact"][data-source]');
      if (!a) return;
      if (a.dataset.industry) {
        e.preventDefault();
        setForm((f) => ({ ...f, industry: a.dataset.industry! }));
        setErrors({});
        setStep(1);
        scrollToTarget('#contact');
      }
      setSource('Homepage · ' + (a.dataset.source || 'Homepage'));
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  async function next() {
    if (step === 1 && !form.industry) {
      setErrors({ industry: true });
      shake(indRef.current);
      indRef.current?.focus();
      return;
    }
    setErrors({});
    if (step === 3) {
      if (!EMAIL_RE.test(form.email.trim())) {
        setErrors({ email: true });
        emailRef.current?.focus();
        return;
      }
      setSending(true);
      setSubmitError('');
      try {
        const res = await fetch('/api/leads/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'inquiry',
            ...form,
            email: form.email.trim(),
            source,
            page: typeof window !== 'undefined' ? window.location.pathname : '/',
          }),
        });
        if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Submission failed');
      } catch (err) {
        setSending(false);
        setSubmitError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
        return;
      }
      setSending(false);
      const lines: [string, string][] = [
        ['INQUIRY SUMMARY', '(preliminary)'],
        ['Industry', form.industry],
        ['Source page', source],
        ['Service interest', form.services.join(', ') || '—'],
        ['Company', form.company || '—'],
        ['Timeline', form.timeline],
        ['Budget', form.budget],
        ['Consultation', form.method],
        ['Requirements', form.challenge || '—'],
        ['Next step', 'Solutions engineer review · 1 business day'],
      ];
      setBriefLines([]);
      setStep(4);
      const reduce = prefersReducedMotion();
      lines.forEach((l, i) => setTimeout(() => setBriefLines((cur) => [...cur, l]), reduce ? 0 : i * 200));
      return;
    }
    if (step === 4) {
      window.location.href = '/book-consultation/';
      return;
    }
    setStep(step + 1);
  }

  const shown = Math.min(step, 3);

  return (
    <section id="contact" data-morph="4" data-shift="0" aria-labelledby="ct-title">
      <div className="container">
        <div className="cta-box">
          <div>
            <span className="eyebrow" id="cta-eyebrow">
              {ind ? `${ind.short} · Project inquiry` : 'Start your project'}
            </span>
            <h2 id="ct-title" style={{ marginTop: 16 }}>
              <span id="cta-h">{ctaH}</span>{' '}
              <span className="grad-text" id="cta-h2">
                {ctaH2}
              </span>
            </h2>
            <p className="lead">
              Tell us about your workflow. We&apos;ll draft a preliminary brief, and a solutions engineer will follow up within
              one business day.
            </p>
            <div className="cta-meta">
              <div>
                <Icon id="i-cal" />
                Consultation, demo request or project inquiry
              </div>
              <div>
                <Icon id="i-lock" />
                No confidential data needed at this stage
              </div>
              <div>
                <Icon id="i-pin" />
                Dubai, UAE · serving clients worldwide
              </div>
            </div>
          </div>

          <form className="builder glass" id="builder" noValidate onSubmit={(e) => e.preventDefault()}>
            <input type="hidden" name="source" value={source} />
            <div className="builder-h">
              <b>
                <Icon id="i-sparkle" style={{ width: 20, height: 20, color: 'var(--cyan)' }} />
                Project Inquiry
              </b>
              <small>
                STEP <span id="b-n">{shown}</span>/3
              </small>
            </div>
            <div className="b-steps">
              {[0, 1, 2].map((i) => (
                <i key={i} className={i < shown ? 'on' : undefined}></i>
              ))}
            </div>

            <div className={`b-step${step === 1 ? ' on' : ''}`} data-step="1">
              <label className="field">
                <span>Industry</span>
                <select
                  name="industry"
                  id="f-industry"
                  ref={indRef}
                  value={form.industry}
                  style={errors.industry ? { borderColor: '#f87171' } : undefined}
                  onChange={(e) => {
                    set('industry', e.target.value);
                    setSource('Homepage · Inquiry form');
                  }}
                >
                  <option value="">Select your industry</option>
                  {INDUSTRIES.map((d) => (
                    <option key={d.slug}>{d.name}</option>
                  ))}
                  <option>Other</option>
                </select>
              </label>
              <label className="q" style={{ marginTop: 6 }}>
                Service interest
              </label>
              <div className="chips" data-key="services">
                {LEAD_OPTIONS.services.map((s) => {
                  const on = form.services.includes(s);
                  return (
                    <button
                      type="button"
                      key={s}
                      aria-pressed={on}
                      onClick={() => set('services', on ? form.services.filter((x) => x !== s) : [...form.services, s])}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={`b-step${step === 2 ? ' on' : ''}`} data-step="2">
              <label className="field">
                <span>Company name</span>
                <input
                  type="text"
                  name="company"
                  placeholder="Company Ltd."
                  autoComplete="organization"
                  value={form.company}
                  onChange={(e) => set('company', e.target.value)}
                />
              </label>
              <div className="field-row">
                <label className="field">
                  <span>Timeline</span>
                  <select name="timeline" value={form.timeline} onChange={(e) => set('timeline', e.target.value)}>
                    {LEAD_OPTIONS.timeline.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span>Indicative budget</span>
                  <select name="budget" value={form.budget} onChange={(e) => set('budget', e.target.value)}>
                    {LEAD_OPTIONS.budget.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="field">
                <span>Preferred consultation</span>
                <select name="method" value={form.method} onChange={(e) => set('method', e.target.value)}>
                  {LEAD_OPTIONS.method.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className={`b-step${step === 3 ? ' on' : ''}`} data-step="3">
              <label className="field">
                <span>Project requirements</span>
                <textarea
                  name="challenge"
                  placeholder="e.g. Automate BIM clash classification and weekly progress reports"
                  value={form.challenge}
                  onChange={(e) => set('challenge', e.target.value)}
                ></textarea>
              </label>
              <label className="field">
                <span>Business email</span>
                <input
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="you@company.com"
                  autoComplete="email"
                  value={form.email}
                  style={errors.email ? { borderColor: '#f87171' } : undefined}
                  onChange={(e) => set('email', e.target.value)}
                />
              </label>
              <p className="form-note">Please don&apos;t include confidential business data or sensitive personal information.</p>
              {submitError && (
                <p className="form-error" role="alert">
                  {submitError}
                </p>
              )}
            </div>

            <div className={`b-step${step === 4 ? ' on' : ''}`} data-step="4">
              <div className="brief" id="brief" aria-live="polite">
                {briefLines.map(([k, v]) => (
                  <span key={k}>
                    <b>{k}:</b> {v}
                    {'\n'}
                  </span>
                ))}
              </div>
            </div>

            <div className="b-nav">
              <button
                type="button"
                className="back"
                id="b-back"
                style={{ visibility: step > 1 && step < 4 ? 'visible' : 'hidden' }}
                onClick={() => setStep((s) => s - 1)}
              >
                ← Back
              </button>
              <button type="button" className="btn btn-primary btn-sm" id="b-next" onClick={next} disabled={sending}>
                {step === 3 ? (
                  <>
                    {sending ? 'Sending…' : 'Submit inquiry'} <Icon id="i-send" />
                  </>
                ) : step === 4 ? (
                  <>
                    Book consultation <Icon id="i-cal" />
                  </>
                ) : (
                  <>
                    Continue <Icon id="i-arrow" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
