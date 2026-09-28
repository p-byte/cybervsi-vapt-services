import { NextRequest, NextResponse } from "next/server";

const allowedServices = new Set(["VAPT", "SOC"]);
const allowedSizes = new Set(["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"]);
const submissions = new Map<string, { count: number; resetAt: number }>();

type LeadPayload = {
  fullName?: unknown;
  email?: unknown;
  company?: unknown;
  service?: unknown;
  companySize?: unknown;
  requirement?: unknown;
  consent?: unknown;
  website?: unknown;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function rateLimited(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || "local";
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const limit = 5;
  const current = submissions.get(ip);

  if (!current || current.resetAt < now) {
    submissions.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  current.count += 1;
  return current.count > limit;
}

export async function POST(request: NextRequest) {
  if (rateLimited(request)) {
    return NextResponse.json({ message: "Too many submissions. Please try again later." }, { status: 429 });
  }

  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }

  if (text(payload.website)) {
    return NextResponse.json({ message: "Thanks. Your request has been received." });
  }

  const fullName = text(payload.fullName);
  const email = text(payload.email);
  const company = text(payload.company);
  const service = text(payload.service);
  const companySize = text(payload.companySize);
  const requirement = text(payload.requirement);
  const consent = payload.consent === "true" || payload.consent === true;

  if (fullName.length < 2 || company.length < 2 || requirement.length < 10) {
    return NextResponse.json({ message: "Please complete all required fields." }, { status: 400 });
  }

  if (!isEmail(email)) {
    return NextResponse.json({ message: "Please use a valid business email address." }, { status: 400 });
  }

  if (!allowedServices.has(service) || !allowedSizes.has(companySize)) {
    return NextResponse.json({ message: "Please select valid form options." }, { status: 400 });
  }

  if (!consent) {
    return NextResponse.json({ message: "Consent is required before submitting." }, { status: 400 });
  }

  const lead = {
    fullName,
    email,
    company,
    service,
    companySize,
    requirement,
    receivedAt: new Date().toISOString(),
    source: "cybervsi.com",
  };

  const sheetsWebAppUrl = process.env.GOOGLE_SHEETS_WEB_APP_URL;
  if (sheetsWebAppUrl) {
    try {
      const sheetsResponse = await fetch(sheetsWebAppUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        cache: "no-store",
      });

      if (!sheetsResponse.ok) {
        throw new Error(`Sheets endpoint returned ${sheetsResponse.status}`);
      }

      const sheetsResult = (await sheetsResponse.json()) as { ok?: boolean };
      if (!sheetsResult.ok) {
        throw new Error("Sheets endpoint rejected the submission");
      }
    } catch (error) {
      console.error("Lead forwarding failed", error instanceof Error ? error.message : "Unknown error");
      return NextResponse.json(
        { message: "We could not submit your request. Please email connect@cybervsi.com." },
        { status: 502 },
      );
    }
  }

  console.info("Security assessment lead received", {
    ...lead,
    email: "[redacted]",
  });

  return NextResponse.json({
    message:
      "Your request has been received. A CyberVSI security specialist will follow up by email.",
  });
}
