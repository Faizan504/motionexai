import Icon from '@/components/ui/Icon';
import JsonLd from '@/components/ui/JsonLd';
import PageHero, { SecHead } from '@/components/page/PageHero';
import LeadForm from '@/components/page/LeadForm';
import { breadcrumbLd, pageMeta } from '@/lib/seo';
import type { IconId } from '@/content/types';

export const metadata = pageMeta({
  title: 'Partnerships | Launch, Technology & Referral Partners | MotionexAI',
  description: 'Partner with MotionexAI as a launch customer for new industry AI products, a technology partner or a referral partner.',
  path: '/partnerships/',
});

const TYPES: { icon: IconId; title: string; text: string }[] = [
  { icon: 'i-rocket', title: 'Launch partners', text: 'Co-build a new industry AI product with early access, input into the roadmap and preferential terms.' },
  { icon: 'i-layers', title: 'Technology partners', text: 'Integrate your platform with our solutions: CRM, ATS, BIM, ERP and data providers.' },
  { icon: 'i-users', title: 'Referral & reseller partners', text: 'Consultancies and agencies that bring AI engineering to their clients through us.' },
];

export default function PartnershipsPage() {
  const crumbs = [{ name: 'Partnerships', path: '/partnerships/' }];
  return (
    <main id="main">
      <JsonLd graph={[breadcrumbLd(crumbs)]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Partnerships"
        title="Build the next industry AI"
        highlight="product with us"
        lead="New products grow out of our industry work. We partner with companies that want to shape them, integrate with them or bring them to their clients."
        ctas={[{ label: 'Apply to partner', href: '#apply' }]}
      />
      <section className="page-sec tight" data-morph="1" data-shift="0" aria-label="Partnership types">
        <div className="container grid-3">
          {TYPES.map((t) => (
            <div className="tile" key={t.title} data-reveal="">
              <span className="t-ico">
                <Icon id={t.icon} />
              </span>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="page-sec" id="apply" data-morph="4" data-shift="0" aria-labelledby="ap-title">
        <div className="container split">
          <SecHead id="ap-title" eyebrow="Apply" title="Tell us about" highlight="your company" text="We review every partnership request and respond within five business days." />
          <LeadForm
            type="partnership"
            title="Partnership request"
            source="Partnerships page"
            submitLabel="Send request"
            fields={[
              { name: 'name', label: 'Full name', type: 'text', required: true, autoComplete: 'name', half: true },
              { name: 'email', label: 'Business email', type: 'email', required: true, autoComplete: 'email', half: true },
              { name: 'company', label: 'Company', type: 'text', required: true, autoComplete: 'organization', half: true },
              { name: 'website', label: 'Website', type: 'url', placeholder: 'https://', half: true },
              { name: 'partnerType', label: 'Partnership type', type: 'select', options: TYPES.map((t) => t.title), required: true },
              { name: 'message', label: 'What do you have in mind?', type: 'textarea', required: true },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
