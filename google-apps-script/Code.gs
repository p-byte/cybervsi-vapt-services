const SHEET_NAME = "Leads";

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents);
    const allowedServices = ["VAPT", "SOC"];
    const allowedSizes = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];

    if (!payload.fullName || !payload.email || !payload.company || !payload.requirement) {
      return jsonResponse({ ok: false, message: "Missing required fields" });
    }

    if (!allowedServices.includes(payload.service) || !allowedSizes.includes(payload.companySize)) {
      return jsonResponse({ ok: false, message: "Invalid form options" });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return jsonResponse({ ok: false, message: "Leads sheet not found" });
    }

    sheet.appendRow([
      payload.receivedAt || new Date().toISOString(),
      sanitize(payload.fullName),
      sanitize(payload.email),
      sanitize(payload.company),
      payload.service,
      payload.companySize,
      sanitize(payload.requirement),
      true,
      "cybervsi.com",
      "New",
    ]);

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, message: "Unable to record lead" });
  }
}

function sanitize(value) {
  const text = String(value || "").trim();
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
