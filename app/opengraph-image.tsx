import { ImageResponse } from "next/og";
import { OG_SIZE, ogAsset, ogFonts } from "@/lib/og";
import { SITE } from "@/content/site";

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const [fonts, hero] = await Promise.all([ogFonts(), ogAsset("hero.jpg")]);
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
          background: "linear-gradient(90deg, rgba(10,10,11,0.95) 0%, rgba(10,10,11,0.6) 45%, rgba(10,10,11,0) 75%)",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", gap: 18 }}>
        <div style={{ fontSize: 22, letterSpacing: 6, color: "#e5554a", textTransform: "uppercase" }}>{`Rank 5 · ${SITE.role}`}</div>
        <div
          style={{
            fontFamily: "Cormorant",
            fontWeight: 700,
            fontSize: 124,
            lineHeight: 0.9,
            color: "#ece4d4",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Sulaiman</span>
          <span>Khan</span>
        </div>
        <div style={{ fontFamily: "Cormorant", fontStyle: "italic", fontSize: 36, color: "#cfc6b8", maxWidth: 560 }}>
          Refined under pressure — real-time chat, payments, and the queues that hold them together.
        </div>
      </div>
    </div>,
    { ...size, fonts },
  );
}
