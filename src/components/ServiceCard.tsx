import { ButtonLink } from "./ButtonLink";

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
  return (
    <article className="service-card" id={slug}>
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
