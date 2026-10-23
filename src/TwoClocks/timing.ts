// Generated from the narration audio (public/twoclocks/n*.wav) and the script in
// presentation/educational-video-package.md. Durations are the real lengths of the ElevenLabs TTS clips (voice: christopher alphonse, cloned).
export const FPS = 24;
// The music bed (public/music/bed.mp3) is 120 BPM: one beat = 0.5 s. Every scene start and every spoken line
// lands on a beat, so the cuts and the voice are in time with the track.
export const BEAT = 0.5;
export const INTRO_SEC = 7; // "Runway Rebels presents" plays first; everything else starts after it
export const LEAD = BEAT; // silence before each line (1 beat)
const MIN_TAIL = 0.25; // minimum breathing room after each line
const SCENE_QUANTUM = BEAT; // scene lengths snap up to a whole beat
import { ALIGN } from "./align"; // word start times in the raw clips (scripts/align-narration.mts)
// Raw clip lengths (seconds) of public/twoclocks/n*.wav, regenerated with scripts/generate-narration.mts
// (ElevenLabs eleven_v4, one request per scene; scenes 1-13 voice "christopher alphonse" (cloned), scenes 14-16 after the demo voice wqPxhqgBjy3XEcKc6PJp). Played at VOICE_RATE.
export const NARR_RAW: number[] = [18.29, 7.00, 9.87, 4.68, 9.56, 9.87, 6.03, 11.89, 20.61, 17.24, 9.95, 9.87, 9.64, 21.00, 21.97, 12.43];
export const VOICE_RATE = 1;
export const NARR: number[] = NARR_RAW.map((n) => Math.round((n / VOICE_RATE) * 100) / 100);
export const TEXT: string[] = [
 "It's 3:36 at Dallas Love Field. Flight sixteen twenty-eight is due to push back from gate A twelve at 3:40. Then the captain keys the radio: Ground, sixteen twenty-eight. We have a hydraulic system two caution. Maintenance is walking out to us now. Probably thirty to forty minutes before we can push.",
 "Everyone hears it. But Flight Operations, the record everyone plans from, still says: on time.",
 "Two clocks. One shows reality: this flight isn't leaving at 3:40. The other shows our current systems. We're missing out on a headstart!",
 "Could the system hear what was already said out loud, and listen without taking over?",
 "Step one, hearing: Extract text from verbal communications with a confidence score, from how clean the audio is and how plausible at an airport.",
 "Step two, who owns it? Hydraulic and delay point to flight operations, ninety-two percent. Other areas or teams stay as runners-up.",
 "It keeps the receipt: the exact sentence behind the routing. Nobody takes it on trust.",
 "Step three matters most: compare with the flight system. Agree, nothing happens. Add something, it's noted. Contradict the record: that gap is the point.",
 "The temptation: update the flight. One score, hearing to routing. Seventy-five percent on a routine change, like a bag count, applies itself. Below, it asks a person. This one: ninety-two. It clears the confidence bar, but a flight delay is no bag count, so the second lock stays shut.",
 "Some decisions need a human in the loop: when confidence is too low, or the decision is critical, like a flight delay or crew change. The voice is a witness, not a judge: it testifies, it doesn't rule. So the system stops, and a person takes the bench.",
 "The person sees the thirty-five-minute delay with consequences drawn: a crew near its duty limit, three passengers on a ten-minute connection, a gate conflict.",
 "The controller reads the evidence and approves. Only then does the record change, version-stamped. If the flight changed meanwhile, the write is refused.",
 "The answer was never a faster typist. It was letting the system listen, with a person's hand on the dial. We told you about it, now let's see it.",
 // ---- after the demo (video1) ----
 "What is earlier awareness worth? About two hundred nineteen thousand aircraft minutes a year: roughly twenty-one point six million dollars. It starts with five thousand flights a day, the voice events that matter, caught a few minutes sooner, with some of it becoming real time back. That time can come from maintenance, turns, gates, crews and connections.",
 "We roll it out in four steps, each one earning the next. Shadow: listen and measure, with no writes. Assist: people approve every proposal. Controlled automation: only proven, low-risk updates, while flight status, crews and gates stay human. Then network scale, wave by wave, on Southwest's own systems.",
 "The communications are there. The only question is how long everyone else waits. Let the system listen, show its evidence, and keep a person's hand on the dial, and operations can perform with a headstart."
];
// ---- Schedule ----
// Act 1 = scenes 1 to 13 (before the demo). Then the demo video plays on its own, and act 2 = scenes 14 to 16 (value, rollout, conclusion).
export const ACT1 = 13; // number of narrated scenes before the demo
export const DEMO_SRC = "music/FINAL.mp4"; // 3840x2160, 29.97 fps, 76.41 s; its own audio is muted
export const DEMO_AUDIO = "music/swoice-demo-narration 1.wav"; // 82.61 s; this is the demo's only sound
export const DEMO_VIDEO_FRAMES = 1812; // 75.5 s of the 76.41 s video (the macOS screenshot toolbar fades in after ~75.7 s); after this the last frame is held while the narration finishes
export const DEMO_FRAMES = 1995; // 82.61 s of narration (1983 frames) plus X_OUT, so the fade-out starts after the last word
export const DEMO_SEC = DEMO_FRAMES / FPS;
export const X_IN = 1; // crossfade from the last scene into the demo (s)
export const X_OUT = 0.5; // crossfade from the demo into the first scene of act 2 (s)
const AFTER_LAST = 1; // extra stillness after "now let's see it" so the voice is finished before the crossfade begins

