import Icon from '@/components/ui/Icon';
import JsonLd from '@/components/ui/JsonLd';
import PageHero, { SecHead } from '@/components/page/PageHero';
import LeadForm from '@/components/page/LeadForm';
import { INDUSTRIES } from '@/content/industries';
import { LEAD_OPTIONS } from '@/content/site';
import { breadcrumbLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Book an AI Consultation | MotionexAI',
  description: 'Book a free 30-minute discovery consultation with a MotionexAI solutions engineer to map one workflow and agree success KPIs.',
  path: '/book-consultation/',
});

const AGENDA = [
  'Your workflow, systems and data (10 min)',
  'Where AI fits, and where it does not (10 min)',
  'KPIs, pilot scope and next steps (10 min)',
];

export default function BookPage() {
  const crumbs = [{ name: 'Book a consultation', path: '/book-consultation/' }];
  return (
    <main id="main">
      <JsonLd graph={[breadcrumbLd(crumbs)]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Discovery consultation"
        title="Book a 30-minute"
        highlight="discovery call"
        lead="Talk to a solutions engineer, not a salesperson. Choose a preferred date and time; we confirm by email within one business day."
      />
      <section className="page-sec tight" data-morph="4" data-shift="0" aria-labelledby="bk-title">
        <div className="container split">
          <div>
            <SecHead id="bk-title" eyebrow="What to expect" title="A focused," highlight="useful 30 minutes" />
            <ul className="check-list" style={{ marginBottom: 28 }}>
              {AGENDA.map((a) => (
                <li key={a}>
                  <Icon id="i-check" />
                  {a}
                </li>
              ))}
            </ul>
            <div className="note-box">
              <Icon id="i-lock" />
              <span>No confidential data needed. If an NDA is required before detailed discussion, mention it and we will send one.</span>
            </div>
          </div>
          <LeadForm
            type="consultation"
            title="Request a time"
            source="Book consultation page"
            submitLabel="Request consultation"
            successTitle="Consultation requested."
            successText="We will confirm your slot by email within one business day."
            fields={[
              { name: 'name', label: 'Full name', type: 'text', required: true, autoComplete: 'name', half: true },
              { name: 'email', label: 'Business email', type: 'email', required: true, autoComplete: 'email', half: true },
              { name: 'company', label: 'Company', type: 'text', autoComplete: 'organization', half: true },
              { name: 'industry', label: 'Industry', type: 'select', options: [...INDUSTRIES.map((i) => i.name), 'Other'], required: true, half: true },
              { name: 'date', label: 'Preferred date', type: 'date', required: true, half: true },
              { name: 'time', label: 'Preferred time (GST)', type: 'select', options: ['09:00–11:00', '11:00–13:00', '13:00–15:00', '15:00–17:00', '17:00–19:00'], required: true, half: true },
              { name: 'method', label: 'Consultation method', type: 'select', options: LEAD_OPTIONS.method, defaultValue: LEAD_OPTIONS.method[0] },
              { name: 'topic', label: 'What would you like to discuss?', type: 'textarea', placeholder: 'e.g. Automating CV screening for 200 roles a month' },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
