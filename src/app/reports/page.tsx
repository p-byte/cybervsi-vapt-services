import { ButtonLink } from "@/components/ButtonLink";
import { SectionHeading } from "@/components/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sample VAPT Reports",
  description: "View sample CyberVSI VAPT reports for web application and external network assessments.",
  path: "/reports",
});

const reports = [
  {
    title: "Web Application VAPT Report",
    description:
      "A fictional assessment showing executive risk context, scope, methodology, findings, evidence, and prioritized remediation.",
    detail: "Web application · OWASP-aligned · Sample PDF",
    href: "/reports/cybervsi-web-application-vapt-sample.pdf",
  },
  {
    title: "External Network VAPT Report",
    description:
      "A fictional external perimeter assessment covering exposed services, validation results, risk ratings, and remediation guidance.",
    detail: "External network · NIST-informed · Sample PDF",
    href: "/reports/cybervsi-external-network-vapt-sample.pdf",
  },
];

export default function ReportsPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Sample deliverables</p>
        <h1>See How CyberVSI Reports Security Risk</h1>
        <p>
          These examples use fictional systems and findings. They demonstrate report structure and
          communication style only and do not represent a real client engagement.
        </p>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="VAPT reports"
          title="Clear enough for leadership. Detailed enough for remediation."
          body="Each sample separates executive context from technical evidence and gives owners a practical order of action."
        />
        <div className="grid grid-2 report-grid">
          {reports.map((report) => (
            <article className="report-card" key={report.href}>
              <div className="report-preview" aria-hidden="true">
                <span>CYBERVSI</span>
                <strong>VAPT</strong>
                <small>SAMPLE REPORT</small>
              </div>
              <p className="report-meta">{report.detail}</p>
              <h2>{report.title}</h2>
              <p>{report.description}</p>
              <div className="inline-actions">
                <a className="button button-primary" href={report.href} target="_blank" rel="noreferrer">
                  View PDF
                </a>
                <a className="button button-ghost" href={report.href} download>
                  Download
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="report-note">
          Reporting structure is informed by OWASP Web Security Testing Guide reporting guidance
          and NIST SP 800-115. Findings, organizations, domains, IP addresses, and evidence are fictional.
        </p>
      </section>

      <section className="cta-band">
        <div>
          <p className="eyebrow">Ready to scope an assessment?</p>
          <h2>Get a VAPT plan matched to your environment.</h2>
        </div>
        <ButtonLink href="/request-assessment">Request an Assessment</ButtonLink>
      </section>
    </main>
  );
}
