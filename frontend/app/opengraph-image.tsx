import { ImageResponse } from "next/og";

// The preview picture shown when a link to the site is shared (Facebook, X, WhatsApp, Slack, ...)
export const alt = "TalkMate: learn languages by speaking with an AI tutor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "linear-gradient(135deg,#0D0E17 0%,#2e1065 100%)", color: "white" }}>
        <div style={{ fontSize: 40, color: "#a78bfa", fontWeight: 700 }}>TalkMate</div>
        <div style={{ marginTop: 24, fontSize: 76, fontWeight: 800, lineHeight: 1.1 }}>Learn languages by speaking with an AI tutor</div>
        <div style={{ marginTop: 32, fontSize: 32, color: "#cbd5e1" }}>Chat · Call · Roleplay · Pronunciation feedback</div>
      </div>
    ),
    size,
  );
}
