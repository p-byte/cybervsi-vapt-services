import { ImageResponse } from "next/og";

export const alt = "CyberVSI cybersecurity services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "76px 84px",
          color: "#f8fafc",
          background: "#07111f",
          borderTop: "18px solid #19c3a3",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              display: "flex",
              width: 86,
              height: 86,
              alignItems: "center",
              justifyContent: "center",
              background: "#19c3a3",
              color: "#07111f",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            CV
          </div>
          <div style={{ display: "flex", fontSize: 50, fontWeight: 800 }}>CyberVSI</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", maxWidth: 980, fontSize: 62, lineHeight: 1.08, fontWeight: 800 }}>
            Find security gaps before attackers do.
          </div>
          <div style={{ display: "flex", color: "#b8c6d8", fontSize: 28 }}>
            VAPT · SOC Monitoring · Vulnerability Management
          </div>
        </div>
      </div>
    ),
    size,
  );
}
