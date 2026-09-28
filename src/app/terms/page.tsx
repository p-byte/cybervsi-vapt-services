import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms",
  description: "Website terms for CyberVSI.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main className="legal-page">
      <p className="eyebrow">Terms</p>
      <h1>Terms of Use</h1>
      <p>
        This placeholder should be reviewed by qualified counsel before production launch. It does
        not create a testing authorization, managed service agreement, or incident response retainer.
      </p>
      <h2>Website use</h2>
      <p>
        Website content is provided for general business information. Security testing, monitoring,
        and advisory work require written scope, authorization, and agreed engagement terms.
      </p>
      <h2>No unauthorized testing</h2>
      <p>
        Submitting an inquiry does not authorize scanning, exploitation, monitoring, access, or any
        other security activity against a third-party or customer environment.
      </p>
      <h2>Service descriptions</h2>
      <p>
        Service pages describe potential capabilities. Actual deliverables, timelines, coverage,
        and responsibilities should be defined in a signed statement of work or service agreement.
      </p>
    </main>
  );
}
