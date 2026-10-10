import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = fileURLToPath(new URL("../sales/", import.meta.url));
const outputPath = fileURLToPath(new URL("../sales/CyberVSI_90_Day_Client_Pipeline.xlsx", import.meta.url));
const previewPath = fileURLToPath(new URL("../sales/pipeline-preview.png", import.meta.url));
const budgetPreviewPath = fileURLToPath(new URL("../sales/budget-preview.png", import.meta.url));
const wb = Workbook.create();
const summary = wb.worksheets.add("Dashboard");
const pipeline = wb.worksheets.add("Prospect Pipeline");
const weekly = wb.worksheets.add("13-Week Plan");
const budget = wb.worksheets.add("Lean Budget");
const font = "Arial";
const navy = "#0B1628";
const teal = "#24B8A6";
const blue = "#4EA3F1";
const light = "#EAF1F8";
const amber = "#FFF2CC";
const border = "#C9D5E3";

for (const sheet of [summary, pipeline, weekly, budget]) {
  sheet.showGridLines = false;
  sheet.getRange("A1:Z200").format.font = { name: font, size: 10, color: "#172033" };
}
summary.tabColor = navy;
pipeline.tabColor = teal;
weekly.tabColor = blue;
budget.tabColor = "#6B7280";

summary.getRange("A2:H2").merge();
summary.getRange("A2").values = [["CyberVSI 90-Day Client Acquisition Dashboard"]];
summary.getRange("A2").format.font = { name: font, size: 16, bold: true, color: navy };
summary.getRange("A3:H3").merge();
summary.getRange("A3").values = [["India | Flagship offer: Web Application and API VAPT | Goal: first 5 paying clients"]];
summary.getRange("A3").format.font = { name: font, size: 10, italic: true, color: "#52647A" };
summary.getRange("A5:C5").values = [["Funnel Stage", "90-Day Target", "Current"]];
summary.getRange("A5:C5").format = { fill: navy, font: { name: font, bold: true, color: "#FFFFFF" }, horizontalAlignment: "center", verticalAlignment: "center" };
summary.getRange("A6:B9").values = [["Researched prospects", 600], ["Discovery calls", 25], ["Proposals", 12], ["Paying clients", 5]];
summary.getRange("C6").formulas = [["=COUNTIF('Prospect Pipeline'!$B$5:$B$604,\"<>\")"]];
summary.getRange("C7").formulas = [["=COUNTIF('Prospect Pipeline'!$M$5:$M$604,\"Discovery completed\")+COUNTIF('Prospect Pipeline'!$M$5:$M$604,\"Proposal sent\")+COUNTIF('Prospect Pipeline'!$M$5:$M$604,\"Negotiation\")+COUNTIF('Prospect Pipeline'!$M$5:$M$604,\"Won\")"]];
summary.getRange("C8").formulas = [["=COUNTIF('Prospect Pipeline'!$M$5:$M$604,\"Proposal sent\")+COUNTIF('Prospect Pipeline'!$M$5:$M$604,\"Negotiation\")+COUNTIF('Prospect Pipeline'!$M$5:$M$604,\"Won\")"]];
summary.getRange("C9").formulas = [["=COUNTIF('Prospect Pipeline'!$M$5:$M$604,\"Won\")"]];
summary.getRange("A6:C9").format.borders = { insideHorizontal: { style: "thin", color: border } };
summary.getRange("B6:C9").format.numberFormat = "#,##0";
summary.getRange("B6:C9").format.horizontalAlignment = "right";

summary.getRange("E5:H5").values = [["This Friday", "Value", "90-Day Target", "Status"]];
summary.getRange("E5:H5").format = { fill: navy, font: { name: font, bold: true, color: "#FFFFFF" }, horizontalAlignment: "center" };
summary.getRange("E6:E8").values = [["Qualified meetings"], ["Proposals submitted"], ["Signed contracts"]];
summary.getRange("F6").formulas = [["=COUNTIF('Prospect Pipeline'!$M$5:$M$604,\"Qualified\")+C7"]];
summary.getRange("F7").formulas = [["=C8"]];
summary.getRange("F8").formulas = [["=C9"]];
summary.getRange("G6:G8").values = [[25], [12], [5]];
summary.getRange("H6").formulas = [["=IF(F6>=G6,\"Target reached\",\"Build pipeline\")"]];
summary.getRange("H7:H8").formulas = [["=IF(F7>=G7,\"Target reached\",\"Build pipeline\")"], ["=IF(F8>=G8,\"Target reached\",\"Build pipeline\")"]];
summary.getRange("E6:H8").format.borders = { insideHorizontal: { style: "thin", color: border } };

