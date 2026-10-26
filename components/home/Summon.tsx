"use client";

import { useState, type FormEvent } from "react";
import { Glyph, monoCls } from "@/components/ui";
import { SITE } from "@/content/site";

const field = "min-h-12 border-0 border-b border-line-strong bg-ink px-0.5 text-base text-bone outline-none focus:border-jade";

type Status = { ok: boolean; text: string } | null;

/**
 * No backend: "Open in mail app" opens the visitor's own mail app with the subject and
 * message filled in (mailto:), and "Copy email" puts the address on the clipboard.
 */
export function Summon() {
  const [status, setStatus] = useState<Status>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = String(data.get("subject") ?? "").trim() || "Hello from your portfolio";
    const message = String(data.get("message") ?? "").trim();
    if (message.length < 10) {
      setStatus({ ok: false, text: "Tell me a little more — at least 10 characters." });
      return;
    }
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    setStatus({ ok: true, text: "Opening your mail app… If nothing opened, copy the address instead." });
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setStatus({ ok: true, text: `Copied ${SITE.email}` });
    } catch {
      setStatus({ ok: false, text: `Couldn’t copy — the address is ${SITE.email}` });
    }
  }

  return (
    <section id="summon" aria-labelledby="summon-title" className="grid scroll-mt-8 gap-16 border-t border-line pt-6 md:grid-cols-2">
      <div className="flex flex-col gap-5">
        <div className="flex items-baseline gap-4">
          <Glyph className="text-[40px] text-ember">七</Glyph>
          <h2 id="summon-title" className="m-0 font-display text-[56px] font-bold leading-none">
            Summon
          </h2>
        </div>
        <p className="m-0 text-lg leading-relaxed text-mist">
          Backend, distributed systems, AI-powered tools. State the problem — if it’s worth refining, I’ll answer.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a href={`mailto:${SITE.email}`} className="break-all font-display text-[28px] font-bold text-bone no-underline md:text-[34px]">
            {SITE.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className={`min-h-11 cursor-pointer border border-line-strong bg-transparent px-4 text-[12px] text-bone transition-colors hover:border-bone ${monoCls}`}
          >
            Copy email
          </button>
        </div>
        <div className="flex flex-wrap gap-6 font-mono text-sm">
          <a href={SITE.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={SITE.resume}>Résumé (PDF)</a>
        </div>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        <label htmlFor="c-subject" className={`text-[12px] text-mist ${monoCls}`}>
          Subject
        </label>
        <input id="c-subject" name="subject" type="text" placeholder="A backend problem worth refining" className={field} />
        <label htmlFor="c-msg" className={`text-[12px] text-mist ${monoCls}`}>
          The problem
        </label>
        <textarea id="c-msg" name="message" rows={3} required aria-describedby="c-status" className={`${field} resize-y py-2`} />
        <div className="flex flex-wrap items-center gap-5">
          <button
            type="submit"
            className={`min-h-12 cursor-pointer border-0 bg-blood px-6 text-[13px] text-bone transition-colors hover:bg-blood-hover ${monoCls}`}
          >
            Open in mail app
          </button>
          <p id="c-status" role="status" className={`m-0 text-sm ${status?.ok ? "text-jade" : "text-ember"}`}>
            {status?.text}
          </p>
        </div>
      </form>
    </section>
  );
}
