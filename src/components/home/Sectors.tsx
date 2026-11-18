import Icon from '@/components/ui/Icon';
import FlipCard from '@/components/home/FlipCard';
import { byPriority, industryUrl } from '@/content/industries';

/** Homepage-specific card copy for the three P0 industries (scope §2 & §4.1–4.3). */
const P0_CARDS: Record<string, { title: string; text: string; tags: string[] }> = {
  'construction-aec': {
    title: 'Construction, Engineering & AEC',
    text: 'BIM automation, engineering AI and document intelligence for BIM managers, engineering and project directors.',
    tags: ['BIM Automation Agents', 'Engineering Document AI', 'AI Quantity Takeoff', 'AI Project Reporting'],
  },
  'recruitment-hr': {
    title: 'Recruitment, HR & Workforce',
    text: 'AI hiring agents, candidate intelligence and HR automation for agencies, staffing firms and talent teams.',
    tags: ['AI Recruitment Agent', 'Resume Intelligence', 'Candidate Matching', 'AI Interview Assistant'],
  },
  'real-estate': {
    title: 'Real Estate & Property',
    text: 'Property AI assistants, CRM automation and property SaaS for developers, brokerages and property managers.',
    tags: ['Lead Qualification Agents', 'Property Recommendations', 'Lease Document AI', 'Tenant Chatbots'],
  },
};

const P1_TEXT: Record<string, string> = {
  'finance-fintech': 'Document processing, analytics, workflow automation',
  'retail-ecommerce': 'AI customer agents, recommendations, sales automation',
  'logistics-supply-chain': 'Predictive analytics, intelligent operations',
  healthcare: 'Administrative AI, scheduling, secure software',
  'education-edtech': 'AI learning assistants, assessments, LMS',
};

const P1_TITLE: Record<string, string> = {
  'logistics-supply-chain': 'Logistics & Supply Chain',
};

const P2_TITLE: Record<string, string> = {
  'legal-professional-services': 'Legal & Professional',
};

/** 3. Industry hub — P0 / P1 / P2 priority structure (scope §2) */
export function Sectors() {
  return (
    <section id="sectors" data-morph="1" data-shift="0" aria-labelledby="sec-title">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">Industries</span>
          <h2 id="sec-title">
            Depth in every industry, <span className="grad-text">not shallow coverage</span>
          </h2>
          <p>
            Each industry gets dedicated solutions, demonstrations and outcomes. We lead with Construction, Recruitment
            and Real Estate, where our workflows and products go deepest.
          </p>
        </div>
        <div className="pillars" data-reveal="">
          <span>
            <b>P0</b>Launch focus · deepest expertise
          </span>
          <span>
            <b>P1</b>High-priority growth sectors
          </span>
          <span>
            <b>P2</b>Expanding solution areas
          </span>
        </div>
        <div className="bento">
          {byPriority('P0').map((d) => {
            const c = P0_CARDS[d.slug];
            return (
              <a key={d.slug} href={industryUrl(d.slug)} className="card b-p0 tilt">
                <span className="more">
                  <Icon id="i-arrow-ur" />
                </span>
                <div className="c-ico">
                  <Icon id={d.icon} />
                </div>
                <span className="prio">P0 · Priority</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <div className="tags">
                  {c.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <span className="cta-link">
                  {d.primaryCta} <Icon id="i-arrow" />
                </span>
              </a>
            );
          })}
        </div>

        <div className="p1-grid">
          {byPriority('P1').map((d) => (
            <a key={d.slug} href={industryUrl(d.slug)} className="card p1">
              <span className="prio">P1</span>
              <Icon id={d.icon} />
              <h3>{P1_TITLE[d.slug] || d.short}</h3>
              <p>{P1_TEXT[d.slug]}</p>
            </a>
          ))}
        </div>

        <div className="card b-6 p2-row">
          <div style={{ maxWidth: 300 }}>
            <span className="prio">P2 · Expanding</span>
            <h3 style={{ marginTop: 12 }}>More industry solutions</h3>
            <p>Proven AI patterns applied to six more sectors.</p>
          </div>
          <div className="b6-list">
            {byPriority('P2').map((d) => (
              <a key={d.slug} href={industryUrl(d.slug)}>
                <Icon id={d.icon} />
                {P2_TITLE[d.slug] || d.short}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const CHALLENGES = [
  {
    lab: 'Construction & AEC',
    title: 'Hours lost checking models and searching specs',
    text: 'Repetitive BIM checks, scattered RFIs and slow progress reporting.',
    solTitle: 'BIM agents & engineering document AI',
    solText: 'Automated model checks, clash classification, and Q&A over drawings, specifications and RFIs, with source references.',
    aria: 'construction',
  },
  {
    lab: 'Recruitment & HR',
    title: 'Thousands of CVs, not enough recruiters',
    text: 'Slow screening, inconsistent shortlists and manual candidate follow-ups.',
    solTitle: 'AI recruitment agents & matching',
    solText: 'CV parsing, candidate ranking against defined requirements and structured preliminary interviews. Recruiters make the final call.',
    aria: 'recruitment',
  },
  {
    lab: 'Real Estate',
    title: 'Property inquiries that go cold overnight',
    text: "Leads arrive 24/7 across portals and WhatsApp, but agents can't respond instantly.",
    solTitle: 'Property inquiry & qualification agents',
    solText: 'Answer listing questions, recommend suitable properties, book viewings and update your CRM automatically.',
    aria: 'real estate',
  },
  {
    lab: 'Finance & FinTech',
    title: 'Invoices and records keyed in by hand',
    text: 'Slow approvals, errors and audit pressure across finance operations.',
    solTitle: 'Auditable document & invoice automation',
    solText: 'Extraction, validation and approval routing with human oversight. AI never makes regulated financial decisions on its own.',
    aria: 'finance',
  },
  {
    lab: 'Logistics',
    title: 'Shipment exceptions found too late',
    text: 'Delays, missing documents and reactive dispatch decisions.',
    solTitle: 'Predictive exception management',
    solText: 'Demand forecasting, shipment document intelligence and an operations assistant that suggests follow-up actions.',
    aria: 'logistics',
  },
  {
    lab: 'Healthcare',
    title: 'Admin work crowding out patient time',
    text: 'Scheduling, paperwork and phone queues overload front-office teams.',
    solTitle: 'Administrative AI assistants',
    solText: 'Appointment scheduling, admin automation and reporting. Administrative tools only, not clinical decision support.',
    aria: 'healthcare',
  },
];

/** 4. Business challenges — industry problem → AI solution flip cards */
export function Challenges() {
  return (
    <section id="challenges" data-morph="1.4" data-shift="0" aria-labelledby="ch-title">
      <div className="container">
        <div className="sec-head center">
          <span className="eyebrow">Business challenges</span>
          <h2 id="ch-title">
            Industry problems, <span className="grad-text">engineered solutions</span>
          </h2>
          <p>Hover or tap a challenge to see the AI solution we&apos;d apply to it.</p>
        </div>
        <div className="flip-grid">
          {CHALLENGES.map((c) => (
            <FlipCard key={c.lab} label={`Show solution for ${c.aria}`}>
              <div className="flip-face flip-front">
                <span className="lab">{c.lab}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span className="hint">
                  <Icon id="i-sparkle" style={{ width: 16, height: 16 }} />
                  Reveal solution
                </span>
              </div>
              <div className="flip-face flip-back">
                <span className="lab">Solution</span>
                <h3>{c.solTitle}</h3>
                <p>{c.solText}</p>
              </div>
            </FlipCard>
          ))}
        </div>
      </div>
    </section>
  );
}
