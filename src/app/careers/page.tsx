import Icon from '@/components/ui/Icon';
import JsonLd from '@/components/ui/JsonLd';
import PageHero, { SecHead } from '@/components/page/PageHero';
import LeadForm from '@/components/page/LeadForm';
import { breadcrumbLd, pageMeta } from '@/lib/seo';
import type { IconId } from '@/content/types';

export const metadata = pageMeta({
  title: 'Careers at MotionexAI | AI Engineering Jobs in Dubai & Remote',
  description: 'Join MotionexAI to build industry-specific AI agents, automation systems and SaaS products. AI engineering, full-stack and product roles.',
  path: '/careers/',
});

/** [VERIFY] Replace with current open roles before launch. */
const ROLES = [
  { title: 'AI / LLM Engineer', team: 'AI Engineering', loc: 'Dubai · Hybrid', type: 'Full-time', text: 'Build agents, retrieval pipelines and evaluation suites for industry workflows.' },
  { title: 'Senior Full-Stack Engineer (Next.js / Node)', team: 'SaaS & Software', loc: 'Remote', type: 'Full-time', text: 'Ship SaaS platforms and client applications with AI features built in.' },
  { title: 'Solutions Engineer', team: 'Delivery', loc: 'Dubai', type: 'Full-time', text: 'Run discovery with clients, scope pilots and translate workflows into solutions.' },
  { title: 'DevOps / MLOps Engineer', team: 'Platform', loc: 'Remote', type: 'Full-time', text: 'Own cloud infrastructure, CI/CD and LLMOps monitoring.' },
];

const PERKS: { icon: IconId; title: string; text: string }[] = [
  { icon: 'i-rocket', title: 'Real production AI', text: 'Work on systems used in real operations, not just prototypes.' },
  { icon: 'i-globe', title: 'Flexible working', text: 'Hybrid in Dubai or remote, depending on the role.' },
  { icon: 'i-book', title: 'Learning budget', text: 'Time and budget for courses, conferences and certifications.' },
];

export default function CareersPage() {
  const crumbs = [{ name: 'Careers', path: '/careers/' }];
  return (
    <main id="main">
      <JsonLd graph={[breadcrumbLd(crumbs)]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Careers"
        title="Build AI that real"
        highlight="industries rely on"
        lead="We are a team of AI engineers, developers and product people building industry-specific AI and our own SaaS products."
        ctas={[{ label: 'View open roles', href: '#roles' }]}
      />
      <section className="page-sec tight" data-morph="1" data-shift="0" aria-label="Why join">
        <div className="container grid-3">
          {PERKS.map((p) => (
            <div className="tile" key={p.title} data-reveal="">
              <span className="t-ico">
                <Icon id={p.icon} />
              </span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="page-sec" id="roles" data-morph="2" data-shift="0" aria-labelledby="roles-title">
        <div className="container">
          <SecHead id="roles-title" eyebrow="Open roles" title="Current" highlight="openings" />
          <div className="roles">
            {ROLES.map((r) => (
              <div className="role" key={r.title} data-reveal="">
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </div>
                <div className="tags">
                  <span>{r.team}</span>
                  <span>{r.loc}</span>
                  <span>{r.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="page-sec" data-morph="4" data-shift="0" aria-labelledby="apply-title">
        <div className="container split">
          <SecHead
            id="apply-title"
            eyebrow="Apply"
            title="Interested?"
            highlight="Introduce yourself"
            text="Pick a role (or a general application) and share a link to your CV, LinkedIn or portfolio. We reply to every application."
          />
          <LeadForm
            type="career"
            title="Application"
            source="Careers page"
            submitLabel="Submit application"
            successTitle="Application received."
            successText="Thank you. Our team reviews every application and will be in touch."
            fields={[
              { name: 'name', label: 'Full name', type: 'text', required: true, autoComplete: 'name', half: true },
              { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email', half: true },
              { name: 'role', label: 'Role', type: 'select', options: [...ROLES.map((r) => r.title), 'General application'], required: true },
              { name: 'profile', label: 'CV / LinkedIn / portfolio URL', type: 'url', required: true, placeholder: 'https://' },
              { name: 'message', label: 'Why MotionexAI?', type: 'textarea' },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
