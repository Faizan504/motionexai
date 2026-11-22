import Icon from '@/components/ui/Icon';

/** Sticky mobile CTA (shown < 700px). Scrolls to the on-page form when present, else opens /contact/. */
export default function MobileCta() {
  return (
    <div className="m-cta">
      <a href="/contact/" className="btn btn-primary" data-contact-link="">
        Discuss Your Project <Icon id="i-arrow" />
      </a>
    </div>
  );
}
