import Icon from '@/components/ui/Icon';
import JsonLd from '@/components/ui/JsonLd';
import PageHero from '@/components/page/PageHero';
import LeadForm from '@/components/page/LeadForm';
import Contact from '@/components/home/Contact';
import { CONTACT } from '@/content/site';
import { ORG_ID, abs, breadcrumbLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Contact MotionexAI | Discuss Your AI Project',
  description: 'Contact MotionexAI in Dubai, UAE to discuss AI agents, automation, document AI or SaaS development. A solutions engineer replies within one business day.',
  path: '/contact/',
});

export default function ContactPage() {
  const crumbs = [{ name: 'Contact', path: '/contact/' }];
  return (
    <main id="main">
      <JsonLd graph={[breadcrumbLd(crumbs), { '@type': 'ContactPage', url: abs('/contact/'), about: { '@id': ORG_ID } }]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Contact"
        title="Let's talk about"
        highlight="your workflow"
        lead="Use the project inquiry for a scoped brief, or send a quick message. A solutions engineer replies within one business day."
        ctas={[
          { label: 'Start a project inquiry', href: '#contact' },
          { label: 'Book a consultation', href: '/book-consultation/', ghost: true },
        ]}
      />

      <Contact page="Contact page" />

      <section className="page-sec" data-morph="4" data-shift="0" aria-labelledby="msg-title">
        <div className="container split">
          <div>
            <span className="eyebrow">Quick message</span>
            <h2 id="msg-title" style={{ fontSize: 'clamp(28px,3.4vw,42px)', margin: '16px 0 26px' }}>
              Not a project yet? <span className="grad-text">Just ask.</span>
            </h2>
            {/* [VERIFY] Confirm office address, phone and WhatsApp before launch */}
            <div className="kv">
              <div>
                <Icon id="i-mail" />
                <span>
                  <b>Email</b>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </span>
              </div>
              <div>
                <Icon id="i-pin" />
                <span>
                  <b>Office</b>
                  <span>{CONTACT.location} · serving clients worldwide</span>
                </span>
              </div>
              <div>
                <Icon id="i-clock" />
                <span>
                  <b>Response time</b>
                  <span>Within one business day (Mon–Fri, GST)</span>
                </span>
              </div>
              <div>
                <Icon id="i-users" />
                <span>
                  <b>Partnerships & careers</b>
                  <span>
                    <a href="/partnerships/">Partner with us</a> · <a href="/careers/">Join the team</a>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <LeadForm
            type="contact"
            title="Send a message"
            source="Contact page · Quick message"
            submitLabel="Send message"
            fields={[
              { name: 'name', label: 'Full name', type: 'text', required: true, autoComplete: 'name', half: true },
              { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email', half: true },
              { name: 'topic', label: 'Topic', type: 'select', options: ['General question', 'Press & media', 'Partnership', 'Support', 'Other'], defaultValue: 'General question' },
              { name: 'message', label: 'Message', type: 'textarea', required: true },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
