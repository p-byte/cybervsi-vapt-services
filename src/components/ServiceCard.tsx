import { ButtonLink } from "./ButtonLink";
import {
  Bot,
  CloudCog,
  Crosshair,
  Eye,
  Network,
  ScanSearch,
  ShieldCheck,
  Smartphone,
  Workflow,
} from "lucide-react";

const icons = {
  "vulnerability-management": ScanSearch,
  soc: Eye,
  "application-security": Workflow,
  "mobile-security": Smartphone,
  vapt: ShieldCheck,
  "network-security": Network,
  "cloud-security": CloudCog,
  "red-teaming": Crosshair,
  "ai-security": Bot,
} as const;

export function ServiceCard({
  title,
  description,
  capabilities,
  href,
  cta,
  slug,
}: {
  title: string;
  description: string;
  capabilities: readonly string[];
  href: string;
  cta: string;
  slug?: string;
}) {
  const Icon = icons[slug as keyof typeof icons] ?? ShieldCheck;

  return (
    <article className="service-card" id={slug}>
      <span className="service-icon" aria-hidden="true"><Icon size={24} strokeWidth={1.8} /></span>
      <h3>{title}</h3>
      <p>{description}</p>
      <ul className="tag-list">
        {capabilities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <ButtonLink href={href} variant="secondary">
        {cta}
      </ButtonLink>
    </article>
  );
}
