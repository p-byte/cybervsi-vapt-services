from pathlib import Path
import re

import pymupdf
from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject


ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(
    r"C:\Users\veera\Downloads\ACFrOgC9YG1mysv0Af6_w42xEKd53PhfQfyEWR1eLr1pEBhfGTvibFqmC3ySW7dyrvy9Nij-T_6p35xm-4zwcySbE-cseC6pPiZw4iUiLlWJvTyuTzj02ZoPLV-rKRuKfHWtHZoG_MfJ61VIrkzzALXId7qN3cj8w0fI7MRLsb6luuOENHb53I7-1gM953w=.pdf"
)
OUTPUT = ROOT / "public" / "reports" / "cybervsi-sanitized-web-application-assessment-sample.pdf"

NAVY = (7 / 255, 17 / 255, 31 / 255)
PANEL = (16 / 255, 34 / 255, 56 / 255)
BLUE = (46 / 255, 144 / 255, 250 / 255)
MINT = (101 / 255, 214 / 255, 192 / 255)
WHITE = (1, 1, 1)
INK = (22 / 255, 35 / 255, 51 / 255)
MUTED = (86 / 255, 106 / 255, 126 / 255)
PALE = (243 / 255, 247 / 255, 250 / 255)


REPLACEMENTS = [
    ("Pavilion Capital Holdings Pte. Ltd.", "Sample Organization"),
    ("Pavilion Capital Holdings Pte Ltd", "Sample Organization"),
    ("Pavilion Capital", "Sample Organization"),
    ("Pavilion capital", "Sample Organization"),
    ("Pavilion", "Sample"),
    ("Ssquad Pte Ltd (HQ)", "CyberVSI"),
    ("SSQUAD PTE LTD", "CYBERVSI"),
    ("Ssquad Pte Ltd.", "CyberVSI"),
    ("Ssquad Pte Ltd", "CyberVSI"),
    ("Ssquad", "CyberVSI"),
    ("SSQUAD", "CYBERVSI"),
    ("Seviora Group", "Sample Organization"),
    ("SEVIORA GROUP", "SAMPLE ORGANIZATION"),
    ("IEMS eFront", "Sample Customer Portal"),
    ("IEMS", "Sample Portal"),
    ("eFront", "Customer Portal"),
    ("https://frontinvest-iems.sevioragroup.internal", "https://portal.example.test"),
    ("Udaya.Venkat@sevioragroup.com", "client-contact@example.test"),
    ("teckli@pavcap.com.sg", "client-owner@example.test"),
    ("archana@ssquad.com", "connect@cybervsi.com"),
    ("ravi@ssquad.com", "connect@cybervsi.com"),
    ("support@ssquad.com", "connect@cybervsi.com"),
    ("www.ssquad.com", "service.cybervsi.com"),
    ("Archana", "CyberVSI Security Team"),
    ("Udaya Venkat", "Client Security Contact"),
    ("CHOO Teck Li", "Client System Owner"),
    ("Teck Li", "Client System Owner"),
    ("1 Ubi View, #04-05 Focus One,", "service.cybervsi.com"),
    ("Singapore 408555.", "connect@cybervsi.com"),
    ("#3 Fraser St, #10-23 DUO Tower, Singapore", "Client details removed for public sample"),
    ("189352", ""),
]

BANNED_PATTERNS = [
    "pavilion", "ssquad", "seviora", "iems", "efront", "archana", "udaya", "teckli",
    "pavcap.com", "ssquad.com", "sevioragroup.com", "frontinvest", "ubi view", "fraser st",
]


def fit_text(page, rect, text, color=INK, font="helv", max_size=8.5, align=0):
    if not text:
        return
    size = min(max_size, max(5.5, rect.height * 0.55))
    expanded = pymupdf.Rect(rect.x0, rect.y0 - 0.5, rect.x1, rect.y1 + 1.5)
    while size >= 5:
        result = page.insert_textbox(expanded, text, fontname=font, fontsize=size, color=color, align=align)
        if result >= 0:
            return
        size -= 0.5


