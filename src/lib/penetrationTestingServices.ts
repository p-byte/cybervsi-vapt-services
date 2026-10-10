export const penetrationTestingServices = {
  "web-application-penetration-testing": {
    name: "Web Application Penetration Testing",
    shortName: "Web Application Testing",
    description:
      "Manual web application penetration testing for authentication, authorization, business logic, session, input validation, and configuration weaknesses.",
    intro:
      "Assess customer portals, SaaS products, internal applications, and internet-facing platforms for exploitable security weaknesses before release or as part of recurring assurance.",
    targets: ["SaaS platforms", "Customer portals", "Admin interfaces", "E-commerce applications", "Internal business applications", "Single-page applications"],
    coverage: ["Authentication and session management", "Authorization and access control", "Business logic abuse", "Injection and input handling", "File upload and data exposure", "Security configuration and headers"],
    outcomes: ["Validated findings with CVSS risk ratings", "Reproduction steps and supporting evidence", "Business impact for each confirmed issue", "Developer-focused remediation guidance", "Executive summary and remediation priorities", "Optional retest status after fixes"],
    faq: [
      ["When should we test a web application?", "Common triggers include a production launch, a major release, architecture or authentication changes, a customer security review, and a recurring assurance cycle."],
      ["Do you test business logic?", "Yes. The assessment can include manual testing of workflows, roles, transactions, and application-specific abuse cases that automated scanners often cannot understand."],
      ["Will the test affect production?", "The scope and test windows are agreed before testing. Production testing can use safety restrictions, approved accounts, and explicit exclusions to reduce operational risk."],
    ],
  },
  "api-penetration-testing": {
    name: "API Penetration Testing",
    shortName: "API Testing",
    description:
      "API penetration testing for REST, GraphQL, and application backends, with manual validation of authorization, authentication, data exposure, and abuse cases.",
    intro:
      "Test the interfaces that connect applications, customers, partners, and internal services for exploitable flaws in access control, data handling, and business workflows.",
    targets: ["REST APIs", "GraphQL APIs", "Mobile application backends", "Partner integrations", "Microservices gateways", "Internal service APIs"],
    coverage: ["Object-level authorization", "Function-level authorization", "Authentication and token handling", "Data exposure and mass assignment", "Rate limiting and resource abuse", "Injection and server-side requests"],
    outcomes: ["Endpoint-level findings and affected roles", "CVSS ratings and practical business impact", "Reproducible requests and response evidence", "Remediation guidance for engineering teams", "Coverage aligned to OWASP API Security risks", "Optional retesting after remediation"],
    faq: [
      ["What do you need to test an API?", "Useful inputs include API documentation or a collection, test accounts for relevant roles, authentication instructions, environment details, and a list of excluded operations."],
      ["Can you test APIs without documentation?", "Black-box discovery may be possible, but documentation and role-based test accounts usually improve coverage and reduce time spent reconstructing intended behavior."],
      ["Do you test GraphQL authorization?", "Yes. Testing can cover schema exposure, query and mutation authorization, object access, batching, depth or complexity controls, and application-specific abuse paths."],
    ],
  },
  "network-penetration-testing": {
    name: "Network Penetration Testing",
    shortName: "Network Testing",
    description:
      "External and internal network penetration testing that validates exposed services, configuration weaknesses, attack paths, and practical business risk.",
    intro:
      "Understand whether internet-facing or internal infrastructure can be used to gain unauthorized access, expose sensitive systems, or move through the environment.",
    targets: ["External IP ranges", "Internal networks", "VPN and remote access", "Network services", "Servers and appliances", "Segmentation controls"],
    coverage: ["Attack surface and service exposure", "Weak authentication and default access", "Known vulnerability validation", "Configuration and protocol weaknesses", "Privilege escalation opportunities", "Network segmentation and attack paths"],
    outcomes: ["Validated technical findings", "Affected hosts, services, and evidence", "CVSS ratings and attack-path context", "Prioritized remediation recommendations", "Executive and technical reporting", "Optional remediation retesting"],
    faq: [
      ["What is the difference between external and internal testing?", "External testing evaluates systems reachable from the internet. Internal testing evaluates risks from an internal position, including lateral movement and segmentation weaknesses."],
      ["Is vulnerability scanning included?", "Discovery and scanning support coverage, but confirmed report findings are manually reviewed to reduce false positives and explain actual exploitability."],
      ["How is network testing scoped?", "Scope is normally defined by IP ranges, environments, allowed techniques, testing windows, emergency contacts, and systems that must not be disrupted."],
    ],
  },
} as const;

export type PenetrationTestingSlug = keyof typeof penetrationTestingServices;
