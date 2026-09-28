import { LeadForm } from "@/components/LeadForm";
import { SectionHeading } from "@/components/SectionHeading";
import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk to the security team about assessments, SOC requirements, vulnerability management, partnerships, or general inquiries.",
  path: "/contact",
});

const inquiryTypes = [
  "VAPT Assessment",
  "SOC Services",
];

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Contact</p>
        <h1>Talk to Our Security Team</h1>
        <p>
          Tell us what you need assessed or monitored. We will review the request and reply by
          email with the right next steps.
        </p>
      </section>
      <section className="split-section">
        <div>
          <SectionHeading eyebrow="Inquiry types" title="What can we help with?" />
          <div className="grid">
            {inquiryTypes.map((item) => (
              <div className="contact-option" key={item}>
                {item}
              </div>
            ))}
          </div>
          <p>
            Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        </div>
        <LeadForm compact />
      </section>
    </main>
  );
}
