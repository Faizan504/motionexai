import Icon from '@/components/ui/Icon';
import JsonLd from '@/components/ui/JsonLd';
import PageHero, { CtaBand, SecHead } from '@/components/page/PageHero';
import { Approach, Transparency } from '@/components/home/Sections';
import TechStack from '@/components/home/TechStack';
import { INDUSTRIES } from '@/content/industries';
import { PRODUCTS } from '@/content/products';
import { SERVICES_DATA } from '@/content/services';
import { abs, breadcrumbLd, organizationLd, pageMeta } from '@/lib/seo';
import type { IconId } from '@/content/types';

export const metadata = pageMeta({
  title: 'About MotionexAI | Industry-Specific AI Engineering Company, Dubai',
  description:
    'MotionexAI is a Dubai-based AI, SaaS and enterprise technology company engineering industry-specific AI agents, automation systems and SaaS platforms.',
  path: '/about/',
});

const VALUES: { icon: IconId; title: string; text: string }[] = [
  { icon: 'i-target', title: 'Industry first', text: 'We start from the workflow, documents and regulations of your sector, not from a generic model.' },
  { icon: 'i-user-check', title: 'People in control', text: 'AI assists. Critical decisions stay with qualified people, with review steps built in.' },
  { icon: 'i-chart', title: 'Measured, not promised', text: 'We agree KPIs and baselines up front and report pilot results honestly.' },
  { icon: 'i-shield', title: 'Secure by design', text: 'Access control, audit logs and privacy controls are part of every build.' },
  { icon: 'i-layers', title: 'Product mindset', text: 'We run our own SaaS products, so we build client platforms to the same standard.' },
  { icon: 'i-globe', title: 'Global delivery', text: 'Engineered in Dubai for clients worldwide, across time zones.' },
];

export default function AboutPage() {
  const crumbs = [{ name: 'About', path: '/about/' }];
  return (
    <main id="main">
      <JsonLd graph={[breadcrumbLd(crumbs), organizationLd, { '@type': 'AboutPage', url: abs('/about/'), about: { '@id': organizationLd['@id'] } }]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Company"
        title="We engineer AI that fits"
        highlight="how industries work"
        lead="MotionexAI is a global AI, SaaS and enterprise technology company based in Dubai. We build industry-specific AI agents, automation systems and SaaS platforms that integrate into real business operations."
        ctas={[
          { label: 'Work with us', href: '/contact/' },
          { label: 'Careers', href: '/careers/', ghost: true },
        ]}
      />

      <section className="page-sec tight" data-morph="0.6" data-shift="0" aria-label="At a glance">
        <div className="container">
          <div className="stats glass" data-reveal="">
            <div className="stat">
              <b>
                <span data-count={INDUSTRIES.length}>0</span>
              </b>
              <span>Industries served</span>
            </div>
            <div className="stat">
              <b>
                <span data-count={SERVICES_DATA.length}>0</span>
              </b>
              <span>Service capabilities</span>
            </div>
            <div className="stat">
              <b>
                <span data-count={PRODUCTS.length}>0</span>
              </b>
              <span>Proprietary products</span>
            </div>
            <div className="stat">
              <b>1</b>
              <span>Team, from discovery to production</span>
            </div>
          </div>
        </div>
      </section>

      <section className="page-sec" data-morph="1" data-shift="0" aria-labelledby="story-title">
        <div className="container split">
          <SecHead
            id="story-title"
            eyebrow="Our approach"
            title="Generic AI is easy to demo."
            highlight="Industry AI is what works."
          />
          <div className="panel glass" data-reveal="">
            <p style={{ marginBottom: 16 }}>
              Most AI projects stall between the demo and production. The gap is rarely the model. It is the documents, systems,
              approvals and regulations specific to each industry.
            </p>
            <p style={{ marginBottom: 16 }}>
              That is why we organize around industries: construction and AEC, recruitment and HR, and real estate first, followed by
              finance, retail, logistics, healthcare, education and more. Each has its own solutions, demos and delivery playbooks.
            </p>
            <p>We are transparent about what is available today, what is custom development and what is a demonstration concept.</p>
          </div>
        </div>
      </section>

      <section className="page-sec" data-morph="2" data-shift="0" aria-labelledby="val-title">
        <div className="container">
          <SecHead id="val-title" eyebrow="Principles" title="How we" highlight="work" />
          <div className="grid-3">
            {VALUES.map((v) => (
              <div className="tile" key={v.title} data-reveal="">
                <span className="t-ico">
                  <Icon id={v.icon} />
                </span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Approach />
      <TechStack />
      <Transparency />
      <CtaBand />
    </main>
  );
}
