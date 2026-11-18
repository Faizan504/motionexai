import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/site';

// Industry landing pages (/industries/<slug>/) are added here as they are published (phase 2).
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 }];
}
