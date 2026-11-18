import Icon from '@/components/ui/Icon';
import type { IconId } from '@/content/types';

/* ============================================================
   PROPRIETARY PRODUCTS (pinned horizontal scroll)
   [VERIFY] product statuses: live / beta / under development / upcoming
   ============================================================ */
export function Products() {
  return (
    <section className="products" id="products" data-morph="2.6" data-shift="0" data-dim="0.35" aria-labelledby="pr-title">
      <div className="products-pin">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">Proprietary products</span>
            <h2 id="pr-title">
              Our own platforms, <span className="grad-text">built for industries</span>
            </h2>
            <p>Products we build and run ourselves, each with an accurate availability status.</p>
          </div>
        </div>
        <div className="p-track">
          <article className="p-card glass">
            <div className="p-top">
              <div>
                <h3>CareerFlix</h3>
                <p>
                  AI-powered recruitment: candidate intelligence, AI interviews, assessments and hiring automation. Powers our
                  Recruitment &amp; HR solutions.
                </p>
              </div>
              <span className="status st-live">Live</span>
            </div>
            <div className="mock" aria-hidden="true">
              <div className="mock-bar">
                <i></i>
                <i></i>
                <i></i>
                <span></span>
              </div>
              <div className="mock-row">
                <div className="mock-kpi"><small>Candidates</small><b>746</b></div>
                <div className="mock-kpi"><small>Shortlisted</small><b>38</b></div>
                <div className="mock-kpi"><small>Interviews</small><b>12</b></div>
              </div>
              <div className="mock-list">
                <div><i></i>Senior BIM Engineer · shortlisted<em>96%</em></div>
                <div><i></i>HR Business Partner · AI interview done<em>91%</em></div>
              </div>
            </div>
            <div className="p-feats">
              <span>Resume intelligence</span>
              <span>Candidate matching</span>
              <span>AI interviews</span>
              <span>Assessments</span>
            </div>
            <div className="p-foot">
              <a href="/products/careerflix/" className="link">
                View product <Icon id="i-arrow" />
              </a>
              <small>Recruitment &amp; HR</small>
            </div>
          </article>

          <article className="p-card glass">
            <div className="p-top">
              <div>
                <h3>Rewards &amp; Advocacy</h3>
                <p>Multi-tenant advocacy campaigns, automated activity verification, rewards management and engagement analytics.</p>
              </div>
              <span className="status st-beta">Beta</span>
            </div>
            <div className="mock" aria-hidden="true">
              <div className="mock-bar">
                <i></i>
                <i></i>
                <i></i>
                <span></span>
              </div>
              <div className="mock-chart">
                <svg viewBox="0 0 300 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#8b5cf6" stopOpacity=".5" />
                      <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 95 C 30 80, 50 90, 80 70 S 130 60, 160 50 S 220 40, 250 25 S 290 15, 300 10 V120 H0Z" fill="url(#ag1)" />
                  <path
                    className="draw"
                    d="M0 95 C 30 80, 50 90, 80 70 S 130 60, 160 50 S 220 40, 250 25 S 290 15, 300 10"
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
              <div className="mock-row">
                <div className="mock-kpi"><small>Campaigns</small><b>38</b></div>
                <div className="mock-kpi"><small>Advocates</small><b>12.4k</b></div>
                <div className="mock-kpi"><small>Verified</small><b>98%</b></div>
              </div>
            </div>
            <div className="p-feats">
              <span>Multi-tenant</span>
              <span>Activity verification</span>
              <span>Rewards engine</span>
            </div>
            <div className="p-foot">
              <a href="/products/rewards-advocacy/" className="link">
                View product <Icon id="i-arrow" />
              </a>
              <small>Retail · Marketing</small>
            </div>
          </article>

          <article className="p-card glass">
            <div className="p-top">
              <div>
                <h3>Remote Workspace</h3>
                <p>Secure remote workspace access, attendance, productivity visibility, IT support and workforce operations.</p>
              </div>
              <span className="status st-dev">In development</span>
            </div>
            <div className="mock" aria-hidden="true">
              <div className="mock-bar">
                <i></i>
                <i></i>
                <i></i>
                <span></span>
              </div>
              <div className="mock-row">
                <div className="mock-kpi"><small>Online now</small><b>214</b></div>
                <div className="mock-kpi"><small>Secure sessions</small><b>100%</b></div>
                <div className="mock-kpi"><small>Open tickets</small><b>6</b></div>
              </div>
              <div className="mock-list">
                <div><i></i>Dubai team · 48 active<em>● online</em></div>
                <div><i></i>Remote engineering · 112 active<em>● online</em></div>
              </div>
            </div>
            <div className="p-feats">
              <span>Secure access</span>
              <span>Attendance</span>
              <span>IT support</span>
            </div>
            <div className="p-foot">
              <a href="/products/remote-workspace/" className="link">
                Join waitlist <Icon id="i-arrow" />
              </a>
              <small>Workforce management</small>
            </div>
          </article>

          <article className="p-card future">
            <span className="status st-soon">Upcoming</span>
            <h3 style={{ fontSize: 30, marginTop: 20 }}>Industry AI Products</h3>
            <p style={{ color: 'var(--muted)', maxWidth: 380 }}>
              New AI products grow out of our industry work: BIM assistants, property advisors and more. Partner with us to
              co-build the next one.
            </p>
            <a href="/partnerships/" className="btn btn-ghost" style={{ marginTop: 20 }}>
              Become a launch partner <Icon id="i-arrow" />
            </a>
          </article>
        </div>
        <div className="p-progress" aria-hidden="true">
          <span>01</span>
          <div className="bar">
            <i></i>
          </div>
          <span>04</span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   AI USE CASES (realistic workflows)
   ============================================================ */
const USE_CASES = [
  {
    href: '/industries/construction-aec/',
    bg: 'radial-gradient(circle at 30% 40%,rgba(79,140,255,.6),transparent 50%),radial-gradient(circle at 70% 70%,rgba(139,92,246,.6),transparent 50%),#0a1028',
    chain: ['Spec upload', 'Clause extraction', 'Q&A + citations', 'Engineer review'],
    ind: 'Construction · AEC',
    title: 'Answering specification questions in minutes, not hours',
    text: 'Engineering Document AI searches drawings, specs and RFIs and answers project questions with source references.',
    kpis: ['Time to answer RFIs', 'Report prep hours'],
  },
  {
    href: '/industries/recruitment-hr/',
    bg: 'radial-gradient(circle at 60% 30%,rgba(46,230,246,.55),transparent 50%),radial-gradient(circle at 25% 75%,rgba(79,140,255,.6),transparent 50%),#0a1028',
    chain: ['CV import', 'Parsing', 'Matching', 'Recruiter review'],
    ind: 'Recruitment · HR',
    title: 'Automating candidate screening',
    text: 'Resume intelligence and candidate matching rank applicants against defined requirements. Recruiters approve every shortlist.',
    kpis: ['Time-to-shortlist', 'Screening hours'],
  },
  {
    href: '/industries/real-estate/',
    bg: 'radial-gradient(circle at 40% 60%,rgba(228,92,240,.45),transparent 50%),radial-gradient(circle at 75% 30%,rgba(79,140,255,.6),transparent 50%),#0a1028',
    chain: ['Inquiry', 'Qualification', 'Recommendation', 'Viewing booked'],
    ind: 'Real Estate',
    title: 'Qualifying property leads around the clock',
    text: 'An AI property advisor answers listing questions, recommends units and books viewings straight into the CRM.',
    kpis: ['First-response time', 'Viewings booked'],
  },
];

export function UseCases() {
  return (
    <section id="cases" data-morph="3" data-shift="0" aria-labelledby="cs-title">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">AI use cases</span>
          <h2 id="cs-title">
            How it works <span className="grad-text">in practice</span>
          </h2>
          <p>
            Realistic workflow examples and the outcomes we measure. Verified case studies are published only with client
            approval and evidence.
          </p>
        </div>
        <div className="cases">
          {USE_CASES.map((u) => (
            <a href={u.href} className="case glass" data-reveal="" key={u.title}>
              <div className="case-vis">
                <span className="badge">ILLUSTRATIVE USE CASE</span>
                <div className="cv" style={{ background: u.bg }}></div>
                <div className="uc-chain">
                  {u.chain.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
              </div>
              <div className="case-body">
                <span className="ind">{u.ind}</span>
                <h3>{u.title}</h3>
                <p>{u.text}</p>
                <div className="case-res">
                  {u.kpis.map((k) => (
                    <div key={k}>
                      <b>KPI</b>
                      <span>{k}</span>
                    </div>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   BUSINESS OUTCOMES (KPIs measured, not promised)
   ============================================================ */
const OUTCOMES: { icon: IconId; title: string; text: string }[] = [
  { icon: 'i-clock', title: 'Turnaround', text: 'Time to process a document, inquiry or request' },
  { icon: 'i-zap', title: 'Manual effort', text: 'Hours of repetitive work removed per week' },
  { icon: 'i-msg', title: 'Response time', text: 'Speed of first reply to customers and candidates' },
  { icon: 'i-target', title: 'Conversion', text: 'Qualified leads, viewings or hires per period' },
];

export function Outcomes() {
  return (
    <section id="outcomes" data-morph="3.4" data-shift="0" aria-labelledby="oc-title">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">Business outcomes</span>
          <h2 id="oc-title">
            Outcomes measured, <span className="grad-text">not promised</span>
          </h2>
          <p>
            We agree the KPIs and a baseline during discovery, then report results from the pilot. No guaranteed percentages
            before we&apos;ve seen your data.
          </p>
        </div>
        <div className="stats glass kpis" data-reveal="">
          {OUTCOMES.map((o) => (
            <div className="stat" key={o.title}>
              <Icon id={o.icon} />
              <b>{o.title}</b>
              <span>{o.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   IMPLEMENTATION APPROACH
   ============================================================ */
const STEPS = [
  { n: '01', title: 'Discovery', text: 'Map your workflow, data, systems and success KPIs.', items: ['Requirements analysis', 'Baseline & KPI agreement'] },
  { n: '02', title: 'Pilot', text: 'A focused, low-risk pilot on one real workflow.', items: ['Working prototype', 'Measured against baseline'] },
  { n: '03', title: 'Deployment', text: 'Integrate securely into your production systems.', items: ['Security & access controls', 'Team training & handover'] },
  { n: '04', title: 'Optimization', text: 'Monitor, evaluate and improve continuously.', items: ['Accuracy & usage reviews', 'Scale to new workflows'] },
];

export function Approach() {
  return (
    <section id="approach" data-morph="3.5" data-shift="0" aria-labelledby="ap-title">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">Implementation approach</span>
          <h2 id="ap-title">
            Pilot first, <span className="grad-text">then scale with confidence</span>
          </h2>
          <p>A proven four-step path from your first conversation to a measured, production-ready AI solution.</p>
        </div>
        <div className="steps four">
          <div className="steps-line" aria-hidden="true">
            <svg preserveAspectRatio="none">
              <line className="base" x1="0" y1="2" x2="100%" y2="2" />
              <line className="prog" x1="0" y1="2" x2="100%" y2="2" />
            </svg>
          </div>
          {STEPS.map((s) => (
            <div className="step-i" key={s.n}>
              <span className="dot"></span>
              <span className="n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul>
                {s.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CREDIBILITY: how we label our work (scope §9)
   ============================================================ */
const LABELS: { icon: IconId; title: string; text: string }[] = [
  { icon: 'i-check', title: 'Available solutions', text: 'Capabilities we deliver today, with defined scope and deliverables.' },
  { icon: 'i-code', title: 'Custom development', text: 'Solutions we design and build after analyzing your requirements.' },
  { icon: 'i-sparkle', title: 'Demonstration concepts', text: 'Illustrative prototypes on synthetic data, not completed customer projects.' },
  { icon: 'i-layers', title: 'Proprietary products', text: 'Our own platforms, always shown with their real availability status.' },
  { icon: 'i-chart', title: 'Verified case studies', text: 'Real implementations published only with evidence and client approval.' },
  { icon: 'i-shield', title: 'Limits stated openly', text: 'We explain model limitations, human review, privacy controls and deployment options.' },
];

export function Transparency() {
  return (
    <section id="why" data-morph="3.7" data-shift="0" aria-labelledby="wy-title">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">Transparency</span>
          <h2 id="wy-title">
            Clear about what&apos;s real, <span className="grad-text">what&apos;s possible</span>
          </h2>
          <p>Every solution on our site carries one of these labels, so you always know what you&apos;re looking at.</p>
        </div>
        <div className="why" data-reveal="">
          {LABELS.map((l) => (
            <div className="why-i" key={l.title}>
              <Icon id={l.icon} />
              <h3>{l.title}</h3>
              <p>{l.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ENGAGEMENT MODELS
   ============================================================ */
const icoBox = { width: 48, height: 48, borderRadius: 14, display: 'grid', placeItems: 'center' } as const;

export function Engagement() {
  return (
    <section id="engagement" data-morph="3.8" data-shift="0" aria-labelledby="en-title">
      <div className="container">
        <div className="sec-head center">
          <span className="eyebrow">Engagement models</span>
          <h2 id="en-title">
            Start small, <span className="grad-text">grow with us</span>
          </h2>
          <p>Flexible models with clear governance, confidentiality and full IP ownership.</p>
        </div>
        <div className="eng">
          <div className="eng-card glass">
            <div className="c-ico" style={{ ...icoBox, background: 'rgba(79,140,255,.15)', color: 'var(--blue)' }}>
              <Icon id="i-target" />
            </div>
            <h3>AI pilot project</h3>
            <p className="for">One industry workflow, a defined scope and measured KPIs. The fastest way to prove value.</p>
            <ul>
              <li><Icon id="i-check" />Discovery &amp; KPI baseline</li>
              <li><Icon id="i-check" />Working pilot on real workflow</li>
              <li><Icon id="i-check" />Results report &amp; roadmap</li>
            </ul>
            <a href="#contact" className="btn btn-ghost" data-source="Engagement · AI pilot">
              Start a pilot
            </a>
          </div>
          <div className="eng-card glass feat">
            <span className="pop">MOST POPULAR</span>
            <div className="c-ico" style={{ ...icoBox, background: 'var(--grad)', color: '#fff' }}>
              <Icon id="i-users" />
            </div>
            <h3>Dedicated AI team</h3>
            <p className="for">An embedded squad of AI engineers, developers, QA and DevOps working as your team.</p>
            <ul>
              <li><Icon id="i-check" />Scale up or down monthly</li>
              <li><Icon id="i-check" />Your roadmap, our engineers</li>
              <li><Icon id="i-check" />Weekly reporting &amp; demos</li>
              <li><Icon id="i-check" />Industry domain expertise</li>
            </ul>
            <a href="#contact" className="btn btn-primary" data-source="Engagement · Dedicated team">
              Build my team <Icon id="i-arrow" />
            </a>
          </div>
          <div className="eng-card glass">
            <div className="c-ico" style={{ ...icoBox, background: 'rgba(139,92,246,.15)', color: 'var(--violet)' }}>
              <Icon id="i-clock" />
            </div>
            <h3>Platform &amp; retainer</h3>
            <p className="for">Full SaaS platforms plus ongoing evolution, monitoring and AI optimization.</p>
            <ul>
              <li><Icon id="i-check" />End-to-end SaaS build</li>
              <li><Icon id="i-check" />SLA-backed support</li>
              <li><Icon id="i-check" />Continuous improvement</li>
            </ul>
            <a href="#contact" className="btn btn-ghost" data-source="Engagement · Platform">
              Discuss a platform
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   INSIGHTS (industry content clusters, scope §6)
   ============================================================ */
export function Insights() {
  return (
    <section id="insights" data-morph="3.8" data-shift="0" aria-labelledby="in-title">
      <div className="container">
        <div
          className="sec-head"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: 'none', gap: 20, flexWrap: 'wrap' }}
        >
          <div style={{ maxWidth: 640 }}>
            <span className="eyebrow">Insights</span>
            <h2 id="in-title">
              Industry AI, <span className="grad-text">explained by engineers</span>
            </h2>
          </div>
          <a href="/insights/" className="btn btn-ghost">
            All insights <Icon id="i-arrow" />
          </a>
        </div>
        <div className="ins">
          <a href="/insights/how-ai-recruitment-agents-work/" className="post glass" data-reveal="">
            <div className="post-img">
              <div
                className="pi"
                style={{
                  background:
                    'radial-gradient(circle at 70% 30%,rgba(46,230,246,.5),transparent 45%),radial-gradient(circle at 20% 80%,rgba(139,92,246,.6),transparent 50%),linear-gradient(135deg,#0b1430,#160c33)',
                }}
              ></div>
            </div>
            <div className="post-body">
              <div className="post-meta">
                <b>Recruitment &amp; HR</b>
                <span>Service guide</span>
              </div>
              <h3>How AI recruitment agents work, from sourcing to shortlist</h3>
              <p>What an AI hiring agent actually does, where recruiters stay in control, and how to measure it.</p>
            </div>
          </a>
          <a href="/insights/bim-automation-ai-agents/" className="post glass" data-reveal="">
            <div className="post-img">
              <div
                className="pi"
                style={{ background: 'radial-gradient(circle at 30% 40%,rgba(79,140,255,.6),transparent 50%),linear-gradient(135deg,#0b1430,#0c2333)' }}
              ></div>
            </div>
            <div className="post-body">
              <div className="post-meta">
                <b>Construction &amp; AEC</b>
                <span>Technical</span>
              </div>
              <h3>Where AI agents fit in BIM coordination workflows</h3>
            </div>
          </a>
          <a href="/insights/ai-recruitment-software-vs-ats/" className="post glass" data-reveal="">
            <div className="post-img">
              <div
                className="pi"
                style={{ background: 'radial-gradient(circle at 60% 60%,rgba(228,92,240,.45),transparent 50%),linear-gradient(135deg,#120d2c,#0b1430)' }}
              ></div>
            </div>
            <div className="post-body">
              <div className="post-meta">
                <b>Recruitment &amp; HR</b>
                <span>Comparison</span>
              </div>
              <h3>AI recruitment software vs traditional ATS</h3>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ
   ============================================================ */
export const FAQS = [
  {
    q: 'Which industries do you build AI solutions for?',
    a: 'Fourteen sectors, led by Construction & AEC, Recruitment & HR and Real Estate, followed by Finance, Retail, Logistics, Healthcare and Education. We also serve Manufacturing, Hospitality, Legal, Insurance, Telecom and Startups & SaaS.',
  },
  {
    q: 'Are the demos on this site real customer projects?',
    a: 'No. Demonstrations are illustrative concepts built on synthetic data. Verified case studies are published separately, only with evidence and client approval.',
  },
  {
    q: 'Does your AI make financial, hiring or clinical decisions?',
    a: "No. Our systems assist people and route critical outputs for human review. Finance tools don't make regulated decisions on their own, and healthcare tools are administrative, not clinical decision support.",
  },
  {
    q: 'Can it integrate with our CRM, ATS, ERP or BIM tools?',
    a: "Integration options are confirmed during discovery, once we've reviewed your systems, APIs and data. We design each integration to your security and access requirements.",
  },
  {
    q: 'How does a project start, and how long does a pilot take?',
    a: 'It starts with a discovery consultation to map one workflow and agree KPIs. Pilot length depends on scope and data readiness; we confirm a timeline after discovery.',
  },
  {
    q: 'Is our data used to train AI models?',
    a: 'No. Customer inquiries and confidential project data are never used to train AI models without explicit authorization.',
  },
];

export function Faq() {
  return (
    <section id="faq" data-morph="3.8" data-shift="0" aria-labelledby="fq-title">
      <div className="container faq-wrap">
        <div className="sec-head" style={{ margin: 0 }}>
          <span className="eyebrow">FAQs</span>
          <h2 id="fq-title">
            Questions, <span className="grad-text">answered</span>
          </h2>
          <p>Technical and commercial answers. For anything industry-specific, ask our assistant or an engineer.</p>
          <a href="#contact" className="btn btn-ghost" style={{ marginTop: 28 }}>
            Talk to an expert
          </a>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <details className="faq glass" open={i === 0} key={f.q}>
              <summary>
                {f.q}
                <span className="pm" aria-hidden="true"></span>
              </summary>
              <div className="ans">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
