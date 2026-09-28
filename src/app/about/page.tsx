import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Learn about the cybersecurity team, approach, principles, and service philosophy behind CyberVSI.",
  path: "/about",
});

const principles = [
  "Accuracy",
  "Confidentiality",
  "Responsible Testing",
  "Clear Communication",
  "Actionable Security",
  "Continuous Improvement",
];

const sections = [
  ["Who We Are", "We are a team of cybersecurity professionals focused on helping organizations identify vulnerabilities, monitor security threats, and improve their overall security posture."],
  ["Our Approach", "We combine structured methodology with analyst judgment so findings are validated, clearly explained, and useful to technical owners."],
  ["Security Expertise", "The team supports application security, network testing, security monitoring, exposure management, and remediation planning."],
  ["How We Work", "Engagements are scoped transparently, delivered with care for operational risk, and reported in language that supports technical and executive decisions."],
];

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">About</p>
        <h1>A cybersecurity team built around practical assurance.</h1>
        <p>
          The work is designed for organizations that need trustworthy testing, monitoring, and
          vulnerability management without exaggerated claims or unclear deliverables.
        </p>
      </section>
      <section className="section">
        <div className="grid grid-4">
          {sections.map(([title, body]) => (
            <article className="process-step" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section section-alt">
        <SectionHeading eyebrow="Principles" title="How we handle security work" />
        <div className="grid grid-3">
          {principles.map((item) => (
            <div className="principle-card" key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <SectionHeading
          eyebrow="Team"
          title="Team profiles can be added when real details are available"
          body="The page supports optional team member cards for photo, name, role, short bio, and LinkedIn. No fake people have been generated."
        />
      </section>
      <CtaBand />
    </main>
  );
}
