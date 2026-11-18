'use client';

import { useState } from 'react';
import { useTabs } from '@/components/ui/useTabs';
import { STACK } from '@/content/site';

const PAL = ['#4f8cff', '#8b5cf6', '#2ee6f6', '#e45cf0', '#34d399', '#f59e0b'];
const KEYS = Object.keys(STACK);

/** 7. Technology capabilities — AI models, integrations, cloud and security */
export default function TechStack() {
  const [sel, setSel] = useState(0);
  const { listRef, onKeyDown } = useTabs(sel, KEYS.length, setSel);
  const key = KEYS[sel];

  return (
    <section id="stack" data-morph="3.2" data-shift="0" aria-labelledby="st-title">
      <div className="container">
        <div className="sec-head center">
          <span className="eyebrow">Technology capabilities</span>
          <h2 id="st-title">
            Models, integrations, <span className="grad-text">cloud &amp; security</span>
          </h2>
          <p>The building blocks behind every industry solution, chosen to fit each project&apos;s requirements.</p>
        </div>
        <div className="stack-box glass" data-reveal="">
          <div style={{ textAlign: 'center' }}>
            <div className="tabs" role="tablist" aria-label="Technology categories" id="stack-tabs" ref={listRef}>
              <span className="tab-ind" aria-hidden="true"></span>
              {KEYS.map((k, i) => (
                <button
                  key={k}
                  className="tab"
                  role="tab"
                  aria-selected={i === sel}
                  tabIndex={i === sel ? 0 : -1}
                  onClick={() => setSel(i)}
                  onKeyDown={onKeyDown(i)}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
          <div className="stack-grid" id="stack-grid" role="tabpanel" aria-label={key}>
            {STACK[key].map((n, i) => (
              <div className="tech tech-in" key={`${key}-${n}`} style={{ animationDelay: `${i * 40}ms` }}>
                <i style={{ background: PAL[i % PAL.length] }}>{n.replace(/[^A-Za-z]/g, '').slice(0, 2)}</i>
                {n}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
