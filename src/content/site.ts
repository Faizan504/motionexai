import type { IconId } from './types';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://motionexai.com').replace(/\/$/, '');

/** [VERIFY] Confirm contact details before launch. */
export const CONTACT = {
  email: 'hello@motionexai.com',
  location: 'Dubai, UAE',
};

export const SERVICES: { group: string; items: { label: string; href: string; icon: IconId; sub: string }[] }[] = [
  {
    group: 'AI Engineering',
    items: [
      { label: 'AI Agents', href: '/services/ai-agents/', icon: 'i-bot', sub: 'Tool-using & multi-agent systems' },
      { label: 'AI Automation', href: '/services/ai-automation/', icon: 'i-zap', sub: 'Workflows, approvals, routing' },
      { label: 'Document Intelligence', href: '/services/generative-ai/', icon: 'i-file', sub: 'Extraction, search, Q&A' },
      { label: 'Custom AI & ML', href: '/services/artificial-intelligence/', icon: 'i-brain', sub: 'Forecasting, vision, NLP' },
    ],
  },
  {
    group: 'SaaS & Software',
    items: [
      { label: 'SaaS Development', href: '/services/saas-development/', icon: 'i-layers', sub: 'AI MVPs, multi-tenant platforms' },
      { label: 'Enterprise Software', href: '/services/software-development/', icon: 'i-code', sub: 'CRM, HRMS, portals, APIs' },
      { label: 'Web & Mobile', href: '/services/web-development/', icon: 'i-globe', sub: 'Apps, e-commerce, PWAs' },
      { label: 'Dedicated Teams', href: '/services/dedicated-teams/', icon: 'i-users', sub: 'AI engineers & product squads' },
    ],
  },
  {
    group: 'Platform & Data',
    items: [
      { label: 'Cloud & MLOps', href: '/services/cloud-devops/', icon: 'i-cloud', sub: 'AWS, Azure, GCP' },
      { label: 'Security & Governance', href: '/services/cybersecurity/', icon: 'i-shield', sub: 'Privacy, RBAC, audit' },
      { label: 'Data & Analytics', href: '/services/data-analytics/', icon: 'i-chart', sub: 'Dashboards & predictive BI' },
    ],
  },
];

/** Technology capabilities (section 7 of the industry page template). */
export const STACK: Record<string, string[]> = {
  'AI models': ['OpenAI GPT', 'Anthropic Claude', 'Google Gemini', 'Open-source LLMs', 'Embeddings & RAG', 'Fine-tuned models', 'Computer vision', 'Speech & voice AI', 'OCR & document AI', 'Forecasting models'],
  Integrations: ['CRM platforms', 'ATS & HRIS', 'ERP & accounting', 'BIM / IFC models', 'WhatsApp Business', 'Email & calendar', 'Property portals', 'REST & GraphQL APIs', 'Webhooks & iPaaS'],
  'Cloud & deployment': ['AWS', 'Microsoft Azure', 'Google Cloud', 'Kubernetes', 'Docker', 'Serverless', 'Private deployment', 'CI/CD pipelines', 'LLMOps monitoring'],
  'Security & governance': ['RBAC & SSO', 'Encryption', 'Audit logs', 'PII redaction', 'Human-in-the-loop', 'Data retention controls', 'Usage limits', 'Model evaluation'],
};

/** Lead qualification fields (scope §7). */
export const LEAD_OPTIONS = {
  services: ['AI Agents', 'AI Automation', 'Document AI', 'SaaS Platform', 'Analytics', 'Dedicated Team', 'Demo request'],
  timeline: ['ASAP (under 1 month)', '1–3 months', '3–6 months', 'Exploring'],
  budget: ['Under $15k', '$15k–$50k', '$50k–$150k', '$150k+', 'Not sure yet'],
  method: ['Video call', 'Phone call', 'WhatsApp', 'Email'],
};

/** Scripted replies for the preview assistant (connects to an approved knowledge base in a later phase). */
export const ASSISTANT_REPLIES: Record<string, string> = {
  industries:
    'We build AI solutions for 14 industries. Our priority focus is Construction & AEC, Recruitment & HR and Real Estate, followed by Finance, Retail, Logistics, Healthcare and Education, plus six more.',
  aec: 'For construction and AEC we build BIM automation agents, engineering document AI, AI quantity takeoff, project reporting and BIM coordination intelligence. You can try the BIM issue demo on this page.',
  hr: 'For recruitment and HR: AI recruitment agents, resume intelligence, candidate matching, AI interview assistants and HR workflow automation, including our CareerFlix platform. Recruiters always make the final decision.',
  book: 'Happy to help! Share your industry and requirements in the project inquiry form, and a solutions engineer will reach out within one business day.',
  fallback:
    "Good question. I'll connect you with a solutions engineer for the specifics. Meanwhile, the Industries page shows solutions and demos for your sector.",
};
