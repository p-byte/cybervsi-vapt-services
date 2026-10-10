import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { SecurityVisual } from "@/components/SecurityVisual";
import { ServiceCard } from "@/components/ServiceCard";
import { siteConfig } from "@/lib/config";
import { coreServices } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Web Application & API VAPT Services",
  description:
    "Web application and API VAPT services for Indian startups and software companies, with manual validation, actionable reports, and remediation retesting.",
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
          <p className="eyebrow">Web Application VAPT · API Security Testing</p>
          <h1>Application Security Testing for Software Teams That Need Clear Answers.</h1>
          <p className="hero-copy">
            {siteConfig.name} helps Indian startups and growing software companies identify
            exploitable weaknesses in web applications and APIs, with practical remediation
            guidance and verification testing.
          </p>
          <div className="hero-actions">
            <ButtonLink href="/request-assessment">Request a Security Assessment</ButtonLink>
            <ButtonLink href="/pricing" variant="secondary">
              View VAPT Packages
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
          eyebrow="Flagship services"
          title="Focused testing for the systems your customers depend on"
          body="Start with a clearly bounded web application or API assessment. Network testing and recurring vulnerability reviews remain available when the scope requires them."
        />
        <div className="grid grid-2">
          <article className="capability-card">
            <h3>Web Application VAPT</h3>
            <p>Manual testing of authentication, authorization, session handling, business logic, input processing, and security configuration.</p>
            <ButtonLink href="/services/web-application-penetration-testing" variant="ghost">Explore Web Application VAPT</ButtonLink>
          </article>
          <article className="capability-card">
            <h3>API Security Testing</h3>
            <p>Authorization, authentication, data exposure, resource abuse, injection, and business workflow testing for REST and GraphQL APIs.</p>
            <ButtonLink href="/services/api-penetration-testing" variant="ghost">Explore API Security Testing</ButtonLink>
          </article>
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
