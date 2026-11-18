import IconSprite from '@/components/layout/IconSprite';

export const metadata = { title: 'Page coming soon | MotionexAI', robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <IconSprite />
      <div className="bg-orbs" aria-hidden="true">
        <span></span>
        <span></span>
      </div>
      <div className="bg-grid" aria-hidden="true"></div>
      <main className="container" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div className="sec-head center" style={{ margin: 0 }}>
          <span className="eyebrow">Coming soon</span>
          <h2>
            This page is <span className="grad-text">in production</span>
          </h2>
          <p>Industry, solution and product pages are being published in the next phase of the website roadmap.</p>
          <a href="/" className="btn btn-primary" style={{ marginTop: 28 }}>
            Back to homepage
          </a>
        </div>
      </main>
    </>
  );
}