def draw_logo(page):
    rect = pymupdf.Rect(68, 55, 155, 96)
    page.draw_rect(rect, color=NAVY, fill=NAVY, width=0.6, overlay=True)
    page.draw_rect(pymupdf.Rect(72, 62, 103, 89), color=MINT, width=1.2, overlay=True)
    page.insert_text((78, 80), "CV", fontname="helv", fontsize=11, color=MINT, overlay=True)
    page.insert_text((108, 80), "CyberVSI", fontname="helv", fontsize=9.5, color=WHITE, overlay=True)


def draw_cover(page):
    area = page.rect
    page.draw_rect(area, color=NAVY, fill=NAVY, overlay=True)
    page.draw_rect(pymupdf.Rect(0, 0, area.width, 112), color=PANEL, fill=PANEL, overlay=True)
    page.draw_rect(pymupdf.Rect(0, 112, 16, area.height), color=BLUE, fill=BLUE, overlay=True)
    page.draw_circle(pymupdf.Point(area.width - 92, 92), 38, color=BLUE, width=2, overlay=True)
    page.draw_line(pymupdf.Point(area.width - 65, 119), pymupdf.Point(area.width - 36, 148), color=BLUE, width=2, overlay=True)
    page.insert_text((52, 80), "CYBERVSI", fontname="helv", fontsize=17, color=MINT, overlay=True)
    page.insert_textbox(pymupdf.Rect(52, 175, 520, 285), "Web Application Security\nAssessment Report", fontname="helv", fontsize=27, color=WHITE, lineheight=1.22, overlay=True)
    page.insert_text((54, 325), "COMPREHENSIVE PUBLIC SAMPLE", fontname="helv", fontsize=11, color=MINT, overlay=True)
    rows = [
        ("Prepared by", "CyberVSI Security Testing"),
        ("Prepared for", "Sample Organization"),
        ("Report date", "22 December 2025"),
        ("Document version", "V2.1 - Sanitized Sample"),
        ("Classification", "Public sample - fictionalized and sanitized"),
    ]
    y = 385
    for label, value in rows:
        page.draw_rect(pymupdf.Rect(52, y - 17, 505, y + 11), color=(0.32, 0.39, 0.47), fill=(0.09, 0.16, 0.24), width=0.5, overlay=True)
        page.insert_text((63, y), label.upper(), fontname="helv", fontsize=7.5, color=MINT, overlay=True)
        page.insert_text((176, y), value, fontname="helv", fontsize=9.5, color=WHITE, overlay=True)
        y += 33
    page.draw_rect(pymupdf.Rect(52, 590, 515, 681), color=MINT, fill=(0.06, 0.14, 0.21), width=1, overlay=True)
    page.insert_text((67, 616), "SAMPLE DATA NOTICE", fontname="helv", fontsize=10, color=MINT, overlay=True)
    page.insert_textbox(
        pymupdf.Rect(67, 630, 500, 671),
        "All client names, contacts, systems, domains, IP addresses and evidence images have been removed or replaced. This document demonstrates report format only.",
        fontname="helv", fontsize=9, color=WHITE, lineheight=1.25, overlay=True,
    )
    page.insert_text((52, 790), "connect@cybervsi.com  |  service.cybervsi.com", fontname="helv", fontsize=8.5, color=MINT, overlay=True)


def draw_footer(page, page_number, total_pages):
    width = page.rect.width
    page.draw_line(pymupdf.Point(0, 744), pymupdf.Point(width, 744), color=(0.2, 0.2, 0.2), width=0.5, overlay=True)
    page.insert_text((68, 770), "PUBLIC SAMPLE", fontname="helv", fontsize=8.5, color=(0.85, 0.05, 0.05), overlay=True)
    page.insert_text((151, 770), "© 2026 CYBERVSI", fontname="helv", fontsize=8, color=INK, overlay=True)
    page.insert_text((68, 798), "service.cybervsi.com", fontname="helv", fontsize=8, color=WHITE, overlay=True)
    page.insert_text((405, 798), "connect@cybervsi.com", fontname="helv", fontsize=8, color=WHITE, overlay=True)
    page.draw_rect(pymupdf.Rect(58, 780, 300, 815), color=NAVY, fill=NAVY, overlay=True)
    page.draw_rect(pymupdf.Rect(300, 780, width, 815), color=(0.92, 0.02, 0.02), fill=(0.92, 0.02, 0.02), overlay=True)
    page.insert_text((68, 802), "service.cybervsi.com", fontname="helv", fontsize=8, color=WHITE, overlay=True)
    page.insert_text((365, 802), "Email: connect@cybervsi.com", fontname="helv", fontsize=8, color=WHITE, overlay=True)
    page.insert_text((460, 763), f"Page {page_number} of {total_pages}", fontname="helv", fontsize=10, color=INK, overlay=True)