const BASE_SEC = NARR.map((n, i) => Math.ceil((LEAD + n + MIN_TAIL) / SCENE_QUANTUM - 1e-9) * SCENE_QUANTUM + (i === ACT1 - 1 ? AFTER_LAST : 0));
const ACT1_BASE = BASE_SEC.slice(0, ACT1).reduce((a, b) => a + b, 0);
const ACT2_BASE = BASE_SEC.slice(ACT1).reduce((a, b) => a + b, 0);

// ---- Music plan (all times in seconds of the source track unless noted) ----
// Source structure (measured): 0-4 quiet intro, 4-35 groove, 35-36 breakdown, 36-~76.5 groove, ~76.5-79.5 ending decay.
// Each act plays the groove once (act 1 from 0, act 2 from the drop at 4), loops the 36-52 groove, and finishes with the ending (ES-79.54),
// so the track's own ending lands on the last frame of the act. The demo has its own sound, so the music is off during it.
export const MUSIC_LEN = 79.5428;
export const MUSIC_INTRO = 4; // the groove "drops" at 4.0 s
export const MUSIC_HEAD_END = 36; // the head is played once, up to here
export const MUSIC_LOOP_START = 36;
export const MUSIC_LOOP_LEN = 16; // 8 bars
export type MusicPlan = { start: number; from: number; loops: number; ending: number; credits: number };
/** Pick the loop count and ending so the track finishes at `target` (video seconds), at most 4 s late. */
const planMusic = (start: number, from: number, target: number): MusicPlan => {
  let best: MusicPlan = { start, from, loops: 0, ending: 72, credits: Infinity };
  for (let k = 0; k < 40; k++) {
    for (let es = MUSIC_LOOP_START + MUSIC_LOOP_LEN; es <= 72; es += 4) {
      const credits = start + (MUSIC_HEAD_END - from) + k * MUSIC_LOOP_LEN + (MUSIC_LEN - es) - target;
      if (credits >= 0 && credits < best.credits) best = { start, from, loops: k, ending: es, credits };
    }
  }
  return best;
};

// act 1: the drop lands exactly on the cut into scene 2
export const MUSIC1 = planMusic(BASE_SEC[0] - MUSIC_INTRO, 0, ACT1_BASE);
// The leftover (under 4 s) is added to the last scene of act 1, so the music's own ending lands on the last frame of the act.
export const ACT1_SEC = ACT1_BASE + MUSIC1.credits;
export const DEMO_START = ACT1_SEC - X_IN;
export const ACT2_START = DEMO_START + DEMO_SEC - X_OUT;
// act 2: the groove enters on the cut from the demo, and the track's ending lands on the last frame of the credits
const MIN_CREDITS = 5; // seconds of end credits after the conclusion
export const MUSIC2 = planMusic(ACT2_START, MUSIC_INTRO, ACT2_START + ACT2_BASE + MIN_CREDITS);
export const CREDITS_SEC = MIN_CREDITS + MUSIC2.credits;
export const TOTAL_SEC = ACT2_START + ACT2_BASE; // the last narrated scene ends here; the credits follow
export const TOTAL_FRAMES = Math.round(TOTAL_SEC * FPS);

export const SCENE_START = BASE_SEC.map((_, i) =>
  i < ACT1 ? BASE_SEC.slice(0, i).reduce((a, b) => a + b, 0) : ACT2_START + BASE_SEC.slice(ACT1, i).reduce((a, b) => a + b, 0),
);
export const SCENE_SEC = BASE_SEC.map((x, i) => (i === ACT1 - 1 ? x + MUSIC1.credits : x));

/** Seconds into scene `i` (0-based) at which `phrase` starts being spoken (measured from the audio, see align.json). */
export const when = (i: number, phrase: string): number => {
  const idx = TEXT[i].toLowerCase().indexOf(phrase.toLowerCase());
  if (idx < 0) return LEAD;
  const before = TEXT[i].slice(0, idx).trim();
  const w = before === "" ? 0 : before.split(/\s+/).length;
  return LEAD + (ALIGN[i][w]?.start ?? 0) / VOICE_RATE;
};
/** Seconds into scene `i` (0-based) at which its narration clip ends. */
export const endOf = (i: number): number => LEAD + NARR[i];
