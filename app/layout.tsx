import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";
import "./globals.css";
import { SoundToggle } from "@/components/SoundToggle";
import { ThemeSwitch, themeScript } from "@/components/ThemeSwitch";
import { SITE } from "@/content/site";

/** Ma Shan Zheng subset to the ~60 hanzi the site uses (~25 KB instead of ~800 KB).
 *  Re-run `python3 scripts/subset-brush-font.py` after adding new Chinese characters. */
// Latin fonts are self-hosted through next/font so they are preloaded and get
// size-matched fallbacks (no layout shift). The files in app/fonts are the @fontsource fonts
// cut down to the characters the site uses (scripts/subset-latin-fonts.py): ~40% fewer bytes.
const display = localFont({
  src: [
    {
      path: "./fonts/cormorant-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/cormorant-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/cormorant-500-italic.woff2",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Georgia", "serif"],
});
const sans = localFont({
  src: "./fonts/inter-var.woff2",
  weight: "400 700",
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
const mono = localFont({
  src: [
    { path: "./fonts/plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/plex-mono-500.woff2", weight: "500", style: "normal" },
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

const TITLE = `${SITE.name} — ${SITE.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: TITLE, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.fullName, url: SITE.url }],
  creator: SITE.fullName,
  keywords: SITE.keywords,
  category: "technology",
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: `${SITE.name} · Portfolio`,
    locale: "en_IN",
    title: TITLE,
    description: SITE.description,
    firstName: "Sulaiman",
    lastName: "Khan",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: SITE.description },
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
        <SoundToggle />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