summary.getRange("A12:H12").merge();
summary.getRange("A12").values = [["Operating focus"]];
summary.getRange("A12").format = { fill: light, font: { name: font, bold: true, color: navy } };
summary.getRange("A13:H16").values = [
  ["Primary offer", "Web Application VAPT", "Primary offer", "API Security Testing", "Target cities", "Bengaluru, Hyderabad, Pune, Chennai", "Budget cap", "₹3,000/month"],
  ["Priority partners", "Software development agencies", "Decision makers", "CTO, founder, engineering head", "Follow-ups", "One or two, then stop", "Review cadence", "Every Friday"],
  ["Day 30", "250 prospects and one serious proposal", "Day 60", "1–2 paying clients", "Day 90", "5 paying clients targeted", "Payment example", "50% upfront / 50% delivery"],
  ["Safeguards", "Authorization, NDA, SOW", "Testing", "Defined scope and windows", "Data", "Secure handling and deletion", "Claims", "No unverified empanelment"],
];
summary.getRange("A13:H16").format.wrapText = true;
summary.getRange("A13:H16").format.verticalAlignment = "top";
summary.getRange("A13:H16").format.borders = { insideHorizontal: { style: "thin", color: border } };
summary.getRange("A13:A16").format.font = { name: font, bold: true, color: navy };
summary.getRange("C13:C16").format.font = { name: font, bold: true, color: navy };
summary.getRange("E13:E16").format.font = { name: font, bold: true, color: navy };
summary.getRange("G13:G16").format.font = { name: font, bold: true, color: navy };
summary.getRange("A1:H20").format.verticalAlignment = "center";
summary.getRange("A:H").format.columnWidth = 19;
summary.getRange("B:B").format.columnWidth = 26;
summary.getRange("D:D").format.columnWidth = 27;
summary.getRange("F:F").format.columnWidth = 35;
summary.getRange("H:H").format.columnWidth = 28;

pipeline.getRange("A2:R2").merge();
pipeline.getRange("A2").values = [["Qualified Prospect Pipeline"]];
pipeline.getRange("A2").format.font = { name: font, size: 16, bold: true, color: navy };
pipeline.getRange("A3:R3").merge();
pipeline.getRange("A3").values = [["Start with 100 well-qualified Indian companies. Add a buying signal before outreach; measure meetings, proposals, and signed contracts every Friday."]];
pipeline.getRange("A3").format.font = { name: font, italic: true, color: "#52647A" };
const headers = ["ID", "Company", "Website", "City", "Industry", "Contact", "Role", "Email / LinkedIn", "Source", "Service Need", "Buying Signal", "Week", "Stage", "Est. Deal Value", "Last Interaction", "Next Follow-up", "Outcome / Loss Reason", "Notes"];
pipeline.getRange("A4:R4").values = [headers];
pipeline.getRange("A4:R4").format = { fill: navy, font: { name: font, bold: true, color: "#FFFFFF" }, horizontalAlignment: "center", verticalAlignment: "center", wrapText: true };
const rows = Array.from({ length: 600 }, (_, index) => [index + 1, ...Array(17).fill(null)]);
pipeline.getRange("A5:R604").values = rows;
pipeline.getRange("A5:A604").format.numberFormat = "0";
pipeline.getRange("L5:L604").dataValidation = { rule: { type: "whole", operator: "between", formula1: 1, formula2: 13 } };
pipeline.getRange("D5:D604").dataValidation = { rule: { type: "list", values: ["Bengaluru", "Hyderabad", "Pune", "Chennai", "Other India", "Singapore"] } };
pipeline.getRange("I5:I604").dataValidation = { rule: { type: "list", values: ["LinkedIn", "Clutch", "Startup India", "Wellfound", "Google Maps", "Referral", "Inbound", "Event", "Other"] } };
pipeline.getRange("J5:J604").dataValidation = { rule: { type: "list", values: ["Web Application VAPT", "API Security Testing", "Network VAPT", "Monthly Vulnerability Review", "Agency Partnership"] } };
pipeline.getRange("M5:M604").dataValidation = { rule: { type: "list", values: ["Identified", "Contacted", "Engaged", "Qualified", "Discovery completed", "Proposal sent", "Negotiation", "Won", "Lost"] } };
pipeline.getRange("N5:N604").format.numberFormat = "₹#,##0";
pipeline.getRange("O5:P604").format.numberFormat = "dd-mmm-yy";
pipeline.getRange("B5:R604").format.fill = amber;
pipeline.getRange("A4:R604").format.borders = { insideHorizontal: { style: "thin", color: "#E3E9F0" } };
pipeline.getRange("A4:R604").format.verticalAlignment = "top";
pipeline.getRange("B5:R604").format.wrapText = false;
pipeline.freezePanes.freezeRows(4);
pipeline.freezePanes.freezeColumns(2);
const widths = [7, 24, 28, 14, 18, 20, 20, 28, 16, 25, 32, 8, 21, 16, 16, 16, 28, 32];
widths.forEach((width, i) => pipeline.getRangeByIndexes(0, i, 605, 1).format.columnWidth = width);
const prospectTable = pipeline.tables.add("A4:R604", true, "ProspectPipeline");
prospectTable.style = "TableStyleMedium2";

