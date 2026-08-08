import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

export const alt = SITE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background:
          "radial-gradient(circle at 80% 20%, #8f005f 0%, #24001b 30%, #050505 68%)",
        color: "white",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "72px",
        width: "100%",
      }}
    >
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.35)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "58px",
          width: "100%",
        }}
      >
        <span
          style={{
            color: "#ff4fbd",
            fontFamily: "monospace",
            fontSize: 24,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Visual designer · India
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ fontSize: 76, fontWeight: 700, lineHeight: 1 }}>
            Darshita Patankar
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.72)",
              fontFamily: "monospace",
              fontSize: 25,
              lineHeight: 1.45,
              maxWidth: 900,
            }}
          >
            {SITE_DESCRIPTION}
          </span>
        </div>
      </div>
    </div>,
    size,
  );
}
