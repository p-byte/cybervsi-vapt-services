export type ServiceSlug = "vapt" | "soc" | "vulnerability-management";

export const coreServices = [
  {
    slug: "vapt",
    shortTitle: "VAPT",
    title: "Vulnerability Assessment & Penetration Testing",
    href: "/services/vapt",
    description:
      "Identify exploitable weaknesses across applications, APIs, networks, and infrastructure before attackers can take advantage of them.",
    capabilities: [
      "Web Application VAPT",
      "API Penetration Testing",
      "Network VAPT",
      "Cloud Security Assessment",
      "Mobile Application Testing",
      "Configuration Review",
      "Manual Exploitation",
      "Business Logic Testing",
    ],
    cta: "Explore VAPT",
  },
  {
    slug: "soc",
    shortTitle: "SOC Services",
    title: "Security Operations Center",
    href: "/services/soc",
    description:
      "Continuous security monitoring, detection, investigation, and incident response support for organizations that need threats investigated before they become serious incidents.",
    capabilities: [
      "Security Monitoring",
      "SIEM Monitoring",
      "Alert Investigation",
      "Incident Triage",
      "Threat Detection",
      "Threat Hunting",
      "Log Analysis",
      "Use Case Development",
      "Incident Escalation",
      "Security Reporting",
    ],
    cta: "Explore SOC Services",
  },
  {
    slug: "vulnerability-management",
    shortTitle: "Vulnerability Management",
    title: "Vulnerability Management",
    href: "/services/vulnerability-management",
    description:
      "Continuously discover, prioritize, track, and remediate vulnerabilities across your technology environment.",
    capabilities: [
      "Vulnerability Discovery",
      "Asset Assessment",
      "Risk-Based Prioritization",
      "CVE Analysis",
      "Remediation Guidance",
      "Patch Validation",
      "Reassessment",
      "Vulnerability Tracking",
      "Executive Reporting",
      "Security Posture Monitoring",
    ],
    cta: "Explore Vulnerability Management",
  },
] as const;

export const futureServices = [
  "Cloud Security",
  "API Security",
  "Mobile Application Security",
  "Red Teaming",
  "Security Consulting",
  "Compliance Readiness",
  "Incident Response",
  "Threat Hunting",
  "SIEM Implementation",
  "Security Awareness",
];

export const getService = (slug: ServiceSlug) =>
  coreServices.find((service) => service.slug === slug);
