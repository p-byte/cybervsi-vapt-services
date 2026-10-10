from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "reports"
OUT.mkdir(parents=True, exist_ok=True)
OUTPUT = OUT / "cybervsi-comprehensive-web-application-vapt-sample.pdf"

NAVY = colors.HexColor("#07111F")
PANEL = colors.HexColor("#102238")
BLUE = colors.HexColor("#2E90FA")
MINT = colors.HexColor("#65D6C0")
INK = colors.HexColor("#162333")
MUTED = colors.HexColor("#566A7E")
PALE = colors.HexColor("#F3F7FA")
LINE = colors.HexColor("#CBD6E1")
CRITICAL = colors.HexColor("#A61B2B")
HIGH = colors.HexColor("#D33F49")
MEDIUM = colors.HexColor("#D6811B")
LOW = colors.HexColor("#2E7D61")
INFO = colors.HexColor("#3973A8")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Brand", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=13, textColor=MINT, leading=16))
styles.add(ParagraphStyle(name="CoverTitle", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=28, leading=33, textColor=colors.white, spaceAfter=12))
styles.add(ParagraphStyle(name="CoverSub", parent=styles["Normal"], fontSize=11, leading=17, textColor=colors.HexColor("#DCE7F2")))
styles.add(ParagraphStyle(name="H1", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=21, leading=25, textColor=NAVY, spaceAfter=12))
styles.add(ParagraphStyle(name="H2", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=13, leading=17, textColor=PANEL, spaceBefore=10, spaceAfter=6))
styles.add(ParagraphStyle(name="H3", parent=styles["Heading3"], fontName="Helvetica-Bold", fontSize=10, leading=14, textColor=PANEL, spaceBefore=7, spaceAfter=4))
styles.add(ParagraphStyle(name="Body", parent=styles["BodyText"], fontSize=9.1, leading=13.2, textColor=INK, spaceAfter=7))
styles.add(ParagraphStyle(name="Small", parent=styles["BodyText"], fontSize=7.6, leading=10.2, textColor=MUTED))
styles.add(ParagraphStyle(name="Tiny", parent=styles["BodyText"], fontSize=6.8, leading=8.8, textColor=MUTED))
styles.add(ParagraphStyle(name="TableHead", parent=styles["Small"], fontName="Helvetica-Bold", textColor=colors.white))
styles.add(ParagraphStyle(name="TableCell", parent=styles["Small"], textColor=INK))
styles.add(ParagraphStyle(name="CodeX", parent=styles["Small"], fontName="Courier", fontSize=7.2, leading=10, textColor=PANEL))
styles.add(ParagraphStyle(name="Callout", parent=styles["Body"], backColor=colors.HexColor("#EAF8F5"), borderColor=MINT, borderWidth=1, borderPadding=9, spaceAfter=10))
styles.add(ParagraphStyle(name="Center", parent=styles["Small"], alignment=TA_CENTER))
styles.add(ParagraphStyle(name="Right", parent=styles["Small"], alignment=TA_RIGHT))


def p(value, style="TableCell"):
    return Paragraph(str(value), styles[style])


def grid(rows, widths, header=True, compact=False):
    data = []
    for index, row in enumerate(rows):
        style = "TableHead" if header and index == 0 else "TableCell"
        data.append([cell if hasattr(cell, "wrap") else p(cell, style) for cell in row])
    table = Table(data, colWidths=widths, repeatRows=1 if header else 0, hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), PANEL if header else PALE),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white if header else INK),
        ("GRID", (0, 0), (-1, -1), 0.45, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("ROWBACKGROUNDS", (0, 1 if header else 0), (-1, -1), [colors.white, PALE]),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4 if compact else 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4 if compact else 6),
    ]))
    return table


def cover_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
    canvas.setStrokeColor(BLUE)
    canvas.setLineWidth(2)
    canvas.circle(A4[0] - 39 * mm, A4[1] - 43 * mm, 17 * mm, stroke=1, fill=0)
    canvas.line(A4[0] - 27 * mm, A4[1] - 55 * mm, A4[0] - 15 * mm, A4[1] - 67 * mm)
    canvas.setFillColor(MINT)
    canvas.setFont("Helvetica-Bold", 8)
    canvas.drawString(18 * mm, 16 * mm, "CONNECT@CYBERVSI.COM  |  SERVICE.CYBERVSI.COM")
    canvas.restoreState()