weekly.getRange("A2:F2").merge();
weekly.getRange("A2").values = [["13-Week Execution Plan"]];
weekly.getRange("A2").format.font = { name: font, size: 16, bold: true, color: navy };
weekly.getRange("A4:F4").values = [["Week", "Main Action", "Contact Target", "Call Target", "Milestone", "Completed / Notes"]];
weekly.getRange("A4:F4").format = { fill: navy, font: { name: font, bold: true, color: "#FFFFFF" }, horizontalAlignment: "center", wrapText: true };
const weeklyRows = [
  [1, "Finalize offer, pricing, proposal and report templates", 0, 0, "Sales kit ready"],
  [2, "Build first prospect database", 100, 0, "100 companies"],
  [3, "Start personalized outreach", 75, 2, "First discovery calls"],
  [4, "Follow up and approach agency partners", 75, 2, "Partner conversations"],
  [5, "Improve messaging using response data", 60, 2, "Message iteration"],
  [6, "Submit initial proposals", 60, 3, "Initial proposals"],
  [7, "Secure first engagement and deliver", 40, 2, "First engagement"],
  [8, "Build referral relationships", 40, 2, "Referral partners"],
  [9, "Publish anonymized proof of delivery", 40, 2, "Delivery proof"],
  [10, "Focus on best-performing segment", 40, 2, "Segment focus"],
  [11, "Close pending proposals", 30, 2, "Closing activity"],
  [12, "Request referrals and pursue repeat work", 20, 2, "Referral requests"],
  [13, "Close remaining opportunities and review results", 20, 2, "90-day review"],
];
weekly.getRange("A5:F17").values = weeklyRows.map((row) => [...row, null]);
weekly.getRange("F5:F17").format.fill = amber;
weekly.getRange("A4:F17").format.borders = { insideHorizontal: { style: "thin", color: border } };
weekly.getRange("A4:F17").format.verticalAlignment = "top";
weekly.getRange("B5:F17").format.wrapText = true;
weekly.freezePanes.freezeRows(4);
weekly.getRange("A:A").format.columnWidth = 8;
weekly.getRange("B:B").format.columnWidth = 48;
weekly.getRange("C:D").format.columnWidth = 16;
weekly.getRange("E:E").format.columnWidth = 24;
weekly.getRange("F:F").format.columnWidth = 36;
const weeklyTable = weekly.tables.add("A4:F17", true, "WeeklyExecutionPlan");
weeklyTable.style = "TableStyleMedium2";

