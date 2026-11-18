'use client';

import { Fragment, useRef, useState } from 'react';
import Icon from '@/components/ui/Icon';
import { INDUSTRIES, PRIORITY_LABELS, industryUrl } from '@/content/industries';
import { EVENTS, emit } from '@/lib/motion';

/** 5. Industry solution explorer — all 14 industries, single source of truth from content/industries.ts */
export default function IndustryExplorer() {
  const [sel, setSel] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const d = INDUSTRIES[sel];

  const select = (i: number, focus = false) => {
    setSel(i);
    if (focus) listRef.current?.querySelectorAll<HTMLButtonElement>('.ind-btn')[i]?.focus();
  };

  const onKeyDown = (i: number) => (e: React.KeyboardEvent) => {
    const n = INDUSTRIES.length;
    if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      select((i + 1) % n, true);
    }
    if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
      e.preventDefault();
      select((i - 1 + n) % n, true);
    }
  };

  return (
    <section id="industries" data-morph="2" data-shift="0" aria-labelledby="ind-title">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">Industry solution explorer</span>
          <h2 id="ind-title">
            Choose your industry. <span className="grad-text">See the AI that fits.</span>
          </h2>
          <p>
            Key AI solutions, a live demonstration concept, who it&apos;s for, and the next step, for each of the{' '}
            {INDUSTRIES.length} sectors we serve.
          </p>
        </div>
        <div className="ind-wrap">
          <div className="ind-list" role="tablist" aria-label="Industries" aria-orientation="vertical" ref={listRef}>
            {INDUSTRIES.map((ind, i) => (
              <Fragment key={ind.slug}>
                {(i === 0 || INDUSTRIES[i - 1].priority !== ind.priority) && (
                  <div className="ind-group" role="presentation">
                    {PRIORITY_LABELS[ind.priority]}
                  </div>
                )}
                <button
                  className="ind-btn"
                  role="tab"
                  aria-selected={i === sel}
                  aria-controls="ind-panel"
                  tabIndex={i === sel ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={onKeyDown(i)}
                >
                  <Icon id={ind.icon} />
                  {ind.short}
                  <Icon id="i-arrow" className="ar" />
                </button>
              </Fragment>
            ))}
          </div>
          <div className="ind-panel glass" role="tabpanel" id="ind-panel" tabIndex={0}>
            <div className="ind-bg"></div>
            <div className="ind-content">
              <div className="ind-anim" key={d.slug}>
                <span className="eyebrow">
                  {d.priority} · {d.name}
                </span>
                <h3 style={{ marginTop: 14 }}>{d.heroHeading}</h3>
                <p className="lead">{d.heroDescription}</p>
                <div className="ind-cols">
                  <div>
                    <h4>Key AI solutions</h4>
                    <ul className="sols">
                      {d.solutions.map((s) => (
                        <li key={s.title}>
                          <span>
                            <b>{s.title}</b>
                            {s.detail ? ': ' + s.detail : ''}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="demo-box">
                      <h4 style={{ margin: 0 }}>Interactive demonstration</h4>
                      {d.demos.map((x) => (
                        <p key={x}>{x}</p>
                      ))}
                      {d.demoKey ? (
                        <button type="button" className="demo-run" onClick={() => emit(EVENTS.runDemo, d.demoKey)}>
                          Run this demo <Icon id="i-arrow" />
                        </button>
                      ) : (
                        <span className="demo-soon">Demo concept · coming to the demo center</span>
                      )}
                    </div>
                    <h4>Who it&apos;s for</h4>
                    <p className="ind-aud">{d.audience}</p>
                    {d.note && (
                      <p className="ind-note">
                        <Icon id="i-shield" />
                        {d.note}
                      </p>
                    )}
                  </div>
                </div>
                <div className="ind-foot">
                  {d.relatedServices.map((x) => (
                    <span className="chip" key={x}>
                      {x}
                    </span>
                  ))}
                  <div className="ind-actions">
                    <a href={industryUrl(d.slug)} className="btn btn-ghost btn-sm">
                      View industry page
                    </a>
                    <a
                      href="#contact"
                      className="btn btn-primary btn-sm"
                      data-industry={d.name}
                      data-source="Industry explorer"
                    >
                      {d.primaryCta} <Icon id="i-arrow" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
