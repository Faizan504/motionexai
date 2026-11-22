import type { IconId } from './types';

export type ProductStatus = 'live' | 'beta' | 'dev' | 'soon';

export const STATUS_LABEL: Record<ProductStatus, string> = {
  live: 'Live',
  beta: 'Beta',
  dev: 'In development',
  soon: 'Upcoming',
};

export interface Product {
  slug: string;
  name: string;
  /** [VERIFY] availability status before launch */
  status: ProductStatus;
  tagline: string;
  seoTitle: string;
  metaDescription: string;
  description: string;
  audience: string;
  category: string;
  features: { icon: IconId; title: string; detail: string }[];
  /** Primary CTA: demo request for live/beta, waitlist for dev/upcoming */
  cta: string;
  industries: string[];
}

export const PRODUCTS: Product[] = [
  {
    slug: 'careerflix',
    name: 'CareerFlix',
    status: 'live',
    tagline: 'AI-powered recruitment platform',
    seoTitle: 'CareerFlix | AI Recruitment Platform by MotionexAI',
    metaDescription:
      'CareerFlix is an AI recruitment platform for resume intelligence, candidate matching, AI interviews, assessments and hiring automation.',
    description:
      'CareerFlix brings candidate intelligence, AI interviews, assessments and hiring automation into one platform. It powers our Recruitment & HR solutions, and recruiters stay in control of every decision.',
    audience: 'Recruitment agencies, staffing companies and in-house talent acquisition teams.',
    category: 'Recruitment & HR',
    features: [
      { icon: 'i-file', title: 'Resume intelligence', detail: 'Parse CVs into structured, searchable candidate profiles.' },
      { icon: 'i-target', title: 'Candidate matching', detail: 'Rank candidates against the requirements you define.' },
      { icon: 'i-msg', title: 'AI interviews', detail: 'Structured preliminary interviews with summaries for recruiters.' },
      { icon: 'i-check', title: 'Assessments', detail: 'Generate, deliver and evaluate role-specific assessments.' },
      { icon: 'i-zap', title: 'Hiring automation', detail: 'Scheduling, reminders and status updates automated.' },
      { icon: 'i-chart', title: 'Pipeline analytics', detail: 'Track time-to-shortlist, funnel conversion and source quality.' },
    ],
    cta: 'Request a CareerFlix demo',
    industries: ['recruitment-hr'],
  },
  {
    slug: 'rewards-advocacy',
    name: 'Rewards & Advocacy',
    status: 'beta',
    tagline: 'Multi-tenant advocacy and rewards platform',
    seoTitle: 'Rewards & Advocacy Platform | MotionexAI',
    metaDescription:
      'Multi-tenant advocacy campaigns, automated activity verification, rewards management and engagement analytics.',
    description:
      'Run brand and employee advocacy campaigns across multiple tenants, verify participant activity automatically and manage rewards with engagement analytics.',
    audience: 'Brands, agencies and enterprises running advocacy or loyalty programs.',
    category: 'Retail · Marketing',
    features: [
      { icon: 'i-layers', title: 'Multi-tenant', detail: 'Separate programs, branding and data per tenant.' },
      { icon: 'i-check', title: 'Activity verification', detail: 'Automated verification of participant actions.' },
      { icon: 'i-sparkle', title: 'Rewards engine', detail: 'Points, tiers and reward catalogs.' },
      { icon: 'i-chart', title: 'Engagement analytics', detail: 'Campaign reach and participation dashboards.' },
    ],
    cta: 'Join the beta',
    industries: ['retail-ecommerce', 'startups-saas'],
  },
  {
    slug: 'remote-workspace',
    name: 'Remote Workspace',
    status: 'dev',
    tagline: 'Secure remote workforce operations',
    seoTitle: 'Remote Workspace Platform (In Development) | MotionexAI',
    metaDescription:
      'Secure remote workspace access, attendance, productivity visibility, IT support and workforce operations. Join the waitlist.',
    description:
      'A platform for distributed teams: secure workspace access, attendance, productivity visibility, IT support and workforce operations in one place. Currently in development.',
    audience: 'Companies operating remote or hybrid teams across locations.',
    category: 'Workforce management',
    features: [
      { icon: 'i-lock', title: 'Secure access', detail: 'Controlled access to company workspaces.' },
      { icon: 'i-clock', title: 'Attendance', detail: 'Shift and attendance tracking.' },
      { icon: 'i-chart', title: 'Productivity visibility', detail: 'Team-level activity insights.' },
      { icon: 'i-shield', title: 'IT support', detail: 'Ticketing and device support workflows.' },
    ],
    cta: 'Join the waitlist',
    industries: ['startups-saas', 'telecommunications'],
  },
];

export const productUrl = (slug: string) => `/products/${slug}/`;
export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
