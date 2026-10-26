import { ImageResponse } from "next/og";
import { OG_SIZE, ogAsset, ogFonts, ogHost, ogSeal } from "@/lib/og";
import { SITE } from "@/content/site";

export const alt = `${SITE.name} — ${SITE.role}. ${SITE.shareLine}`;
export const size = OG_SIZE;
export const contentType = "image/png";

const STACK = ["Node.js", "Socket.IO", "Redis", "BullMQ", "PostgreSQL"];

export default async function Image() {
  const [fonts, hero, seal] = await Promise.all([ogFonts(), ogAsset("hero.jpg"), ogSeal()]);
  const host = ogHost(SITE.url);
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0a0a0b" }}>
      {}
      <img
        src={hero}
        width={1200}
        height={630}
        alt=""
        style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, rgba(10,10,11,0.96) 0%, rgba(10,10,11,0.75) 42%, rgba(10,10,11,0) 72%)",
        }}
      />
      <div
        style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,10,11,0) 70%, rgba(10,10,11,0.85) 100%)" }}
      />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 76px", gap: 22, width: 760 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {}
          <img src={seal} width={56} height={56} alt="" />
          <div style={{ fontSize: 22, letterSpacing: 5, color: "#e5554a", textTransform: "uppercase" }}>{SITE.role}</div>
        </div>
        <div
          style={{
            fontFamily: "Cormorant",
            fontWeight: 700,
            fontSize: 128,
            lineHeight: 0.88,
            color: "#ece4d4",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Sulaiman</span>
          <span>Khan</span>
        </div>
        <div style={{ fontFamily: "Cormorant", fontStyle: "italic", fontSize: 38, lineHeight: 1.2, color: "#cfc6b8", maxWidth: 600 }}>
          {SITE.shareLine}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 76,
          right: 60,
          bottom: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 20,
          letterSpacing: 3,
          color: "#a8a196",
          textTransform: "uppercase",
        }}
      >
        <div style={{ display: "flex", gap: 14 }}>
          {STACK.map((s) => (
            <span key={s} style={{ border: "1px solid #4a443f", padding: "6px 12px", background: "rgba(10,10,11,0.6)" }}>
              {s}
            </span>
          ))}
        </div>
        <span style={{ color: "#d6a54a" }}>{host}</span>
      </div>
    </div>,
    { ...size, fonts },
  );
}
