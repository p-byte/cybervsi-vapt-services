import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { breadcrumbSchema, faqSchema, pageMetadata, serviceSchema } from "@/lib/seo";
import { penetrationTestingServices, type PenetrationTestingSlug } from "@/lib/penetrationTestingServices";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(penetrationTestingServices).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = penetrationTestingServices[slug as PenetrationTestingSlug];
  if (!service) return {};
  return pageMetadata({
    title: `${service.name} Services`,
    description: service.description,
    path: `/services/${slug}`,
  });
}

export default async function PenetrationTestingPage({ params }: Props) {
  const { slug } = await params;
  const service = penetrationTestingServices[slug as PenetrationTestingSlug];
  if (!service) notFound();
  const faqs = service.faq.map(([question, answer]) => ({ question, answer }));
  const path = `/services/${slug}`;

  return (
    <main>
      <JsonLd data={serviceSchema(service.name, service.description, path)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: service.name, path }])} />
      <section className="page-hero">
        <p className="eyebrow">Penetration testing services</p>
        <h1>{service.name} Services</h1>
        <p>{service.intro}</p>
        <div className="inline-actions">
          <ButtonLink href="/request-assessment">Request a Testing Scope</ButtonLink>
          <ButtonLink href="/reports" variant="secondary">View Sample Reports</ButtonLink>
        </div>
      </section>
      <section className="section">
        <SectionHeading eyebrow="What we test" title="Assessment coverage matched to your environment" body="The final scope is based on your architecture, user roles, exposure, business workflows, and assurance objectives." />
        <div className="grid grid-3">
          {service.targets.map((item) => <div className="capability-card" key={item}>{item}</div>)}
        </div>
      </section>
      <section className="section section-alt">
        <SectionHeading eyebrow="Security coverage" title="Manual validation beyond scanner output" body="Testing combines structured discovery with analyst-led validation to distinguish exploitable weaknesses from noise." />
        <ul className="grid grid-3 check-list">
          {service.coverage.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
      <section className="section">
        <SectionHeading eyebrow="Deliverables" title="Evidence and guidance your teams can act on" />
        <ul className="grid grid-3 check-list">
          {service.outcomes.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="inline-actions">
          <Link className="button button-ghost" href="/services/vapt">Review the VAPT methodology</Link>
        </div>
      </section>
      <section className="section section-alt">
        <SectionHeading eyebrow="FAQ" title={`Common ${service.shortName.toLowerCase()} questions`} />
        <div className="grid grid-3">
          {faqs.map((item) => <article className="faq-item" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>)}
        </div>
      </section>
      <CtaBand cta="Request a Testing Scope" />
    </main>
  );
}