def body_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, A4[1] - 14 * mm, A4[0], 14 * mm, fill=1, stroke=0)
    canvas.setFillColor(MINT)
    canvas.setFont("Helvetica-Bold", 8.5)
    canvas.drawString(17 * mm, A4[1] - 9 * mm, "CYBERVSI | WEB APPLICATION VAPT")
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(17 * mm, 9 * mm, "PUBLIC SAMPLE - FICTIONAL AND SANITIZED DATA")
    canvas.drawRightString(A4[0] - 17 * mm, 9 * mm, f"Page {doc.page}")
    canvas.restoreState()


FINDINGS = [
    {
        "id": "WEB-001", "title": "Cross-site request forgery in account recovery", "severity": "High", "score": "8.8",
        "vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H", "status": "Open",
        "mapping": "CWE-352 | OWASP A01:2021 | WSTG-SESS-05",
        "asset": "https://portal.example.test/account/recovery",
        "description": "The account-recovery completion request accepts a state-changing cross-site request without validating an unpredictable anti-CSRF token or trusted request origin.",
        "impact": "A user who follows an attacker-controlled link while completing recovery could have the recovery action altered, potentially resulting in account compromise and unauthorized access to sensitive records.",
        "evidence": "POST /account/recovery/complete HTTP/1.1\nHost: portal.example.test\nOrigin: https://attacker.example\ncsrf_token: <omitted>\nResult: HTTP/1.1 200 OK (sample response)",
        "steps": ["Start account recovery for the approved fictional user.", "Capture the completion request in an intercepting proxy.", "Remove the anti-CSRF value and change Origin to an untrusted site.", "Replay the request and observe that the server accepts it."],
        "remediation": "Require a cryptographically strong, session-bound anti-CSRF token for every state-changing request. Validate Origin or Referer as a secondary control, use SameSite cookies, and invalidate recovery tokens immediately after use.",
        "retest": "The request is rejected when the CSRF token is missing, invalid, reused, or submitted from an untrusted origin. Valid same-origin recovery remains functional."
    },
    {
        "id": "WEB-002", "title": "Missing authorization on claim update", "severity": "High", "score": "8.1",
        "vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N", "status": "Open",
        "mapping": "CWE-639 | OWASP A01:2021 | WSTG-ATHZ-04",
        "asset": "https://portal.example.test/api/claims/{claimId}",
        "description": "The claim update endpoint authenticates the caller but does not verify that the referenced claim belongs to the caller's tenant before returning and modifying data.",
        "impact": "A standard authenticated user could view or alter another tenant's claim record, exposing personal and financial data and undermining record integrity.",
        "evidence": "PATCH /api/claims/CLM-2042 HTTP/1.1\nAuthorization: Bearer <standard-user-token>\n{\"status\":\"reviewed\"}\nResult: HTTP/1.1 200 OK (fictional record)",
        "steps": ["Sign in as tenant-alpha.example.test.", "Capture an update to an owned claim.", "Replace the claim identifier with the approved tenant-beta test record.", "Observe a successful response and modified test data."],
        "remediation": "Enforce object ownership in the service layer for every read and update. Resolve tenant identity from the trusted session, deny cross-tenant identifiers consistently, and add negative authorization tests for sibling endpoints.",
        "retest": "Cross-tenant claim reads and writes return an authorization error, while same-tenant operations continue to work."
    },
    {
        "id": "WEB-003", "title": "Authentication endpoint lacks rate limiting", "severity": "High", "score": "7.5",
        "vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N", "status": "Open",
        "mapping": "CWE-307 | OWASP A07:2021 | WSTG-ATHN-03",
        "asset": "https://portal.example.test/api/auth/login",
        "description": "Repeated failed authentication attempts are processed without account, source, or device-based throttling. Responses remain consistent after the approved test threshold.",
        "impact": "Attackers could automate password guessing or credential stuffing, increasing the likelihood of account compromise where credentials are weak or reused.",
        "evidence": "Approved test: 25 invalid attempts in 60 seconds\nObserved responses: 25 x HTTP 401\nRetry-After header: absent\nLockout or progressive delay: not observed",
        "steps": ["Submit an invalid password for the approved test account.", "Repeat within the agreed safe request threshold.", "Compare status codes, response times, and rate-limit headers.", "Confirm no progressive delay, temporary block, or alert is triggered."],
        "remediation": "Apply layered throttling by account and source, introduce progressive delays, detect credential stuffing, require MFA for sensitive access, and alert on anomalous authentication patterns. Avoid permanent denial-of-service through account lockout.",
        "retest": "The endpoint throttles repeated attempts, returns a safe generic response, logs the event, and allows legitimate recovery without revealing account validity."
    },
    {
        "id": "WEB-004", "title": "Session tokens remain valid after password reset", "severity": "Medium", "score": "5.6",
        "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:H/I:N/A:N", "status": "Open",
        "mapping": "CWE-613 | OWASP A07:2021 | WSTG-SESS-06",
        "asset": "Portal session and refresh-token services",
        "description": "Changing or resetting a password does not revoke previously issued web sessions and refresh tokens.",
        "impact": "A stolen session could remain usable after the account owner attempts recovery, extending unauthorized access.",
        "evidence": "Session A: password reset completed\nSession B: issued before reset\nGET /api/profile with Session B after reset\nResult: HTTP/1.1 200 OK",
        "steps": ["Create two sessions for the same fictional account.", "Reset the password from Session A.", "Replay Session B after the reset completes.", "Observe that the existing session remains valid."],
        "remediation": "Revoke active sessions and refresh tokens after credential changes. Rotate the current session, require reauthentication for sensitive actions, and provide users with session-management controls.",
        "retest": "All pre-reset sessions are rejected and only a newly authenticated session can access protected resources."
    },
    {
        "id": "WEB-005", "title": "Outdated client-side components", "severity": "Medium", "score": "6.1",
        "vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N", "status": "Open",
        "mapping": "CWE-1104 | OWASP A06:2021 | WSTG-CONF-05",
        "asset": "Public web bundles on portal.example.test",
        "description": "The application includes unsupported client-side library versions with publicly documented security issues. Exploitability depends on whether affected functions are reachable in the application context.",
        "impact": "A reachable vulnerable code path could enable client-side code execution or content manipulation in a user's browser.",
        "evidence": "Sample inventory:\njquery 2.x - unsupported branch\nbootstrap 3.x - legacy branch\nExact production versions and hashes intentionally omitted",
        "steps": ["Review loaded JavaScript and stylesheet resources.", "Identify component names and versions from package metadata or source maps.", "Compare versions with vendor advisories.", "Manually validate whether affected functionality is reachable."],
        "remediation": "Upgrade to supported stable releases, remove unused libraries, maintain a software bill of materials, enable dependency scanning in CI, and verify the upgrade with regression and security tests.",
        "retest": "The deployed bundle contains supported versions and dependency scanning reports no unresolved applicable advisories."
    },
    {
        "id": "WEB-006", "title": "Anti-CSRF token accepted outside intended context", "severity": "Medium", "score": "5.4",
        "vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:L/I:L/A:N", "status": "Open",
        "mapping": "CWE-352 | OWASP A01:2021 | WSTG-SESS-05",
        "asset": "Claim creation and update workflows",
        "description": "The application accepts an anti-CSRF token that is not tightly bound to the active session and action, reducing the control's resistance to token reuse.",
        "impact": "Under specific preconditions, a captured token could be reused to support unauthorized state-changing requests.",
        "evidence": "Token from Session A replayed with approved Session B\nEndpoint: POST /api/claims/update\nResult: request accepted in sample test context",
        "steps": ["Capture a token from the approved first session.", "Create a second session for the same fictional user.", "Submit the first token with a state-changing request in the second session.", "Observe the request is accepted."],
        "remediation": "Bind tokens to the authenticated session and intended action, use sufficient entropy, validate tokens server-side, prevent reuse where practical, and combine with SameSite cookies and origin validation.",
        "retest": "Tokens copied across sessions or actions are rejected without changing application state."
    },
    {
        "id": "WEB-007", "title": "Application can be framed by untrusted origins", "severity": "Medium", "score": "4.3",
        "vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:N/I:L/A:N", "status": "Open",
        "mapping": "CWE-1021 | OWASP A05:2021 | WSTG-CLNT-09",
        "asset": "Authenticated portal pages",
        "description": "Responses do not restrict embedding through CSP frame-ancestors or X-Frame-Options, allowing the portal to be displayed in an attacker-controlled frame.",
        "impact": "An attacker could attempt UI redressing to induce unintended clicks. Impact depends on the sensitivity of actions that can be completed without reauthentication or confirmation.",
        "evidence": "Content-Security-Policy frame-ancestors: absent\nX-Frame-Options: absent\nSample iframe load result: rendered successfully",
        "steps": ["Create a local HTML page containing an iframe for the fictional portal.", "Open the page in a supported browser.", "Confirm the portal renders within the frame.", "Do not perform a real transaction."],
        "remediation": "Set Content-Security-Policy: frame-ancestors 'none' or explicitly list trusted origins. Retain anti-CSRF controls and require confirmation for sensitive actions.",
        "retest": "Untrusted framing is blocked by the browser while any documented trusted integration continues to work."
    },
    {
        "id": "WEB-008", "title": "Content Security Policy is not enforced", "severity": "Low", "score": "3.1",
        "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:L/I:N/A:N", "status": "Open",
        "mapping": "CWE-693 | OWASP A05:2021 | WSTG-CONF-12",
        "asset": "Public and authenticated web responses",
        "description": "The application does not send an enforcing Content-Security-Policy header. CSP is a defense-in-depth control and its absence does not by itself demonstrate script injection.",
        "impact": "A future injection defect may have greater impact because the browser is not instructed to restrict script, frame, and resource origins.",
        "evidence": "GET /dashboard HTTP/1.1\nResponse headers reviewed\nContent-Security-Policy: absent\nContent-Security-Policy-Report-Only: absent",
        "steps": ["Request representative public and authenticated pages.", "Review response headers.", "Confirm that no enforcing CSP is present.", "Document required resource origins before rollout."],
        "remediation": "Develop a restrictive policy using nonces or hashes, deploy in Report-Only mode, review violations, then enforce it. Avoid broad wildcards and unsafe-inline where possible.",
        "retest": "Representative pages return an enforcing policy and function without unexpected blocked resources."
    },
    {
        "id": "WEB-009", "title": "HSTS header is missing", "severity": "Low", "score": "3.1",
        "vector": "CVSS:3.1/AV:A/AC:H/PR:N/UI:R/S:U/C:L/I:L/A:N", "status": "Open",
        "mapping": "CWE-319 | OWASP A02:2021 | WSTG-CRYP-03",
        "asset": "HTTPS responses on portal.example.test",
        "description": "HTTPS responses do not include Strict-Transport-Security, so browsers are not instructed to require HTTPS for future connections.",
        "impact": "A suitably positioned attacker may attempt an initial-connection downgrade where users can reach the service over an insecure path.",
        "evidence": "HTTP/1.1 200 OK\nStrict-Transport-Security: absent\nTLS certificate validation: successful",
        "steps": ["Request the portal over HTTPS.", "Inspect response headers from representative routes.", "Confirm HSTS is absent.", "Verify all subdomains are HTTPS-ready before recommending includeSubDomains."],
        "remediation": "After confirming complete HTTPS coverage, add Strict-Transport-Security with an appropriate max-age. Introduce includeSubDomains and preload only after operational review.",
        "retest": "HTTPS responses include the approved HSTS policy and HTTP requests redirect safely to HTTPS."
    },
    {
        "id": "WEB-010", "title": "Verbose server identification", "severity": "Informational", "score": "0.0",
        "vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:N/A:N", "status": "Open",
        "mapping": "CWE-200 | OWASP A05:2021 | WSTG-INFO-08",
        "asset": "HTTP response headers and error pages",
        "description": "Responses reveal product and framework information that can assist technology fingerprinting.",
        "impact": "The information does not directly provide access, but it can help an attacker focus reconnaissance and research applicable weaknesses.",
        "evidence": "Server: example-gateway/1.x\nX-Powered-By: ExampleFramework\nValues are fictional and sanitized",
        "steps": ["Request a valid page and an approved nonexistent route.", "Review response headers and error content.", "Record unnecessary product identifiers.", "Do not infer patch status from the banner alone."],
        "remediation": "Remove unnecessary version and framework headers, use generic error pages, keep software supported and patched, and avoid treating banner suppression as a substitute for remediation.",
        "retest": "External responses no longer disclose unnecessary product or version details."
    },
]


