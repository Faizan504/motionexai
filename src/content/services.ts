import type { IconId } from './types';

export interface Service {
  slug: string;
  name: string;
  group: 'AI Engineering' | 'SaaS & Software' | 'Platform & Data';
  icon: IconId;
  sub: string;
  seoTitle: string;
  metaDescription: string;
  heroHeading: string;
  heroDescription: string;
  /** What the service covers */
  capabilities: { title: string; detail: string }[];
  /** Typical deliverables of an engagement */
  deliverables: string[];
  /** Industries where this service is most often applied (slugs) */
  industries: string[];
  faqs: { q: string; a: string }[];
  keywords: string[];
}

/**
 * Service pages (/services/<slug>/). Slugs match the URLs already linked from the
 * mega menu and footer. Copy follows the scope's credibility rules: capabilities, not promised results.
 */
export const SERVICES_DATA: Service[] = [
  {
    slug: 'ai-agents',
    name: 'AI Agents',
    group: 'AI Engineering',
    icon: 'i-bot',
    sub: 'Tool-using & multi-agent systems',
    seoTitle: 'AI Agent Development Company | Custom AI Agents | MotionexAI',
    metaDescription:
      'Custom AI agents that use your tools, follow your workflows and hand critical decisions to people. Single and multi-agent systems for industry operations.',
    heroHeading: 'AI agents that work inside your real workflows',
    heroDescription:
      'We design and build tool-using AI agents that read documents, query systems, draft outputs and route work for human approval, connected securely to the platforms your teams already use.',
    capabilities: [
      { title: 'Task agents', detail: 'Single agents for a defined job: qualifying an inquiry, screening a CV, classifying a BIM issue.' },
      { title: 'Multi-agent orchestration', detail: 'Coordinated agents that plan, call tools, check each other and escalate exceptions.' },
      { title: 'Tool & API integration', detail: 'Agents act through your CRM, ATS, ERP, email, calendar and document stores via secure APIs.' },
      { title: 'Retrieval & memory', detail: 'Grounded answers from your approved knowledge base with source references.' },
      { title: 'Human-in-the-loop', detail: 'Approval steps, confidence thresholds and audit trails for every critical action.' },
      { title: 'Evaluation & monitoring', detail: 'Test suites, accuracy reviews, cost and usage dashboards after go-live.' },
    ],
    deliverables: ['Agent design & workflow map', 'Working agent connected to your systems', 'Evaluation set and accuracy report', 'Admin controls, logging and usage limits', 'Handover documentation and training'],
    industries: ['recruitment-hr', 'real-estate', 'construction-aec', 'retail-ecommerce', 'insurance'],
    faqs: [
      { q: 'What is the difference between an AI agent and a chatbot?', a: 'A chatbot answers questions. An agent can also take actions through tools, such as updating a CRM record, booking a viewing or drafting a report, within limits you define and with human approval where it matters.' },
      { q: 'Which language models do your agents use?', a: 'We select models per use case, including OpenAI, Anthropic Claude, Google Gemini and open-source models, based on accuracy, data residency and cost requirements agreed during discovery.' },
      { q: 'Can agents run on our own infrastructure?', a: 'Yes. Agents can be deployed in your cloud tenancy or a private environment where your security requirements need it.' },
    ],
    keywords: ['AI agent development', 'custom AI agents', 'multi-agent systems'],
  },
  {
    slug: 'ai-automation',
    name: 'AI Automation',
    group: 'AI Engineering',
    icon: 'i-zap',
    sub: 'Workflows, approvals, routing',
    seoTitle: 'AI Workflow Automation Services | MotionexAI',
    metaDescription:
      'AI-powered workflow automation for approvals, routing, data entry, notifications and reporting, built around your existing systems and controls.',
    heroHeading: 'Automate repetitive work, keep people in control',
    heroDescription:
      'We combine AI with workflow automation to remove manual steps from intake, classification, data entry, approvals and reporting, while keeping review points where your business needs them.',
    capabilities: [
      { title: 'Intake & classification', detail: 'Emails, forms and documents classified and routed to the right queue automatically.' },
      { title: 'Data extraction & entry', detail: 'Structured data pulled from unstructured inputs and written to your systems.' },
      { title: 'Approval workflows', detail: 'Multi-step approvals with rules, escalation and audit history.' },
      { title: 'Automated reporting', detail: 'Scheduled summaries and management reports generated from live data.' },
      { title: 'Notifications & follow-ups', detail: 'Email, WhatsApp and in-app messages triggered by workflow events.' },
      { title: 'Integration layer', detail: 'Connections via APIs, webhooks and iPaaS tools such as Make, Zapier or n8n.' },
    ],
    deliverables: ['Process map with automation opportunities', 'Automated workflow in production', 'Exception handling and review queues', 'KPI baseline and post-launch report'],
    industries: ['finance-fintech', 'logistics-supply-chain', 'healthcare', 'legal-professional-services', 'recruitment-hr'],
    faqs: [
      { q: 'Which processes are best to automate first?', a: 'High-volume, rule-heavy tasks with clear inputs and outputs, such as document intake, request routing or report preparation. We identify and rank candidates during discovery.' },
      { q: 'Do you replace our existing tools?', a: 'Usually not. We automate around the systems you already use and only recommend new tooling where there is a clear gap.' },
    ],
    keywords: ['AI workflow automation', 'business process automation', 'intelligent automation'],
  },
  {
    slug: 'generative-ai',
    name: 'Document Intelligence',
    group: 'AI Engineering',
    icon: 'i-file',
    sub: 'Extraction, search, Q&A',
    seoTitle: 'Document AI & Intelligent Document Processing | MotionexAI',
    metaDescription:
      'Document intelligence for contracts, invoices, specifications, CVs and claims: extraction, classification, semantic search and Q&A with source references.',
    heroHeading: 'Turn documents into searchable, structured knowledge',
    heroDescription:
      'Generative AI and OCR pipelines that read drawings, specifications, contracts, invoices and CVs, extract the fields you need and answer questions with citations back to the source.',
    capabilities: [
      { title: 'OCR & extraction', detail: 'Fields, tables and clauses extracted from scanned and digital documents.' },
      { title: 'Classification', detail: 'Documents sorted by type, project, client or priority on arrival.' },
      { title: 'Semantic search', detail: 'Find information by meaning across thousands of files, not just keywords.' },
      { title: 'Q&A with citations', detail: 'Answers that reference the page, clause or record they came from.' },
      { title: 'Summaries & drafting', detail: 'Briefs, reports and first drafts generated from source material.' },
      { title: 'Validation rules', detail: 'Cross-checks against business rules with exceptions sent for review.' },
    ],
    deliverables: ['Document pipeline (ingest → extract → validate)', 'Search & Q&A interface', 'Accuracy evaluation on your sample documents', 'Access controls and retention settings'],
    industries: ['construction-aec', 'finance-fintech', 'legal-professional-services', 'insurance', 'real-estate'],
    faqs: [
      { q: 'How accurate is document extraction?', a: 'Accuracy depends on document quality and variety. We measure it on a sample of your real documents during the pilot and set review thresholds accordingly, rather than quoting a figure up front.' },
      { q: 'Is our document data used to train models?', a: 'No. Your documents are not used to train AI models without explicit authorization.' },
    ],
    keywords: ['document AI', 'intelligent document processing', 'AI document search'],
  },
  {
    slug: 'artificial-intelligence',
    name: 'Custom AI & ML',
    group: 'AI Engineering',
    icon: 'i-brain',
    sub: 'Forecasting, vision, NLP',
    seoTitle: 'Custom AI & Machine Learning Development | MotionexAI',
    metaDescription:
      'Custom machine learning for forecasting, computer vision, NLP and recommendations, from data assessment and modelling to production deployment.',
    heroHeading: 'Custom AI and machine learning, built for your data',
    heroDescription:
      'When off-the-shelf models are not enough, we build forecasting, computer vision, NLP and recommendation models trained and evaluated on your own data.',
    capabilities: [
      { title: 'Forecasting', detail: 'Demand, workload and cash-flow forecasting models.' },
      { title: 'Computer vision', detail: 'Detection and inspection from images, video and drawings.' },
      { title: 'NLP & classification', detail: 'Text classification, entity extraction and sentiment models.' },
      { title: 'Recommendations', detail: 'Product, property and content recommendation engines.' },
      { title: 'Fine-tuning', detail: 'Domain-tuned language models where prompting alone falls short.' },
      { title: 'MLOps', detail: 'Training pipelines, versioning, monitoring and retraining.' },
    ],
    deliverables: ['Data readiness assessment', 'Model with documented evaluation', 'Production API or batch pipeline', 'Monitoring and retraining plan'],
    industries: ['logistics-supply-chain', 'manufacturing', 'retail-ecommerce', 'finance-fintech'],
    faqs: [
      { q: 'How much data do we need?', a: 'It depends on the problem. We start with a data readiness assessment and tell you honestly whether a custom model is viable or whether a simpler approach will work better.' },
    ],
    keywords: ['custom machine learning', 'AI development company', 'predictive analytics'],
  },
  {
    slug: 'saas-development',
    name: 'SaaS Development',
    group: 'SaaS & Software',
    icon: 'i-layers',
    sub: 'AI MVPs, multi-tenant platforms',
    seoTitle: 'AI SaaS Development Company | MVP to Scale | MotionexAI',
    metaDescription:
      'AI-native SaaS product development: MVPs, multi-tenant platforms, billing, admin and analytics, engineered for scale and security.',
    heroHeading: 'AI-native SaaS platforms, from MVP to scale',
    heroDescription:
      'We build the SaaS products we know best because we run our own. From a focused MVP to a multi-tenant platform with billing, roles, analytics and AI features built in.',
    capabilities: [
      { title: 'MVP development', detail: 'A focused first version to validate the product with real users.' },
      { title: 'Multi-tenant architecture', detail: 'Tenant isolation, roles, SSO and per-tenant configuration.' },
      { title: 'Billing & subscriptions', detail: 'Plans, trials, usage-based billing and invoicing.' },
      { title: 'AI features', detail: 'Assistants, automation and analytics built into the product.' },
      { title: 'Admin & analytics', detail: 'Back-office tools, dashboards and product analytics.' },
      { title: 'Scale & reliability', detail: 'Cloud infrastructure, CI/CD, monitoring and SLAs.' },
    ],
    deliverables: ['Product discovery & scope', 'Designed and built SaaS application', 'Cloud infrastructure and CI/CD', 'Launch support and roadmap'],
    industries: ['startups-saas', 'real-estate', 'education-edtech', 'recruitment-hr'],
    faqs: [
      { q: 'Do we own the code and IP?', a: 'Yes. Clients own the IP for custom work delivered under our agreements.' },
      { q: 'Can you take over an existing product?', a: 'Yes. We start with a technical audit, then propose stabilization and roadmap work.' },
    ],
    keywords: ['SaaS development company', 'AI SaaS development', 'MVP development'],
  },
  {
    slug: 'software-development',
    name: 'Enterprise Software',
    group: 'SaaS & Software',
    icon: 'i-code',
    sub: 'CRM, HRMS, portals, APIs',
    seoTitle: 'Enterprise Software Development | CRM, HRMS, Portals | MotionexAI',
    metaDescription:
      'Custom enterprise software: CRM, HRMS, client portals, internal tools and APIs, with AI capabilities and secure integrations.',
    heroHeading: 'Enterprise software that fits how you operate',
    heroDescription:
      'Custom CRM, HRMS, portals, internal tools and APIs designed around your processes, with AI built in where it adds value.',
    capabilities: [
      { title: 'CRM & sales systems', detail: 'Pipelines, automation and reporting tailored to your sales motion.' },
      { title: 'HRMS & workforce', detail: 'HR records, attendance, approvals and employee self-service.' },
      { title: 'Client & partner portals', detail: 'Secure portals for documents, requests and status tracking.' },
      { title: 'Internal tools', detail: 'Operational dashboards and back-office applications.' },
      { title: 'APIs & integrations', detail: 'REST/GraphQL APIs and system-to-system integrations.' },
      { title: 'Legacy modernization', detail: 'Incremental migration from legacy systems.' },
    ],
    deliverables: ['Requirements & solution architecture', 'Custom application', 'Integrations and data migration', 'Training, documentation and support'],
    industries: ['construction-aec', 'logistics-supply-chain', 'manufacturing', 'healthcare'],
    faqs: [{ q: 'Do you provide support after launch?', a: 'Yes, through SLA-backed support and retainer models agreed per project.' }],
    keywords: ['enterprise software development', 'custom CRM development', 'HRMS development'],
  },
  {
    slug: 'web-development',
    name: 'Web & Mobile',
    group: 'SaaS & Software',
    icon: 'i-globe',
    sub: 'Apps, e-commerce, PWAs',
    seoTitle: 'Web & Mobile App Development | MotionexAI',
    metaDescription: 'High-performance websites, web apps, mobile apps, e-commerce and PWAs with AI features and SEO built in.',
    heroHeading: 'Web and mobile products with AI built in',
    heroDescription: 'Fast, accessible websites, web applications, mobile apps and e-commerce platforms, engineered for performance, SEO and conversion.',
    capabilities: [
      { title: 'Web applications', detail: 'React / Next.js applications with modern architecture.' },
      { title: 'Mobile apps', detail: 'Cross-platform iOS and Android apps.' },
      { title: 'E-commerce', detail: 'Storefronts with AI search, recommendations and assistants.' },
      { title: 'Marketing websites', detail: 'SEO-ready, CMS-driven websites.' },
      { title: 'PWAs', detail: 'Installable, offline-capable web apps.' },
      { title: 'Performance & accessibility', detail: 'Core Web Vitals and WCAG-aligned builds.' },
    ],
    deliverables: ['UX/UI design', 'Web or mobile application', 'CMS and analytics setup', 'Launch and optimization'],
    industries: ['retail-ecommerce', 'hospitality-travel', 'education-edtech', 'startups-saas'],
    faqs: [{ q: 'Which frameworks do you use?', a: 'Typically Next.js/React for web and React Native or Flutter for mobile, chosen per project requirements.' }],
    keywords: ['web development company Dubai', 'mobile app development', 'e-commerce development'],
  },
  {
    slug: 'dedicated-teams',
    name: 'Dedicated Teams',
    group: 'SaaS & Software',
    icon: 'i-users',
    sub: 'AI engineers & product squads',
    seoTitle: 'Dedicated AI Development Teams | MotionexAI',
    metaDescription: 'Embedded squads of AI engineers, developers, QA and DevOps working on your roadmap, scaling monthly.',
    heroHeading: 'A dedicated AI team, working as part of yours',
    heroDescription: 'An embedded squad of AI engineers, full-stack developers, QA and DevOps that works on your roadmap with weekly reporting and demos.',
    capabilities: [
      { title: 'AI & ML engineers', detail: 'LLM, agent and ML specialists.' },
      { title: 'Full-stack developers', detail: 'Frontend, backend and mobile engineers.' },
      { title: 'QA & automation', detail: 'Manual and automated testing.' },
      { title: 'DevOps & cloud', detail: 'Infrastructure, CI/CD and monitoring.' },
      { title: 'Product & delivery', detail: 'Product owners and delivery managers.' },
      { title: 'Flexible scaling', detail: 'Scale up or down monthly.' },
    ],
    deliverables: ['Team composition plan', 'Onboarding within your tools', 'Weekly reports & demos', 'Monthly capacity review'],
    industries: ['startups-saas', 'finance-fintech', 'telecommunications', 'recruitment-hr'],
    faqs: [{ q: 'How quickly can a team start?', a: 'Start dates depend on the roles required; we confirm availability and a start date during scoping.' }],
    keywords: ['dedicated development team', 'hire AI engineers', 'offshore AI team'],
  },
  {
    slug: 'cloud-devops',
    name: 'Cloud & MLOps',
    group: 'Platform & Data',
    icon: 'i-cloud',
    sub: 'AWS, Azure, GCP',
    seoTitle: 'Cloud, DevOps & MLOps Services | AWS, Azure, GCP | MotionexAI',
    metaDescription: 'Cloud architecture, DevOps, Kubernetes and MLOps on AWS, Azure and Google Cloud for AI and SaaS workloads.',
    heroHeading: 'Cloud and MLOps foundations for production AI',
    heroDescription: 'Secure, cost-aware cloud infrastructure and MLOps pipelines on AWS, Azure and Google Cloud, so AI systems stay reliable after launch.',
    capabilities: [
      { title: 'Cloud architecture', detail: 'Well-architected designs on AWS, Azure and GCP.' },
      { title: 'Containers & Kubernetes', detail: 'Docker, Kubernetes and serverless deployments.' },
      { title: 'CI/CD', detail: 'Automated build, test and release pipelines.' },
      { title: 'LLMOps', detail: 'Prompt/version management, evaluation and cost monitoring.' },
      { title: 'Observability', detail: 'Logs, metrics, tracing and alerting.' },
      { title: 'Cost optimization', detail: 'Right-sizing and usage controls.' },
    ],
    deliverables: ['Infrastructure as code', 'CI/CD pipelines', 'Monitoring dashboards', 'Runbooks'],
    industries: ['startups-saas', 'finance-fintech', 'telecommunications'],
    faqs: [{ q: 'Can you deploy in our existing cloud account?', a: 'Yes. We work inside your cloud tenancy with access agreed up front.' }],
    keywords: ['MLOps services', 'cloud DevOps', 'AWS consulting'],
  },
  {
    slug: 'cybersecurity',
    name: 'Security & Governance',
    group: 'Platform & Data',
    icon: 'i-shield',
    sub: 'Privacy, RBAC, audit',
    seoTitle: 'AI Security & Governance Services | MotionexAI',
    metaDescription: 'AI governance, data privacy, RBAC, audit logging, PII redaction and secure deployment for enterprise AI systems.',
    heroHeading: 'Security and governance designed into every AI system',
    heroDescription: 'Access control, privacy, audit logging, PII handling and model governance, so AI can be used confidently with business data.',
    capabilities: [
      { title: 'Access control', detail: 'RBAC, SSO and least-privilege access.' },
      { title: 'Data privacy', detail: 'PII redaction, retention controls and data residency options.' },
      { title: 'Audit logging', detail: 'Traceable records of AI inputs, outputs and actions.' },
      { title: 'Model governance', detail: 'Evaluation, approval and change management for models and prompts.' },
      { title: 'Secure deployment', detail: 'Private networking, encryption and secrets management.' },
      { title: 'Usage policies', detail: 'Rate limits, content filters and acceptable-use controls.' },
    ],
    deliverables: ['AI risk assessment', 'Security controls implementation', 'Governance documentation', 'Audit-ready logging'],
    industries: ['finance-fintech', 'healthcare', 'insurance', 'legal-professional-services'],
    faqs: [{ q: 'Do you hold security certifications?', a: 'We align our practices with recognized frameworks and share our controls during discovery. Any certification claims are confirmed in writing before contracting.' }],
    keywords: ['AI governance', 'AI security', 'data privacy AI'],
  },
  {
    slug: 'data-analytics',
    name: 'Data & Analytics',
    group: 'Platform & Data',
    icon: 'i-chart',
    sub: 'Dashboards & predictive BI',
    seoTitle: 'Data Analytics & BI Dashboards | Predictive Analytics | MotionexAI',
    metaDescription: 'Data engineering, BI dashboards and predictive analytics that turn operational data into decisions, with AI-generated insights.',
    heroHeading: 'From scattered data to decisions you can act on',
    heroDescription: 'Data pipelines, BI dashboards and predictive analytics, with AI summaries that explain what changed and why.',
    capabilities: [
      { title: 'Data engineering', detail: 'Pipelines and warehouses that unify your sources.' },
      { title: 'BI dashboards', detail: 'Operational and executive dashboards.' },
      { title: 'Predictive analytics', detail: 'Forecasts and risk scores built into reporting.' },
      { title: 'AI insights', detail: 'Natural-language summaries and Q&A over your data.' },
      { title: 'KPI frameworks', detail: 'Clear metric definitions and baselines.' },
      { title: 'Data quality', detail: 'Validation, monitoring and lineage.' },
    ],
    deliverables: ['Data audit', 'Pipelines & warehouse', 'Dashboards', 'KPI definitions'],
    industries: ['logistics-supply-chain', 'retail-ecommerce', 'construction-aec', 'manufacturing'],
    faqs: [{ q: 'Which BI tools do you support?', a: 'Power BI, Looker, Metabase and custom dashboards, chosen around your existing stack.' }],
    keywords: ['data analytics services', 'BI dashboards', 'predictive analytics'],
  },
];

export const serviceUrl = (slug: string) => `/services/${slug}/`;
export const getService = (slug: string) => SERVICES_DATA.find((s) => s.slug === slug);

/** Map an industry's relatedServices labels to service pages where one exists. */
const LABEL_TO_SLUG: Record<string, string> = {
  'AI Agents': 'ai-agents',
  'AI Automation': 'ai-automation',
  'Document Intelligence': 'generative-ai',
  'Data & Analytics': 'data-analytics',
  'SaaS Development': 'saas-development',
  'Custom AI & ML': 'artificial-intelligence',
  'Enterprise Software': 'software-development',
  'Web & Mobile': 'web-development',
  'Dedicated Teams': 'dedicated-teams',
  'Cloud & MLOps': 'cloud-devops',
  'Security & Governance': 'cybersecurity',
};
export const relatedHref = (label: string): string | undefined =>
  label === 'CareerFlix' ? '/products/careerflix/' : LABEL_TO_SLUG[label] ? serviceUrl(LABEL_TO_SLUG[label]) : undefined;
