from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
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

NAVY = colors.HexColor("#07111F")
PANEL = colors.HexColor("#101F32")
BLUE = colors.HexColor("#5FB3FF")
MINT = colors.HexColor("#8EE6D2")
INK = colors.HexColor("#162333")
MUTED = colors.HexColor("#526579")
LIGHT = colors.HexColor("#E8EEF4")
RED = colors.HexColor("#C73843")
AMBER = colors.HexColor("#D28124")
GREEN = colors.HexColor("#1D7A55")


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="CoverBrand", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=12, textColor=MINT, spaceAfter=8))
styles.add(ParagraphStyle(name="CoverTitle", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=30, leading=34, textColor=colors.white, spaceAfter=16))
styles.add(ParagraphStyle(name="CoverMeta", parent=styles["Normal"], fontSize=11, leading=17, textColor=LIGHT))
styles.add(ParagraphStyle(name="H1x", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=22, leading=27, textColor=NAVY, spaceAfter=12))
styles.add(ParagraphStyle(name="H2x", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=14, leading=18, textColor=PANEL, spaceBefore=10, spaceAfter=7))
styles.add(ParagraphStyle(name="Bodyx", parent=styles["BodyText"], fontSize=9.5, leading=14, textColor=INK, spaceAfter=8))
styles.add(ParagraphStyle(name="Smallx", parent=styles["BodyText"], fontSize=8, leading=11, textColor=MUTED))
styles.add(ParagraphStyle(name="Callout", parent=styles["BodyText"], fontSize=10, leading=15, textColor=PANEL, backColor=colors.HexColor("#EAF7F4"), borderColor=MINT, borderWidth=1, borderPadding=10, spaceAfter=12))
styles.add(ParagraphStyle(name="FindingTitle", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=16, leading=20, textColor=NAVY, spaceAfter=8))
styles.add(ParagraphStyle(name="CenterSmall", parent=styles["Smallx"], alignment=TA_CENTER))
styles.add(ParagraphStyle(name="TableHeader", parent=styles["Smallx"], fontName="Helvetica-Bold", fontSize=8, leading=10, textColor=colors.white))
styles.add(ParagraphStyle(name="TableCell", parent=styles["Smallx"], fontSize=8, leading=10, textColor=INK))


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(colors.white)
    canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
    canvas.setFillColor(NAVY)
    canvas.rect(0, A4[1] - 15 * mm, A4[0], 15 * mm, fill=1, stroke=0)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.setFillColor(MINT)
    canvas.drawString(18 * mm, A4[1] - 10 * mm, "CYBERVSI | VAPT SAMPLE REPORT")
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 10 * mm, "Fictional sample. Not a client deliverable.")
    canvas.drawRightString(A4[0] - 18 * mm, 10 * mm, f"Page {doc.page}")
    canvas.restoreState()


def cover(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
    canvas.setStrokeColor(BLUE)
    canvas.setLineWidth(2)
    canvas.circle(A4[0] - 42 * mm, A4[1] - 48 * mm, 18 * mm, stroke=1, fill=0)
    canvas.line(A4[0] - 29 * mm, A4[1] - 61 * mm, A4[0] - 17 * mm, A4[1] - 73 * mm)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.setFillColor(MINT)
    canvas.drawString(18 * mm, 16 * mm, "CONNECT@CYBERVSI.COM")
    canvas.restoreState()


def table(data, widths=None, header=True):
    wrapped = []
    for row_index, row in enumerate(data):
        style = styles["TableHeader"] if header and row_index == 0 else styles["TableCell"]
        wrapped.append([value if hasattr(value, "wrap") else Paragraph(str(value), style) for value in row])
    t = Table(wrapped, colWidths=widths, repeatRows=1 if header else 0, hAlign="LEFT")
    commands = [
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("BACKGROUND", (0, 0), (-1, 0), PANEL),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 8),
        ("LEADING", (0, 0), (-1, -1), 11),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5DF")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F5F8FA")]),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]
    t.setStyle(TableStyle(commands))
    return t


