/**
 * Content model for the "Industry Page" content type.
 *
 * Mirrors the CMS fields defined in the client scope
 * (Industry-Specific AI Solutions — Website Content Strategy, section 8),
 * so this data can be migrated 1:1 into Payload CMS or Sanity later.
 */

export type Priority = 'P0' | 'P1' | 'P2';
export type PublishingStatus = 'draft' | 'review' | 'published';

export type IconId =
  | 'i-building' | 'i-user-check' | 'i-home' | 'i-coins' | 'i-cart' | 'i-truck' | 'i-heart'
  | 'i-cap' | 'i-factory' | 'i-bed' | 'i-scale' | 'i-umbrella' | 'i-signal' | 'i-rocket'
  | 'i-file' | 'i-brain' | 'i-target' | 'i-book' | 'i-chart' | 'i-db' | 'i-msg' | 'i-check'
  | 'i-search' | 'i-cal' | 'i-mail' | 'i-zap' | 'i-layers' | 'i-sparkle' | 'i-bot' | 'i-code'
  | 'i-cloud' | 'i-shield' | 'i-globe' | 'i-users' | 'i-lock' | 'i-clock' | 'i-arrow'
  | 'i-arrow-ur' | 'i-chev' | 'i-send' | 'i-x' | 'i-pin' | 'i-in' | 'i-xs' | 'i-gh' | 'i-wa'
  | 'i-logo' | 'i-phone' | 'i-pen';

/** A key AI solution: [title, optional short explanation]. */
export interface AISolution {
  title: string;
  detail?: string;
}

export interface Industry {
  /** Industry Name — display title */
  name: string;
  /** Short label used in tabs, chips and the marquee */
  short: string;
  /** URL Slug — SEO-friendly path segment under /industries/ */
  slug: string;
  priority: Priority;
  icon: IconId;
  /** SEO Title — search result title */
  seoTitle: string;
  /** Meta Description — search result summary */
  metaDescription: string;
  /** Hero Heading (H1) */
  heroHeading: string;
  /** Hero Description — value proposition */
  heroDescription: string;
  /** Primary commercial opportunity (scope §2) */
  opportunity: string;
  /** AI Solutions — linked service references */
  solutions: AISolution[];
  /** Demo References — interactive demonstration concepts */
  demos: string[];
  /** Key into the homepage demo center, if a runnable demo exists */
  demoKey?: DemoKey;
  /** Target audience */
  audience: string;
  /** Credibility / compliance note (scope §4 and §9) */
  note?: string;
  /** Primary CTA — label (destination is the lead form, industry pre-filled) */
  primaryCta: string;
  /** Related services for internal linking (scope §5) */
  relatedServices: string[];
  /** SEO keyword themes (scope §5) — proposed, not validated rankings */
  keywords: { primary: string; supporting: string[] };
  publishingStatus: PublishingStatus;
  /** Last Reviewed — editorial maintenance date (ISO) */
  lastReviewed: string;
}

export type DemoKey = 'aec' | 'hr' | 're' | 'fin' | 'log' | 'ins';
export type LogKind = 'user' | 'agent' | 'tool' | 'human' | 'ok';

export interface Demo {
  key: DemoKey;
  tab: string;
  name: string;
  file: string;
  desc: string;
  nodes: { icon: IconId; title: string; sub: string }[];
  log: { kind: LogKind; tag: string; text: string }[];
}
