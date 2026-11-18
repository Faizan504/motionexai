import Icon from '@/components/ui/Icon';
import { INDUSTRIES } from '@/content/industries';

/** 1. Hero — industry-specific headline, benefits and CTA */
export function Hero() {
  return (
    <section className="hero" id="top" data-morph="0" data-shift="1" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div>
          <span className="pill" data-hero="">
            <b>NEW</b> Industry AI demos: BIM, hiring, property, finance &amp; more
          </span>
          <h1 id="hero-title">
            <span className="line">
              <span className="w">AI</span> <span className="w">Engineered</span> <span className="w">for</span>
            </span>
            <span className="line">
              <span className="w grad-text">Your&nbsp;Industry</span>
            </span>
          </h1>
          <p className="hero-sub" data-hero="">
            <strong>Industry-specific AI agents, automation systems and SaaS platforms</strong> that plug into real
            business operations, from construction and recruitment to real estate, finance and logistics.
          </p>
          <div className="hero-ctas" data-hero="">
            <a href="#industries" className="btn btn-primary">
              Explore Industry Solutions <Icon id="i-arrow" />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Discuss Your Project
            </a>
          </div>
          <div className="hero-trust" data-hero="">
            <div>
              <b>
                <span data-count={INDUSTRIES.length}>0</span>
              </b>
              <span>Industry solution areas</span>
            </div>
            <div>
              <b>
                <span data-count="4">0</span>-step
              </b>
              <span>Pilot-first delivery</span>
            </div>
            <div>
              <b>HITL</b>
              <span>Human review built in</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="float-card glass fc-1" data-depth="0.6">
            <div className="fc-t">
              <i></i>BIM Issue Assistant · demo
            </div>
            <div className="fc-steps">
              <div className="ok">Clash #214 → Structural vs MEP</div>
              <div className="ok">Priority classified: High</div>
              <div className="run">Drafting coordination report…</div>
              <div>Awaiting BIM manager review</div>
            </div>
          </div>
          <div className="float-card glass fc-2" data-depth="1.1">
            <div className="fc-t">Candidate match · demo</div>
            <div className="fc-ring">
              <svg viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="4" />
                <circle
                  className="ring-p"
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="url(#logoGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="94.2"
                  strokeDashoffset="94.2"
                />
              </svg>
              <div>
                <b>92%</b>
                <br />
                <small>vs job requirements</small>
              </div>
            </div>
          </div>
          <div className="float-card glass fc-3" data-depth="0.8">
            <div className="fc-t">Property AI advisor · demo</div>
            <small>Inquiries qualified · viewings booked</small>
            <div className="fc-bars">
              {[40, 65, 50, 85, 60, 95, 70, 100].map((h, i) => (
                <span key={i} style={{ height: `${h}%` }}></span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-hint" aria-hidden="true">
        <i></i>SCROLL
      </div>
    </section>
  );
}

const MARQUEE = [
  'Construction & AEC',
  'Recruitment & HR',
  'Real Estate',
  'Finance & FinTech',
  'Retail & E-commerce',
  'Logistics',
  'Healthcare',
  'Education',
  'Manufacturing',
  'Hospitality',
  'Legal',
  'Insurance',
  'Telecom',
  'Startups & SaaS',
];

export function IndustryMarquee() {
  return (
    <div className="marquee-wrap" aria-label="Industries we serve">
      <p className="marquee-label">AI solutions engineered for {INDUSTRIES.length} industries</p>
      <div className="marquee">
        {[0, 1].map((k) => (
          <div className="marquee-track" key={k} aria-hidden={k === 1 ? true : undefined}>
            {MARQUEE.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Splits text into word spans for the scrubbed word-by-word reveal. */
function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\s+)/).map((w, i) => (w.trim() ? <span className="rw" key={i}>{w}</span> : w))}
    </>
  );
}

/** 2. Positioning — the four questions every industry page answers (scope §12) */
export function About() {
  return (
    <section id="about" data-morph="0.6" data-shift="0" aria-labelledby="about-title">
      <div className="container">
        <span className="eyebrow">Who we are</span>
        <h2 id="about-title" className="sr-only">
          About MotionexAI
        </h2>
        <p className="intro-text" data-words="" style={{ marginTop: 22 }}>
          <Words text="MotionexAI doesn't just provide AI tools. We engineer " />
          <span className="hl">
            <Words text="industry-specific AI agents" />
          </span>
          <Words text=", " />
          <span className="hl">
            <Words text="automation systems" />
          </span>
          <Words text=" and " />
          <span className="hl">
            <Words text="SaaS platforms" />
          </span>
          <Words text=" that integrate into real business operations." />
        </p>
        <div className="intro-cols four">
          <div className="intro-col glass" data-reveal="">
            <span className="num">01 · The problem</span>
            <h3>What&apos;s slowing you down?</h3>
            <p>We start with the operational pain points of your industry, not with a model.</p>
          </div>
          <div className="intro-col glass" data-reveal="">
            <span className="num">02 · The AI solution</span>
            <h3>What addresses it?</h3>
            <p>Agents, document AI, automation or SaaS, matched to that specific challenge.</p>
          </div>
          <div className="intro-col glass" data-reveal="">
            <span className="num">03 · In practice</span>
            <h3>How would it work?</h3>
            <p>Realistic workflows and live demos on synthetic data, with human review built in.</p>
          </div>
          <div className="intro-col glass" data-reveal="">
            <span className="num">04 · Next step</span>
            <h3>What should you do?</h3>
            <p>A focused consultation, then a measured pilot before any full rollout.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
