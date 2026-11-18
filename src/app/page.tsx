import IconSprite from '@/components/layout/IconSprite';
import Background from '@/components/layout/Background';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Assistant from '@/components/layout/Assistant';
import MotionController from '@/components/layout/MotionController';
import WebGLScene from '@/components/layout/WebGLScene';
import Icon from '@/components/ui/Icon';
import { About, Hero, IndustryMarquee } from '@/components/home/Hero';
import { Challenges, Sectors } from '@/components/home/Sectors';
import IndustryExplorer from '@/components/home/IndustryExplorer';
import DemoCenter from '@/components/home/DemoCenter';
import TechStack from '@/components/home/TechStack';
import Contact from '@/components/home/Contact';
import { Approach, Engagement, Faq, Insights, Outcomes, Products, Transparency, UseCases } from '@/components/home/Sections';
import { CONTACT, SITE_URL } from '@/content/site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#org`,
      name: 'MotionexAI',
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo.png`,
      email: CONTACT.email,
      description:
        'Global AI, SaaS and enterprise technology company engineering industry-specific AI agents, automation systems and SaaS platforms.',
      address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
      knowsAbout: ['AI Agents', 'AI Automation', 'Document Intelligence', 'SaaS Development', 'BIM Automation', 'AI Recruitment', 'Real Estate AI', 'Financial Automation'],
    },
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: 'MotionexAI', publisher: { '@id': `${SITE_URL}/#org` } },
  ],
};

/**
 * Homepage — follows the client's 12-section industry content structure:
 * Hero · Overview · Challenges · AI Solutions · Use Cases · Demonstrations · Technology ·
 * Outcomes · Implementation · Case studies (credibility) · FAQs · CTA.
 */
export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <IconSprite />
      <Background />
      <Header />

      <main id="main">
        <Hero />
        <IndustryMarquee />
        <About />
        <Sectors />
        <Challenges />
        <IndustryExplorer />
        <DemoCenter />
        <Products />
        <UseCases />
        <TechStack />
        <Outcomes />
        <Approach />
        <Transparency />
        <Engagement />
        <Insights />
        <Faq />
        <Contact />
      </main>

      <Footer />
      <Assistant />
      <div className="m-cta">
        <a href="#contact" className="btn btn-primary">
          Discuss Your Project <Icon id="i-arrow" />
        </a>
      </div>

      <MotionController />
      <WebGLScene />
    </>
  );
}