def cover_story(title, subtitle, scope):
    return [
        Spacer(1, 46 * mm),
        Paragraph("CYBERVSI", styles["CoverBrand"]),
        Paragraph(title, styles["CoverTitle"]),
        Paragraph(subtitle, styles["CoverMeta"]),
        Spacer(1, 35 * mm),
        Paragraph("SAMPLE / FICTIONAL", styles["CoverBrand"]),
        Paragraph(f"Target: {scope}<br/>Assessment window: 08-12 September 2026<br/>Report date: 18 September 2026<br/>Classification: Public sample", styles["CoverMeta"]),
        NextPageTemplate("body"),
        PageBreak(),
    ]


def finding(fid, title, severity, score, vector, classification, affected, description, impact, evidence, remediation):
    sev_color = RED if severity in ("Critical", "High") else AMBER if severity == "Medium" else GREEN
    score_label = f"CVSS 3.1 {score}" if score != "N/A" else "CVSS N/A"
    badge = Table([[severity.upper(), score_label, fid]], colWidths=[35 * mm, 35 * mm, 60 * mm])
    badge.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), sev_color),
        ("BACKGROUND", (1, 0), (-1, 0), LIGHT),
        ("TEXTCOLOR", (0, 0), (0, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, -1), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 8),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#B8C3CE")),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return [
        Paragraph(title, styles["FindingTitle"]),
        badge,
        Spacer(1, 4 * mm),
        table([["Classification", classification], ["CVSS vector", vector]], [36 * mm, 122 * mm]),
        Spacer(1, 4 * mm),
        Paragraph(f"<b>Affected asset</b><br/>{affected}", styles["Bodyx"]),
        Paragraph(f"<b>Description</b><br/>{description}", styles["Bodyx"]),
        Paragraph(f"<b>Business impact</b><br/>{impact}", styles["Bodyx"]),
        Paragraph(f"<b>Reproduction and fictional evidence</b><br/><font name='Courier'>{evidence}</font>", styles["Callout"]),
        Paragraph(f"<b>Recommended remediation</b><br/>{remediation}", styles["Bodyx"]),
        Paragraph("Validation: Re-test the affected flow after the fix and confirm that equivalent endpoints enforce the same control.", styles["Smallx"]),
        PageBreak(),
    ]


