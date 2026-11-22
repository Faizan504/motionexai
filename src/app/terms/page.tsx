import LegalPage from '@/components/page/LegalPage';
import { CONTACT } from '@/content/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Terms of Use | MotionexAI',
  description: 'Terms governing the use of the MotionexAI website, demos and content.',
  path: '/terms/',
});

export default function TermsPage() {
  return (
    <LegalPage
      name="Terms"
      path="/terms/"
      title="Terms of Use"
      lead="The terms that apply when you use this website, its demonstrations and content."
      updated="21 November 2026"
      body={[
        { h: 'Use of the website' },
        { p: 'You may use this website for lawful purposes to learn about MotionexAI and its services. You agree not to misuse the site, its forms or its demonstrations.' },
        { h: 'Demonstrations' },
        { p: 'Demos on this site are illustrative concepts built on synthetic data. They are not completed customer projects and do not represent guaranteed results.' },
        { h: 'Product availability' },
        { p: 'Product statuses (Live, Beta, In development, Upcoming) are provided for information and may change. Features of products not yet generally available may differ at launch.' },
        { h: 'Content' },
        { p: 'Website content is provided for general information and does not constitute professional, legal or financial advice. Engagements are governed by separate written agreements.' },
        { h: 'Intellectual property' },
        { p: 'The site, its design and content are owned by MotionexAI unless stated otherwise.' },
        { h: 'Contact' },
        { p: `Questions about these terms: ${CONTACT.email}.` },
      ]}
    />
  );
}
