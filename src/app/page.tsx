import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { LeadForm } from "@/components/LeadForm";
import { SectionHeading } from "@/components/SectionHeading";
import { SecurityVisual } from "@/components/SecurityVisual";
import { ServiceCard } from "@/components/ServiceCard";
import { siteConfig } from "@/lib/config";
import { coreServices } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
import { ArrowRight, BadgeCheck, FileSearch, Gauge, Radar, RotateCcw, Wrench } from "lucide-react";

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

const testingApproaches = [
  {
    label: "External perspective",
    title: "Black Box Testing",
    body: "Testing with limited prior knowledge to simulate a realistic external attacker perspective.",
    points: ["Minimal prior information", "External attack-surface focus", "Realistic attacker simulation"],
  },
  {
    label: "Authenticated perspective",
    title: "Grey Box Testing",
    body: "Controlled knowledge or user access enables deeper application and authorization testing.",
    points: ["Role and privilege testing", "Authenticated attack paths", "Balance of depth and realism"],
  },
  {
    label: "Deep assessment",
    title: "White Box Testing",
    body: "Extensive technical information supports deeper testing of application logic, code, and architecture.",
    points: ["Maximum assessment context", "Deep technical coverage", "Useful for complex applications"],
  },
];

const assessmentDeliverables = [
  "Executive security summary",
  "Technical vulnerability findings",
  "Severity and risk prioritization",
  "Evidence or proof of concept where applicable",
  "Impact analysis",
  "Remediation recommendations",
];

const afterAssessment = [
  "Remediation guidance for identified issues",
  "Discussion of important findings with stakeholders",
  "Retesting after remediation where included",
  "Validation of resolved vulnerabilities",
  "Scope-based support for compliance requirements",
  "Clear next steps for improving security posture",
];

const operatingSignals = [
  ["9", "Focused security service tracks"],
  ["3", "Testing approaches available"],
  ["L1 + L2", "SOC analyst support"],
  ["India + Singapore", "Primary service markets"],
];

const whyVapt = [
  { icon: Radar, title: "Discover the real attack surface", body: "Identify exposed services, vulnerable components, insecure configurations, and application weaknesses across the agreed scope." },
  { icon: Gauge, title: "Prioritize by practical risk", body: "Separate scanner noise from validated issues and understand exploitability, affected assets, and likely business impact." },
  { icon: FileSearch, title: "Give engineers usable evidence", body: "Provide reproduction steps, screenshots or requests where appropriate, affected components, and clear remediation recommendations." },
  { icon: RotateCcw, title: "Validate fixes through retesting", body: "Reassess remediated findings where included and document whether the original exposure has been resolved." },
];

const toolGroups = [
  ["Application & API", "Burp Suite, HCL AppScan, SAST, DAST, SCA"],
  ["Mobile", "MobSF, Android Studio, Genymotion"],
  ["Network", "Nmap, Wireshark, manual protocol validation"],
  ["Exposure Management", "Tenable and Nessus"],
  ["Cloud", "Prowler and configuration review workflows"],
  ["SOC Operations", "Microsoft Sentinel, Defender for Endpoint, Check Point"],
];

const homeFaqs = [
  ["Is VAPT only an automated vulnerability scan?", "No. Tools support coverage and discovery, while analysts manually validate important findings, assess exploitability, and document practical impact."],
  ["What access is required for an assessment?", "It depends on the selected black box, grey box, or white box approach. Scope may include test accounts, API documentation, source context, IP ranges, or cloud configuration access."],
  ["Will testing affect production systems?", "Testing boundaries, windows, exclusions, emergency contacts, and safety controls are agreed before work begins. High-risk techniques require explicit authorization."],
  ["Do you provide remediation support and retesting?", "Reports include remediation recommendations. Retesting and findings discussions can be included in the written engagement scope."],
];

