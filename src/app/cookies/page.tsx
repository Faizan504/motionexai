import LegalPage from '@/components/page/LegalPage';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Cookie Policy | MotionexAI',
  description: 'Which cookies and similar technologies the MotionexAI website uses.',
  path: '/cookies/',
});

export default function CookiesPage() {
  return (
    <LegalPage
      name="Cookies"
      path="/cookies/"
      title="Cookie Policy"
      lead="Which cookies and similar technologies this website uses, and why."
      updated="21 November 2026"
      body={[
        { h: 'Current use' },
        { p: 'This website does not set advertising or third-party tracking cookies. It works without cookies for browsing, demos and forms.' },
        { h: 'Analytics (planned)' },
        { p: 'If we add analytics (for example Google Analytics 4) we will update this policy and ask for your consent where required before any non-essential cookies are set.' },
        { h: 'Managing cookies' },
        { p: 'You can block or delete cookies in your browser settings at any time.' },
      ]}
    />
  );
}
