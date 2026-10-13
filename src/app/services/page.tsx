import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import Link from "next/link";
import { coreServices } from "@/lib/services";
import { penetrationTestingServices } from "@/lib/penetrationTestingServices";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cybersecurity Services",
  description:
    "Explore penetration testing, SOC L1 and L2 support, vulnerability management, AppSec, mobile, network, cloud, Red Team, and AI security services.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Services</p>
        <h1>Security services structured around assessment, monitoring, and exposure reduction.</h1>
        <p>
          Choose a focused service track or use the assessment request to discuss the right scope
          for your environment, risk profile, and team capacity.
        </p>
      </section>
      <section className="section">
        <div className="grid grid-3">
          {coreServices.map((service) => (
            <ServiceCard key={service.slug} {...service} />
          ))}
        </div>
        <p className="service-note">
          Tools shown describe technologies used where suitable for the agreed scope. Product names
          belong to their respective owners and do not imply vendor endorsement or partnership.
        </p>
      </section>
      <section className="section section-alt">
        <SectionHeading
          eyebrow="Penetration testing"
          title="Choose the assessment that matches your attack surface"
          body="Focused testing pages explain the scope, security coverage, evidence, and reporting available for each environment."
        />
        <div className="grid grid-3">
          {Object.entries(penetrationTestingServices).map(([slug, service]) => (
            <article className="capability-card" key={slug}>
              <h2>{service.shortName}</h2>
              <p>{service.description}</p>
              <Link href={`/services/${slug}`}>Explore {service.shortName}</Link>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
