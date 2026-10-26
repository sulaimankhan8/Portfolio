import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

const root = process.cwd();

export async function ogFonts() {
  const dir = join(root, "node_modules/@fontsource/cormorant-garamond/files");
  const [regular, bold, italic] = await Promise.all([
    readFile(join(dir, "cormorant-garamond-latin-500-normal.woff")),
    readFile(join(dir, "cormorant-garamond-latin-700-normal.woff")),
    readFile(join(dir, "cormorant-garamond-latin-500-italic.woff")),
  ]);
  return [
    { name: "Cormorant", data: regular, weight: 500 as const, style: "normal" as const },
    { name: "Cormorant", data: bold, weight: 700 as const, style: "normal" as const },
    { name: "Cormorant", data: italic, weight: 500 as const, style: "italic" as const },
  ];
}

/** Reads a file from assets/og as a data URI (satori can't read WebP, so these are PNG/JPEG). */
export async function ogAsset(name: string) {
  const buf = await readFile(join(root, "assets/og", name));
  const type = name.endsWith(".png") ? "image/png" : "image/jpeg";
  return `data:${type};base64,${buf.toString("base64")}`;
}

/** The 蛊 seal (same artwork as the favicon) as a data URI. */
export async function ogSeal() {
  const svg = await readFile(join(root, "app/icon.svg"));
  return `data:image/svg+xml;base64,${svg.toString("base64")}`;
}

/** Host shown in the corner of share images, e.g. "sulaiman.dev". Hidden on localhost. */
export function ogHost(url: string) {
  const host = new URL(url).host;
  return host.startsWith("localhost") ? "" : host;
}
