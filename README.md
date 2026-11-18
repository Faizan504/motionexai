# MotionexAI — Website (Next.js)

Production build of the client-approved homepage design (`index-v2.html`), implementing the
**Industry-Specific AI Solutions — Website Content Strategy**.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · GSAP 3 + ScrollTrigger · Lenis smooth scroll · Three.js (WebGL particle scene)

## Run locally

Requirements: **Node.js 18.18+** (Node 20 LTS recommended) and npm.

```bash
npm install
npm run dev          # http://localhost:3000 (development, hot reload)
```

Production mode:

```bash
npm run build
npm start            # http://localhost:3000
```

Optional: copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` / `LEAD_WEBHOOK_URL`.

## What's in phase 1 (homepage)

The homepage follows the scope's 12-section industry structure and P0/P1/P2 priorities:

| Scope requirement | Homepage section |
|---|---|
| 1. Hero — industry headline, benefits, CTA | Hero + 14-industry marquee |
| 2. Industry overview / four questions (§12) | "Who we are" — problem · solution · in practice · next step |
| Industry priority P0 / P1 / P2 (§2) | Industry hub (bento: Construction/AEC, Recruitment/HR, Real Estate → P1 → P2) |
| 3. Business challenges | Flip cards: challenge → AI solution |
| 4. AI solutions (all 14 industries, §4) | Industry solution explorer (H1, description, key AI solutions, demo, audience, CTA) |
| 6. Interactive demonstrations | Demo center — 6 animated workflows on synthetic data, human review step |
| Proprietary products (CareerFlix etc.) | Products with availability status (Live / Beta / In development / Upcoming) |
| 5. AI use cases | Illustrative use cases with KPIs (no unverified claims) |
| 7. Technology capabilities | Models · Integrations · Cloud · Security tabs |
| 8. Business outcomes (§11, measured not promised) | KPI cards |
| 9. Implementation approach | Discovery → Pilot → Deployment → Optimization |
| Content quality & credibility (§9) | Transparency labels |
| Content marketing plan (§6) | Insights cluster |
| 11. FAQs | FAQ accordion |
| 12. CTA + conversion strategy (§7) | Industry-aware 3-step lead form |

### Lead form (§7)
- Every industry CTA carries `data-industry` / `data-source`; clicking it pre-fills the industry,
  swaps in that industry's CTA headline and records the **source** automatically.
- Collects: business email, company, industry, service interest, requirements, timeline, budget,
  preferred consultation method. No confidential data requested.
- Submits to `POST /api/leads/` → forwarded to `LEAD_WEBHOOK_URL` (CRM / Zapier / Make / n8n) when set,
  otherwise saved to `.data/leads.jsonl` for local testing.

### SEO
Metadata + Open Graph, `Organization` and `WebSite` JSON-LD, `sitemap.xml`, `robots.txt`,
trailing-slash URLs matching the proposed hierarchy (`/industries/construction-aec/` …).

## Project structure

```
src/
  app/
    layout.tsx            fonts (self-hosted via next/font), metadata
    page.tsx              homepage composition + JSON-LD
    globals.css           design system (ported 1:1 from the approved prototype)
    api/leads/route.ts    lead capture endpoint
    sitemap.ts, robots.ts, not-found.tsx
  content/                ← all copy & data (CMS-ready)
    types.ts              Industry Page content model = CMS fields from scope §8
    industries.ts         all 14 industries (P0/P1/P2, H1, SEO title, solutions, demos, CTA, keywords)
    demos.ts              demo-center workflows
    site.ts               services, tech stack, lead options, contact details
  components/
    layout/               Header (mega menu, drawer), Footer, Assistant, MotionController (GSAP/Lenis), WebGLScene
    home/                 homepage sections
    ui/                   Icon, tabs hook
```

`content/types.ts` mirrors the **Industry Page** CMS fields in the scope (Industry Name, URL Slug, SEO Title,
Meta Description, Hero Heading/Description, Challenges, AI Solutions, Demo References, Primary CTA,
Publishing Status, Last Reviewed, …), so the data migrates directly into **Payload CMS or Sanity** in a later phase.

## Before launch — items marked `[VERIFY]`
- Product availability statuses (CareerFlix, Rewards & Advocacy, Remote Workspace)
- Contact details (email, office address, phone) and social profile URLs
- `public/og-image.jpg` and `public/logo.png` (referenced in metadata / JSON-LD)

## Next phases (per the scope roadmap §10)
1. `/industries/[slug]/` landing pages using the 12-section template, starting with P0
   (Construction/AEC, Recruitment/HR, Real Estate), driven by `content/industries.ts`.
2. Payload CMS / Sanity integration (draft → review → published, preview).
3. Supporting articles, GA4 + Search Console + CRM attribution.