budget.getRange("A2:F2").merge();
budget.getRange("A2").values = [["Lean Marketing Budget — Maximum ₹3,000 per Month"]];
budget.getRange("A2").format.font = { name: font, size: 16, bold: true, color: navy };
budget.getRange("A3:F3").merge();
budget.getRange("A3").values = [["Prioritize direct prospecting and agency referrals. Use paid search only after conversion tracking is working and the landing page converts."]];
budget.getRange("A3").format.font = { name: font, italic: true, color: "#52647A" };
budget.getRange("A5:E5").values = [["Activity", "Month 1", "Month 2", "Month 3", "90-Day Total"]];
budget.getRange("A5:E5").format = { fill: navy, font: { name: font, bold: true, color: "#FFFFFF" }, horizontalAlignment: "center" };
budget.getRange("A6:D10").values = [
  ["Prospect research and outreach", 1000, 750, 750],
  ["Website and sales collateral", 500, 250, 250],
  ["Agency partnerships and networking", 1000, 1000, 1000],
  ["Google Search Ads test", 0, 500, 500],
  ["Reserve", 500, 500, 500],
];
budget.getRange("E6:E10").formulas = [["=SUM(B6:D6)"], ["=SUM(B7:D7)"], ["=SUM(B8:D8)"], ["=SUM(B9:D9)"], ["=SUM(B10:D10)"]];
budget.getRange("A11:E11").values = [["Monthly / 90-day total", null, null, null, null]];
budget.getRange("B11:D11").formulas = [["=SUM(B6:B10)", "=SUM(C6:C10)", "=SUM(D6:D10)"]];
budget.getRange("E11").formulas = [["=SUM(E6:E10)"]];
budget.getRange("A11:E11").format = { fill: light, font: { name: font, bold: true, color: navy } };
budget.getRange("B6:E11").format.numberFormat = "₹#,##0";
budget.getRange("A5:E11").format.borders = { insideHorizontal: { style: "thin", color: border } };
budget.getRange("A14:F14").merge();
budget.getRange("A14").values = [["Spending rules"]];
budget.getRange("A14").format = { fill: light, font: { name: font, bold: true, color: navy } };
budget.getRange("A15:F19").values = [
  ["1", "Do not run LinkedIn, Instagram, or Facebook ads during this 90-day plan.", null, null, null, null],
  ["2", "Use LinkedIn organically for targeted founder, CTO, and agency outreach.", null, null, null, null],
  ["3", "Do not activate the ₹500 Google Ads test until analytics and form-conversion tracking work.", null, null, null, null],
  ["4", "If paid search produces no qualified enquiries, move the remaining ad allocation to research or networking.", null, null, null, null],
  ["5", "Never buy bulk email lists or perform unsolicited vulnerability scans.", null, null, null, null],
];
budget.getRange("B15:F19").merge(true);
budget.getRange("A15:F19").format.wrapText = true;
budget.getRange("A15:F19").format.verticalAlignment = "top";
budget.getRange("A:A").format.columnWidth = 34;
budget.getRange("B:E").format.columnWidth = 18;
budget.getRange("F:F").format.columnWidth = 24;
budget.freezePanes.freezeRows(5);

wb.recalculate();
await fs.mkdir(outputDir, { recursive: true });
const preview = await wb.render({ sheetName: "Dashboard", range: "A1:H17", scale: 1.5, format: "png" });
await fs.writeFile(previewPath, new Uint8Array(await preview.arrayBuffer()));
const budgetPreview = await wb.render({ sheetName: "Lean Budget", range: "A1:F19", scale: 1.5, format: "png" });
await fs.writeFile(budgetPreviewPath, new Uint8Array(await budgetPreview.arrayBuffer()));
const xlsx = await SpreadsheetFile.exportXlsx(wb);
await xlsx.save(outputPath);

const inspection = await wb.inspect({ kind: "table", range: "Dashboard!A1:H17", include: "values,formulas", tableMaxRows: 20, tableMaxCols: 10 });
console.log(inspection.ndjson);
const budgetInspection = await wb.inspect({ kind: "table", range: "Lean Budget!A1:F19", include: "values,formulas", tableMaxRows: 25, tableMaxCols: 8 });
console.log(budgetInspection.ndjson);
const errors = await wb.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!", options: { useRegex: true, maxResults: 100 }, summary: "final formula error scan" });
console.log(errors.ndjson);
console.log(outputPath);
