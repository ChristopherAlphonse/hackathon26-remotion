// Generated from the narration audio (public/twoclocks/n*.wav) and the script in
// presentation/educational-video-package.md. Durations are the real lengths of the ElevenLabs TTS clips (voice: Matilda).
export const FPS = 24;
export const LEAD = 0.7; // silence before each line
export const TAIL = 1.1; // breathing room after each line
export const NARR: number[] = [8.41, 9.66, 11.56, 8.78, 13.14, 12.12, 21.55, 10.91, 18.81, 8.41, 17.93, 15.74, 17.88, 13.75, 9.43, 19.18, 15.05];
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
export const SCENE_SEC = NARR.map((n) => n + LEAD + TAIL);
export const SCENE_START = SCENE_SEC.map((_, i) => SCENE_SEC.slice(0, i).reduce((a, b) => a + b, 0));
export const TOTAL_SEC = SCENE_SEC.reduce((a, b) => a + b, 0);
export const TOTAL_FRAMES = Math.round(TOTAL_SEC * FPS);

/** Seconds into scene `i` (0-based) at which `phrase` is spoken (estimated from its position in the line). */
export const when = (i: number, phrase: string): number => {
  const idx = TEXT[i].toLowerCase().indexOf(phrase.toLowerCase());
  return LEAD + NARR[i] * (Math.max(idx, 0) / TEXT[i].length);
};
