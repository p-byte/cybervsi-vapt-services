import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { coreServices } from "@/lib/services";
import { penetrationTestingServices } from "@/lib/penetrationTestingServices";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/about",
    "/contact",
    "/request-assessment",
    "/reports",
    "/partners",
    "/vapt-services-india",
    "/vapt-services-singapore",
    "/privacy-policy",
    "/terms",
    ...coreServices.map((service) => service.href.split("#")[0]),
    ...Object.keys(penetrationTestingServices).map((slug) => `/services/${slug}`),
  ];

  return [...new Set(routes)].map((route) => ({
    url: `${siteConfig.domain}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.75,
  }));
}
