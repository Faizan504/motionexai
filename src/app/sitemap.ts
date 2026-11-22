import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/site';
import { INDUSTRIES, industryUrl } from '@/content/industries';
import { SERVICES_DATA, serviceUrl } from '@/content/services';
import { PRODUCTS, productUrl } from '@/content/products';
import { ARTICLES, articleUrl } from '@/content/insights';

type Entry = MetadataRoute.Sitemap[number];
const u = (path: string, priority: number, changeFrequency: Entry['changeFrequency'] = 'monthly', lastModified?: string): Entry => ({
  url: `${SITE_URL}${path}`,
  priority,
  changeFrequency,
  ...(lastModified ? { lastModified } : {}),
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    u('/', 1, 'weekly'),
    u('/industries/', 0.9, 'weekly'),
    ...INDUSTRIES.filter((d) => d.publishingStatus === 'published').map((d) =>
      u(industryUrl(d.slug), d.priority === 'P0' ? 0.9 : d.priority === 'P1' ? 0.8 : 0.7, 'monthly', d.lastReviewed),
    ),
    u('/services/', 0.8),
    ...SERVICES_DATA.map((s) => u(serviceUrl(s.slug), 0.7)),
    u('/products/', 0.8),
    ...PRODUCTS.map((p) => u(productUrl(p.slug), 0.7)),
    u('/demos/', 0.7),
    u('/insights/', 0.7, 'weekly'),
    ...ARTICLES.map((a) => u(articleUrl(a.slug), 0.6, 'yearly', a.date)),
    u('/about/', 0.6),
    u('/contact/', 0.6),
    u('/book-consultation/', 0.6),
    u('/careers/', 0.5),
    u('/partnerships/', 0.5),
    u('/privacy/', 0.2, 'yearly'),
    u('/terms/', 0.2, 'yearly'),
    u('/cookies/', 0.2, 'yearly'),
  ];
}
