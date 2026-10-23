// Generated from the narration audio (public/twoclocks/n*.wav) and the script in
// presentation/educational-video-package.md. Durations are the real lengths of the ElevenLabs TTS clips (voice: christopher alphonse, cloned).
export const FPS = 24;
// The music bed (public/music/bed.mp3) is 120 BPM: one beat = 0.5 s. Every scene start and every spoken line
// lands on a beat, so the cuts and the voice are in time with the track.
export const BEAT = 0.5;
export const INTRO_SEC = 7; // "Runway Rebels presents" plays first; everything else starts after it
export const LEAD = 2 * BEAT; // silence before each line (2 beats)
const MIN_TAIL = 1.0; // minimum breathing room after each line
const SCENE_QUANTUM = 2 * BEAT; // scene lengths snap up to a whole 2-beat grid
// Raw clip lengths (seconds) of public/twoclocks/n*.wav, regenerated with scripts/generate-narration.mts
// (ElevenLabs eleven_v4, voice "christopher alphonse" (cloned), cut from one full take with forced alignment). The clips are played 10% faster to match the music's tempo.
export const NARR_RAW: number[] = [8.18, 8.17, 10.60, 7.63, 12.23, 10.39, 19.08, 9.06, 16.94, 7.02, 16.04, 13.54, 16.55, 12.64, 8.82, 17.06, 14.93];
export const VOICE_RATE = 1.1;
export const NARR: number[] = NARR_RAW.map((n) => Math.round((n / VOICE_RATE) * 100) / 100);
export const TEXT: string[] = [
 "A flight is set to leave Dallas Love Field at 3:40 this afternoon. Then the pilot keys the radio and says one word: hydraulic.",
 "The ramp hears it. Maintenance starts walking out. But the airline's system of record, the one everybody trusts, still says: on time.",
 "So the airport runs two clocks. One shows what is happening. The other shows what someone has typed in. And in the gap between them, crews, connections and gates get surprised.",
 "Here's the question. Could the system hear what the ramp already knows? And if it could, how do you let it listen, without letting it take over?",
 "Step one is hearing. The radio call becomes text, with a confidence score. That score isn't the software grading itself. It blends how clean the audio was, and how plausible those words are at an airport.",
 "Probably thirty to forty minutes becomes a working number: thirty-five, the midpoint. But the original words stay untouched, because later, someone will want to see exactly what was said.",
 "Step two: who owns this? Five desks could: flight operations, gates, ramp, crew, customer connections. Hydraulic and delay point to flight operations, at ninety-two percent. Crew trails at forty-one, connections at thirty-four. The runners-up are kept, so you can see how close the call was.",
 "And it keeps the receipt: the sentence that justified the routing, quoted word for word from the transcript. Nobody has to take the routing on trust. They can read it.",
 "Step three matters most. Look up what the flight system believes right now: on time, no delay. Then compare. If the voice agrees, nothing happens. If it adds something, it's noted. If it contradicts the record, that's a discrepancy, and that gap is the whole point.",
 "Calls that simply agree with the record get filtered out, on purpose. A tool that flagged every sentence would be ignored by lunchtime.",
 "Now the temptation: just update the flight. Confidence is ninety-two percent, above the automatic threshold of ninety. Still no. For flights and crew, the list of things the system may change on its own is empty. Confidence alone never earns the right to write the record.",
 "Think of the voice as a witness, not a judge: it testifies, it doesn't rule. The analogy has a limit. A witness can't open the files. This system can, and it checks the testimony against the record before anyone decides.",
 "So the controller doesn't just see approve a delay? They see a thirty-five-minute delay with its consequences already drawn: a crew near its duty limit, three passengers whose connection shrinks to ten minutes, a gate conflict. All of it visible before anything is committed.",
 "The controller reads the evidence and approves. Only then does the record change, stamped with a version number. If anything else touched that flight in the meantime, the write is refused instead of overwriting a newer truth.",
 "In the demo, the system had the delay thirty-five minutes before Flight Ops did. Thirty-five minutes to tell crew, rebook connections and move a gate.",
 "What's real: the flight data comes from Amadeus's test environment. Ramp, crew and connection details are placeholders. The speech engine is a stand-in with the real interface. Nothing is written back to Amadeus. And savings haven't been measured in live operations, so we won't quote one.",
 "So, back to the two clocks. The answer was never a faster typist. It was letting the system listen, and keeping a person's hand on the dial. The ramp already knows. What else in your airport is being said out loud, and not yet heard?"
];
export const SCENE_SEC = NARR.map((n) => Math.ceil((LEAD + n + MIN_TAIL) / SCENE_QUANTUM - 1e-9) * SCENE_QUANTUM);
export const SCENE_START = SCENE_SEC.map((_, i) => SCENE_SEC.slice(0, i).reduce((a, b) => a + b, 0));
export const TOTAL_SEC = SCENE_SEC.reduce((a, b) => a + b, 0);
export const TOTAL_FRAMES = Math.round(TOTAL_SEC * FPS);

// ---- Music plan (all times in seconds of the source track unless noted) ----
// Source structure (measured): 0-4 quiet intro, 4-35 groove, 35-36 breakdown, 36-~76.5 groove, ~76.5-79.5 ending decay.
// We play the intro + first groove once (0-36), loop the 36-52 groove, and finish with the ending (ES-79.54),
// so the track's own ending lands on the end of the video.
export const MUSIC_LEN = 79.5428;
export const MUSIC_INTRO = 4; // the groove "drops" at 4.0 s
export const MUSIC_START = SCENE_START[1] - MUSIC_INTRO; // so the drop hits exactly on the cut into scene 2
export const MUSIC_HEAD = 36; // played once from 0
export const MUSIC_LOOP_START = 36;
export const MUSIC_LOOP_LEN = 16; // 8 bars
const MIN_CREDITS = 8;
const plan = (() => {
  let best = { loops: 0, ending: 72, credits: Infinity };
  for (let k = 0; k < 40; k++) {
    for (let es = MUSIC_LOOP_START + MUSIC_LOOP_LEN; es <= 72; es += 4) {
      const credits = MUSIC_START + MUSIC_HEAD + k * MUSIC_LOOP_LEN + (MUSIC_LEN - es) - TOTAL_SEC;
      if (credits >= MIN_CREDITS && credits < best.credits) best = { loops: k, ending: es, credits };
    }
  }
  return best;
})();
export const MUSIC_LOOPS = plan.loops;
export const MUSIC_ENDING = plan.ending; // start of the ending section in the source track
export const CREDITS_SEC = plan.credits;

/** Seconds into scene `i` (0-based) at which `phrase` is spoken (estimated from its position in the line). */
export const when = (i: number, phrase: string): number => {
  const idx = TEXT[i].toLowerCase().indexOf(phrase.toLowerCase());
  return LEAD + NARR[i] * (Math.max(idx, 0) / TEXT[i].length);
};