def build_report(filename, title, subtitle, scope, objective, findings, tested):
    path = OUT / filename
    doc = BaseDocTemplate(str(path), pagesize=A4, rightMargin=18 * mm, leftMargin=18 * mm, topMargin=22 * mm, bottomMargin=18 * mm, title=title, author="CyberVSI")
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="content")
    doc.addPageTemplates([
        PageTemplate(id="cover", frames=[frame], onPage=cover),
        PageTemplate(id="body", frames=[frame], onPage=header_footer),
    ])
    severity_order = ["Critical", "High", "Medium", "Low", "Informational"]
    counts = {severity: sum(1 for finding_row in findings if finding_row[2] == severity) for severity in severity_order}
    risk_rows = [["Severity", "Count", "Recommended handling"]]
    handling = {
        "Critical": "Immediate containment and executive notification",
        "High": "Prioritize before the next production release",
        "Medium": "Plan remediation in the current engineering cycle",
        "Low": "Address through scheduled security hardening",
        "Informational": "Track as a defense-in-depth improvement",
    }
    risk_rows += [[severity, str(counts[severity]), handling[severity]] for severity in severity_order if counts[severity]]
    story = cover_story(title, subtitle, scope)
    story += [
        Paragraph("Executive Summary", styles["H1x"]),
        Paragraph(objective, styles["Bodyx"]),
        Paragraph("This sample presents security findings as inputs to the organization’s risk-management process. Business impact and remediation priority should be adjusted using the owner’s threat model, data sensitivity, and operating context.", styles["Callout"]),
        Paragraph("Risk overview", styles["H2x"]),
        table(risk_rows, [38 * mm, 25 * mm, 95 * mm]),
        Spacer(1, 6 * mm),
        Paragraph("Priority actions", styles["H2x"]),
        Paragraph("1. Restrict the highest-risk attack path.<br/>2. Apply the recommended configuration or code correction.<br/>3. Review related components for the same root cause.<br/>4. Retest and record closure evidence.", styles["Bodyx"]),
        PageBreak(),
        Paragraph("Assessment Parameters", styles["H1x"]),
        table([["Item", "Sample detail"], ["Objective", objective], ["Scope", scope], ["Approach", "Time-boxed black-box and authenticated testing. Manual validation was supported by security tooling; scanner output alone was not treated as a confirmed finding."], ["Test accounts", "Two fictional standard-user roles and one read-only administrative role"], ["Limitations", "No source-code review, social engineering, denial-of-service, persistence, destructive actions, or third-party infrastructure testing"], ["Standards reference", "OWASP WSTG v4.2, NIST SP 800-115, PCI SSC Penetration Testing Guidance, and FIRST CVSS v3.1"]], [40 * mm, 118 * mm]),
        Spacer(1, 6 * mm),
        Paragraph("Rules of engagement", styles["H2x"]),
        Paragraph("Testing was authorized only for the listed fictional targets during the stated window. Stop conditions included service instability, evidence of access to out-of-scope data, or contact from the designated incident owner. Evidence collection was minimized and credentials were not retained in the report.", styles["Bodyx"]),
        PageBreak(),
        Paragraph("Testing Coverage", styles["H1x"]),
        table([["Test ID", "Control area", "Result"]] + [[test_id, area, status] for test_id, area, status in tested], [38 * mm, 88 * mm, 32 * mm]),
        Spacer(1, 7 * mm),
        Paragraph("Result definitions", styles["H2x"]),
        Paragraph("Completed means the planned checks were performed. Finding raised means at least one validated issue is documented. No finding means no issue was confirmed within the assessment constraints; it does not guarantee absence of vulnerabilities. Not tested must be explained in the limitations section.", styles["Bodyx"]),
        PageBreak(),
        Paragraph("Findings Summary", styles["H1x"]),
        table([["ID", "Finding", "Severity", "CVSS"]] + [[f[0], f[1], f[2], f[3]] for f in findings], [24 * mm, 88 * mm, 25 * mm, 21 * mm]),
        Spacer(1, 8 * mm),
        Paragraph("Severity approach", styles["H2x"]),
        Paragraph("CyberVSI reports the CVSS v3.1 Base score and vector where the framework is appropriate. Configuration and defense-in-depth observations may be marked N/A instead of forcing a misleading score. Technical severity is an input to risk assessment; the system owner should apply threat, asset criticality, data sensitivity, compensating controls, and regulatory context before accepting business risk.", styles["Bodyx"]),
        PageBreak(),
    ]
    for f in findings:
        story += finding(*f)
    story += [
        Paragraph("Remediation Roadmap", styles["H1x"]),
        table([["Timeframe", "Recommended action", "Owner"], ["0-7 days", "Contain the high-risk path and confirm monitoring coverage", "Application or infrastructure owner"], ["8-30 days", "Implement durable fixes and review equivalent components", "Engineering and security"], ["31-60 days", "Complete hardening items, retest, and retain closure evidence", "Security governance"]], [30 * mm, 93 * mm, 35 * mm]),
        Spacer(1, 8 * mm),
        Paragraph("Retest expectations", styles["H2x"]),
        Paragraph("A retest should confirm that the original proof no longer succeeds, the root cause is corrected, and the fix does not introduce a regression. Residual risk and accepted exceptions should be documented by the system owner.", styles["Bodyx"]),
        PageBreak(),
        Paragraph("Appendix", styles["H1x"]),
        Paragraph("Methodology references", styles["H2x"]),
        Paragraph("OWASP Web Security Testing Guide v4.2: https://wstg.owasp.org/v4.2/<br/>NIST SP 800-115: https://doi.org/10.6028/NIST.SP.800-115<br/>FIRST CVSS v3.1: https://www.first.org/cvss/v3.1/specification-document<br/>PCI SSC Penetration Testing Guidance: https://listings.pcisecuritystandards.org/documents/Penetration-Testing-Guidance-v1_1.pdf", styles["Bodyx"]),
        Paragraph("Sample data notice", styles["H2x"]),
        Paragraph("All company names, systems, domains, IP addresses, user accounts, timestamps, request fragments, findings, and evidence in this document are fictional. This document demonstrates the intended CyberVSI reporting format and is not proof of a completed assessment.", styles["Callout"]),
        Spacer(1, 25 * mm),
        Paragraph("CyberVSI<br/>connect@cybervsi.com<br/>service.cybervsi.com", styles["CenterSmall"]),
    ]
    doc.build(story)
    return path


