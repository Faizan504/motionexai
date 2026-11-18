import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Sora } from 'next/font/google';
import { SITE_URL } from '@/content/site';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--ff-inter', display: 'swap' });
const sora = Sora({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--ff-sora', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--ff-mono', display: 'swap' });

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
    <html lang="en" dir="ltr" className={`${inter.variable} ${sora.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables JS-only initial states (e.g. [data-reveal]) before hydration, as in the prototype */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
