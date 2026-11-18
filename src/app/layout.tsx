import type { Metadata, Viewport } from 'next';
import { SITE_URL } from '@/content/site';
// Self-hosted fonts (no network needed at build time)
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/sora/400.css';
import '@fontsource/sora/500.css';
import '@fontsource/sora/600.css';
import '@fontsource/sora/700.css';
import '@fontsource/sora/800.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'MotionexAI | Industry-Specific AI Agents, Automation & SaaS Solutions',
    template: '%s',
  },
  description:
    'MotionexAI engineers industry-specific AI agents, automation systems and SaaS platforms for construction, recruitment, real estate, finance, logistics, healthcare and more. Dubai, UAE.',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'MotionexAI',
    title: 'MotionexAI | AI Engineered for Your Industry',
    description: 'Industry-specific AI agents, automation systems and SaaS platforms that integrate into real business operations.',
    url: '/',
    images: ['/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#05070f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        {/* Enables JS-only initial states (e.g. [data-reveal]) before hydration, as in the prototype */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
