/**
 * Insights articles (content clusters by industry). Bodies are structured blocks
 * so they render without a markdown dependency and migrate cleanly to a CMS later.
 */
export type Block = { h?: string; p?: string; list?: string[] };

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** industry slug for internal linking */
  industry?: string;
  type: 'Service guide' | 'Technical' | 'Comparison' | 'Playbook';
  date: string;
  readMins: number;
  bg: string;
  body: Block[];
}

const BG = {
  cyan: 'radial-gradient(circle at 70% 30%,rgba(46,230,246,.5),transparent 45%),radial-gradient(circle at 20% 80%,rgba(139,92,246,.6),transparent 50%),linear-gradient(135deg,#0b1430,#160c33)',
  blue: 'radial-gradient(circle at 30% 40%,rgba(79,140,255,.6),transparent 50%),linear-gradient(135deg,#0b1430,#0c2333)',
  pink: 'radial-gradient(circle at 60% 60%,rgba(228,92,240,.45),transparent 50%),linear-gradient(135deg,#120d2c,#0b1430)',
  violet: 'radial-gradient(circle at 40% 30%,rgba(139,92,246,.6),transparent 50%),radial-gradient(circle at 80% 80%,rgba(46,230,246,.35),transparent 50%),#0a1028',
};

export const ARTICLES: Article[] = [
  {
    slug: 'how-ai-recruitment-agents-work',
    title: 'How AI recruitment agents work, from sourcing to shortlist',
    excerpt: 'What an AI hiring agent actually does, where recruiters stay in control, and how to measure it.',
    category: 'Recruitment & HR',
    industry: 'recruitment-hr',
    type: 'Service guide',
    date: '2026-11-10',
    readMins: 7,
    bg: BG.cyan,
    body: [
      { p: 'An AI recruitment agent is software that carries out defined steps of the hiring process (parsing CVs, matching candidates to requirements, scheduling and communicating) using language models and integrations with your ATS. It does not replace the recruiter; it removes the repetitive work around them.' },
      { h: 'The typical workflow' },
      { list: ['Job requirement: the recruiter defines must-have and nice-to-have criteria.', 'Import & parsing: CVs are converted into structured profiles.', 'Matching: candidates are ranked against the criteria with an explanation for each score.', 'Interview & assessment: structured first-round questions and role-specific tests.', 'Recruiter review: a person approves the shortlist before anything goes to the client or hiring manager.', 'Offer & onboarding: status updates and onboarding tasks are automated.'] },
      { h: 'Where people stay in control' },
      { p: 'Shortlists, rejections and offers are always approved by a recruiter. The agent explains why a candidate was ranked where they were, so decisions can be checked and challenged.' },
      { h: 'How to measure it' },
      { p: 'Agree a baseline before the pilot. Useful KPIs include time-to-shortlist, recruiter hours spent screening, candidate response time and interview-to-offer ratio. Compare pilot results against the baseline rather than against vendor claims.' },
    ],
  },
  {
    slug: 'bim-automation-ai-agents',
    title: 'Where AI agents fit in BIM coordination workflows',
    excerpt: 'Model checks, clash classification and reporting: the BIM tasks that suit automation, and the ones that do not.',
    category: 'Construction & AEC',
    industry: 'construction-aec',
    type: 'Technical',
    date: '2026-11-04',
    readMins: 8,
    bg: BG.blue,
    body: [
      { p: 'BIM coordination produces large volumes of repetitive work: running model checks, triaging clashes, chasing responses and preparing coordination reports. These are good candidates for AI agents, as long as engineering judgment stays with the BIM manager.' },
      { h: 'Tasks that suit automation' },
      { list: ['Rule-based model checks against project standards', 'Clash grouping and classification by discipline and location', 'Suggesting priority levels from clash type and project phase', 'Drafting coordination meeting summaries and issue lists'] },
      { h: 'Tasks that stay with people' },
      { p: 'Design decisions, acceptance of tolerances and resolution of clashes require engineering context. Agents prepare and prioritize; engineers decide.' },
      { h: 'Getting started' },
      { p: 'Start with one recurring workflow, such as weekly clash triage on a live project, and measure time spent before and after. Expand only once accuracy is confirmed on your own models.' },
    ],
  },
  {
    slug: 'ai-recruitment-software-vs-ats',
    title: 'AI recruitment software vs traditional ATS',
    excerpt: 'An ATS stores and tracks. AI recruitment software reads, ranks and communicates. Here is how they fit together.',
    category: 'Recruitment & HR',
    industry: 'recruitment-hr',
    type: 'Comparison',
    date: '2026-10-28',
    readMins: 6,
    bg: BG.pink,
    body: [
      { p: 'Most hiring teams already have an applicant tracking system. The question is not whether to replace it, but what AI adds on top.' },
      { h: 'What a traditional ATS does well' },
      { list: ['Stores candidate records and job requisitions', 'Tracks pipeline stages and compliance records', 'Posts jobs and collects applications'] },
      { h: 'What AI recruitment software adds' },
      { list: ['Reads unstructured CVs and extracts skills and experience', 'Ranks candidates against requirements with explanations', 'Runs structured preliminary interviews and assessments', 'Automates candidate communication and scheduling'] },
      { h: 'Using both' },
      { p: 'The most practical setup keeps the ATS as the system of record and connects AI capabilities through its API, so recruiters work in familiar tools with less manual screening.' },
    ],
  },
  {
    slug: 'ai-property-lead-qualification',
    title: 'Qualifying property leads with AI, without losing the personal touch',
    excerpt: 'How AI property advisors answer inquiries instantly, qualify leads and book viewings straight into your CRM.',
    category: 'Real Estate',
    industry: 'real-estate',
    type: 'Playbook',
    date: '2026-10-20',
    readMins: 6,
    bg: BG.violet,
    body: [
      { p: 'Property inquiries arrive at all hours from portals, WhatsApp and websites. Response speed matters, but agents cannot be online around the clock. An AI property advisor covers the first conversation and hands qualified leads to your team.' },
      { h: 'What the advisor handles' },
      { list: ['Answers questions about listed properties from your inventory', 'Asks qualifying questions: budget, location, timeline, financing', 'Recommends suitable units', 'Books viewings and logs everything in the CRM'] },
      { h: 'Where agents take over' },
      { p: 'Negotiation, relationship building and anything outside the approved knowledge base go straight to a human agent, with the full conversation attached.' },
      { h: 'Metrics to track' },
      { p: 'First-response time, qualified-lead rate, viewings booked and agent hours spent on unqualified inquiries.' },
    ],
  },
  {
    slug: 'engineering-document-ai',
    title: 'Engineering Document AI: answering spec questions with citations',
    excerpt: 'Why source references matter for AI answers in engineering, and how retrieval-based systems provide them.',
    category: 'Construction & AEC',
    industry: 'construction-aec',
    type: 'Technical',
    date: '2026-10-12',
    readMins: 7,
    bg: BG.blue,
    body: [
      { p: 'In engineering, an answer without a source is not usable. Document AI systems built on retrieval return the clause, page or drawing reference with every answer, so engineers can verify it in seconds.' },
      { h: 'How it works' },
      { list: ['Documents are ingested, split into sections and indexed by meaning', 'A question retrieves the most relevant sections', 'The model drafts an answer using only those sections', 'The answer is returned with references to the source text'] },
      { h: 'Limits to be clear about' },
      { p: 'Poor scans, conflicting revisions and missing documents all affect answer quality. Version control and a review step are part of any responsible deployment.' },
    ],
  },
  {
    slug: 'running-an-ai-pilot',
    title: 'How to run an AI pilot that produces a clear answer',
    excerpt: 'Pick one workflow, set a baseline, define success up front and measure honestly. A practical guide.',
    category: 'AI Strategy',
    type: 'Playbook',
    date: '2026-09-30',
    readMins: 5,
    bg: BG.cyan,
    body: [
      { p: 'Many AI initiatives stall because the pilot was too broad or success was never defined. A good pilot answers one question: does this workflow improve enough to justify scaling?' },
      { h: 'Five rules' },
      { list: ['Choose one high-volume workflow with clear inputs and outputs', 'Measure the baseline before building anything', 'Agree success thresholds with the business owner', 'Keep a human review step and record overrides', 'Report results against the baseline, including what did not work'] },
      { h: 'After the pilot' },
      { p: 'If the thresholds are met, plan production deployment with security, access controls and monitoring. If not, the data from the pilot shows exactly why, which is still a useful outcome.' },
    ],
  },
];

export const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export const articleUrl =(slug: string) => `/insights/${slug}/`;
export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);
export const INSIGHT_CATEGORIES = Array.from(new Set(ARTICLES.map((a) => a.category)));
