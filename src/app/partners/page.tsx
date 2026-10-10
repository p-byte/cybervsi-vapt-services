import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "VAPT Partner for Software Development Agencies", description: "Independent web application and API security testing support for Indian software development agencies, consultancies, cloud providers, and MSPs.", path: "/partners" });

const models = [
  ["Referral", "Introduce a qualified client that needs independent web or API security testing. Commercial and delivery responsibilities are agreed before the introduction."],
  ["Subcontract delivery", "CyberVSI performs an authorized assessment within a written scope while the agency retains the primary client relationship."],
  ["Project collaboration", "Add independent security testing to a launch, migration, enterprise onboarding, or assurance project with clear ownership and communication."],
];

export default function PartnersPage() {
  return <main>
    <section className="page-hero"><p className="eyebrow">Agency partnerships</p><h1>An Independent VAPT Partner for Your Client Projects</h1><p>CyberVSI supports software development agencies, cloud providers, consultants, and MSPs that need scoped web application and API security testing without building a full internal testing practice.</p><div className="inline-actions"><ButtonLink href="/request-assessment">Discuss a Partnership</ButtonLink><ButtonLink href="/reports" variant="secondary">Review Sample Deliverables</ButtonLink></div></section>
    <section className="section"><SectionHeading eyebrow="Partnership models" title="A clear delivery model for each opportunity" body="Referral terms, client ownership, confidentiality, branding, testing authorization, scope, and payment are documented before work begins." /><div className="grid grid-3">{models.map(([title, body]) => <article className="capability-card" key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <section className="split-section section-alt"><SectionHeading eyebrow="Good fit" title="When to involve CyberVSI" body="Bring us in when a client needs independent application testing, enterprise security evidence, launch assurance, remediation verification, or a technically detailed report." /><ul className="check-list"><li>Web applications with authenticated user roles</li><li>REST or GraphQL APIs</li><li>Customer or procurement security reviews</li><li>Pre-launch and major-release testing</li><li>Remediation retesting</li><li>Recurring vulnerability reviews</li></ul></section>
    <section className="section"><SectionHeading eyebrow="Safeguards" title="Professional boundaries protect every party" /><div className="grid grid-3"><div className="principle-card">Written client authorization</div><div className="principle-card">NDA and statement of work</div><div className="principle-card">Defined testing windows and exclusions</div><div className="principle-card">Emergency contacts and stop conditions</div><div className="principle-card">Secure evidence handling</div><div className="principle-card">Report quality review</div></div></section>
    <CtaBand cta="Discuss a Partnership" />
  </main>;
}
