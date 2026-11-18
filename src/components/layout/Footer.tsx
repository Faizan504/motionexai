import Icon from '@/components/ui/Icon';
import NewsletterForm from '@/components/layout/NewsletterForm';
import { INDUSTRIES, industryUrl } from '@/content/industries';
import { CONTACT } from '@/content/site';

const label = (d: { slug: string; short: string }) =>
  d.slug === 'logistics-supply-chain' ? 'Logistics & Supply Chain' : d.short;

export default function Footer() {
  const first = INDUSTRIES.slice(0, 7);
  const rest = INDUSTRIES.slice(7);

  return (
    <footer>
      <div className="container">
        <div className="f-top">
          <div className="f-brand">
            <a href="/" className="logo">
              <svg>
                <use href="#i-logo" />
              </svg>
              MotionexAI
            </a>
            <p>Industry-specific AI agents, automation systems and SaaS platforms, engineered in Dubai for businesses worldwide.</p>
            <NewsletterForm />
          </div>
          <div className="f-col">
            <h4>Priority industries</h4>
            <ul>
              {first.map((d) => (
                <li key={d.slug}>
                  <a href={industryUrl(d.slug)}>{label(d)}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="f-col">
            <h4>More industries</h4>
            <ul>
              {rest.map((d) => (
                <li key={d.slug}>
                  <a href={industryUrl(d.slug)}>{label(d)}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="f-col">
            <h4>Solutions</h4>
            <ul>
              <li><a href="/services/ai-agents/">AI Agents</a></li>
              <li><a href="/services/ai-automation/">AI Automation</a></li>
              <li><a href="/services/generative-ai/">Document Intelligence</a></li>
              <li><a href="/services/saas-development/">SaaS Development</a></li>
              <li><a href="/products/careerflix/">CareerFlix</a></li>
              <li><a href="/demos/">Demo Center</a></li>
            </ul>
          </div>
          <div className="f-col">
            <h4>Company</h4>
            {/* [VERIFY] Replace with verified office address, email and phone */}
            <ul>
              <li><a href="/about/">About</a></li>
              <li><a href="/insights/">Insights</a></li>
              <li><a href="/careers/">Careers</a></li>
              <li><a href="/contact/">{CONTACT.location}</a></li>
              <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
              <li><a href="/book-consultation/">Book a consultation</a></li>
            </ul>
          </div>
        </div>
        <div className="f-big" aria-hidden="true">MOTIONEXAI</div>
        <div className="f-bot">
          <span>© {new Date().getFullYear()} MotionexAI. All rights reserved.</span>
          <nav aria-label="Legal">
            <a href="/privacy/">Privacy</a>
            <a href="/terms/">Terms</a>
            <a href="/cookies/">Cookies</a>
            <a href="/sitemap.xml">Sitemap</a>
          </nav>
          <div className="socials">
            {/* [VERIFY] Add official social profile URLs */}
            <a href="#" aria-label="LinkedIn"><Icon id="i-in" /></a>
            <a href="#" aria-label="X"><Icon id="i-xs" /></a>
            <a href="#" aria-label="GitHub"><Icon id="i-gh" /></a>
            <a href="#" aria-label="WhatsApp"><Icon id="i-wa" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
