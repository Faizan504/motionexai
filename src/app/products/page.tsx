import Icon from '@/components/ui/Icon';
import JsonLd from '@/components/ui/JsonLd';
import PageHero, { CtaBand } from '@/components/page/PageHero';
import { Products } from '@/components/home/Sections';
import { PRODUCTS, STATUS_LABEL, productUrl } from '@/content/products';
import { ORG_ID, abs, breadcrumbLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Proprietary AI Products | CareerFlix & More | MotionexAI',
  description:
    'Platforms MotionexAI builds and runs: CareerFlix AI recruitment, Rewards & Advocacy and Remote Workspace, each with its real availability status.',
  path: '/products/',
});

export default function ProductsPage() {
  const crumbs = [{ name: 'Products', path: '/products/' }];
  return (
    <main id="main">
      <JsonLd
        graph={[
          breadcrumbLd(crumbs),
          ...PRODUCTS.map((p) => ({
            '@type': 'SoftwareApplication',
            name: p.name,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: p.metaDescription,
            url: abs(productUrl(p.slug)),
            publisher: { '@id': ORG_ID },
          })),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Proprietary products"
        title="Our own platforms,"
        highlight="built for industries"
        lead="Products we build and run ourselves. Every product is shown with its accurate availability status: Live, Beta, In development or Upcoming."
      />

      <Products />

      <section className="page-sec" data-morph="3" data-shift="0" aria-label="Product details">
        <div className="container grid-3">
          {PRODUCTS.map((p) => (
            <a key={p.slug} href={productUrl(p.slug)} className="tile" data-reveal="">
              <div className="t-top">
                <h3 style={{ fontSize: 22 }}>{p.name}</h3>
                <span className={`status st-${p.status}`}>{STATUS_LABEL[p.status]}</span>
              </div>
              <p style={{ color: '#d4dbf5' }}>{p.tagline}</p>
              <p>Built for {p.audience.charAt(0).toLowerCase() + p.audience.slice(1)}</p>
              <span className="t-more">
                {p.status === 'live' || p.status === 'beta' ? 'View product' : 'Join waitlist'} <Icon id="i-arrow" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <CtaBand
        title="Co-build the next industry product"
        text="New products grow out of our industry work. Partner with us as a launch customer or technology partner."
        primary={{ label: 'Become a launch partner', href: '/partnerships/' }}
        secondary={{ label: 'Contact us', href: '/contact/' }}
      />
    </main>
  );
}
