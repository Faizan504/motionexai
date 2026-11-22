import { notFound } from 'next/navigation';
import Icon from '@/components/ui/Icon';
import JsonLd from '@/components/ui/JsonLd';
import PageHero, { SecHead } from '@/components/page/PageHero';
import DemoCenter from '@/components/home/DemoCenter';
import TechStack from '@/components/home/TechStack';
import Contact from '@/components/home/Contact';
import { Approach, Faq, Outcomes } from '@/components/home/Sections';
import { INDUSTRIES, PRIORITY_LABELS, industryUrl } from '@/content/industries';
import { CHALLENGES, industryFaqs } from '@/content/industry-extras';
import { relatedHref } from '@/content/services';
import { ARTICLES, articleUrl } from '@/content/insights';
import { ORG_ID, abs, breadcrumbLd, faqLd, pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return INDUSTRIES.filter((d) => d.publishingStatus === 'published').map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const d = INDUSTRIES.find((x) => x.slug === slug);
  if (!d) return {};
  return pageMeta({ title: d.seoTitle, description: d.metaDescription, path: industryUrl(d.slug) });
}

/**
 * Industry landing page — the scope's 12-section template:
 * Hero · Overview · Challenges · AI Solutions · Use Cases · Demonstration · Technology ·
 * Outcomes · Implementation · Credibility & related content · FAQs · CTA.
 */
