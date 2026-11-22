import LegalPage from '@/components/page/LegalPage';
import { CONTACT } from '@/content/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Privacy Policy | MotionexAI',
  description: 'How MotionexAI collects, uses and protects personal information submitted through this website.',
  path: '/privacy/',
});

export default function PrivacyPage() {
  return (
    <LegalPage
      name="Privacy"
      path="/privacy/"
      title="Privacy Policy"
      lead="How we collect, use and protect information you share with us through this website."
      updated="21 November 2026"
      body={[
        { h: 'Who we are' },
        { p: `MotionexAI ("we", "us") is based in ${CONTACT.location}. This policy applies to information collected through motionexai.com and its forms.` },
        { h: 'Information we collect' },
        { list: ['Contact details you submit in forms: name, business email, company and role.', 'Project information you choose to share: industry, service interest, timeline, budget range and requirements.', 'Technical data needed to operate the site, such as server logs.'] },
        { p: 'We ask you not to submit confidential business data or sensitive personal information through website forms.' },
        { h: 'How we use it' },
        { list: ['To respond to inquiries, consultation requests and applications.', 'To send insights you have subscribed to (you can unsubscribe at any time).', 'To improve our website and services.'] },
        { h: 'AI and your data' },
        { p: 'Inquiries and project information submitted through this website are not used to train AI models.' },
        { h: 'Sharing' },
        { p: 'We do not sell personal information. We share it only with service providers that help us operate (for example CRM and email tools) under appropriate agreements, or where required by law.' },
        { h: 'Retention' },
        { p: 'We keep inquiry data only as long as needed for the purposes above or as required by law.' },
        { h: 'Your rights' },
        { p: `You can request access to, correction of or deletion of your personal information by emailing ${CONTACT.email}.` },
      ]}
    />
  );
}
