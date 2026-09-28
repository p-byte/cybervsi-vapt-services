import Link from "next/link";
import { navItems, siteConfig } from "@/lib/config";
import { coreServices } from "@/lib/services";

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <Link className="brand footer-brand" href="/">
          <span className="brand-mark" aria-hidden="true">
            CV
          </span>
          <span>{siteConfig.name}</span>
        </Link>
        <p>
          Practical cybersecurity services for teams that need accurate findings, clear reporting,
          and a dependable security partner.
        </p>
      </div>
      <div>
        <h2>Services</h2>
        {coreServices.map((service) => (
          <Link key={service.slug} href={service.href}>
            {service.shortTitle}
          </Link>
        ))}
      </div>
      <div>
        <h2>Company</h2>
        {navItems.slice(1).map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/terms">Terms</Link>
      </div>
      <div>
        <h2>Contact</h2>
        <Link href={`mailto:${siteConfig.email}`}>{siteConfig.email}</Link>
        <Link href="/request-assessment">Request an assessment</Link>
      </div>
      <p className="footer-bottom">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </p>
    </footer>
  );
}
