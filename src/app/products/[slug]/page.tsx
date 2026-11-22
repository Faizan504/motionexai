import { notFound } from 'next/navigation';
import Icon from '@/components/ui/Icon';
import JsonLd from '@/components/ui/JsonLd';
import PageHero, { SecHead } from '@/components/page/PageHero';
import LeadForm from '@/components/page/LeadForm';
import { PRODUCTS, STATUS_LABEL, getProduct, productUrl } from '@/content/products';
import { INDUSTRIES, industryUrl } from '@/content/industries';
import { ORG_ID, abs, breadcrumbLd, pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => PRODUCTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return pageMeta({ title: p.seoTitle, description: p.metaDescription, path: productUrl(p.slug) });
}

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const crumbs = [
    { name: 'Products', path: '/products/' },
    { name: p.name, path: productUrl(p.slug) },
  ];
  const available = p.status === 'live' || p.status === 'beta';
  const inds = p.industries.map((s) => INDUSTRIES.find((i) => i.slug === s)).filter((x) => x !== undefined);

  return (
    <main id="main">
      <JsonLd
        graph={[
          breadcrumbLd(crumbs),
          {
            '@type': 'SoftwareApplication',
            name: p.name,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: p.metaDescription,
            url: abs(productUrl(p.slug)),
            publisher: { '@id': ORG_ID },
            featureList: p.features.map((f) => f.title),
          },
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={`${p.category} · ${STATUS_LABEL[p.status]}`}
        title={p.name}
        highlight={`· ${p.tagline}`}
        lead={p.description}
        morph={2.6}
        ctas={[
          { label: p.cta, href: '#get-access' },
          { label: 'All products', href: '/products/', ghost: true },
        ]}
        aside={
          <>
            <span className={`status st-${p.status}`}>{STATUS_LABEL[p.status]}</span>
            <h4 style={{ marginTop: 18 }}>Built for</h4>
            <p style={{ color: '#d4dbf5', fontSize: 14.5 }}>{p.audience}</p>
            {!available && (
              <p style={{ color: 'var(--muted)', fontSize: 13.5, marginTop: 14 }}>
                This product is not yet generally available. Join the waitlist for launch updates and early access.
              </p>
            )}
          </>
        }
      />

      <section className="page-sec" data-morph="2.6" data-shift="0" data-dim="0.6" aria-labelledby="feat-title">
        <div className="container">
          <SecHead id="feat-title" eyebrow="Features" title="What" highlight={`${p.name} does`} />
          <div className="grid-3">
            {p.features.map((f) => (
              <div className="tile" key={f.title} data-reveal="">
                <span className="t-ico">
                  <Icon id={f.icon} />
                </span>
                <h3>{f.title}</h3>
                <p>{f.detail}</p>
              </div>
            ))}
          </div>
          {inds.length > 0 && (
            <div className="chips-row" style={{ marginTop: 30 }}>
              <span style={{ border: 0, paddingLeft: 0, color: 'var(--dim)' }}>Related industries:</span>
              {inds.map((d) => (
                <a key={d.slug} href={industryUrl(d.slug)}>
                  {d.short}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="page-sec" id="get-access" data-morph="4" data-shift="0" aria-labelledby="ga-title">
        <div className="container split">
          <div>
            <SecHead
              id="ga-title"
              eyebrow={available ? 'Get a demo' : 'Waitlist'}
              title={available ? `See ${p.name}` : 'Be first to'}
              highlight={available ? 'in action' : 'get access'}
              text={
                available
                  ? 'Book a guided walkthrough on sample data with a product specialist.'
                  : "We'll share launch updates and invite early users as capacity opens."
              }
            />
            <div className="note-box">
              <Icon id="i-shield" />
              <span>Product availability statuses are reviewed regularly. Feature scope may change before general availability.</span>
            </div>
          </div>
          <LeadForm
            type={available ? 'demo' : 'waitlist'}
            title={p.cta}
            source={`Product · ${p.name}`}
            hidden={{ product: p.name }}
            submitLabel={p.cta}
            successTitle={available ? 'Demo request received.' : "You're on the waitlist."}
            fields={[
              { name: 'name', label: 'Full name', type: 'text', required: true, autoComplete: 'name', half: true },
              { name: 'email', label: 'Business email', type: 'email', required: true, autoComplete: 'email', half: true },
              { name: 'company', label: 'Company', type: 'text', autoComplete: 'organization', half: true },
              { name: 'teamSize', label: 'Team size', type: 'select', options: ['1–10', '11–50', '51–200', '201–1000', '1000+'], half: true },
              { name: 'message', label: 'What would you like to see?', type: 'textarea' },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