def draw_contact_table(page):
    x0, x1, y = 70, 535, 446
    page.insert_text((70, 432), "1.3  Contact information", fontname="helv", fontsize=11, color=INK, overlay=True)
    rows = [
        ("CyberVSI", "Security Testing Team", "connect@cybervsi.com"),
        ("Sample Organization", "Client Security Contact", "client-contact@example.test"),
    ]
    for organization, role, email in rows:
        page.draw_rect(pymupdf.Rect(x0, y, x1, y + 24), color=(0.7, 0.0, 0.0), fill=(0.92, 0.02, 0.02), width=0.5, overlay=True)
        page.insert_text((x0 + 8, y + 16), organization, fontname="helv", fontsize=8.5, color=WHITE, overlay=True)
        page.draw_rect(pymupdf.Rect(x0, y + 24, x1, y + 51), color=(0.65, 0.65, 0.65), fill=(0.92, 0.92, 0.92), width=0.5, overlay=True)
        page.insert_text((x0 + 8, y + 42), role, fontname="helv", fontsize=8.5, color=INK, overlay=True)
        page.insert_text((x0 + 245, y + 42), email, fontname="helv", fontsize=8.5, color=INK, overlay=True)
        y += 62


def draw_approval_table(page):
    x0, x1, y = 70, 528, 155
    page.insert_text((70, 140), "8.  DOCUMENT APPROVAL DETAILS", fontname="helv", fontsize=12, color=INK, overlay=True)
    rows = [
        ("Document name", "Web Application Security Assessment Report V2.1"),
        ("Organization", "CyberVSI"),
        ("Submitted to", "Sample Organization"),
        ("Version", "2.1 - Sanitized Sample"),
        ("Classification", "Public Sample"),
        ("Category", "Report"),
        ("Created by", "CyberVSI Security Testing Team"),
        ("Contact email", "connect@cybervsi.com"),
        ("Approval", "Sample document - no client approval required"),
    ]
    for index, (label, value) in enumerate(rows):
        fill = (0.94, 0.94, 0.94) if index % 2 == 0 else WHITE
        page.draw_rect(pymupdf.Rect(x0, y, x1, y + 22), color=(0.72, 0.72, 0.72), fill=fill, width=0.45, overlay=True)
        page.insert_text((x0 + 7, y + 15), label, fontname="helv", fontsize=8.2, color=INK, overlay=True)
        page.insert_text((x0 + 140, y + 15), value, fontname="helv", fontsize=8.2, color=INK, overlay=True)
        y += 22