export default function Home() {
  return (
    <main className="page-main">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Expert-led VAPT · India & Singapore</p>
          <h1>Find exploitable risk before it becomes an incident.</h1>
          <p className="hero-copy">
            {siteConfig.name} validates security weaknesses across web applications, APIs, mobile
            apps, networks, and cloud environments, then gives your team a clear remediation plan.
          </p>
          <div className="hero-actions">
            <ButtonLink href="/request-assessment">Request a Security Assessment</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              Explore Security Services
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Talk to a Security Expert
            </ButtonLink>
          </div>
          <ul className="hero-proof" aria-label="Assessment benefits">
            <li>Manual validation</li>
            <li>Evidence-backed reporting</li>
            <li>Remediation guidance</li>
            <li>Retesting support</li>
          </ul>
        </div>
        <div className="hero-form-wrap">
          <p className="eyebrow">Secure assessment enquiry</p>
          <h2>Request your security assessment</h2>
          <p>Share the environment and objective. We will respond by email with the next steps for defining scope.</p>
          <LeadForm compact />
        </div>
      </section>

      <section className="signal-strip" aria-label="CyberVSI service coverage">
        {operatingSignals.map(([value, label]) => (
          <div className="metric" key={label}><strong>{value}</strong><span>{label}</span></div>
        ))}
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

      <section className="section" id="why-vapt">
        <SectionHeading
          eyebrow="Why VAPT"
          title="Move from vulnerability lists to defensible security decisions"
          body="A useful assessment tells your team what is exposed, what can be exploited, why it matters, and what should be fixed first."
        />
        <div className="grid grid-4 outcome-grid">
          {whyVapt.map(({ icon: Icon, title, body }, index) => (
            <article className="outcome-card" key={title}>
              <div className="outcome-top"><span>0{index + 1}</span><Icon size={25} aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="visual-section">
        <div>
          <SectionHeading
            eyebrow="Assessment intelligence"
            title="Connect findings to the systems and controls that matter"
            body="Testing combines attack-surface discovery, analyst validation, evidence, and risk context so teams can move from observation to remediation."
          />
          <ButtonLink href="/reports" variant="secondary">View Sample Reports</ButtonLink>
        </div>
        <SecurityVisual />
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

      <section className="section tools-section">
        <div className="tools-intro">
          <SectionHeading
            eyebrow="Technology coverage"
            title="Experienced across the tools in your security workflow"
            body="Tooling is selected according to the environment and scope. Automated results are reviewed before they become report findings."
          />
          <div className="tool-assurance"><BadgeCheck size={26} aria-hidden="true" /><span>Manual analyst validation remains central to every assessment.</span></div>
        </div>
        <div className="tool-matrix">
          {toolGroups.map(([title, body]) => (
            <article key={title}><Wrench size={20} aria-hidden="true" /><div><h3>{title}</h3><p>{body}</p></div></article>
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <SectionHeading
          eyebrow="Testing approaches"
          title="Choose the approach that matches your security objective"
          body="Black box, grey box, and white box testing can be selected according to the access, information, and depth required."
        />
        <div className="grid grid-3">
          {testingApproaches.map((approach) => (
            <article className="service-card" key={approach.title}>
              <p className="eyebrow">{approach.label}</p>
              <h3>{approach.title}</h3>
              <p>{approach.body}</p>
              <ul className="check-list">
                {approach.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section">
        <div>
          <SectionHeading
            eyebrow="What you receive"
            title="Turn security findings into an actionable remediation plan"
            body="Reports are structured to help technical teams understand, prioritize, and address security weaknesses."
          />
          <h3>Assessment Deliverables</h3>
          <ul className="check-list">{assessmentDeliverables.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <h3>After the Assessment</h3>
          <ul className="check-list">{afterAssessment.map((item) => <li key={item}>{item}</li>)}</ul>
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

      <section className="section faq-section" id="faq">
        <SectionHeading
          eyebrow="Planning an assessment"
          title="Answers to common VAPT questions"
          body="The exact approach, coverage, schedule, and deliverables are confirmed in a written scope before testing begins."
        />
        <div className="faq-stack">
          {homeFaqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary><span>{question}</span><ArrowRight size={20} aria-hidden="true" /></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