web_findings = [
    ("WEB-001", "Broken object-level authorization in invoice export", "High", "6.5", "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N", "CWE-639 | OWASP A01:2021 | WSTG-ATHZ-04", "portal.demo.invalid/api/invoices/{id}/export", "The export handler trusts a user-controlled invoice identifier and does not enforce tenant ownership after authenticating the requester.", "A standard authenticated user could read another tenant’s invoice, exposing billing and customer information. The sample did not test bulk enumeration or records outside the agreed test dataset.", "1. Sign in as tenant-alpha.test. 2. Request owned invoice INV-1001: 200 OK. 3. Replace the identifier with tenant-beta invoice INV-1042. 4. Response: 200 OK; customer name and line items returned. Sensitive values are redacted.", "Enforce object-level authorization in the service layer for every read and export. Resolve tenant identity from the trusted session, reject cross-tenant identifiers with a consistent response, review sibling endpoints, and add automated negative authorization tests."),
    ("WEB-002", "Sessions remain active after password reset", "Medium", "5.6", "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:H/I:N/A:N", "CWE-613 | OWASP A07:2021 | WSTG-SESS-06", "portal.demo.invalid account and session services", "The password-reset flow changes the credential but does not revoke existing web sessions or refresh tokens.", "A previously stolen session may remain usable after account recovery. Exploitation requires an attacker to already possess a valid session token.", "1. Create sessions A and B for the same test account. 2. Reset the password using session A. 3. Replay session B six minutes later. 4. GET /api/profile returned 200 OK. No privileged actions were attempted.", "Revoke active sessions and refresh tokens when a password is reset. Rotate the current session, require reauthentication for sensitive changes, expose session management to users, and alert on security-sensitive account recovery events."),
    ("WEB-003", "Permissive framing policy", "Low", "N/A", "Not assigned - defense-in-depth configuration", "CWE-1021 | WSTG-CLNT-09", "portal.demo.invalid", "The Content-Security-Policy permits framing by any origin through frame-ancestors *.", "An attacker-controlled site could frame the application and attempt UI redressing. The sample did not demonstrate a complete harmful action because state-changing functions required an additional confirmation.", "Response header observed on /dashboard: Content-Security-Policy: default-src 'self'; frame-ancestors *", "Set frame-ancestors to 'none' unless framing is required. If required, list only trusted origins. Retain anti-CSRF controls and verify sensitive actions cannot be completed through an embedded context."),
]