def main():
    doc = pymupdf.open(SOURCE)
    replacement_jobs = {}
    evidence_boxes = {}

    for page_index, page in enumerate(doc):
        for link in list(page.get_links()):
            try:
                page.delete_link(link)
            except Exception:
                pass

        if page_index == 0:
            page.add_redact_annot(page.rect, fill=NAVY)
            continue

        logo_rect = pymupdf.Rect(66, 53, 158, 98)
        page.add_redact_annot(logo_rect, fill=WHITE)

        page_jobs = []
        occupied = []
        for old, new in REPLACEMENTS:
            for rect in page.search_for(old):
                if any(rect.intersects(existing) and rect.get_area() <= existing.get_area() for existing in occupied):
                    continue
                padded = pymupdf.Rect(rect.x0 - 1, rect.y0 - 1, rect.x1 + 1, rect.y1 + 1)
                occupied.append(padded)
                page.add_redact_annot(padded, fill=WHITE)
                page_jobs.append((padded, new))

        boxes = []
        if 13 <= page_index <= 40:
            for block in page.get_text("dict")["blocks"]:
                if block.get("type") != 1:
                    continue
                rect = pymupdf.Rect(block["bbox"])
                if rect.y0 < 105 or rect.width < 100 or rect.height < 45:
                    continue
                padded = pymupdf.Rect(rect.x0 - 2, rect.y0 - 2, rect.x1 + 2, rect.y1 + 2)
                page.add_redact_annot(padded, fill=PALE)
                boxes.append(padded)

        replacement_jobs[page_index] = page_jobs
        evidence_boxes[page_index] = boxes

    for page_index, page in enumerate(doc):
        page.apply_redactions(images=2, graphics=1, text=0)
        if page_index == 0:
            draw_cover(page)
            continue

        draw_logo(page)
        for rect, text in replacement_jobs.get(page_index, []):
            fit_text(page, rect, text)

        for rect in evidence_boxes.get(page_index, []):
            page.draw_rect(rect, color=(0.72, 0.78, 0.83), fill=PALE, width=0.8, overlay=True)
            page.draw_rect(pymupdf.Rect(rect.x0, rect.y0, rect.x1, min(rect.y1, rect.y0 + 24)), color=PANEL, fill=PANEL, overlay=True)
            page.insert_text((rect.x0 + 10, rect.y0 + 16), "SANITIZED SAMPLE EVIDENCE", fontname="helv", fontsize=8, color=WHITE, overlay=True)
            content = "Original client screenshot permanently removed.\nSynthetic evidence may be inserted in a live engagement report."
            page.insert_textbox(pymupdf.Rect(rect.x0 + 12, rect.y0 + 38, rect.x1 - 12, rect.y1 - 12), content, fontname="helv", fontsize=9, color=MUTED, align=1, lineheight=1.35, overlay=True)

    structural_jobs = {}
    for page_index, page in enumerate(doc):
        if page_index == 0:
            structural_jobs[page_index] = []
            continue
        jobs = [("footer", pymupdf.Rect(0, 742, page.rect.width, page.rect.height))]
        for label in ("Affected URL", "Vision/Target"):
            for label_rect in page.search_for(label):
                if label_rect.y0 < 700:
                    wrapped_url_pages = {21, 23, 25, 27, 30, 33, 37}
                    upward = 50 if page_index in wrapped_url_pages else 12
                    jobs.append(("target", pymupdf.Rect(68, max(105, label_rect.y0 - upward), 535, min(label_rect.y0 + 28, 730))))
        if page_index == 3:
            jobs.append(("contact", pymupdf.Rect(65, 420, 545, 575)))
        if page_index == 27:
            jobs.append(("database", pymupdf.Rect(68, 245, 535, 345)))
        if page_index == 46:
            jobs.append(("approval", pymupdf.Rect(65, 125, 545, 370)))
        for _, rect in jobs:
            page.add_redact_annot(rect, fill=WHITE)
        structural_jobs[page_index] = jobs

    for page_index, page in enumerate(doc):
        if not structural_jobs.get(page_index):
            continue
        page.apply_redactions(images=2, graphics=1, text=0)
        for kind, rect in structural_jobs[page_index]:
            if kind == "target":
                page.draw_rect(rect, color=(0.55, 0.55, 0.55), fill=(0.96, 0.96, 0.96), width=0.5, overlay=True)
                page.insert_text((rect.x0 + 8, rect.y0 + 16), "Affected target", fontname="helv", fontsize=8, color=INK, overlay=True)
                page.insert_text((rect.x0 + 125, rect.y0 + 16), "https://portal.example.test/sample-path", fontname="helv", fontsize=8.5, color=BLUE, overlay=True)
            elif kind == "contact":
                draw_contact_table(page)
            elif kind == "database":
                page.insert_text((74, 266), "Sanitized connection-string example:", fontname="helv", fontsize=9, color=INK, overlay=True)
                page.insert_text((74, 286), "datasource=sample-db; username=sample_user; password=***", fontname="cour", fontsize=8.5, color=PANEL, overlay=True)
                page.insert_text((74, 307), "Original database names, hosts, usernames and secrets permanently removed.", fontname="helv", fontsize=8.5, color=MUTED, overlay=True)
            elif kind == "approval":
                draw_approval_table(page)
        draw_footer(page, page_index + 1, doc.page_count)

    cleanup_replacements = {
        "frontinvest": "portal",
        "sevioragroup.internal": "example.test",
        "ssquad": "CyberVSI",
    }
    cleanup_jobs = {}
    for page_index, page in enumerate(doc):
        jobs = []
        for old, new in cleanup_replacements.items():
            for rect in page.search_for(old):
                padded = pymupdf.Rect(rect.x0 - 1, rect.y0 - 1, rect.x1 + 1, rect.y1 + 1)
                page.add_redact_annot(padded, fill=WHITE)
                jobs.append((padded, new))
        cleanup_jobs[page_index] = jobs
    for page_index, page in enumerate(doc):
        if cleanup_jobs[page_index]:
            page.apply_redactions(images=0, graphics=0, text=0)
            for rect, text in cleanup_jobs[page_index]:
                fit_text(page, rect, text)

    metadata = {
        "title": "CyberVSI Web Application Security Assessment - Sanitized Sample",
        "author": "CyberVSI",
        "subject": "Public sample report with fictionalized and sanitized data",
        "keywords": "CyberVSI, VAPT, web application security, sample report",
        "creator": "CyberVSI",
        "producer": "CyberVSI",
        "creationDate": "",
        "modDate": "",
        "trapped": "",
    }
    doc.set_metadata(metadata)
    doc.save(OUTPUT, garbage=4, deflate=True, clean=True)
    doc.close()

    reader = PdfReader(OUTPUT)
    writer = PdfWriter()
    writer.clone_document_from_reader(reader)
    writer.root_object.pop(NameObject("/OpenAction"), None)
    names = writer.root_object.get(NameObject("/Names"))
    if names:
        names_object = names.get_object()
        names_object.pop(NameObject("/JavaScript"), None)
    writer.root_object.pop(NameObject("/AA"), None)
    for page in writer.pages:
        page.pop(NameObject("/AA"), None)
        annotations = page.get(NameObject("/Annots"), [])
        for annotation_ref in annotations:
            annotation = annotation_ref.get_object()
            annotation.pop(NameObject("/AA"), None)
            action = annotation.get(NameObject("/A"))
            if action and action.get_object().get(NameObject("/S")) == NameObject("/JavaScript"):
                annotation.pop(NameObject("/A"), None)
    writer.add_metadata({
        "/Title": metadata["title"],
        "/Author": metadata["author"],
        "/Subject": metadata["subject"],
        "/Keywords": metadata["keywords"],
        "/Creator": metadata["creator"],
        "/Producer": metadata["producer"],
    })
    clean_output = OUTPUT.with_suffix(".clean.pdf")
    with clean_output.open("wb") as stream:
        writer.write(stream)
    clean_output.replace(OUTPUT)

    check = pymupdf.open(OUTPUT)
    text = "\n".join(page.get_text() for page in check).lower()
    found = [term for term in BANNED_PATTERNS if term in text]
    emails = sorted(set(re.findall(r"[a-z0-9._%+-]+@[a-z0-9.-]+", text)))
    uris = []
    for page in check:
        uris.extend(link.get("uri", "") for link in page.get_links() if link.get("uri"))
    check.close()
    if found:
        raise RuntimeError(f"Sanitization check failed; banned terms remain: {found}")
    if any(not address.endswith("@cybervsi.com") and not address.endswith("@example.test") for address in emails):
        raise RuntimeError(f"Unexpected email addresses remain: {emails}")
    if uris:
        raise RuntimeError(f"External links remain: {uris}")
    print(f"Created {OUTPUT}")
    print(f"Emails retained: {emails}")


if __name__ == "__main__":
    main()
