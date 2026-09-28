import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { coreServices, futureServices } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cybersecurity Services",
  description:
    "Explore VAPT, SOC services, and vulnerability management services for startups, SMEs, enterprises, SaaS, fintech, healthcare, and e-commerce organizations.",
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
      </section>
      <section className="section section-alt">
        <SectionHeading
          eyebrow="Expandable architecture"
          title="Additional service lines can be added without redesigning the site"
          body="These are prepared as future categories and should be enabled when the company is ready to represent them accurately."
        />
        <div className="grid grid-4">
          {futureServices.map((service) => (
            <div className="capability-card" key={service}>
              {service}
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
