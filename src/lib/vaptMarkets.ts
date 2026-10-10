export type VaptMarket = {
  country: string;
  path: string;
  title: string;
  description: string;
  intro: string;
  buyers: string[];
  triggers: { title: string; body: string }[];
  context: { title: string; body: string; href: string; linkLabel: string }[];
  faqs: { question: string; answer: string }[];
};

export const indiaVapt: VaptMarket = {
  country: "India",
  path: "/vapt-services-india",
  title: "VAPT Services in India",
  description:
    "VAPT services for organizations in India, covering web applications, APIs, external and internal networks, cloud infrastructure, and mobile applications.",
  intro:
    "CyberVSI provides remotely delivered vulnerability assessment and penetration testing for Indian SaaS, fintech, e-commerce, technology, and enterprise teams that need validated findings and practical remediation guidance.",
  buyers: ["SaaS and product companies", "Fintech and payment teams", "E-commerce platforms", "Healthcare technology", "Startups preparing for enterprise reviews", "SMEs and enterprise technology teams"],
  triggers: [
    { title: "Before a launch", body: "Test authentication, authorization, business workflows, APIs, and exposed infrastructure before a new product or major release reaches customers." },
    { title: "For customer assurance", body: "Provide a defined scope, testing methodology, risk-rated findings, remediation evidence, and retest status during enterprise security reviews." },
    { title: "After major change", body: "Reassess applications and infrastructure after architecture, cloud, identity, payment, or integration changes alter the attack surface." },
    { title: "For recurring risk review", body: "Use scheduled testing to identify new exposure and validate whether previously reported weaknesses remain resolved." },
  ],
  context: [
    { title: "CERT-In cyber security directions", body: "India's CERT-In publishes directions relating to information security practices, incident prevention, response, and reporting. VAPT can support technical risk discovery, but it does not by itself establish regulatory compliance.", href: "https://www.cert-in.org.in/Directions70B.jsp", linkLabel: "Review CERT-In directions" },
    { title: "Audit and customer evidence", body: "Organizations frequently use assessment scope, methodology, findings, remediation records, and retest results as evidence for internal governance, customer reviews, and sector-specific audits.", href: "/reports", linkLabel: "View a sanitized sample report" },
  ],
  faqs: [
    { question: "How much do VAPT services cost in India?", answer: "Pricing depends on application size, user roles, API endpoints, IP ranges, environments, testing depth, and retesting requirements. CyberVSI provides a scope-based proposal after reviewing these details." },
    { question: "How long does a VAPT engagement take?", answer: "The timeline depends on scope and access readiness. A focused application usually takes less time than a multi-application, API, cloud, or network assessment. The testing and reporting schedule is confirmed during scoping." },
    { question: "Is CyberVSI CERT-In empanelled?", answer: "CyberVSI does not claim CERT-In empanelment on this website. If your procurement or regulatory requirement specifically requires an empanelled auditor, state that requirement before engagement." },
    { question: "Can testing be delivered remotely across India?", answer: "Yes. Web, API, cloud, and external network assessments can commonly be delivered remotely using approved access, test accounts, defined testing windows, and agreed rules of engagement." },
    { question: "Is a retest available after fixes?", answer: "Retesting can be included in the engagement scope to validate remediation and record the updated status of reported findings." },
    { question: "What is included in the VAPT report?", answer: "Reports can include an executive summary, scope and methodology, CVSS-based risk ratings, technical evidence, business impact, affected assets, remediation guidance, and retest results." },
  ],
};

export const singaporeVapt: VaptMarket = {
  country: "Singapore",
  path: "/vapt-services-singapore",
  title: "VAPT Services in Singapore",
  description:
    "VAPT and penetration testing services for Singapore organizations, covering web applications, APIs, networks, cloud infrastructure, and mobile applications.",
  intro:
    "CyberVSI provides remotely delivered security testing for Singapore SaaS, fintech, professional services, e-commerce, healthcare technology, and enterprise teams that need clear evidence of exploitable risk.",
  buyers: ["SaaS and technology companies", "Fintech and payment businesses", "E-commerce platforms", "Professional services firms", "Healthcare technology teams", "Regional and enterprise IT teams"],
  triggers: [
    { title: "Before digital service launch", body: "Validate customer-facing applications, APIs, identity flows, payment workflows, and exposed infrastructure before production use." },
    { title: "For vendor risk reviews", body: "Use documented scope, methodology, risk ratings, remediation guidance, and retest status when responding to customer or partner security reviews." },
    { title: "After material change", body: "Test security controls after cloud migration, architecture changes, new integrations, identity changes, or major feature releases." },
    { title: "For ongoing assurance", body: "Establish periodic testing around business-critical systems and changes to the external attack surface." },
  ],
  context: [
    { title: "Singapore PDPA protection obligation", body: "The PDPC states that organizations must make reasonable security arrangements to protect personal data. A scoped VAPT can identify technical weaknesses, but it is only one part of a wider data protection program.", href: "https://www.pdpc.gov.sg/overview-of-pdpa/the-legislation/personal-data-protection-act/data-protection-obligations", linkLabel: "Review PDPC obligations" },
    { title: "Technology risk in financial services", body: "MAS publishes technology-risk and cyber-security requirements and guidance for regulated financial institutions. Exact testing and independent-assurance requirements should be confirmed against the rules applying to your organization.", href: "https://www.mas.gov.sg/regulation/cyber-security", linkLabel: "Review MAS cyber-security guidance" },
  ],
  faqs: [
    { question: "How much does VAPT cost in Singapore?", answer: "The cost is based on the number and complexity of applications, APIs, roles, IP addresses, cloud components, environments, evidence needs, and retesting scope. CyberVSI provides a written scope and proposal after discovery." },
    { question: "How long does penetration testing take?", answer: "A focused assessment may be completed faster than a broad application, API, cloud, and infrastructure scope. Timing is confirmed after the attack surface, access, and reporting requirements are understood." },
    { question: "Does VAPT make an organization PDPA compliant?", answer: "No single penetration test establishes PDPA compliance. VAPT can identify technical weaknesses relevant to protecting personal data and provide remediation evidence within a broader governance and security program." },
    { question: "Can CyberVSI test Singapore systems remotely?", answer: "Yes. Many web, API, cloud, and external infrastructure assessments can be delivered remotely with written authorization, agreed test windows, approved access, and emergency contacts." },
    { question: "Do you provide remediation support and retesting?", answer: "Reports include remediation guidance, and the engagement can include finding clarification and retesting to verify agreed fixes." },
    { question: "Can we see a report before engaging?", answer: "Yes. CyberVSI publishes sanitized sample reports showing the executive summary, CVSS ratings, technical evidence structure, remediation guidance, and finding lifecycle." },
  ],
};