network_findings = [
    ("NET-001", "Internet-facing administrator portal accepts default credentials", "Critical", "9.8", "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H", "CWE-1392 | External attack surface", "198.51.100.24:8443 (documentation-only range)", "The fictional appliance administrator portal was reachable from the internet and accepted the vendor-documented default credential pair supplied in the rules of engagement.", "An unauthenticated remote attacker could obtain administrative control of the appliance, change security policy, access configuration secrets, or disrupt connectivity.", "1. Browse to https://198.51.100.24:8443. 2. Submit the approved default test credential. 3. Dashboard returned 200 OK and displayed Administrator role. 4. Log out immediately; no configuration was changed.", "Immediately rotate the credential and review authentication logs. Restrict the portal to a management network or VPN, require MFA, remove default accounts where supported, and continuously monitor external exposure."),
    ("NET-002", "Legacy TLS protocol and cipher support", "Medium", "N/A", "Not assigned - cryptographic configuration", "CWE-326 | NIST SP 800-52r2 alignment", "198.51.100.18:443", "The service accepts TLS 1.0 and a static-RSA CBC cipher suite that falls below a modern transport-security baseline.", "Legacy protocol support expands downgrade and cryptographic exposure and may conflict with organizational or regulatory requirements. Exploitability depends on client behavior and network position.", "Protocol handshake accepted: TLSv1.0. Accepted suite: TLS_RSA_WITH_AES_128_CBC_SHA. Certificate validation and TLS 1.2 remained functional.", "Disable TLS 1.0 and 1.1 and static-RSA suites. Prefer TLS 1.2 or 1.3 with approved AEAD suites, validate required legacy clients, and repeat protocol and cipher enumeration after rollout."),
    ("NET-003", "Detailed SSH product banner", "Informational", "N/A", "Not assigned - informational exposure", "CWE-200 | Service hardening", "198.51.100.29:22", "The SSH service reveals a product, version, and internal build label before authentication.", "The banner assists fingerprinting but does not by itself provide access. Patch status and access controls remain the primary security controls.", "Connection banner: SSH-2.0-ExampleSSH_8.1p1-demo-build. Authentication was not attempted because credentials were outside scope.", "Reduce custom build detail where operationally practical, maintain supported versions and patching, restrict source networks, and monitor authentication attempts. Do not treat banner suppression as a substitute for remediation."),
]


build_report(
    "cybervsi-web-application-vapt-sample.pdf",
    "Web Application VAPT Report",
    "Illustrative security assessment deliverable",
    "Acme Portal (portal.demo.invalid)",
    "Assess a fictional customer portal for common application security weaknesses and provide prioritized, reproducible remediation guidance.",
    web_findings,
    [("WSTG-INFO", "Information gathering and attack-surface mapping", "Completed"), ("WSTG-ATHN", "Authentication testing", "Completed"), ("WSTG-ATHZ", "Authorization testing", "Finding raised"), ("WSTG-SESS", "Session management testing", "Finding raised"), ("WSTG-INPV", "Input validation testing", "No finding"), ("WSTG-BUSL", "Business-logic testing", "No finding"), ("WSTG-CLNT", "Client-side testing", "Finding raised"), ("WSTG-CONF", "Configuration and deployment testing", "Completed")],
)

build_report(
    "cybervsi-external-network-vapt-sample.pdf",
    "External Network VAPT Report",
    "Illustrative perimeter security assessment deliverable",
    "Documentation-only IP range 198.51.100.0/27",
    "Assess a fictional internet-facing perimeter for exposed services, unsafe configuration, and attack paths that require remediation.",
    network_findings,
    [("NET-DISC", "Host discovery within approved range", "Completed"), ("NET-SVC", "Port and service validation", "Completed"), ("NET-TLS", "TLS protocol and cipher review", "Finding raised"), ("NET-ADMIN", "Administrative exposure review", "Finding raised"), ("NET-AUTH", "Approved authentication checks", "Finding raised"), ("NET-PATCH", "Externally observable patch indicators", "Completed"), ("NET-SEG", "Network segmentation evidence", "Not tested"), ("NET-VALID", "Manual false-positive validation", "Completed")],
)

print(f"Created sample reports in {OUT}")