def severity_color(value):
    return {"Critical": CRITICAL, "High": HIGH, "Medium": MEDIUM, "Low": LOW, "Informational": INFO}[value]


def bullet_lines(items):
    return Paragraph("<br/>".join(f"{index}. {item}" for index, item in enumerate(items, 1)), styles["Body"])


def finding_pages(finding):
    color = severity_color(finding["severity"])
    badge = Table([[p(finding["severity"].upper(), "TableHead"), p(f"CVSS 3.1 {finding['score']}"), p(finding["status"]), p(finding["id"]) ]], colWidths=[32*mm, 38*mm, 30*mm, 50*mm])
    badge.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), color), ("BACKGROUND", (1, 0), (-1, 0), PALE),
        ("GRID", (0, 0), (-1, -1), .5, LINE), ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    metadata = grid([
        ["Field", "Value"], ["Affected asset", finding["asset"]], ["CVSS vector", finding["vector"]],
        ["Classification", finding["mapping"]], ["Evidence handling", "Synthetic and sanitized; no client data or live credentials"],
    ], [36*mm, 122*mm], compact=True)
    evidence = Table([[p("SANITIZED EVIDENCE", "TableHead")], [p(finding["evidence"].replace("\n", "<br/>"), "CodeX")]], colWidths=[158*mm])
    evidence.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), PANEL), ("BACKGROUND", (0, 1), (-1, 1), colors.HexColor("#EEF4F8")),
        ("BOX", (0, 0), (-1, -1), .7, LINE), ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8), ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    return [
        Paragraph(f"{finding['id']} - {finding['title']}", styles["H1"]), badge, Spacer(1, 4*mm), metadata,
        Paragraph("Description", styles["H2"]), Paragraph(finding["description"], styles["Body"]),
        Paragraph("Business impact", styles["H2"]), Paragraph(finding["impact"], styles["Body"]),
        Paragraph("Steps to reproduce", styles["H2"]), bullet_lines(finding["steps"]),
        Spacer(1, 3*mm), evidence,
        Paragraph("Recommended remediation", styles["H2"]), Paragraph(finding["remediation"], styles["Body"]),
        Paragraph("Retest and closure criteria", styles["H2"]), Paragraph(finding["retest"], styles["Callout"]),
        PageBreak(),
    ]


