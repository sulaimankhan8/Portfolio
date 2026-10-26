import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeSwitch, themeScript } from "@/components/ThemeSwitch";
import { SITE } from "@/content/site";

/** Ma Shan Zheng subset to the ~40 hanzi the site uses (15 KB instead of ~800 KB).
 *  Re-run `python3 scripts/subset-brush-font.py` after adding new Chinese characters. */
// Latin fonts are self-hosted through next/font so they are preloaded and get
// size-matched fallbacks (no layout shift). Files come from the @fontsource packages.
const display = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Georgia", "serif"],
});
const sans = localFont({
  src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
const mono = localFont({
  src: [
    { path: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "monospace"],
});

const brush = localFont({
  src: "./fonts/ma-shan-zheng-subset.woff2",
  variable: "--font-ma-shan",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.tagline,
  openGraph: {
    type: "website",
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.tagline,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable} ${brush.variable}`} suppressHydrationWarning>
      <head>
        {/* applies the saved cultivation path before first paint */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-ink text-bone">
        <a
          href="#main"
          className="sr-only z-[60] bg-bone px-4 py-2 font-mono text-sm text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        {children}
        <ThemeSwitch />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
