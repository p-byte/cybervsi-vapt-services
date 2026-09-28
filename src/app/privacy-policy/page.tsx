import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for CyberVSI website visitors and service inquiries.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <p className="eyebrow">Privacy</p>
      <h1>Privacy Policy</h1>
      <p>
        This placeholder should be reviewed by qualified counsel before production launch. It
        describes the intended privacy posture without pretending to be legal advice.
      </p>
      <h2>Information collected</h2>
      <p>
        The assessment and contact forms may collect name, business email, company, service
        interest, company size, and the message submitted.
      </p>
      <h2>Use of information</h2>
      <p>
        Submitted information is intended to respond to security service inquiries, scope potential
        engagements, and maintain business communication records.
      </p>
      <h2>Security</h2>
      <p>
        Form handling should be connected to an approved backend, CRM, or email workflow using
        environment variables and server-side validation. Sensitive credentials should never be
        submitted through public forms.
      </p>
    </main>
  );
}
