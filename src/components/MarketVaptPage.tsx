import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";
import type { VaptMarket } from "@/lib/vaptMarkets";

const coverage = [
  ["Web application VAPT", "Authentication, authorization, session security, business logic, input handling, and configuration."],
  ["API penetration testing", "REST and GraphQL authorization, token handling, data exposure, injection, and resource abuse."],
  ["Network VAPT", "External and internal services, known vulnerability validation, weak access, segmentation, and attack paths."],
  ["Cloud security assessment", "Identity, public exposure, storage, network controls, logging, and service configuration."],
  ["Mobile application testing", "Client storage, transport, platform controls, application logic, and backend API exposure."],
  ["Remediation retesting", "Focused validation of agreed fixes and an updated finding status for the engagement record."],
];

const process = ["Scope and rules of engagement", "Access and test readiness", "Discovery and manual validation", "Risk analysis and quality review", "Executive and technical reporting", "Remediation clarification and retest"];

export function MarketVaptPage({ market }: { market: VaptMarket }) {
  return (
    <main>
      <JsonLd data={serviceSchema(market.title, market.description, market.path, market.country)} />
      <JsonLd data={faqSchema(market.faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: market.title, path: market.path }])} />
      <section className="page-hero">
        <p className="eyebrow">Vulnerability assessment and penetration testing</p>
        <h1>{market.title}</h1>
        <p>{market.intro}</p>
        <div className="inline-actions">
          <ButtonLink href="/request-assessment">Request a VAPT Scope</ButtonLink>
          <ButtonLink href="/reports" variant="secondary">View Sample VAPT Reports</ButtonLink>
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow="Assessment coverage" title="VAPT for applications, APIs, infrastructure, and cloud" body="Every engagement is scoped around the assets, user roles, exposure, operational constraints, and evidence your team actually needs." />
        <div className="grid grid-3">
          {coverage.map(([title, body]) => <article className="capability-card" key={title}><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>

      <section className="section section-alt">
        <SectionHeading eyebrow={`For ${market.country} teams`} title="Security testing matched to business milestones" />
        <div className="grid grid-3">
          {market.triggers.map((item) => <article className="principle-card" key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}
        </div>
      </section>

      <section className="split-section">
        <SectionHeading eyebrow="Engagement process" title="From written scope to verified remediation" body="Testing begins only after authorization and agreed rules of engagement. Findings are manually reviewed before reporting." />
        <div className="timeline">
          {process.map((item, index) => <div className="timeline-item" key={item}><span className="step-number">{index + 1}</span><h3>{item}</h3></div>)}
        </div>
      </section>

      <section className="section section-alt">
        <SectionHeading eyebrow="Who we support" title={`VAPT for growing and established organizations in ${market.country}`} />
        <div className="grid grid-3">
          {market.buyers.map((item) => <div className="capability-card" key={item}>{item}</div>)}
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow="Local context" title={`Security and assurance considerations in ${market.country}`} body="These references provide context, not legal advice or a claim of automatic compliance." />
        <div className="grid grid-2">
          {market.context.map((item) => <article className="capability-card" key={item.title}><h3>{item.title}</h3><p>{item.body}</p><Link href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>{item.linkLabel}</Link></article>)}
        </div>
      </section>

      <section className="section section-alt">
        <SectionHeading eyebrow="VAPT FAQ" title={`Planning a VAPT engagement in ${market.country}`} />
        <div className="grid grid-3">
          {market.faqs.map((item) => <article className="faq-item" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>)}
        </div>
      </section>
      <CtaBand cta="Request a VAPT Scope" />
    </main>
  );
}
