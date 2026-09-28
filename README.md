# CyberVSI VAPT Services

Standalone CyberVSI services website for VAPT, SOC, vulnerability management, assessment inquiries, and sample security reports.

Target production domain: `https://service.cybervsi.com`

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Lead form integration

Copy `.env.example` to `.env.local` and set the deployed Google Apps Script web-app URL:

```env
GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
```

The Apps Script receiver and deployment steps are in `google-apps-script/`.

## Quality checks

```bash
npm run lint
npm run build
```

## Reports

The PDFs in `public/reports/` are fictional CyberVSI examples. They contain no client data and are informed by OWASP WSTG, NIST SP 800-115, FIRST CVSS, and PCI SSC penetration-testing guidance. When externally hosted report links are supplied, update the report entries in `src/app/reports/page.tsx`.

## Deployment

The intended deployment platform is Vercel. Configure the Google Apps Script URL as a server-side environment variable and attach `service.cybervsi.com` only after DNS ownership and production deployment are ready.
