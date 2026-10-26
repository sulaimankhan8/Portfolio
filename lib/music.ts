/**
 * Background music for the two cultivation paths.
 *
 * Web Audio (not <audio loop>) so the loops are sample-accurate with no gap at the seam.
 * Nothing is downloaded until the visitor turns sound on, and only the current path's
 * track is fetched; the other one loads when they switch paths. Switching crossfades.
 */
import { MUSIC } from "@/content/credits";

export type MusicPath = "demonic" | "righteous";

const VOLUME = 0.55;
const FADE_IN = 2.5;
const FADE_OUT = 1.8;

const FILES: Partial<Record<MusicPath, string>> = Object.fromEntries(MUSIC.filter((m) => m.path && m.file).map((m) => [m.path!, m.file!]));

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let current: { path: MusicPath; src: AudioBufferSourceNode; gain: GainNode } | null = null;
const buffers = new Map<MusicPath, Promise<AudioBuffer>>();

function audioCtx() {
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = VOLUME;
    master.connect(ctx.destination);
  }
  return ctx;
}

function ext() {
  const probe = document.createElement("audio");
  return probe.canPlayType('audio/webm; codecs="opus"') ? "webm" : "m4a";
}

function load(path: MusicPath) {
  let p = buffers.get(path);
  if (!p) {
    const file = FILES[path];
    if (!file) return Promise.reject(new Error(`no track for ${path}`));
    const ac = audioCtx();
    p = fetch(`${file}.${ext()}`)
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status} ${file}`);
        return r.arrayBuffer();
      })
      .then((data) => ac.decodeAudioData(data));
    p.catch(() => buffers.delete(path)); // allow a retry later
    buffers.set(path, p);
  }
  return p;
}

export function hasMusic() {
  return Object.keys(FILES).length > 0;
}

/** Start (or crossfade to) the given path's loop. Must first be called from a user gesture. */
export async function playPath(path: MusicPath) {
  const ac = audioCtx();
  if (ac.state === "suspended") await ac.resume();
  if (current?.path === path) return;

  const buffer = await load(path);
  if (current?.path === path) return; // another call won the race

  const now = ac.currentTime;
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(1, now + FADE_IN);
  gain.connect(master!);
  const src = ac.createBufferSource();
  src.buffer = buffer;
  src.loop = true;
  src.connect(gain);
  src.start(now);

  fadeOutCurrent(FADE_OUT);
  current = { path, src, gain };
}

function fadeOutCurrent(seconds: number) {
  if (!current || !ctx) return;
  const { src, gain } = current;
  const now = ctx.currentTime;
  gain.gain.cancelScheduledValues(now);
  gain.gain.setValueAtTime(gain.gain.value, now);
  gain.gain.linearRampToValueAtTime(0, now + seconds);
  src.stop(now + seconds + 0.05);
  current = null;
}

export function stopMusic() {
  fadeOutCurrent(0.8);
}

/** Pause/resume the whole graph, e.g. while the tab is hidden. */
export function suspendMusic() {
  return ctx?.state === "running" ? ctx.suspend() : Promise.resolve();
}
export function resumeMusic() {
  return ctx?.state === "suspended" ? ctx.resume() : Promise.resolve();
}

/** True only when the browser says sound may start without a click (Firefox reports this;
 *  Chrome and Safari don't expose it, so there the music waits for the first interaction). */
export function autoplayAllowed() {
  const nav = navigator as Navigator & { getAutoplayPolicy?: (type: "audiocontext") => string };
  try {
    return nav.getAutoplayPolicy?.("audiocontext") === "allowed";
  } catch {
    return false;
  }
}
