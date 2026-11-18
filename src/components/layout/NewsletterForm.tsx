'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get('email');
    setState('sending');
    try {
      await fetch('/api/leads/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'newsletter', email, source: 'Footer newsletter' }),
      });
    } finally {
      setState('done');
    }
  }

  return (
    <form className="f-news" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="nl">
        Email
      </label>
      <input id="nl" name="email" type="email" placeholder="Industry AI insights" required />
      <button className="btn btn-primary btn-sm" type="submit" disabled={state === 'sending'}>
        {state === 'done' ? 'Subscribed ✓' : 'Subscribe'}
      </button>
    </form>
  );
}
