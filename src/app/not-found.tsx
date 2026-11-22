import Icon from '@/components/ui/Icon';

export const metadata = { title: 'Page not found | MotionexAI', robots: { index: false } };

export default function NotFound() {
  return (
    <main id="main" className="nf" data-morph="0" data-shift="1">
      <div className="container">
        <span className="eyebrow" data-hero="">
          Error 404
        </span>
        <h1 className="grad-text" data-hero="">
          404
        </h1>
        <p className="ph-lead" style={{ margin: '18px auto 0' }} data-hero="">
          This page does not exist or has moved. Try one of these instead.
        </p>
        <div className="hero-ctas" style={{ justifyContent: 'center' }} data-hero="">
          <a href="/" className="btn btn-primary">
            Homepage <Icon id="i-arrow" />
          </a>
          <a href="/industries/" className="btn btn-ghost">
            Industries
          </a>
          <a href="/services/" className="btn btn-ghost">
            Solutions
          </a>
          <a href="/contact/" className="btn btn-ghost">
            Contact
          </a>
        </div>
      </div>
    </main>
  );
}
