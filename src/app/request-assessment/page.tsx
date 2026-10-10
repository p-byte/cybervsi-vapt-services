import { LeadForm } from "@/components/LeadForm";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Security Assessment",
  description:
    "Request a professional security assessment for VAPT, SOC services, vulnerability management, or another cybersecurity requirement.",
  path: "/request-assessment",
});

export default function RequestAssessmentPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Request assessment</p>
        <h1>Request a Security Assessment</h1>
        <p>
          Tell us what you need assessed or monitored. Avoid sending passwords, API keys, private
          keys, production data, or sensitive internal documents through this form.
        </p>
      </section>
      <section className="split-section">
        <SectionHeading
          eyebrow="Your requirement"
          title="Tell us what needs to be tested or monitored"
          body="Share the type of application, API, infrastructure, or security operation you need help with. We will use the information to understand the scope and respond by email."
        />
        <LeadForm />
      </section>
    </main>
  );
}
