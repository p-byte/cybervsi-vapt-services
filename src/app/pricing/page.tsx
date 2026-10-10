import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { faqSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "VAPT Pricing India",
  description: "Indicative CyberVSI pricing for web application VAPT, API security testing, and recurring vulnerability reviews in India.",
  path: "/pricing",
});

const packages = [
  { name: "Starter Web VAPT", price: "₹15,000–₹25,000", scope: "A small, clearly bounded web application", items: ["Agreed application scope", "Manual and tool-assisted testing", "Executive and technical report", "Remediation guidance", "Retest scope defined in proposal"] },
  { name: "API Security Assessment", price: "₹20,000–₹40,000", scope: "A limited set of documented API endpoints", items: ["REST or GraphQL scope", "Role and object authorization testing", "Authentication and token review", "Evidence-backed findings", "Remediation guidance"] },
  { name: "Standard Web VAPT", price: "₹35,000–₹65,000", scope: "A more complex application with multiple roles and workflows", items: ["Authenticated multi-role testing", "Business logic assessment", "Application and related API coverage", "Prioritized executive report", "Technical report and retest option"] },
  { name: "Monthly Vulnerability Review", price: "₹8,000–₹20,000/month", scope: "Defined assets and recurring assessment activities", items: ["Agreed asset inventory", "Scheduled vulnerability review", "Risk-based prioritization", "Remediation tracking", "Periodic reporting"] },
];

const faqs = [
  { question: "Are these fixed prices?", answer: "No. These are CyberVSI introductory planning bands, not verified market averages or binding quotations. Final pricing follows a written scope review." },
  { question: "What changes the price?", answer: "Application size, authenticated roles, workflows, API endpoint count, environments, IP ranges, testing depth, reporting requirements, urgency, and retesting all affect effort." },
  { question: "How are projects paid?", answer: "A typical introductory engagement may use 50% on approval and 50% on report delivery. The proposal and statement of work define the actual commercial terms and applicable taxes." },
];

export default function PricingPage() {
  return <main>
    <JsonLd data={faqSchema(faqs)} />
    <section className="page-hero"><p className="eyebrow">Indicative India pricing</p><h1>VAPT Packages Built Around a Clear Testing Scope</h1><p>Use these introductory bands to plan a conversation. Every engagement is quoted after reviewing the application, access, roles, attack surface, evidence needs, and retesting requirements.</p><div className="inline-actions"><ButtonLink href="/request-assessment">Request a Written Scope</ButtonLink><ButtonLink href="/reports" variant="secondary">Review Sample Reports</ButtonLink></div></section>
    <section className="section"><SectionHeading eyebrow="Packages" title="Choose a useful starting point" body="Applicable taxes are quoted separately. Testing begins only after written authorization, scope approval, and rules of engagement." /><div className="grid grid-2">{packages.map((item) => <article className="service-card" key={item.name}><p className="eyebrow">{item.scope}</p><h2>{item.name}</h2><p className="service-price">{item.price}</p><ul className="check-list">{item.items.map((detail) => <li key={detail}>{detail}</li>)}</ul><ButtonLink href="/request-assessment" variant="ghost">Discuss This Scope</ButtonLink></article>)}</div></section>
    <section className="section section-alt"><SectionHeading eyebrow="FAQ" title="Pricing and commercial questions" /><div className="grid grid-3">{faqs.map((item) => <article className="faq-item" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>)}</div></section>
    <CtaBand cta="Request a Written Scope" />
  </main>;
}
