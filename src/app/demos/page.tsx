import JsonLd from '@/components/ui/JsonLd';
import Icon from '@/components/ui/Icon';
import PageHero, { CtaBand, SecHead } from '@/components/page/PageHero';
import DemoCenter from '@/components/home/DemoCenter';
import { Transparency } from '@/components/home/Sections';
import { DEMOS } from '@/content/demos';
import { INDUSTRIES, industryUrl } from '@/content/industries';
import { breadcrumbLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'AI Demo Center | Interactive Industry AI Demos | MotionexAI',
  description:
    'Watch industry AI workflows run step by step: BIM issues, hiring, property advice, invoices, logistics and insurance claims, all on synthetic data with human review.',
  path: '/demos/',
});

export default function DemosPage() {
  const crumbs = [{ name: 'Demo Center', path: '/demos/' }];
  const withDemo = INDUSTRIES.filter((d) => d.demoKey);
  return (
    <main id="main">
      <JsonLd graph={[breadcrumbLd(crumbs)]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Demo center"
        title="See industry AI"
        highlight="work, step by step"
        lead={`${DEMOS.length} interactive demonstrations of real workflow patterns. Every demo runs on synthetic data and ends with a human review step.`}
        ctas={[
          { label: 'Request a live demo', href: '/book-consultation/' },
          { label: 'Jump to demos', href: '#demos', ghost: true },
        ]}
      />
      <DemoCenter />

      <section className="page-sec" data-morph="2.6" data-shift="0" aria-labelledby="dm-ind">
        <div className="container">
          <SecHead id="dm-ind" eyebrow="By industry" title="Demos in" highlight="context" text="Each demo is part of an industry page with the challenges, solutions and FAQs around it." />
          <div className="grid-3">
            {withDemo.map((d) => {
              const demo = DEMOS.find((x) => x.key === d.demoKey);
              return (
                <a key={d.slug} href={`${industryUrl(d.slug)}#demos`} className="tile" data-reveal="">
                  <span className="t-ico">
                    <Icon id={d.icon} />
                  </span>
                  <h3>{demo?.name || d.short}</h3>
                  <p>{demo?.desc}</p>
                  <span className="t-more">
                    {d.short} <Icon id="i-arrow" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>
      <Transparency />
      <CtaBand title="Want a demo on your own workflow?" text="We can prepare a tailored walkthrough using sample documents similar to yours." primary={{ label: 'Book a demo call', href: '/book-consultation/' }} secondary={{ label: 'Contact us', href: '/contact/' }} />
    </main>
  );
}
