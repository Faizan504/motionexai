import type { Metadata, Viewport } from 'next';
import { SITE_URL } from '@/content/site';
import IconSprite from '@/components/layout/IconSprite';
import Background from '@/components/layout/Background';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Assistant from '@/components/layout/Assistant';
import MotionController from '@/components/layout/MotionController';
import WebGLScene from '@/components/layout/WebGLScene';
import MobileCta from '@/components/layout/MobileCta';
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
import './pages.css';

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

/**
 * Shared site chrome for every route: icon sprite, background layers, header + mega menu,
 * footer, assistant, mobile CTA, motion controller and the WebGL scene.
 * Internal links are plain <a> elements, so each navigation is a full document load and the
 * motion controller re-initialises against the new page.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        {/* Enables JS-only initial states (e.g. [data-reveal]) before hydration, as in the prototype */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <IconSprite />
        <Background />
        <Header />
        {children}
        <Footer />
        <Assistant />
        <MobileCta />
        <MotionController />
        <WebGLScene />
      </body>
    </html>
  );
}
