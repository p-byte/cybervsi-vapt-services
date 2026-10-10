import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import Link from "next/link";
import { penetrationTestingServices } from "@/lib/penetrationTestingServices";
import { faqSchema, pageMetadata, serviceSchema } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "VAPT Services",
  description:
    "Vulnerability Assessment and Penetration Testing services for web applications, APIs, networks, cloud infrastructure, and mobile applications.",
  path: "/services/vapt",
});

const testAreas = [
  "Web Applications",
  "APIs",
  "External Networks",
  "Internal Networks",
  "Cloud Infrastructure",
  "Mobile Applications",
];

const methodology = [
  "Scoping",
  "Reconnaissance",
  "Vulnerability Discovery",
  "Manual Validation",
  "Exploitation",
  "Risk Assessment",
  "Reporting",
  "Remediation Guidance",
  "Retesting",
];

const deliverables = [
  "Executive Summary",
  "Technical Findings",
  "Risk Ratings",
  "Evidence",
  "Proof of Concept where appropriate",
  "Affected Assets",
  "Business Impact",
  "Remediation Recommendations",
  "Retesting Results",
];

const faqs = [
  {
    question: "Is VAPT only an automated scan?",
    answer:
      "No. Automated discovery can help coverage, but the engagement emphasizes manual validation, exploitability review, business impact, and clear remediation guidance.",
  },
  {
    question: "Which methodologies guide the testing?",
    answer:
      "Testing can reference OWASP, PTES, NIST, and MITRE ATT&CK where appropriate. References do not imply official affiliation or certification.",
  },
  {
    question: "Can you retest after remediation?",
    answer:
      "Yes, retesting can be included in the scope so resolved issues are validated and reflected in the final engagement record.",
  },
];

export default function VaptPage() {
  return (
    <main>
      <JsonLd data={serviceSchema("VAPT Services", metadata.description as string, "/services/vapt")} />
      <JsonLd data={faqSchema(faqs)} />
      <section className="page-hero">
        <p className="eyebrow">VAPT</p>
        <h1>Vulnerability Assessment & Penetration Testing</h1>
        <p>
          Identify exploitable weaknesses across applications, APIs, networks, cloud infrastructure,
          and mobile systems before attackers can take advantage of them.
        </p>
        <div className="inline-actions">
          <ButtonLink href="/request-assessment">Request a VAPT Assessment</ButtonLink>
        </div>
      </section>
      <section className="split-section">
        <SectionHeading
          eyebrow="What is VAPT?"
          title="A practical view of exploitable risk"
          body="VAPT combines vulnerability discovery with penetration testing techniques to determine whether weaknesses are real, exploitable, and relevant to the business."
        />
        <div className="capability-card">
          <h3>Why organizations need it</h3>
          <p>
            Security teams use VAPT before launches, after major changes, during vendor reviews,
            and as part of recurring assurance programs. The goal is not a long list of theoretical
            issues; it is a usable view of risk and remediation priority.
          </p>
        </div>
      </section>
      <section className="section section-alt">
        <SectionHeading eyebrow="What we test" title="Coverage shaped around your environment" />
        <div className="grid grid-3">
          {testAreas.map((area) => (
            <div className="capability-card" key={area}>
              {area}
            </div>
          ))}
        </div>
        <div className="grid grid-3">
          {Object.entries(penetrationTestingServices).map(([slug, service]) => (
            <article className="capability-card" key={slug}>
              <h2>{service.shortName}</h2>
              <p>{service.description}</p>
              <Link href={`/services/${slug}`}>View service details</Link>
            </article>
          ))}
        </div>
      </section>
      <section className="split-section">
        <SectionHeading
          eyebrow="Methodology"
          title="Structured testing with manual analyst review"
          body="The process can reference OWASP, PTES, NIST, and MITRE ATT&CK where those frameworks are useful to the engagement."
        />
        <div className="timeline">
          {methodology.map((step, index) => (
            <div className="timeline-item" key={step}>
              <span className="step-number">{index + 1}</span>
              <h3>{step}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="section section-alt">
        <SectionHeading eyebrow="Deliverables" title="Reports your teams can use" />
        <ul className="grid grid-3 check-list">
          {deliverables.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="section">
        <SectionHeading eyebrow="FAQ" title="Common VAPT questions" />
        <div className="grid grid-3">
          {faqs.map((item) => (
            <article className="faq-item" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section section-alt">
        <SectionHeading eyebrow="Markets" title="VAPT services for India and Singapore" body="Review market-specific service coverage, buyer questions, and security context for each country." />
        <div className="inline-actions">
          <Link className="button button-secondary" href="/vapt-services-india">VAPT Services in India</Link>
          <Link className="button button-secondary" href="/vapt-services-singapore">VAPT Services in Singapore</Link>
        </div>
      </section>
      <CtaBand cta="Request a VAPT Assessment" />
    </main>
  );
}
