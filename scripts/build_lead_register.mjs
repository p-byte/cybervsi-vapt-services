import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = new URL("../outputs/", import.meta.url);
await fs.mkdir(outputDir, { recursive: true });

const workbook = Workbook.create();
const leads = workbook.worksheets.add("Leads");
leads.showGridLines = false;
leads.freezePanes.freezeRows(1);

const headers = [[
  "Timestamp",
  "Full Name",
  "Business Email",
  "Company",
  "Service",
  "Company Size",
  "Security Requirement",
  "Consent",
  "Source",
  "Status",
]];
leads.getRange("A1:J2").values = [
  headers[0],
  [null, null, null, null, "VAPT", null, null, true, "cybervsi.com", "New"],
];

const header = leads.getRange("A1:J1");
header.format.fill = "#E8EEF4";
header.format.font = { bold: true, color: "#162333" };
header.format.borders = { preset: "all", style: "thin", color: "#CBD5DF" };
header.format.rowHeightPx = 30;

const body = leads.getRange("A2:J200");
body.format.borders = { preset: "all", style: "thin", color: "#E0E6EC" };
body.format.verticalAlignment = "center";
body.format.wrapText = true;
leads.getRange("A2:A200").setNumberFormat("yyyy-mm-dd hh:mm:ss");
leads.getRange("E2:E200").dataValidation = { rule: { type: "list", values: ["VAPT", "SOC"] } };
leads.getRange("F2:F200").dataValidation = { rule: { type: "list", values: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"] } };
leads.getRange("J2:J200").dataValidation = { rule: { type: "list", values: ["New", "Contacted", "Qualified", "Closed"] } };

const widths = [145, 145, 210, 165, 105, 110, 360, 85, 120, 105];
for (let index = 0; index < widths.length; index += 1) {
  leads.getRangeByIndexes(0, index, 200, 1).format.columnWidthPx = widths[index];
}
leads.getRange("A2:J2").format.fill = "#F8FAFC";
leads.getRange("A1:J2").format.autofitRows();

const instructions = workbook.worksheets.add("Apps Script Setup");
instructions.showGridLines = false;
instructions.getRange("A1:B7").values = [
  ["CyberVSI lead form connection", "Value"],
  ["Website environment variable", "GOOGLE_SHEETS_WEB_APP_URL"],
  ["Target tab", "Leads"],
  ["Accepted services", "VAPT, SOC"],
  ["Website endpoint", "/api/leads"],
  ["Contact email", "connect@cybervsi.com"],
  ["Note", "Deploy your Apps Script as a web app, then place its /exec URL in .env.local."],
];
instructions.getRange("A1:B1").format.fill = "#E8EEF4";
instructions.getRange("A1:B1").format.font = { bold: true, color: "#162333" };
instructions.getRange("A1:B7").format.borders = { preset: "all", style: "thin", color: "#CBD5DF" };
instructions.getRange("A1:B7").format.wrapText = true;
instructions.getRange("A:A").format.columnWidthPx = 220;
instructions.getRange("B:B").format.columnWidthPx = 520;
instructions.getRange("A1:B7").format.autofitRows();

console.log((await workbook.inspect({ kind: "table", range: "Leads!A1:J4", include: "values,formulas", tableMaxRows: 4, tableMaxCols: 10 })).ndjson);
console.log((await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!", options: { useRegex: true, maxResults: 50 }, summary: "final formula error scan" })).ndjson);

const preview = await workbook.render({ sheetName: "Leads", range: "A1:J8", scale: 1.2, format: "png" });
await fs.writeFile(new URL("lead-register-preview.png", outputDir), new Uint8Array(await preview.arrayBuffer()));

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(new URL("CyberVSI-Lead-Register.xlsx", outputDir).pathname.replace(/^\/(.:)/, "$1"));
console.log("Created CyberVSI-Lead-Register.xlsx");
