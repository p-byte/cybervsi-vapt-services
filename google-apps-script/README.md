# Connect the CyberVSI form to Google Sheets

1. Open the CyberVSI Lead Register in Google Sheets.
2. Open **Extensions > Apps Script**.
3. Replace the editor contents with `Code.gs` from this folder.
4. Select **Deploy > New deployment > Web app**.
5. Run as yourself and allow access for anyone who can submit the public website form.
6. Copy the deployment URL ending in `/exec`.
7. Create `.env.local` in the website project and set:

   `GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec`

Restart the local website after changing `.env.local`.
