import Icon from '@/components/ui/Icon';
import JsonLd from '@/components/ui/JsonLd';
import PageHero, { CtaBand } from '@/components/page/PageHero';
import { Approach, Engagement } from '@/components/home/Sections';
import Contact from '@/components/home/Contact';
import { SERVICES_DATA, serviceUrl } from '@/content/services';
import { ORG_ID, abs, breadcrumbLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'AI, SaaS & Software Development Services | MotionexAI',
  description:
    'AI agents, AI automation, document intelligence, custom ML, SaaS and enterprise software, cloud, security and analytics services from MotionexAI.',
  path: '/services/',
});

const GROUPS = ['AI Engineering', 'SaaS & Software', 'Platform & Data'] as const;

export default function ServicesPage() {
  const crumbs = [{ name: 'Solutions', path: '/services/' }];
  return (
    <main id="main">
      <JsonLd
        graph={[
          breadcrumbLd(crumbs),
          {
            '@type': 'ItemList',
            name: 'MotionexAI services',
            itemListElement: SERVICES_DATA.map((s, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: { '@type': 'Service', name: s.name, url: abs(serviceUrl(s.slug)), provider: { '@id': ORG_ID } },
            })),
          },
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Solutions"
        title="AI engineering, SaaS and the platform"
        highlight="to run it"
        lead="Eleven capabilities, one team. We combine AI agents, automation and document intelligence with the software, cloud and security foundations needed to run them in production."
        ctas={[
          { label: 'Discuss Your Project', href: '#contact', contact: true },
          { label: 'Explore industries', href: '/industries/', ghost: true },
        ]}
      />

      <section className="page-sec" data-morph="1" data-shift="0" aria-label="Services">
        <div className="container">
          {GROUPS.map((g) => (
            <div key={g}>
              <h2 className="group-h">{g}</h2>
              <div className="grid-4" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))' }}>
                {SERVICES_DATA.filter((s) => s.group === g).map((s) => (
                  <a key={s.slug} href={serviceUrl(s.slug)} className="tile" data-reveal="">
                    <span className="t-ico">
                      <Icon id={s.icon} />
                    </span>
                    <h3>{s.name}</h3>
                    <p>{s.heroDescription}</p>
                    <span className="t-more">
                      Learn more <Icon id="i-arrow" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Approach />
      <Engagement />
      <Contact page="Services" />
      <CtaBand title="Prefer to talk first?" text="Book a 30-minute discovery call with a solutions engineer." primary={{ label: 'Book a consultation', href: '/book-consultation/' }} secondary={{ label: 'See demos', href: '/demos/' }} />
    </main>
  );
}
