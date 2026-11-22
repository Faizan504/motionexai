'use client';

import { useState } from 'react';
import { formatDate as fmt, type Article } from '@/content/insights';

/** Filterable article grid for /insights/. */
export default function InsightsGrid({ articles, categories }: { articles: Article[]; categories: string[] }) {
  const [cat, setCat] = useState('All');
  const list = cat === 'All' ? articles : articles.filter((a) => a.category === cat);
  return (
    <>
      <div className="filters" role="group" aria-label="Filter by topic">
        {['All', ...categories].map((c) => (
          <button key={c} type="button" aria-pressed={c === cat} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="post-grid">
        {list.map((a) => (
          <a key={a.slug} href={`/insights/${a.slug}/`} className="post glass">
            <div className="post-img">
              <div className="pi" style={{ background: a.bg }}></div>
            </div>
            <div className="post-body">
              <div className="post-meta">
                <b>{a.category}</b>
                <span>{a.type}</span>
                <span>{a.readMins} min</span>
              </div>
              <h3>{a.title}</h3>
              <p>{a.excerpt}</p>
              <div className="post-meta" style={{ marginTop: 'auto', paddingTop: 8 }}>
                <span>{fmt(a.date)}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