export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const d = INDUSTRIES.find((x) => x.slug === slug);
  if (!d) notFound();

  const crumbs = [
    { name: 'Industries', path: '/industries/' },
    { name: d.short, path: industryUrl(d.slug) },
  ];
  const faqs = industryFaqs(d);
  const challenges = CHALLENGES[d.slug] || [];
  const articles = ARTICLES.filter((a) => a.industry === d.slug);
  const others = INDUSTRIES.filter((x) => x.slug !== d.slug && x.priority === d.priority).slice(0, 5);

  return (
    <main id="main">
      <JsonLd
        graph={[
          breadcrumbLd(crumbs),
          {
            '@type': 'Service',
            name: d.heroHeading,
            serviceType: d.keywords.primary,
            description: d.metaDescription,
            url: abs(industryUrl(d.slug)),
            provider: { '@id': ORG_ID },
            audience: { '@type': 'BusinessAudience', name: d.audience },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: `AI solutions for ${d.short}`,
              itemListElement: d.solutions.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title } })),
            },
          },
          faqLd(faqs),
        ]}
      />

      {/* 1. Hero */}
      <PageHero
        crumbs={crumbs}
        eyebrow={`${d.short} · ${PRIORITY_LABELS[d.priority]}`}
        title={d.heroHeading}
        lead={d.heroDescription}
        ctas={[
          { label: d.primaryCta, href: '#contact', industry: d.name },
          ...(d.demoKey ? [{ label: 'See the demo', href: '#demos', ghost: true }] : [{ label: 'View solutions', href: '#solutions', ghost: true }]),
        ]}
        aside={
          <>
            <h4>Built for</h4>
            <p style={{ color: '#d4dbf5', fontSize: 14.5 }}>{d.audience}</p>
            <h4 style={{ marginTop: 20 }}>Focus areas</h4>
            <ul>
              {d.opportunity.split(',').map((o) => (
                <li key={o}>
                  <Icon id="i-check" />
                  {o.trim().replace(/^./, (c) => c.toUpperCase())}
                </li>
              ))}
            </ul>
          </>
        }
      />

      {/* 2. Overview: the four questions */}
      <section className="page-sec tight" data-morph="0.6" data-shift="0" aria-label="Overview">
        <div className="container">
          <div className="grid-4">
            {[
              { n: '01', t: 'The problem', p: challenges[0]?.detail || 'Manual, repetitive work slows operations.' },
              { n: '02', t: 'The solution', p: `${d.solutions[0].title}${d.solutions[0].detail ? ': ' + d.solutions[0].detail : ''}.` },
              { n: '03', t: 'In practice', p: d.demos[0].replace(/^[^:]+:\s*/, '') },
              { n: '04', t: 'Next step', p: 'A discovery consultation to map one workflow and agree KPIs, then a measured pilot.' },
            ].map((x) => (
              <div className="tile" key={x.n} data-reveal="">
                <span className="n" style={{ fontFamily: 'var(--font-m)', fontSize: 12, color: 'var(--cyan)' }}>
                  {x.n}
                </span>
                <h3>{x.t}</h3>
                <p>{x.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Challenges */}
      {challenges.length > 0 && (
        <section className="page-sec" data-morph="1.4" data-shift="0" aria-labelledby="chal-title">
          <div className="container">
            <SecHead id="chal-title" eyebrow="Business challenges" title="What slows" highlight={`${d.short.toLowerCase()} teams down`} />
            <div className="chal">
              {challenges.map((c) => (
                <article className="chal-i" key={c.problem} data-reveal="">
                  <div className="cp">
                    <span className="lab">Challenge</span>
                    <h3>{c.problem}</h3>
                    <p>{c.detail}</p>
                  </div>
                  <div className="ca">
                    <span className="lab">With AI</span>
                    <p>{c.answer}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. AI solutions */}
      <section className="page-sec" id="solutions" data-morph="2" data-shift="0" aria-labelledby="sol-title">
        <div className="container">
          <SecHead id="sol-title" eyebrow="AI solutions" title={`AI solutions for ${d.short}`} text={d.note} />
          <div className="sol-grid">
            {d.solutions.map((s, i) => (
              <div className="sol" key={s.title} data-reveal="">
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <b>{s.title}</b>
                  {s.detail && <small>{s.detail.replace(/^./, (c) => c.toUpperCase())}</small>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Use cases / demonstration concepts */}
      <section className="page-sec" data-morph="2.4" data-shift="0" aria-labelledby="uc-title">
        <div className="container">
          <SecHead
            id="uc-title"
            eyebrow="AI use cases"
            title="How it works"
            highlight="in practice"
            text="Demonstration concepts built on synthetic data. Verified case studies are published only with client approval and evidence."
          />
          <div className="grid-3">
            {d.demos.map((x) => {
              const [title, ...rest] = x.split(':');
              const body = rest.join(':').trim();
              return (
                <div className="tile" key={x} data-reveal="">
                  <span className="t-ico">
                    <Icon id="i-sparkle" />
                  </span>
                  <h3>{body ? title : 'Workflow concept'}</h3>
                  <p>{body || x}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Interactive demonstration */}
      {d.demoKey && <DemoCenter initialKey={d.demoKey} />}

      {/* 7. Technology */}
      <TechStack />

      {/* 8. Outcomes */}
      <Outcomes />

      {/* 9. Implementation */}
      <Approach />

      {/* 10. Related services, insights and industries (internal linking) */}
      <section className="page-sec" data-morph="3.7" data-shift="0" aria-labelledby="rel-title">
        <div className="container">
          <h2 id="rel-title" className="sr-only">
            Related
          </h2>
          <div className="split">
            <div className="panel glass" data-reveal="">
              <h3>Related services</h3>
              <div className="chips-row">
                {d.relatedServices.map((s) => {
                  const href = relatedHref(s);
                  return href ? (
                    <a key={s} href={href}>
                      {s}
                    </a>
                  ) : (
                    <span key={s}>{s}</span>
                  );
                })}
              </div>
              <h3 style={{ marginTop: 28 }}>Other {PRIORITY_LABELS[d.priority].split(' · ')[1].toLowerCase()} industries</h3>
              <div className="chips-row">
                {others.map((o) => (
                  <a key={o.slug} href={industryUrl(o.slug)}>
                    {o.short}
                  </a>
                ))}
                <a href="/industries/">All industries →</a>
              </div>
            </div>
            <div className="panel glass" data-reveal="">
              <h3>Insights for {d.short}</h3>
              {articles.length ? (
                <ul className="check-list">
                  {articles.map((a) => (
                    <li key={a.slug}>
                      <Icon id="i-book" />
                      <a href={articleUrl(a.slug)}>{a.title}</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Industry guides for this sector are in preparation. Browse all insights in the meantime.</p>
              )}
              <a href="/insights/" className="btn btn-ghost btn-sm" style={{ marginTop: 22 }}>
                All insights <Icon id="i-arrow" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQs */}
      <Faq items={faqs} intro={`Common questions about AI for ${d.short.toLowerCase()}.`} />

      {/* 12. CTA */}
      <Contact page={`Industry · ${d.short}`} defaultIndustry={d.name} />
    </main>
  );
}