def build():
    doc = BaseDocTemplate(str(OUTPUT), pagesize=A4, leftMargin=17*mm, rightMargin=17*mm, topMargin=21*mm, bottomMargin=17*mm,
                          title="CyberVSI Comprehensive Web Application VAPT Sample Report", author="CyberVSI")
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="cover", frames=[frame], onPage=cover_page), PageTemplate(id="body", frames=[frame], onPage=body_page)])

    counts = {name: sum(1 for item in FINDINGS if item["severity"] == name) for name in ["Critical", "High", "Medium", "Low", "Informational"]}
    risk_score = counts["Critical"]*16 + counts["High"]*8 + counts["Medium"]*4 + counts["Low"]*2
    posture = max(0, round(10 - risk_score/10, 1))
    story = [
        Spacer(1, 40*mm), Paragraph("CYBERVSI", styles["Brand"]), Spacer(1, 4*mm),
        Paragraph("Web Application Security Assessment Report", styles["CoverTitle"]),
        Paragraph("Comprehensive VAPT reporting sample", styles["CoverSub"]), Spacer(1, 22*mm),
        grid([["Document", "Public sample"], ["Target", "Fictional Customer Portal"], ["Assessment type", "Grey-box web application VAPT"], ["Report version", "1.0"], ["Report date", "10 October 2026"], ["Classification", "Public - sample data only"]], [40*mm, 88*mm], header=False),
        Spacer(1, 16*mm), Paragraph("SAMPLE - FICTIONAL DATA", styles["Brand"]),
        Paragraph("No real client, person, credential, domain, IP address, screenshot, or production evidence appears in this report.", styles["CoverSub"]),
        NextPageTemplate("body"), PageBreak(),

        Paragraph("Document Control", styles["H1"]),
        grid([["Version", "Date", "Prepared by", "Purpose"], ["1.0", "10 October 2026", "CyberVSI Security Testing", "Public reporting example"]], [22*mm, 30*mm, 52*mm, 54*mm]),
        Paragraph("Confidentiality and use", styles["H2"]),
        Paragraph("This public sample demonstrates CyberVSI's reporting approach. It is not a client deliverable and must not be interpreted as evidence that any named or implied organization was assessed. All technical data is fictional or reserved for documentation.", styles["Callout"]),
        Paragraph("Contact", styles["H2"]), Paragraph("CyberVSI<br/>connect@cybervsi.com<br/>https://service.cybervsi.com", styles["Body"]),
        PageBreak(),

        Paragraph("Table of Contents", styles["H1"]),
        grid([["Section", "Contents"], ["1", "General overview and disclaimer"], ["2", "Assessment overview, scope, limitations, and methodology"], ["3", "Executive summary, severity model, status model, and risk posture"], ["4", "Vulnerability overview"], ["5", "Detailed findings WEB-001 through WEB-010"], ["6", "Remediation roadmap and retest approach"], ["7", "Compliance mapping"], ["8", "Appendices and references"]], [24*mm, 134*mm]),
        PageBreak(),

        Paragraph("1. General Overview", styles["H1"]),
        Paragraph("1.1 Purpose", styles["H2"]),
        Paragraph("This report communicates the results of a fictional, time-boxed web application security assessment. It separates executive risk context from reproducible technical evidence and provides concrete closure criteria for engineering teams.", styles["Body"]),
        Paragraph("1.2 Disclaimer", styles["H2"]),
        Paragraph("Security testing provides a point-in-time view based on agreed scope, access, and constraints. No assessment can prove that an application is free of vulnerabilities. Findings should be reassessed after architectural, code, infrastructure, or threat-environment changes.", styles["Body"]),
        Paragraph("1.3 Sample-data safeguards", styles["H2"]),
        grid([["Data class", "Treatment"], ["Organization and people", "Replaced with CyberVSI or generic role names"], ["Domains", "Reserved example.test names"], ["IP addresses", "Omitted from this web application sample"], ["Credentials and tokens", "Never included; represented by placeholders"], ["Screenshots", "Replaced with synthetic text evidence"], ["Dates", "Sample publication date only"]], [48*mm, 110*mm]),
        PageBreak(),

        Paragraph("2. Assessment Overview", styles["H1"]),
        Paragraph("2.1 Components", styles["H2"]),
        Paragraph("The assessment combines automated discovery with manual validation. Automated results are treated as leads until a tester reproduces the behavior, evaluates preconditions, and confirms impact within the rules of engagement.", styles["Body"]),
        grid([["Component", "Coverage"], ["Vulnerability assessment", "Configuration, exposed components, headers, transport controls, and common weakness discovery"], ["Penetration testing", "Manual authentication, authorization, session, business-logic, and client-side validation"], ["Risk analysis", "CVSS v3.1 base score plus asset and business context"], ["Reporting", "Executive summary, technical findings, evidence, remediation, and retest criteria"]], [46*mm, 112*mm]),
        Paragraph("2.2 Scope", styles["H2"]),
        grid([["Particular", "Sample detail"], ["Application", "Fictional Customer Portal"], ["Target", "https://portal.example.test"], ["Environment", "Non-production assessment environment"], ["Access", "Two standard test users and one read-only administrative user"], ["Assessment window", "5-9 October 2026"], ["Testing mode", "Grey-box, remotely delivered"]], [45*mm, 113*mm]),
        PageBreak(),

        Paragraph("2.3 Rules, Limitations, and Methodology", styles["H1"]),
        Paragraph("Rules of engagement", styles["H2"]),
        Paragraph("Testing is authorized only for the listed fictional target and accounts. Stop conditions include service instability, access to out-of-scope records, or instruction from the engagement owner. Evidence collection is minimized and destructive actions are prohibited.", styles["Body"]),
        Paragraph("Out of scope", styles["H2"]),
        Paragraph("Denial-of-service, social engineering, physical security, persistence, malware, destructive data modification, third-party infrastructure, production customer records, and source-code review.", styles["Body"]),
        Paragraph("Methodology", styles["H2"]),
        grid([["Phase", "Activities"], ["Plan", "Confirm authorization, targets, accounts, exclusions, contacts, and stop conditions"], ["Discover", "Map application functions, technology, roles, and attack surface"], ["Assess", "Test authentication, authorization, session, input, business logic, client behavior, and configuration"], ["Validate", "Reproduce candidates manually and remove false positives"], ["Analyze", "Score technical severity and document business impact assumptions"], ["Report", "Provide evidence, remediation, closure criteria, and residual limitations"]], [31*mm, 127*mm]),
        PageBreak(),

        Paragraph("3. Executive Summary", styles["H1"]),
        Paragraph("Overview", styles["H2"]),
        Paragraph(f"The fictional assessment identified {len(FINDINGS)} findings: {counts['High']} High, {counts['Medium']} Medium, {counts['Low']} Low, and {counts['Informational']} Informational. The highest-priority themes are cross-site request forgery, missing object-level authorization, and insufficient authentication throttling.", styles["Body"]),
        Paragraph("Priority actions", styles["H2"]),
        Paragraph("1. Enforce server-side authorization for every object and tenant boundary.<br/>2. Correct CSRF design across recovery and claim workflows.<br/>3. Add layered rate limiting, MFA, and authentication monitoring.<br/>4. Revoke sessions after credential changes.<br/>5. Establish dependency and browser security-header baselines.", styles["Callout"]),
        Paragraph("Finding distribution", styles["H2"]),
        grid([["Severity", "CVSS range", "Count", "Expected handling"], ["Critical", "9.0-10.0", str(counts["Critical"]), "Immediate containment"], ["High", "7.0-8.9", str(counts["High"]), "Prioritize before next release"], ["Medium", "4.0-6.9", str(counts["Medium"]), "Current remediation cycle"], ["Low", "0.1-3.9", str(counts["Low"]), "Scheduled hardening"], ["Informational", "0.0", str(counts["Informational"]), "Defense-in-depth tracking"]], [34*mm, 30*mm, 20*mm, 74*mm]),
        PageBreak(),

        Paragraph("3.1 Severity, Status, and Posture", styles["H1"]),
        Paragraph("Severity model", styles["H2"]), Paragraph("CVSS v3.1 Base scores express technical severity. CyberVSI keeps the full vector visible so readers can review assumptions. Business priority may change after asset criticality, data sensitivity, threat likelihood, exposure, compensating controls, and regulatory duties are considered.", styles["Body"]),
        Paragraph("Status model", styles["H2"]),
        grid([["Status", "Meaning"], ["Open", "Validated and awaiting remediation or formal disposition"], ["Resolved", "Owner reports a mitigation; independent retest not yet completed"], ["Risk accepted", "Authorized owner accepts residual risk with rationale, expiry, and plan"], ["Closed", "Retest confirms the root cause is corrected or the finding is demonstrably invalid"]], [35*mm, 123*mm]),
        Paragraph("Illustrative posture calculation", styles["H2"]),
        grid([["Metric", "Formula / result"], ["Weighted risk", f"(Critical x 16) + (High x 8) + (Medium x 4) + (Low x 2) = {risk_score}"], ["Posture indicator", f"10 - (weighted risk / 10) = {posture} / 10"], ["Interpretation", "Illustrative only; not a compliance grade or guarantee of security"]], [48*mm, 110*mm]),
        PageBreak(),

        Paragraph("4. Vulnerability Overview", styles["H1"]),
        grid([["ID", "Finding", "OWASP", "CVSS", "Severity", "Status"]] + [[f["id"], f["title"], f["mapping"].split(" | ")[1], f["score"], f["severity"], f["status"]] for f in FINDINGS], [19*mm, 61*mm, 26*mm, 16*mm, 20*mm, 16*mm], compact=True),
        Spacer(1, 6*mm),
        Paragraph("Positive observations", styles["H2"]),
        Paragraph("The sample assumes TLS certificate validation succeeds, generic authentication errors do not disclose account existence, server-side input validation is present for tested fields, and no confirmed SQL injection, stored cross-site scripting, or server-side request forgery was identified within the fictional scope.", styles["Body"]),
        Paragraph("Coverage note: No finding means no weakness was confirmed within the agreed sample tests and constraints; it does not guarantee that the application is free of vulnerabilities.", styles["Callout"]),
        PageBreak(),
    ]
    for finding in FINDINGS:
        story.extend(finding_pages(finding))

    story.extend([
        Paragraph("6. Remediation Roadmap", styles["H1"]),
        grid([["Timeframe", "Actions", "Primary owner"], ["0-7 days", "Restrict vulnerable recovery flow, enforce object ownership, introduce emergency authentication throttling, and expand monitoring", "Application owner and security"], ["8-30 days", "Complete durable CSRF, authorization, session-revocation, and rate-limit fixes; add automated negative tests", "Engineering"], ["31-60 days", "Upgrade dependencies, enforce browser security headers, complete retest, and retain closure evidence", "Engineering and governance"], ["Ongoing", "Integrate SAST, DAST, dependency analysis, secrets scanning, threat modeling, and periodic VAPT into the SDLC", "Security leadership"]], [28*mm, 94*mm, 36*mm]),
        Paragraph("Retest approach", styles["H2"]),
        Paragraph("CyberVSI retests the original proof, verifies the underlying control across equivalent endpoints, checks for regressions, and records objective closure evidence. A mitigation should not be marked Closed solely from a screenshot or owner statement when safe independent validation is possible.", styles["Body"]),
        PageBreak(),

        Paragraph("7. Compliance Mapping", styles["H1"]),
        grid([["Finding group", "OWASP Top 10", "SOC 2 examples", "ISO/IEC 27001:2022 examples"], ["Authorization and CSRF", "A01 Broken Access Control", "CC6.1, CC6.3", "A.5.15, A.8.3, A.8.4"], ["Authentication and sessions", "A07 Identification and Authentication Failures", "CC6.1, CC6.2", "A.5.16, A.5.17, A.8.5"], ["Outdated components", "A06 Vulnerable and Outdated Components", "CC7.1, CC7.2, CC8.1", "A.8.8, A.8.9, A.8.32"], ["Security headers and disclosure", "A02/A05 Cryptographic Failures and Misconfiguration", "CC6.6, CC7.1", "A.8.9, A.8.20, A.8.26"]], [42*mm, 41*mm, 34*mm, 41*mm]),
        Spacer(1, 6*mm),
        Paragraph("Mapping disclaimer", styles["Callout"]),
        Paragraph("Framework mapping supports triage and audit discussion but does not establish compliance. Applicability and evidence requirements must be validated by the organization's control owners and auditors.", styles["Body"]),
        PageBreak(),

        Paragraph("8. Appendices", styles["H1"]),
        Paragraph("8.1 References", styles["H2"]),
        Paragraph("OWASP Web Security Testing Guide v4.2 - https://wstg.owasp.org/v4.2/<br/>OWASP Top 10:2021 - https://owasp.org/Top10/<br/>FIRST CVSS v3.1 - https://www.first.org/cvss/v3.1/specification-document<br/>NIST SP 800-115 - https://doi.org/10.6028/NIST.SP.800-115<br/>CWE - https://cwe.mitre.org/", styles["Body"]),
        Paragraph("8.2 Evidence conventions", styles["H2"]),
        Paragraph("Tokens, credentials, personal data, internal identifiers, and implementation details are redacted. Real reports may include screenshots or request excerpts only when necessary to reproduce the issue and authorized for inclusion.", styles["Body"]),
        Paragraph("8.3 Final sample notice", styles["H2"]),
        Paragraph("Every organization name, person, account, endpoint, response, score context, date, and observation in this document is fictional or reserved for documentation. This sample is intended to show format and depth, not to describe a real assessment.", styles["Callout"]),
        Spacer(1, 22*mm), Paragraph("CYBERVSI<br/>Practical security testing. Clear remediation.<br/>connect@cybervsi.com", styles["Center"]),
    ])
    doc.build(story)
    print(OUTPUT)


if __name__ == "__main__":
    build()
