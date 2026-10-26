import { ImageResponse } from "next/og";
import { ESSENCE, PATHS } from "@/content/essence";
import { MAJOR_GU, getGu } from "@/content/gu";
import { SITE } from "@/content/site";
import { OG_SIZE, ogAsset, ogFonts } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Project dossier";

export function generateStaticParams() {
  return MAJOR_GU.map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const g = getGu((await params).slug)!;
  const emblemFile = (g.emblem?.src.split("/").pop() ?? "worm.webp").replace(".webp", ".png");
  const [fonts, emblem] = await Promise.all([ogFonts(), ogAsset(emblemFile)]);
  const color = ESSENCE[g.rank].hex;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        background: "#0a0a0b",
        padding: "0 72px",
        gap: 48,
        border: `2px solid ${color}`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
        <div style={{ fontSize: 22, letterSpacing: 4, color, textTransform: "uppercase" }}>
          {`${g.vital ? "Vital Gu · Rank 6 Immortal" : `Rank ${g.rank} · ${ESSENCE[g.rank].name}`} · ${PATHS[g.path].name} path`}
        </div>
        <div style={{ fontFamily: "Cormorant", fontWeight: 700, fontSize: 96, lineHeight: 0.95, color: "#ece4d4" }}>{g.name}</div>
        <div style={{ fontSize: 32, color: "#cfc6b8", lineHeight: 1.3 }}>{g.plain.replace("→", "to")}</div>
        <div style={{ fontSize: 22, letterSpacing: 4, color: "#a8a196", textTransform: "uppercase", marginTop: 12 }}>
          {`${SITE.name} · ${SITE.role}`}
        </div>
      </div>
      {}
      <img src={emblem} alt="" height={400} style={{ objectFit: "contain", maxWidth: 420 }} />
    </div>,
    { ...size, fonts },
  );
}
