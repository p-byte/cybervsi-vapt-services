import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/lib/config";
import { faqSchema, pageMetadata, serviceSchema } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "SOC L1 & L2 Support Services",
  description:
    "SOC L1 and L2 analyst support for Microsoft Sentinel, Microsoft Defender for Endpoint, Check Point, alert triage, investigation, escalation, and reporting.",
  path: "/services/soc",
});

const capabilities = [
  "SOC L1 Alert Monitoring & Triage",
  "SOC L2 Investigation & Escalation",
  "Microsoft Sentinel",
  "Microsoft Defender for Endpoint",
  "Check Point Security",
  "SIEM Monitoring",
  "Security Alert Investigation",
  "Incident Triage",
  "Threat Detection",
  "Threat Hunting",
  "Log Correlation",
  "Endpoint Security Monitoring",
  "Cloud Security Monitoring",
  "Identity Monitoring",
  "Network Security Monitoring",
  "Escalation Support",
  "Security Reporting",
];

const workflow = [
  "Telemetry",
  "SIEM / Security Platforms",
  "Detection",
  "SOC Analyst Investigation",
  "Validation",
  "Incident Classification",
  "Escalation / Response",
  "Reporting & Improvement",
];

const sections = [
  ["What We Monitor", "Logs and signals from the agreed systems, security tools, cloud services, endpoints, networks, and identity platforms."],
  ["How Detection Works", "Detection logic maps telemetry to suspicious behavior, known attack patterns, policy violations, and emerging risk."],
  ["Investigation Process", "Analysts review alerts, correlate context, reduce false positives, and identify the likely impact."],
  ["Escalation Process", "Confirmed or material events are classified and escalated according to agreed contact paths and severity definitions."],
  ["Reporting", "Reporting gives stakeholders a useful view of alerts, incidents, recurring causes, and improvement opportunities."],
  ["Use Case Optimization", "Detection use cases can be tuned over time as the environment, threats, and business priorities change."],
];

const faqs = [
  {
    question: "Is coverage always 24x7?",
    answer:
      "Coverage is configurable. The site owner can offer business hours, extended hours, or 24x7 coverage when that commitment is enabled contractually.",
  },
  {
    question: "Do you replace the internal security team?",
    answer:
      "SOC services can support internal teams by handling monitoring, investigation, triage, and reporting responsibilities that would otherwise require dedicated in-house capacity.",
  },
];

export default function SocPage() {
  return (
    <main>
      <JsonLd data={serviceSchema("SOC L1 and L2 Support", metadata.description as string, "/services/soc")} />
      <JsonLd data={faqSchema(faqs)} />
      <section className="page-hero">
        <p className="eyebrow">SOC L1 & L2 Support</p>
        <h1>Practical Analyst Support for Security Monitoring and Investigation.</h1>
        <p>
          L1 and L2 security operations support helps teams monitor queues, triage alerts,
          investigate suspicious activity, document evidence, and escalate confirmed incidents.
        </p>
      </section>
      <section className="section">
        <SectionHeading
          eyebrow="Capabilities"
          title="Monitoring and investigation services shaped around your stack"
          body={siteConfig.serviceAvailability.socCoverage}
        />
        <div className="grid grid-4">
          {capabilities.map((item) => (
            <div className="capability-card" key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>
      <section className="split-section section-alt">
        <SectionHeading
          eyebrow="Workflow"
          title="From telemetry to reporting and improvement"
          body="The workflow is designed to reduce alert noise, preserve useful context, and escalate the events that matter."
        />
        <div className="workflow">
          {workflow.map((step, index) => (
            <div className="workflow-item" key={step}>
              <span className="step-number">{index + 1}</span>
              <h3>{step}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <SectionHeading eyebrow="Operations" title="How the SOC service works" />
        <div className="grid grid-3">
          {sections.map(([title, body]) => (
            <article className="process-step" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section section-alt">
        <SectionHeading eyebrow="FAQ" title="SOC service questions" />
        <div className="grid grid-3">
          {faqs.map((item) => (
            <article className="faq-item" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="Discuss your SOC requirement" cta="Talk to Our Security Team" />
    </main>
  );
}
