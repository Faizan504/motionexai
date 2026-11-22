import Icon from '@/components/ui/Icon';
import JsonLd from '@/components/ui/JsonLd';
import PageHero, { CtaBand, SecHead } from '@/components/page/PageHero';
import { INDUSTRIES, PRIORITY_LABELS, byPriority, industryUrl } from '@/content/industries';
import { abs, breadcrumbLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'AI Solutions by Industry | 14 Sectors | MotionexAI',
  description:
    'Industry-specific AI agents, automation and SaaS for construction, recruitment, real estate, finance, retail, logistics, healthcare, education and more.',
  path: '/industries/',
});

const GROUPS = [
  { p: 'P0' as const, title: 'Priority industries', text: 'Where we have the deepest solutions, demos and products.' },
  { p: 'P1' as const, title: 'Growth industries', text: 'Proven AI patterns adapted to sector workflows.' },
  { p: 'P2' as const, title: 'Expanding industries', text: 'Custom AI engineered around your requirements.' },
];

export default function IndustriesPage() {
  const crumbs = [{ name: 'Industries', path: '/industries/' }];
  return (
    <main id="main">
      <JsonLd
        graph={[
          breadcrumbLd(crumbs),
          {
            '@type': 'CollectionPage',
            name: 'AI Solutions by Industry',
            url: abs('/industries/'),
            hasPart: INDUSTRIES.map((d) => ({ '@type': 'WebPage', name: d.heroHeading, url: abs(industryUrl(d.slug)) })),
          },
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={`${INDUSTRIES.length} industries`}
        title="AI engineered for"
        highlight="your industry"
        lead="Every sector has its own documents, systems, regulations and workflows. Find yours to see the challenges we solve, the AI solutions we build and the demos you can try."
        ctas={[
          { label: 'Discuss Your Project', href: '/contact/' },
          { label: 'Try the demos', href: '/demos/', ghost: true },
        ]}
      />

      <section className="page-sec" data-morph="1" data-shift="0" aria-labelledby="ind-groups">
        <div className="container">
          <h2 id="ind-groups" className="sr-only">
            Industries by priority
          </h2>
          {GROUPS.map((g) => (
            <div key={g.p}>
              <h3 className="group-h">
                {g.title} · {PRIORITY_LABELS[g.p]}
              </h3>
              <div className={g.p === 'P0' ? 'grid-3' : 'grid-4'}>
                {byPriority(g.p).map((d) => (
                  <a key={d.slug} href={industryUrl(d.slug)} className="tile" data-reveal="">
                    <div className="t-top">
                      <span className="t-ico">
                        <Icon id={d.icon} />
                      </span>
                      <span className={`prio ${d.priority}`}>{d.priority}</span>
                    </div>
                    <h3>{d.name}</h3>
                    <p>{g.p === 'P2' ? d.opportunity : d.heroDescription}</p>
                    <span className="t-more">
                      Explore solutions <Icon id="i-arrow" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-sec" data-morph="2" data-shift="0">
        <div className="container">
          <SecHead
            eyebrow="Not listed?"
            title="Your sector,"
            highlight="our engineering"
            text="The same building blocks (agents, document AI, automation and analytics) apply across industries. Tell us your workflow and we will assess fit honestly."
          />
          <a href="/contact/" className="btn btn-primary">
            Describe your workflow <Icon id="i-arrow" />
          </a>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
