"use client";

import { useEffect, useRef, useState } from "react";
import { type MusicPath, autoplayAllowed, hasMusic, playPath, resumeMusic, stopMusic, suspendMusic } from "@/lib/music";

export const SOUND_KEY = "cultivation-sound";

/** armed = music is on but waiting for the first click/tap/key (browsers block sound before that) */
type State = "off" | "armed" | "loading" | "on" | "error";

const currentPath = (): MusicPath => (document.documentElement.dataset.theme === "righteous" ? "righteous" : "demonic");

function save(on: boolean) {
  try {
    localStorage.setItem(SOUND_KEY, on ? "on" : "off");
  } catch {}
}

/**
 * 音 — floating music button, bottom-right.
 *
 * Music is ON by default ("autoplay"): where the browser allows sound straight away it starts
 * on load; everywhere else (Chrome, Safari, most phones) it starts on the visitor's first
 * click, tap or key press. Turning it off is remembered and wins on every later visit.
 * Nothing is downloaded until playback actually starts.
 */
export function SoundToggle() {
  const [state, setStateRaw] = useState<State>("off");
  const stateRef = useRef<State>("off");
  const setState = (s: State) => {
    stateRef.current = s;
    setStateRaw(s);
  };
  const playing = () => stateRef.current === "on" || stateRef.current === "loading";

  async function start() {
    setState("loading");
    try {
      await playPath(currentPath());
      if (stateRef.current === "loading") setState("on");
    } catch {
      setState("error");
    }
  }

  function toggle() {
    const s = stateRef.current;
    if (s === "on" || s === "loading" || s === "armed") {
      save(false);
      stopMusic();
      setState("off");
    } else {
      save(true);
      start();
    }
  }

  useEffect(() => {
    // follow the path switch: crossfade to the other track
    const observer = new MutationObserver(() => {
      if (playing()) playPath(currentPath()).catch(() => setState("error"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // quiet while the tab is hidden
    const onVisibility = () => {
      if (!playing()) return;
      if (document.hidden) suspendMusic();
      else resumeMusic();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // first interaction anywhere (except on this button, which handles itself) starts the music
    const onFirst = (e: Event) => {
      if ((e.target as Element | null)?.closest?.("[data-sound-toggle]")) return;
      remove();
      if (stateRef.current === "armed") start();
    };
    const remove = () => {
      document.removeEventListener("pointerdown", onFirst, true);
      document.removeEventListener("keydown", onFirst, true);
    };

    let saved: string | null = null;
    try {
      saved = localStorage.getItem(SOUND_KEY);
    } catch {}
    // localStorage and the autoplay policy are only readable after hydration, so these syncs are intentional
    if (saved !== "off") {
      if (autoplayAllowed()) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        start();
      } else {
        setState("armed");
        document.addEventListener("pointerdown", onFirst, true);
        document.addEventListener("keydown", onFirst, true);
      }
    }

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!hasMusic()) return null;

  const on = state !== "off" && state !== "error";
  const label =
    state === "error"
      ? "Music couldn’t load — click to retry"
      : state === "armed"
        ? "Music starts when you click anywhere — click here to keep it off"
        : on
          ? "Music on — click to mute"
          : "Music off — click to play";

  return (
    <button
      type="button"
      data-sound-toggle
      aria-pressed={on}
      title={label}
      onClick={toggle}
      className={`fixed bottom-[84px] right-4 z-50 inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center gap-2 border border-line-strong bg-void/95 px-3 shadow-[0_12px_40px_var(--shadow-deep)] transition-colors md:bottom-6 md:right-6 md:min-h-[54px] md:px-4 ${
        on ? "text-bone" : "text-mist hover:text-bone"
      }`}
    >
      <span aria-hidden lang="zh" className={`font-brush text-xl leading-none ${on ? "text-ember" : ""}`}>
        音
      </span>
      <span className="sr-only">Music</span>
      <span aria-hidden className="sound-bars" data-state={state}>
        <i />
        <i />
        <i />
      </span>
    </button>
  );
}
