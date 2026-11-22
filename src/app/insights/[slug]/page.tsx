import { notFound } from 'next/navigation';
import Icon from '@/components/ui/Icon';
import JsonLd from '@/components/ui/JsonLd';
import PageHero, { CtaBand } from '@/components/page/PageHero';
import { ARTICLES, articleUrl, formatDate, getArticle } from '@/content/insights';
import { INDUSTRIES, industryUrl } from '@/content/industries';
import { ORG_ID, abs, breadcrumbLd, pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => ARTICLES.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return pageMeta({ title: `${a.title} | MotionexAI Insights`, description: a.excerpt, path: articleUrl(a.slug), ogType: 'article' });
}

export default async function ArticlePage({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const crumbs = [
    { name: 'Insights', path: '/insights/' },
    { name: a.category, path: articleUrl(a.slug) },
  ];
  const ind = a.industry ? INDUSTRIES.find((i) => i.slug === a.industry) : undefined;
  const related = ARTICLES.filter((x) => x.slug !== a.slug && (x.industry === a.industry || x.category === a.category)).slice(0, 3);

  return (
    <main id="main">
      <JsonLd
        graph={[
          breadcrumbLd(crumbs),
          {
            '@type': 'BlogPosting',
            headline: a.title,
            description: a.excerpt,
            datePublished: a.date,
            dateModified: a.date,
            url: abs(articleUrl(a.slug)),
            mainEntityOfPage: abs(articleUrl(a.slug)),
            author: { '@id': ORG_ID },
            publisher: { '@id': ORG_ID },
            image: abs('/og-image.jpg'),
          },
        ]}
      />
      <PageHero crumbs={crumbs} eyebrow={`${a.category} · ${a.type}`} title={a.title} lead={a.excerpt} morph={3.8} />

      <article className="art" data-morph="3.8" data-shift="0">
        <div className="container">
          <div className="art-meta" style={{ marginBottom: 26 }}>
            <span>
              <b>Published</b> {formatDate(a.date)}
            </span>
            <span>
              <b>Reading time</b> {a.readMins} min
            </span>
            <span>
              <b>By</b> MotionexAI engineering
            </span>
          </div>
          <div className="art-cover" style={{ background: a.bg }} aria-hidden="true"></div>
          <div className="art-wrap">
            <div className="prose">
              {a.body.map((b, i) =>
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
            <aside className="art-side">
              {ind && (
                <div className="panel glass">
                  <h3 style={{ fontSize: 18 }}>AI for {ind.short}</h3>
                  <p style={{ fontSize: 14.5, marginBottom: 18 }}>{ind.heroDescription}</p>
                  <a href={industryUrl(ind.slug)} className="btn btn-primary btn-sm">
                    Explore solutions <Icon id="i-arrow" />
                  </a>
                </div>
              )}
              {related.length > 0 && (
                <div className="panel glass">
                  <h3 style={{ fontSize: 18 }}>Related reading</h3>
                  <ul className="check-list">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Icon id="i-book" />
                        <a href={articleUrl(r.slug)} style={{ fontSize: 14.5 }}>
                          {r.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </article>
      <CtaBand />
    </main>
  );
}
