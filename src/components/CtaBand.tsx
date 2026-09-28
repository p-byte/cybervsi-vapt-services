import { siteConfig } from "@/lib/config";
import { ButtonLink } from "./ButtonLink";

export function CtaBand({
  title = "Ready to understand your security exposure?",
  body = "Share the environment, service need, and timeline. A security specialist can help shape the right assessment or monitoring engagement.",
  cta = "Request a Security Assessment",
}: {
  title?: string;
  body?: string;
  cta?: string;
}) {
  return (
    <section className="cta-band">
      <div>
        <p className="eyebrow">Next step</p>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <ButtonLink href={siteConfig.ctas.assessment}>{cta}</ButtonLink>
    </section>
  );
}
