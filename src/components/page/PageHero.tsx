import Icon from '@/components/ui/Icon';
import type { Crumb } from '@/lib/seo';

type Cta = { label: string; href: string; ghost?: boolean; contact?: boolean; industry?: string };

/**
 * Inner-page hero: breadcrumb trail, eyebrow, H1, lead and CTAs.
 * Children marked [data-hero] animate in via MotionController's intro timeline.
 */
export default function PageHero({
  crumbs,
  eyebrow,
  title,
  highlight,
  lead,
  ctas = [],
  aside,
  morph = 0.6,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  /** Optional trailing words rendered in the gradient style */
  highlight?: string;
  lead: string;
  ctas?: Cta[];
  aside?: React.ReactNode;
  morph?: number;
}) {
  return (
    <section className="page-hero" data-morph={morph} data-shift="1" aria-labelledby="page-title">
      <div className={`container${aside ? ' ph-grid' : ''}`}>
        <div>
          <nav className="crumbs" aria-label="Breadcrumb" data-hero="">
            <ol>
              <li>
                <a href="/">Home</a>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.path}>
                  {i === crumbs.length - 1 ? <span aria-current="page">{c.name}</span> : <a href={c.path}>{c.name}</a>}
                </li>
              ))}
            </ol>
          </nav>
          <span className="eyebrow" data-hero="">
            {eyebrow}
          </span>
          <h1 id="page-title" data-hero="">
            {title} {highlight && <span className="grad-text">{highlight}</span>}
          </h1>
          <p className="ph-lead" data-hero="">
            {lead}
          </p>
          {ctas.length > 0 && (
            <div className="hero-ctas" data-hero="">
              {ctas.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className={`btn ${c.ghost ? 'btn-ghost' : 'btn-primary'}`}
                  {...(c.contact ? { 'data-contact-link': '' } : {})}
                  {...(c.industry ? { 'data-industry': c.industry, 'data-source': 'Hero CTA' } : {})}
                >
                  {c.label} {!c.ghost && <Icon id="i-arrow" />}
                </a>
              ))}
            </div>
          )}
        </div>
        {aside && (
          <div className="ph-aside" data-hero="">
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}

/** Standard section heading used across inner pages. */
export function SecHead({
  eyebrow,
  title,
  highlight,
  text,
  center,
  id,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  text?: string;
  center?: boolean;
  id?: string;
}) {
  return (
    <div className={`sec-head${center ? ' center' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id}>
        {title} {highlight && <span className="grad-text">{highlight}</span>}
      </h2>
      {text && <p>{text}</p>}
    </div>
  );
}

/** Compact CTA band for pages that do not embed the full inquiry form. */
export function CtaBand({
  title = 'Ready to explore AI for your business?',
  text = 'Tell us about one workflow. A solutions engineer will reply within one business day.',
  primary = { label: 'Discuss Your Project', href: '/contact/' },
  secondary = { label: 'Book a consultation', href: '/book-consultation/' },
}: {
  title?: string;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="cta-band-sec" data-morph="4" data-shift="0">
      <div className="container">
        <div className="cta-band" data-reveal="">
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="hero-ctas" style={{ marginTop: 0 }}>
            <a href={primary.href} className="btn btn-primary">
              {primary.label} <Icon id="i-arrow" />
            </a>
            <a href={secondary.href} className="btn btn-ghost">
              {secondary.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
