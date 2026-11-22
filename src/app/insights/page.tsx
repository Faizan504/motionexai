import JsonLd from '@/components/ui/JsonLd';
import PageHero, { CtaBand } from '@/components/page/PageHero';
import InsightsGrid from '@/components/page/InsightsGrid';
import { ARTICLES, INSIGHT_CATEGORIES, articleUrl } from '@/content/insights';
import { ORG_ID, abs, breadcrumbLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Industry AI Insights | Guides, Comparisons & Playbooks | MotionexAI',
  description:
    'Practical guides on AI agents, automation and document intelligence for construction, recruitment, real estate and more, written by engineers.',
  path: '/insights/',
});

export default function InsightsPage() {
  const crumbs = [{ name: 'Insights', path: '/insights/' }];
  const sorted = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <main id="main">
      <JsonLd
        graph={[
          breadcrumbLd(crumbs),
          {
            '@type': 'Blog',
            name: 'MotionexAI Insights',
            url: abs('/insights/'),
            publisher: { '@id': ORG_ID },
            blogPost: sorted.map((a) => ({ '@type': 'BlogPosting', headline: a.title, url: abs(articleUrl(a.slug)), datePublished: a.date })),
          },
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Insights"
        title="Industry AI,"
        highlight="explained by engineers"
        lead="Service guides, technical deep-dives, comparisons and playbooks. No hype: what works, where people stay in control, and how to measure results."
      />
      <section className="page-sec tight" data-morph="3.8" data-shift="0" aria-label="Articles">
        <div className="container">
          <InsightsGrid articles={sorted} categories={INSIGHT_CATEGORIES} />
        </div>
      </section>
      <CtaBand title="Get new insights by email" text="Use the newsletter form in the footer, or talk to an engineer about your use case." />
    </main>
  );
}
