import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata, serviceSchema } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Red Team Security Assessments",
  description: "Authorized Red Team assessments for adversary simulation, attack-path validation, detection testing, and defensive improvement.",
  path: "/services/red-teaming",
});

const objectives = [
  "Validate realistic paths to agreed critical assets",
  "Test whether security controls detect meaningful attacker behavior",
  "Exercise SOC investigation and escalation workflows",
  "Identify control gaps across people, process, and technology",
  "Provide evidence-led recommendations and a defensive debrief",
];

const phases = ["Objectives & Rules of Engagement", "Threat-Led Planning", "Authorized Adversary Simulation", "Detection & Response Observation", "Risk Analysis", "Reporting & Purple-Team Debrief"];

export default function RedTeamingPage() {
  return (
    <main>
      <JsonLd data={serviceSchema("Red Team Security Assessments", metadata.description as string, "/services/red-teaming")} />
      <section className="page-hero">
        <p className="eyebrow">Red Teaming</p>
        <h1>Test Defenses Against Realistic, Objective-Led Attack Paths.</h1>
        <p>Every Red Team engagement is explicitly authorized, bounded by written rules of engagement, and designed around agreed business and defensive objectives.</p>
        <div className="inline-actions"><ButtonLink href="/request-assessment">Discuss a Red Team Scope</ButtonLink></div>
      </section>
      <section className="split-section">
        <SectionHeading eyebrow="Objectives" title="Measure what your defenses can prevent, detect, and investigate" body="The assessment focuses on realistic attack paths and useful defensive outcomes, not uncontrolled activity." />
        <ul className="check-list">{objectives.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <section className="section section-alt">
        <SectionHeading eyebrow="Engagement flow" title="Controlled from planning through debrief" />
        <div className="grid grid-3">{phases.map((phase, index) => <article className="process-step" key={phase}><span className="step-number">{index + 1}</span><h3>{phase}</h3></article>)}</div>
      </section>
      <CtaBand title="Plan an authorized Red Team assessment" cta="Request a Scope Discussion" />
    </main>
  );
}
