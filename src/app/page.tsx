import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { SecurityVisual } from "@/components/SecurityVisual";
import { ServiceCard } from "@/components/ServiceCard";
import { siteConfig } from "@/lib/config";
import { coreServices } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cybersecurity Services",
  description:
    "VAPT, SOC monitoring, and vulnerability management services for organizations that need practical security assurance.",
});

const trustCapabilities = [
  "Web Application Security",
  "API Security",
  "Network Security",
  "Cloud Security",
  "Endpoint Monitoring",
  "SIEM Monitoring",
  "Threat Detection",
  "Vulnerability Management",
];

const process = [
  ["Discovery", "Understand your environment, objectives, security concerns, and scope."],
  ["Scope", "Define assets, applications, infrastructure, timelines, and boundaries."],
  ["Assessment / Monitoring", "Perform the agreed security activity with the right controls."],
  ["Analysis", "Validate findings and determine actual security risk."],
  ["Reporting", "Provide actionable technical and executive reporting."],
  ["Remediation", "Work with your technical teams to understand and address issues."],
  ["Validation", "Retest or validate remediation where included in the engagement."],
];

const industries = [
  "SaaS",
  "FinTech",
  "Healthcare",
  "E-Commerce",
  "Technology",
  "Professional Services",
  "Startups",
  "SMEs",
  "Enterprises",
];

const differentiators = [
  "Manual security validation",
  "Actionable findings",
  "Clear remediation guidance",
  "Risk-focused prioritization",
  "Security analyst expertise",
  "Flexible engagements",
  "Technical and executive reporting",
  "Transparent communication",
];

export default function Home() {
  return (
    <main className="page-main">
      <section className="hero">
        <div>
          <p className="eyebrow">VAPT · SOC · Vulnerability Management</p>
          <h1>Find Security Gaps Before Attackers Do.</h1>
          <p className="hero-copy">
            {siteConfig.name} helps organizations identify vulnerabilities, monitor threats, and
            manage security exposure through practical testing, security operations support, and
            continuous vulnerability management.
          </p>
          <div className="hero-actions">
            <ButtonLink href="/request-assessment">Request a Security Assessment</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              Explore Our Services
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Talk to a Security Expert
            </ButtonLink>
          </div>
        </div>
        <SecurityVisual />
      </section>

      <section className="section section-alt">
        <SectionHeading
          eyebrow="Trust"
          title="Security Built Around Real-World Threats"
          body="The work is grounded in evidence, analyst review, and communication your technical and leadership teams can act on."
        />
        <div className="grid grid-4">
          {trustCapabilities.map((item) => (
            <div className="capability-card" key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Core services"
          title="Focused security services for modern organizations"
          body="Dedicated service tracks make it clear what will be tested, monitored, prioritized, and reported."
        />
        <div className="grid grid-3">
          {coreServices.map((service) => (
            <ServiceCard key={service.slug} {...service} />
          ))}
        </div>
      </section>

      <section className="split-section section-alt" id="how-we-work">
        <SectionHeading
          eyebrow="How we work"
          title="A clear engagement process from scope to validation"
          body="Each engagement is scoped around business objectives, technical reality, and a usable report."
        />
        <div className="timeline">
          {process.map(([title, body], index) => (
            <div className="timeline-item" key={title}>
              <span className="step-number">{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="industries">
        <SectionHeading
          eyebrow="Industries"
          title="Security support for teams with different operating realities"
          body="Engagements can be adapted to product teams, regulated environments, growing companies, and enterprise technology estates."
        />
        <div className="grid grid-3">
          {industries.map((industry) => (
            <div className="capability-card" key={industry}>
              {industry}
            </div>
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <SectionHeading eyebrow="Why choose us" title="Credibility without inflated claims" />
        <div className="grid grid-4">
          {differentiators.map((item) => (
            <div className="principle-card" key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
