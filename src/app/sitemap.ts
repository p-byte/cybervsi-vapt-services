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
    "/privacy-policy",
    "/terms",
    ...coreServices.map((service) => service.href),
    ...Object.keys(penetrationTestingServices).map((slug) => `/services/${slug}`),
  ];

  return routes.map((route) => ({
    url: `${siteConfig.domain}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.75,
  }));
}
