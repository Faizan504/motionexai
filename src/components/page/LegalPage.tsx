import JsonLd from '@/components/ui/JsonLd';
import PageHero from '@/components/page/PageHero';
import { breadcrumbLd } from '@/lib/seo';
import type { Block } from '@/content/insights';

/**
 * Shared layout for legal pages.
 * [VERIFY] Legal copy is a starting template and must be reviewed by counsel before launch.
 */
export default function LegalPage({ name, path, title, lead, updated, body }: { name: string; path: string; title: string; lead: string; updated: string; body: Block[] }) {
  const crumbs = [{ name, path }];
  return (
    <main id="main">
      <JsonLd graph={[breadcrumbLd(crumbs)]} />
      <PageHero crumbs={crumbs} eyebrow="Legal" title={title} lead={lead} morph={3.8} />
      <section className="page-sec tight" data-morph="3.8" data-shift="0" data-dim="0.4">
        <div className="container legal">
          <p className="upd">Last updated: {updated}</p>
          {body.map((b, i) =>
            b.h ? (
              <h2 key={i}>{b.h}</h2>
            ) : b.list ? (
              <ul key={i}>
                {b.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            ) : (
              <p key={i}>{b.p}</p>
            ),
          )}
        </div>
      </section>
    </main>
  );
}
