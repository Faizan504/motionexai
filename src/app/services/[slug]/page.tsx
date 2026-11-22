import { notFound } from 'next/navigation';
import Icon from '@/components/ui/Icon';
import JsonLd from '@/components/ui/JsonLd';
import PageHero, { SecHead } from '@/components/page/PageHero';
import Contact from '@/components/home/Contact';
import { Approach, Faq } from '@/components/home/Sections';
import { SERVICES_DATA, getService, serviceUrl } from '@/content/services';
import { INDUSTRIES, industryUrl } from '@/content/industries';
import { ORG_ID, abs, breadcrumbLd, faqLd, pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => SERVICES_DATA.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMeta({ title: s.seoTitle, description: s.metaDescription, path: serviceUrl(s.slug) });
}

/** Map service names to the lead form's service-interest chips. */
const LEAD_SERVICE: Record<string, string> = {
  'ai-agents': 'AI Agents',
  'ai-automation': 'AI Automation',
  'generative-ai': 'Document AI',
  'saas-development': 'SaaS Platform',
  'data-analytics': 'Analytics',
  'dedicated-teams': 'Dedicated Team',
};

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const crumbs = [
    { name: 'Solutions', path: '/services/' },
    { name: s.name, path: serviceUrl(s.slug) },
  ];
  const inds = s.industries.map((slug) => INDUSTRIES.find((i) => i.slug === slug)).filter((x) => x !== undefined);
  const siblings = SERVICES_DATA.filter((x) => x.group === s.group && x.slug !== s.slug);

  return (
    <main id="main">
      <JsonLd
        graph={[
          breadcrumbLd(crumbs),
          {
            '@type': 'Service',
            name: s.name,
            serviceType: s.keywords[0],
            description: s.metaDescription,
            url: abs(serviceUrl(s.slug)),
            provider: { '@id': ORG_ID },
            areaServed: 'Worldwide',
          },
          faqLd(s.faqs),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={`${s.group} · ${s.name}`}
        title={s.heroHeading}
        lead={s.heroDescription}
        morph={1}
        ctas={[
          { label: 'Discuss Your Project', href: '#contact', contact: true },
          { label: 'Try the demos', href: '/demos/', ghost: true },
        ]}
        aside={
          <>
            <h4>What you get</h4>
            <ul>
              {s.deliverables.map((x) => (
                <li key={x}>
                  <Icon id="i-check" />
                  {x}
                </li>
              ))}
            </ul>
          </>
        }
      />

      <section className="page-sec" data-morph="1.4" data-shift="0" aria-labelledby="cap-title">
        <div className="container">
          <SecHead id="cap-title" eyebrow="Capabilities" title="What" highlight={`${s.name} covers`} />
          <div className="grid-3">
            {s.capabilities.map((c) => (
              <div className="tile" key={c.title} data-reveal="">
                <span className="t-ico">
                  <Icon id={s.icon} />
                </span>
                <h3>{c.title}</h3>
                <p>{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-sec" data-morph="2" data-shift="0" aria-labelledby="ind-title">
        <div className="container">
          <SecHead id="ind-title" eyebrow="Industries" title="Applied in" highlight="these sectors" text="Where we most often deliver this service. Each industry page shows the specific solutions and demos." />
          <div className="grid-4" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))' }}>
            {inds.map((d) => (
              <a key={d.slug} href={industryUrl(d.slug)} className="tile" data-reveal="">
                <span className="t-ico">
                  <Icon id={d.icon} />
                </span>
                <h3>{d.short}</h3>
                <span className="t-more">
                  View solutions <Icon id="i-arrow" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Approach />

      <section className="page-sec tight" data-morph="3.7" data-shift="0" aria-labelledby="rel-title">
        <div className="container">
          <div className="panel glass" data-reveal="">
            <h3 id="rel-title">More in {s.group}</h3>
            <div className="chips-row">
              {siblings.map((x) => (
                <a key={x.slug} href={serviceUrl(x.slug)}>
                  {x.name}
                </a>
              ))}
              <a href="/services/">All solutions →</a>
            </div>
          </div>
        </div>
      </section>

      <Faq items={s.faqs} intro={`Common questions about ${s.name.toLowerCase()}.`} />
      <Contact page={`Service · ${s.name}`} defaultServices={LEAD_SERVICE[s.slug] ? [LEAD_SERVICE[s.slug]] : []} />
    </main>
  );
}
