import type { Metadata } from 'next';
import { CONTACT, SITE_URL } from '@/content/site';

/** Absolute URL for a site path (paths use trailing slashes, matching next.config trailingSlash). */
export const abs = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

/**
 * Standard per-page metadata: title, description, canonical, Open Graph and Twitter.
 * Every route uses this so SEO fields stay consistent (scope: SEO Title + Meta Description per page).
 */
export function pageMeta({
  title,
  description,
  path,
  ogType = 'website',
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: { type: ogType, siteName: 'MotionexAI', title, description, url: path, images: ['/og-image.jpg'] },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export const ORG_ID = `${SITE_URL}/#org`;

export const organizationLd = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'MotionexAI',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  email: CONTACT.email,
  description:
    'Global AI, SaaS and enterprise technology company engineering industry-specific AI agents, automation systems and SaaS platforms.',
  address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
  knowsAbout: [
    'AI Agents',
    'AI Automation',
    'Document Intelligence',
    'SaaS Development',
    'BIM Automation',
    'AI Recruitment',
    'Real Estate AI',
    'Financial Automation',
  ],
};

export type Crumb = { name: string; path: string };

export const breadcrumbLd = (crumbs: Crumb[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: abs(c.path),
  })),
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});
