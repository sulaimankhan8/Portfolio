import Link from "next/link";
import { Glyph } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center gap-6 px-4 text-center">
      <Glyph className="text-[96px] text-ember">爆</Glyph>
      <h1 className="m-0 font-display text-5xl font-bold">This Gu self-detonated.</h1>
      <p className="m-0 text-mist">The page you were looking for doesn’t exist.</p>
      <Link href="/">Back to the aperture</Link>
    </main>
  );
}
