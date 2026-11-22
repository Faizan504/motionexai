import type { Industry } from './types';

/**
 * Section 3 of the industry page template: business challenges → how AI addresses them.
 * Kept separate from industries.ts so the core CMS model stays unchanged.
 */
export const CHALLENGES: Record<string, { problem: string; detail: string; answer: string }[]> = {
  'construction-aec': [
    { problem: 'Engineers lose hours searching documents', detail: 'Specifications, drawings and RFIs live across folders and email threads.', answer: 'Engineering Document AI answers project questions with references to the exact clause or sheet.' },
    { problem: 'Repetitive BIM checks slow coordination', detail: 'Model checks and clash triage are manual and inconsistent between projects.', answer: 'BIM automation agents run rule checks and classify clashes by discipline and priority for the BIM manager to approve.' },
    { problem: 'Progress reporting eats into project time', detail: 'Status reports are rebuilt by hand from site records every week.', answer: 'AI project reporting turns progress records into a structured draft report for review.' },
  ],
  'recruitment-hr': [
    { problem: 'Screening volume overwhelms recruiters', detail: 'Hundreds of CVs per role, read one by one.', answer: 'Resume intelligence and candidate matching rank applicants against defined requirements; recruiters approve every shortlist.' },
    { problem: 'Slow candidate communication', detail: 'Candidates wait days for updates and drop out.', answer: 'An AI recruitment agent handles scheduling, reminders and status updates around the clock.' },
    { problem: 'Inconsistent first-round interviews', detail: 'Different interviewers ask different questions.', answer: 'An AI interview assistant runs structured preliminary interviews and summarizes responses for the hiring team.' },
  ],
  'real-estate': [
    { problem: 'Inquiries arrive faster than agents can reply', detail: 'Leads from portals, WhatsApp and the website go cold overnight.', answer: 'Property inquiry agents answer questions, qualify leads and book viewings instantly, then hand over to agents.' },
    { problem: 'CRM data is incomplete', detail: 'Agents skip updates, so pipeline reporting is unreliable.', answer: 'CRM automation logs conversations, updates lead stages and schedules follow-ups automatically.' },
    { problem: 'Tenant requests pile up', detail: 'Maintenance requests are unstructured and hard to prioritize.', answer: 'Tenant chatbots capture requests, and AI classifies and routes them by urgency and trade.' },
  ],
  'finance-fintech': [
    { problem: 'Manual document processing', detail: 'Invoices, statements and KYC documents keyed in by hand.', answer: 'Document AI extracts and validates fields, sending exceptions to your finance team.' },
    { problem: 'Slow reconciliations and reporting', detail: 'Month-end close depends on spreadsheets.', answer: 'Workflow automation matches records and drafts reports for review.' },
    { problem: 'Compliance overhead', detail: 'Audit trails are scattered across tools.', answer: 'Every AI action is logged; regulated decisions always stay with qualified people.' },
  ],
  'retail-ecommerce': [
    { problem: 'Support queues spike with demand', detail: 'Order, return and product questions overwhelm agents.', answer: 'AI customer agents resolve common questions and hand complex cases to staff with context.' },
    { problem: 'Shoppers cannot find the right product', detail: 'Keyword search misses intent.', answer: 'AI search and recommendations match products to what the shopper means.' },
    { problem: 'Catalog content is costly to maintain', detail: 'Thousands of descriptions and attributes.', answer: 'Generative AI drafts product content for merchandiser approval.' },
  ],
  'logistics-supply-chain': [
    { problem: 'Shipment paperwork slows operations', detail: 'Bills of lading, invoices and customs forms arrive in many formats.', answer: 'Document AI extracts shipment data and flags discrepancies.' },
    { problem: 'Demand is hard to predict', detail: 'Planning relies on last year plus gut feel.', answer: 'Forecasting models support inventory and capacity planning.' },
    { problem: 'Exceptions are spotted too late', detail: 'Delays surface only when customers complain.', answer: 'Operations AI monitors shipments and alerts teams to emerging delays.' },
  ],
  healthcare: [
    { problem: 'Administrative workload on staff', detail: 'Scheduling, forms and inquiries consume clinical time.', answer: 'Administrative AI handles booking, reminders and intake forms.' },
    { problem: 'Patient inquiries outside hours', detail: 'Phones and inboxes go unanswered after closing.', answer: 'Assistants answer non-clinical questions and route the rest to staff.' },
    { problem: 'Sensitive data requirements', detail: 'Strict privacy and access rules apply.', answer: 'Secure, access-controlled software. Our tools are administrative, not clinical decision support.' },
  ],
  'education-edtech': [
    { problem: 'Learners need help outside class', detail: 'Questions go unanswered between sessions.', answer: 'AI learning assistants grounded in approved course material.' },
    { problem: 'Assessment creation and marking take time', detail: 'Educators spend hours on repetitive marking.', answer: 'Assessment automation generates and pre-marks work for educator review.' },
    { problem: 'Administrative overhead', detail: 'Enrolment and student queries are manual.', answer: 'Workflow automation and chat assistants for admissions and student services.' },
  ],
  manufacturing: [
    { problem: 'Unplanned downtime', detail: 'Maintenance is reactive.', answer: 'Predictive maintenance models flag equipment risk early.' },
    { problem: 'Quality issues found late', detail: 'Manual inspection misses defects.', answer: 'Computer vision supports inspection, with people confirming defects.' },
    { problem: 'Knowledge locked in documents', detail: 'SOPs and manuals are hard to search on the floor.', answer: 'A knowledge assistant answers operators from approved SOPs.' },
  ],
  'hospitality-travel': [
    { problem: 'Guest messages around the clock', detail: 'Questions arrive across channels and time zones.', answer: 'AI concierge agents answer, upsell and book, escalating to staff when needed.' },
    { problem: 'Reviews and feedback go unanalysed', detail: 'Hundreds of reviews, no clear themes.', answer: 'Sentiment analytics surfaces recurring issues by property.' },
    { problem: 'Manual booking operations', detail: 'Changes and confirmations are handled by hand.', answer: 'Workflow automation updates bookings and sends confirmations.' },
  ],
  'legal-professional-services': [
    { problem: 'Contract review is slow', detail: 'Associates read every clause manually.', answer: 'Document AI highlights clauses, deviations and obligations for lawyer review.' },
    { problem: 'Knowledge is hard to reuse', detail: 'Precedents are buried in file shares.', answer: 'Semantic search across approved precedents and templates.' },
    { problem: 'Non-billable admin', detail: 'Intake and time capture take hours.', answer: 'Automated intake, conflict-check preparation and time summaries.' },
  ],
  insurance: [
    { problem: 'Claims intake is manual', detail: 'Forms, photos and reports arrive unstructured.', answer: 'Claims document AI extracts and classifies claim data for handlers.' },
    { problem: 'Slow policyholder responses', detail: 'Status questions flood call centres.', answer: 'Policy and claims assistants answer status questions securely.' },
    { problem: 'Fraud indicators are missed', detail: 'Patterns are hard to see manually.', answer: 'Anomaly detection flags claims for investigator review. Decisions stay with people.' },
  ],
  telecommunications: [
    { problem: 'High support volume', detail: 'Repetitive billing and connectivity questions.', answer: 'AI support agents resolve common issues and route the rest.' },
    { problem: 'Customer churn', detail: 'At-risk customers are identified too late.', answer: 'Churn prediction models prioritize retention outreach.' },
    { problem: 'Network operations noise', detail: 'Too many alerts, too little context.', answer: 'AI groups and summarizes alerts for NOC teams.' },
  ],
  'startups-saas': [
    { problem: 'Shipping AI features fast', detail: 'Small teams lack AI engineering depth.', answer: 'A dedicated AI squad builds and ships features on your roadmap.' },
    { problem: 'MVP needs to scale', detail: 'Early architecture becomes a bottleneck.', answer: 'Multi-tenant SaaS architecture designed for growth.' },
    { problem: 'Uncertain AI costs', detail: 'Model usage costs are unpredictable.', answer: 'LLMOps with evaluation, caching and cost monitoring.' },
  ],
};

/** Section 11 of the template: FAQs, generated from each industry's verified data. */
export function industryFaqs(d: Industry): { q: string; a: string }[] {
  const list = d.solutions.slice(0, 4).map((s) => s.title).join(', ');
  return [
    {
      q: `What AI solutions do you offer for ${d.short.toLowerCase()}?`,
      a: `Our ${d.short} solutions include ${list} and more. Each is scoped to your workflow during discovery.`,
    },
    {
      q: 'Does the AI make final decisions?',
      a: `No. Our systems assist your team and route critical outputs for human review.${d.note ? ' ' + d.note : ''}`,
    },
    {
      q: 'Can it integrate with the systems we already use?',
      a: "Integration options are confirmed during discovery once we've reviewed your systems, APIs and data, and designed to your security requirements.",
    },
    {
      q: 'How do we get started?',
      a: 'With a discovery consultation to map one workflow and agree KPIs, followed by a focused pilot measured against a baseline.',
    },
  ];
}
