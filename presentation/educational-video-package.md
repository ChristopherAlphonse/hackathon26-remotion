# Educational video production package: "The Two Clocks"

Topic: how a spoken radio call becomes a checked, human-approved update in the airline's system (the Swoice voice-to-operations pipeline in `/Users/e202919/Desktop/hackathon26/docs`).
Audience: Southwest operations staff (they know the ramp, gates, crew duty limits and connections; they do not need aviation explained, but they do need the software explained).
Target duration: 3 to 5 minutes. This cut runs about 4:40.

Source of every fact: the `hackathon26/docs` folder (`FLOW.md`, `TRACE_WALKTHROUGH.md`, `PRESENTATION_GUIDE.md`, `AMADEUS_INTEGRATION.md`, `STATUS.md`). Section I maps each claim to its source.

---

## A. Three possible titles

1. **The Two Clocks** (recommended)
2. **The Ramp Already Knows**
3. **Why Your Airline Says "On Time" While the Pilot Says "Hydraulic"**

## B. Central question and premise

**Central question:** Could the system hear what the ramp already knows, and how do you let it listen without letting it take over?

**One-sentence premise:** An airport runs two clocks, what is happening and what has been typed in, and the pipeline closes the gap by letting voice propose, evidence justify and a person decide.

## C. Narrative approach

- **Hook as a paradox.** The pilot, the ramp and maintenance all know a flight will be late, yet the system of record says "on time". Operations staff have lived this, so the opening earns recognition, not explanation.
- **One metaphor carries the video: two clocks.** One clock shows reality, the other shows the record. The gap between them is the problem. The closing image makes the second clock listen to the first.
- **One object travels through every scene: the Voice ribbon.** A teal ribbon of sound leaves the radio, becomes a line of text, gets routed to a desk, is quoted as evidence, takes the witness stand, is stamped as a proposal and finally flips the record. The viewer follows one thing, so each scene visibly grows from the last.
- **Second metaphor, with its limit stated: the witness.** Voice is a witness, not a judge. The video says where the analogy stops (a witness cannot open the files; this system can).
- **Respect for the audience.** No "imagine a world" preamble. Ops staff get the real decision path (routing, reconciliation, allowlist, version check), including what the system refuses to do.
- **Honesty beat before the payoff.** What is real, what is placeholder and what has not been measured are said out loud near the end, because that is what makes operations people trust the rest.
- **No invented numbers.** The only measured figures used are 35 minutes (demo lead time), 0.94 / 0.92 / 0.41 / 0.34 (the traced run), the 0.9 auto threshold, and the 3 / 10-minute / 725-of-780 knock-on figures, which are labelled as synthetic placeholders on screen.

---

## D. Narration script (verbatim)

Count and pace are in D.2. Scene numbers match the storyboard.

**1.** A flight is set to leave Dallas Love Field at 3:40 this afternoon. Then the pilot keys the radio and says one word: hydraulic.

**2.** The ramp hears it. Maintenance starts walking out. But the airline's system of record, the one everybody trusts, still says: on time.

**3.** So the airport runs two clocks. One shows what is happening. The other shows what someone has typed in. And in the gap between them, crews, connections and gates get surprised.

**4.** Here's the question. Could the system hear what the ramp already knows? And if it could, how do you let it listen, without letting it take over?

**5.** Step one is hearing. The radio call becomes text, with a confidence score. That score isn't the software grading itself. It blends how clean the audio was, and how plausible those words are at an airport.

**6.** "Probably thirty to forty minutes" becomes a working number: thirty-five, the midpoint. But the original words stay untouched, because later, someone will want to see exactly what was said.

**7.** Step two: who owns this? Five desks could: flight operations, gates, ramp, crew, customer connections. "Hydraulic" and "delay" point to flight operations, at ninety-two percent. Crew trails at forty-one, connections at thirty-four. The runners-up are kept, so you can see how close the call was.

**8.** And it keeps the receipt: the sentence that justified the routing, quoted word for word from the transcript. Nobody has to take the routing on trust. They can read it.

**9.** Step three matters most. Look up what the flight system believes right now: on time, no delay. Then compare. If the voice agrees, nothing happens. If it adds something, it's noted. If it contradicts the record, that's a discrepancy, and that gap is the whole point.

**10.** Calls that simply agree with the record get filtered out, on purpose. A tool that flagged every sentence would be ignored by lunchtime.

**11.** Now the temptation: just update the flight. Confidence is ninety-two percent, above the automatic threshold of ninety. Still no. For flights and crew, the list of things the system may change on its own is empty. Confidence alone never earns the right to write the record.

**12.** Think of the voice as a witness, not a judge: it testifies, it doesn't rule. The analogy has a limit. A witness can't open the files. This system can, and it checks the testimony against the record before anyone decides.

**13.** So the controller doesn't just see "approve a delay?" They see a thirty-five-minute delay with its consequences already drawn: a crew near its duty limit, three passengers whose connection shrinks to ten minutes, a gate conflict. All of it visible before anything is committed.

**14.** The controller reads the evidence and approves. Only then does the record change, stamped with a version number. If anything else touched that flight in the meantime, the write is refused instead of overwriting a newer truth.

**15.** In the demo, the system had the delay thirty-five minutes before Flight Ops did. Thirty-five minutes to tell crew, rebook connections and move a gate.

**16.** What's real: the flight data comes from Amadeus's test environment. Ramp, crew and connection details are placeholders. The speech engine is a stand-in with the real interface. Nothing is written back to Amadeus. And savings haven't been measured in live operations, so we won't quote one.

**17.** So, back to the two clocks. The answer was never a faster typist. It was letting the system listen, and keeping a person's hand on the dial. The ramp already knows. What else in your airport is being said out loud, and not yet heard?

### D.2 Estimated duration

- Narration: **597 words** in 17 scenes.
- Speaking time at 140 words per minute: **4.3 minutes** (4:16).
- With 1.5 seconds between scenes for the visual transitions: **about 4:40**, inside the 3 to 5 minute target.
- If a slower read is wanted (125 words per minute) the film runs about 5:11; scenes 10 and 15 are the safest to trim.

---

## E. Storyboard

Each scene: timestamp, narration (see D, same number), visual, character action, camera, animation and transition, on-screen text, sound. Image and animation prompts are in section G.

Palette reminder: tarmac navy, Southwest blue, signal gold, cream paper, alert red (delay only), voice teal, approval green. Section F defines it.

### Scene 1 · 0:00 to 0:12 · The word
- **Visual:** Dusk at a ramp. A narrow-body aircraft nose-in at a gate, painted as flat blue, gold and red shapes with no logos. A small figure of the **Pilot** in the cockpit window, headset on, one hand on a radio handset. A single teal **Voice ribbon** curls out of the handset.
- **Action:** The Pilot speaks. The ribbon unrolls into the air and shapes itself into the single word *hydraulic* in hand-lettered teal (added in editing, not generated).
- **Camera:** Starts on a wide shot of the ramp, pushes slowly to the cockpit window, then tilts down along the ribbon.
- **Transition out:** The ribbon drops to the ground and slides across the tarmac toward the ramp crew (carries into scene 2).
- **On-screen text:** "15:40" small, top-left, as a scheduled-departure tag. Then "hydraulic" lettered along the ribbon.
- **Sound:** Quiet apron ambience, distant engine whine, one clear radio squelch. Music not yet in.

### Scene 2 · 0:12 to 0:23 · Everyone hears, the Board smiles
- **Visual:** Two halves of the frame, joined by the ribbon. Left: the **Ramp Lead** (hi-vis vest, ear defenders around the neck) looks up, and a maintenance figure starts walking toward the aircraft. Right, inside an ops room window: **The Board**, a vintage split-flap departure board drawn as a character with a calm, slightly too cheerful face. It shows WN1628 and a cream-colored panel that reads ON TIME.
- **Action:** The ribbon passes the Ramp Lead (who reacts) and touches the glass of the ops room, but stops there. The Board keeps smiling.
- **Camera:** A slow lateral track left to right along the ribbon, ending on The Board in a medium close-up.
- **Transition out:** The Board's flap-counter ticks over to a clock face (carries into scene 3).
- **On-screen text:** "ON TIME" on the Board (a real flap, added in editing).
- **Sound:** Radio squelch fades. A soft split-flap click as the camera arrives. The Board's "smile" is cued with a small cheerful two-note motif.

### Scene 3 · 0:23 to 0:38 · Two clocks
- **Visual:** The ops room dissolves into a plain navy field with **two large clocks** side by side, drawn as hand-lettered wall clocks. Left clock labelled by a small teal tag "what is happening". Right clock labelled by a gold tag "what is typed in".
- **Action:** The left clock's second hand ticks ahead, its minute hand moving past 15:40 toward 16:15. The right clock's hand stays at 15:40. Between the two, a gap forms, filled with small icons: a crew badge, a boarding pass, a gate number. They wobble and look startled.
- **Camera:** Static wide, then a slow push into the gap between the clocks.
- **Transition out:** The gap between the clocks becomes a question-mark shaped void, then the camera passes through it into scene 4.
- **On-screen text:** "what is happening" and "what is typed in" tags. No other text.
- **Sound:** Two clock ticks that start in sync and drift apart. The music enters here: a single warm piano note per tick.

### Scene 4 · 0:38 to 0:51 · The question
- **Visual:** The right clock turns into an **ear**, drawn simply as a curved shape with a small listening dial beneath it. The left clock's ribbon (the Voice) reaches toward it.
- **Action:** The ear leans toward the ribbon. A small hand hovers over a dial marked only with notches, ready to turn. The text of the question builds as hand lettering.
- **Camera:** Slow push-in on the ear and the hand.
- **Transition out:** The ribbon enters the ear and emerges on the other side as a **strip of text**.
- **On-screen text:** "Could the system hear it?" then "...without taking over?" (two beats).
- **Sound:** The piano motif asks a question (ends on an unresolved note). A faint breath of room tone.

### Scene 5 · 0:51 to 1:08 · Step one: hear
- **Visual:** The ribbon becomes a line of transcript text on a cream strip. Above it a small **gauge** shows confidence rising to 0.94. Three tiny inputs feed the gauge: a waveform labelled clean, a magnifier over the words, a little airport silhouette meaning "plausible here".
- **Action:** The strip scrolls, words settling in. The three inputs each drop a marble into the gauge, which fills to 0.94.
- **Camera:** Top-down on the strip, then a gentle pull-back to reveal the gauge.
- **Transition out:** The word "thirty to forty" lifts off the strip and floats (carries into scene 6).
- **On-screen text:** "0.94" on the gauge. Labels "audio quality", "words", "airport sense" in small hand lettering.
- **Sound:** Soft typewriter-like ticks as words land. A gentle "ding" as the gauge fills.

### Scene 6 · 1:08 to 1:22 · Thirty to forty becomes thirty-five
- **Visual:** The phrase "thirty to forty minutes" as a stretchy hand-drawn range on a ruler. A small marker slides to the midpoint and lights as **35**. The original sentence stays in a protected glass case beside it, untouched.
- **Action:** The ruler ranges from 30 to 40. A pointer finds the middle and drops a gold pin labelled 35. A glass lid closes over the original strip.
- **Camera:** Close-up on the ruler. Cut to a medium shot of the glass case.
- **Transition out:** The glass case slides away along a rail toward a wall of desks (scene 7).
- **On-screen text:** "30 to 40" then "35". The case reads "original words, never edited".
- **Sound:** A clean "tick" as the pin lands. Glass chime on the lid.

### Scene 7 · 1:22 to 1:43 · Step two: who owns this?
- **Visual:** A wall with **five desks**, each a distinct illustrated icon-room: Flight Ops (a flight strip board), Gate Ops (a gate podium), Ramp (a baggage cart), Crew (a crew badge rack), Customer Connections (a boarding pass with an arrow). The transcript strip approaches them.
- **Action:** Five thin arcs shoot from the strip to the desks, each a different thickness: a thick one to Flight Ops (0.92), medium to Crew (0.41), thin to Connections (0.34). The others stay faint. Small gold tags appear with the numbers.
- **Camera:** Wide on the wall, then a slow dolly along the arcs.
- **Transition out:** The thick arc to Flight Ops pulls the camera through the Flight Ops desk window (scene 8).
- **On-screen text:** "FLIGHT OPS 0.92", "CREW 0.41", "CUSTOMERS 0.34". Desks have small hand-lettered names.
- **Sound:** Five soft whooshes in a rising order, the largest with a low chord underneath.

### Scene 8 · 1:43 to 1:57 · The receipt
- **Visual:** Inside Flight Ops, the transcript sentence is highlighted by a gold **marker stroke** across exactly the words that justified the routing: "hydraulic system two caution, maintenance is heading out, probably a thirty to forty minute delay". A small receipt tag clips to the arc.
- **Action:** The marker drags across the words and the highlighted strip is copied (as a clean ghost) onto the receipt. A magnifier hovers: letter for letter, it matches.
- **Camera:** Extreme close-up on the highlighted words, then back out.
- **Transition out:** The receipt tag becomes a small **ticket** and floats up to the Board (scene 9).
- **On-screen text:** Exact quoted evidence as editable text, plus "word for word".
- **Sound:** Marker squeak (soft), a paper "click" as the receipt clips.

### Scene 9 · 1:57 to 2:18 · Step three: compare
- **Visual:** The Board, reading **ON TIME / no delay**, sits left. The receipt ticket sits right. Between them a **three-way scale** with three pans: MATCH (a green tick), NEW_INFO (a blue lamp), DISCREPANCY (a red flag). The ticket drops onto the DISCREPANCY pan.
- **Action:** The scale tips. The flap on the Board stays on ON TIME, but a thin red thread connects the ticket and the Board's ON TIME flap, pulled taut. The gap between them glows.
- **Camera:** Locked wide to read the scale, then a push-in on the taut thread.
- **Transition out:** The glowing gap becomes the empty space on a **desk filter** (scene 10).
- **On-screen text:** "MATCH", "NEW INFO", "DISCREPANCY" on the pans. "the gap" on the thread.
- **Sound:** Scale creak, a low tension tone when the red flag drops.

### Scene 10 · 2:18 to 2:30 · The filter
- **Visual:** A funnel-like sieve above the Board. Several small tickets marked "agrees" fall through and fade into a quiet gray basket. Only the red-flagged ticket stays above, catching the light.
- **Action:** Agreeing tickets sift away. The remaining ticket glows gold.
- **Camera:** Fixed medium, slow tilt down to the basket and back up to the ticket.
- **Transition out:** The gold ticket becomes a **command card** (scene 11).
- **On-screen text:** "agrees: filtered out".
- **Sound:** Soft sifting sound, then a clear bell for the remaining ticket.

### Scene 11 · 2:30 to 2:51 · The temptation
- **Visual:** A big hand-drawn **toggle labelled "apply automatically"** beside a threshold line at 0.9. The command card reads 0.92, above the line. Below sits a **gate** with two locks: one for the confidence, one labelled with a list that is empty for Flight Ops and Crew.
- **Action:** The card rises above the 0.9 line and the first lock opens. The second lock does not. A small clipboard marked "allowed to change on its own" shows a blank page for Flight Ops and Crew.
- **Camera:** Starts on the card crossing the line (a wide, hopeful frame), then pulls to the second lock for the beat.
- **Transition out:** The card is gently placed on a stand in front of a witness box (scene 12).
- **On-screen text:** "0.92 > 0.90" and "allowed to change on its own: (none)".
- **Sound:** A hopeful rising figure that stops short when the second lock stays shut.

### Scene 12 · 2:51 to 3:09 · The witness (and where the analogy breaks)
- **Visual:** A small courtroom-style **witness stand**. The Voice ribbon stands in it, drawn as a teal figure with a mouth shape. A judge's bench at the back stays empty until the Controller sits down later. Then the scene shifts: the witness leans toward a **filing cabinet**, but its arms are only ribbons and cannot open drawers. Beside it, a second figure, the **system**, opens the drawer and pulls out the Board's record.
- **Action:** The witness speaks. The ribbon's arms fail to open the cabinet. The system figure opens it and lays the record beside the testimony.
- **Camera:** Medium two-shot, then close on the cabinet drawer.
- **Transition out:** The pulled record and the testimony merge into one **proposal card** (scene 13).
- **On-screen text:** "witness, not judge". A small footnote-style tag: "where the analogy stops".
- **Sound:** A hushed room tone, no gavel. A small "drawer slide" sound.

### Scene 13 · 3:09 to 3:30 · The ripple, drawn in advance
- **Visual:** The proposal card sits at the center: "WN1628 · DELAYED · +35 min · reason: hydraulic". Three **ghosted ripples** spread out in outline (not yet solid) toward three small vignettes: a **crew badge** with a duty gauge near its limit; **three passengers** with a connection arrow shrinking to 10 minutes; a **gate** with two overlapping aircraft outlines.
- **Action:** Ripples expand as dashed outlines. A "synthetic data" tag sits on each vignette. The card is labelled pending, the ripples stay dashed to show nothing is committed.
- **Camera:** Static wide, with a slow outward drift as ripples reach their targets.
- **Transition out:** The Controller's hand enters from the lower edge, holding a pen over the card (scene 14).
- **On-screen text:** "duty limit 780 min · at 725", "connection 10 min", "gate conflict", and a persistent small tag "illustrative placeholder data".
- **Sound:** Three soft pulses, each a different pitch, then silence.

### Scene 14 · 3:30 to 3:47 · The human decides
- **Visual:** The **Controller** (lanyard, coffee mug at elbow) reads the evidence strip, then signs the card. The Board's smiling ON TIME flap rolls over to DELAYED +35 and its smile becomes a small, relieved one. Beneath, a **version tag** ticks from 7 to 8. A second, faint hand reaches in from the side holding an older record, and a gentle barrier stops it.
- **Action:** Pen signs. Flap rolls. Version tag increments. The faint hand bounces off, stamped "stale".
- **Camera:** Over-the-shoulder on the Controller, then a close-up of the flap rolling.
- **Transition out:** The flap's clatter dissolves into the left clock's ticks (scene 15).
- **On-screen text:** "approved", "version 7 → 8", "stale write refused".
- **Sound:** The split-flap clatter (the biggest sound in the film), a pen scratch, a soft "thunk" when the stale hand is blocked.

### Scene 15 · 3:47 to 3:59 · Thirty-five minutes
- **Visual:** Back on the two clocks. The right clock now moves to join the left, but a small **ghost marker** shows where it *would* have been: 35 minutes later. A measured arc labelled 35 sweeps between the two positions.
- **Action:** The right clock's hand catches up. The 35-minute arc glows gold. Small icons from scene 3 (crew badge, boarding pass, gate number) relax and tick off a checklist.
- **Camera:** Push-in on the arc, then a wide hold.
- **Transition out:** The clocks pull back into a pair of hands, gently set side by side (scene 16).
- **On-screen text:** "35 min earlier (in the demo)".
- **Sound:** The piano motif resolves for the first time. Clock ticks align.

### Scene 16 · 3:59 to 4:21 · What is real
- **Visual:** A clean **ledger board** in cream paper style, split in three columns with hand-drawn icons: **Real** (aircraft, flight strip, gate; tagged Amadeus test environment), **Placeholder** (ramp cart, crew badge, passenger group; tagged placeholder), **Not claimed** (a blank dollar sign with a question mark, tagged not measured). A small padlock icon marked "nothing written back".
- **Action:** Items slide into their columns one at a time. The padlock clicks closed over the Amadeus column.
- **Camera:** Flat orthographic, a slight parallax drift between layers.
- **Transition out:** The ledger folds into a paper airplane that flies to the left clock (scene 17).
- **On-screen text:** "REAL: flight data, Amadeus test environment", "PLACEHOLDER: ramp, crew, connections", "STAND-IN: speech engine", "NOT MEASURED: savings".
- **Sound:** Soft paper slides, a lock click.

### Scene 17 · 4:21 to 4:41 · The listening clock
- **Visual:** The two clocks return, now each with a hand on a **shared dial** operated by one human hand. The right clock has a tiny ear. The Voice ribbon flows from the left clock into the ear, and the right clock ticks in step. Then the camera pulls back and up: the whole airport at dusk, dozens of tiny teal ribbons curling out of cockpits, ramp radios and windows, most of them reaching nothing.
- **Action:** The ear listens, the dial turns under a human hand. In the final pull-back, the unreached ribbons shimmer.
- **Camera:** A slow crane up from the clocks to a wide aerial of the ramp.
- **Transition out:** Fade to navy. The last question lettered in cream on navy.
- **On-screen text:** "What else is being said out loud, and not yet heard?"
- **Sound:** Full music resolves, then thins to a single piano note and a fading radio squelch. A silent half-second before the end.

---

## F. Visual style guide

**Illustration style:** hand-crafted 2D editorial illustration, gouache-and-ink look, visible paper grain, confident ink outlines of varying weight, flat shapes with a single soft rim light, no gradients except sky and glow. Characters are simple and expressive, with big readable gestures. Everything is slightly imperfect, like a printed editorial spread.

**Palette (use only these):**

| Role | Colour | Hex |
|---|---|---|
| Background (tarmac dusk) | deep navy | `#0a1124` |
| Panels, cases | panel navy | `#0f1c36` |
| Structure, aircraft, desks | Southwest blue | `#304cb2` |
| The number or phrase that matters | signal gold | `#ffbf27` |
| Paper, receipts, ledger | warm cream | `#f3ead8` |
| The Voice ribbon and sound | voice teal | `#38bdf8` |
| Delay and discrepancy only | alert red | `#c21b17` |
| Approved | approval green | `#22c55e` |

Rules: red appears only where something is late or contradicted. Gold marks the one thing to look at per frame. Teal is reserved for voice. Never put long text on blue or red fills without a cream plate behind it.

**Recurring characters and objects (keep identical in every scene)**

| Name | Design |
|---|---|
| **The Pilot** | Seen mostly through the cockpit window. White shirt, navy epaulets with gold bars, headset, calm, slightly too cheerful face. |
| **The Ramp Lead** | Hi-vis vest in signal gold, ear defenders around the neck, clipboard. Reacts to the call first. |
| **The Controller** | Ops controller. Lanyard, rolled sleeves, a coffee mug always within reach. Decides things, calm hands. |
| **The Board** | A vintage split-flap departure board with a serene, slightly too cheerful face. It never moves until the human approves. |
| **The Voice** | A single teal ribbon of sound. It is the through-line object of the film. |
| **The Two Clocks** | Large hand-lettered wall clocks, left (what is happening) and right (what is typed in). |
| **Aircraft** | Flat blue, gold and red shapes. No logos, no heart, no tail art. |

**Compositional rules**
- 16:9, generous negative space, one clear focal point per frame.
- The Voice ribbon enters from the left and moves left to right wherever possible, so time reads as direction.
- The Board is always on the right, reality on the left.
- Alternate wide and close frames; never hold the same composition more than about 10 seconds.
- Use parallax with three layers: foreground silhouettes, mid-ground subject, background ramp.
- Every transition is a transformation of an object that is already on screen (ribbon to text, clock to ear, flap to clock). No crossfades unless dipping to navy.

**Typography (added in editing):** one humanist sans for labels, one hand-lettered style for the ribbon words. Labels never smaller than 3% of frame height. All numbers in gold.

**Brand note:** Southwest brand marks are not reproduced. The palette follows the project's own presentation guide; the guide asks to verify usage against the official brand guide before any public release.

---

## G. Image and animation prompts

### G.0 Reusable blocks (paste at the start of every image prompt)

**STYLE BLOCK:** "Hand-crafted 2D editorial illustration, gouache and ink on textured paper, confident ink outlines, flat shapes with a single soft rim light, subtle paper grain, limited palette only: deep navy #0a1124, panel navy #0f1c36, Southwest blue #304cb2, signal gold #ffbf27, warm cream #f3ead8, voice teal #38bdf8, alert red #c21b17 (only for delay), approval green #22c55e. 16:9 composition, generous negative space, no text, no letters, no logos, no brand marks, no heart symbol."

**CHARACTER BLOCK:** "The Pilot: white shirt, navy epaulets with gold bars, headset, calm slightly-too-cheerful face. The Ramp Lead: signal-gold hi-vis vest, ear defenders around the neck, clipboard. The Controller: lanyard, rolled sleeves, coffee mug within reach, calm hands. The Board: vintage split-flap departure board drawn as a character with a serene, slightly too cheerful face. The Voice: one continuous teal ribbon of sound that curls and flows. Aircraft: flat blue, gold and red shapes, no logos."

**ANIMATION BLOCK (applies to all):** "Animate by moving, scaling and morphing the existing illustrated elements. Keep the line work and palette unchanged. Use eased motion, small secondary motion on cloth, ribbons and mugs, and no camera shake. Do not generate new text; text is added in editing."

### G.1 Scene-by-scene prompts

**Scene 1**
- **Image:** STYLE BLOCK + CHARACTER BLOCK. "Dusk on an airport ramp. A narrow-body aircraft nose-in at a gate, seen at a low three-quarter angle. In the cockpit window, the Pilot holds a radio handset to the mouth. A single teal Voice ribbon curls out of the handset and arcs down toward the tarmac, leaving the right third of the frame empty for lettering. Deep navy sky with a thin gold horizon line. Focal point: the Pilot and the start of the ribbon."
- **Animation:** "Start on the wide ramp (ribbon still coiled at the handset). Over 5 seconds push in to the cockpit window while the ribbon unrolls across the frame and settles into a horizontal wave; tilt down over the last 3 seconds as the ribbon slides to the tarmac and travels right. End state: ribbon on the ground heading toward the ramp crew, frame centered on the tarmac."

**Scene 2**
- **Image:** STYLE BLOCK + CHARACTER BLOCK. "Split composition joined by a teal ribbon. Left: the Ramp Lead looks up toward the cockpit, a maintenance figure behind starts walking to the aircraft. Right, through a framed ops-room window: the Board, a smiling split-flap board, showing a cream panel and a blank flap row. The ribbon reaches the window glass and stops. Balanced composition, two visual weights."
- **Animation:** "Lateral track left to right over 6 seconds along the ribbon. The Ramp Lead's head snaps up when the ribbon passes; the maintenance figure starts walking. The ribbon touches the window glass and ripples away. Final 3 seconds: medium close-up of the Board, whose smile widens by a few pixels. End state: the Board centered, its flap counter beginning to tick."

**Scene 3**
- **Image:** STYLE BLOCK. "Two large hand-lettered wall clocks side by side on a plain deep-navy field. Left clock: second hand ahead, minute hand past the 40 mark, drawn with a teal rim. Right clock: hands stopped at 15:40, drawn with a gold rim. Between them, a gap of empty space containing a small crew badge, a boarding pass and a gate number sign, drawn with startled expressions. No text."
- **Animation:** "Left clock ticks forward steadily; right clock stays frozen. The three small icons in the gap wobble and shrink slightly. Slow push-in into the gap for the last 4 seconds. End state: the gap fills the frame as a void shaped like a question mark."

**Scene 4**
- **Image:** STYLE BLOCK. "The right clock morphed into a simple stylised ear shape with a small notched dial beneath it, gold rim. A teal ribbon from the left reaches toward it. Deep navy field, strong negative space around the ear."
- **Animation:** "The ear leans slightly toward the ribbon. A hand enters from below and hovers over the dial, fingers not touching. The ribbon touches the ear and passes through it, emerging as a cream strip of unreadable lines on the other side. End state: cream strip centered, ready for scene 5."

**Scene 5**
- **Image:** STYLE BLOCK. "Top-down view of a cream paper strip with several lines of illegible hand-drawn marks (placeholder script, no readable letters). Above it, a round gauge with a teal needle near the top. Three tiny feeding icons drop into the gauge: a clean waveform, a magnifier over marks, a small airport silhouette. Gold used only on the gauge needle."
- **Animation:** "Marks on the strip settle in one at a time over 4 seconds. Each of the three icons drops a small marble into the gauge at 1-second intervals; the needle rises with each. Final frame: needle at the top, the middle marks lifting slightly off the strip."

**Scene 6**
- **Image:** STYLE BLOCK. "A hand-drawn ruler spanning two marks, a gold pin sitting exactly at the midpoint. Next to it, a small glass display case holding a cream strip with illegible marks, its lid open. Deep navy background, soft cream spotlight."
- **Animation:** "A rubber-band range stretches between the two ruler marks. A pointer slides along the ruler and drops the gold pin at the midpoint with a small bounce. The case lid closes with a soft settle. End state: pin and closed case side by side, case sliding right on a rail."

**Scene 7**
- **Image:** STYLE BLOCK. "A wall with five illustrated desk-rooms in a row: a flight strip board, a gate podium, a baggage cart, a crew badge rack, a boarding pass with an arrow. A cream strip enters from the left. Five arcs of different thickness lead from the strip to the desks: very thick to the flight strip board, medium to the badge rack, thin to the boarding pass, faint to the other two. Gold tags beside the three arcs, no text."
- **Animation:** "The five arcs shoot out from the strip in sequence (flight strip board first), each drawing on from start to end over 0.8 seconds with ease-out. Gold tags pop in beside the three strongest. Then a slow dolly along the thick arc into the flight strip board's window. End state: inside the Flight Ops desk."

**Scene 8**
- **Image:** STYLE BLOCK. "Extreme close-up of a cream strip with illegible marks, a thick gold marker stroke across the middle section. A small cream receipt tag clips to the corner, carrying a ghost copy of the highlighted marks. A magnifier hovers over both, matching them mark for mark."
- **Animation:** "The marker draws left to right across the middle section in 3 seconds. The highlighted marks lift off as a ghost, glide to the receipt tag and settle. The magnifier moves over the pair and a small teal check appears. End state: receipt tag detached and floating upward."

**Scene 9**
- **Image:** STYLE BLOCK + CHARACTER BLOCK. "The Board, smiling and showing a calm cream panel, on the left. A small cream ticket floats on the right. Between them a three-pan balance scale: left pan with a green tick, middle pan with a blue lamp, right pan with a red flag. The ticket sits above the right pan. A thin red thread connects the ticket to the Board's calm panel."
- **Animation:** "The ticket drops onto the right pan; the scale tips with a small overshoot and settles. The red thread pulls taut and glows along its length. Push in on the thread for 4 seconds. End state: the glowing gap as a rectangle centered in frame."

**Scene 10**
- **Image:** STYLE BLOCK. "A wide funnel-shaped sieve above a soft gray basket. Several small cream tickets marked with a tiny green tick are falling through. One ticket, with a red flag, rests on top of the sieve, lit by a gold glow."
- **Animation:** "Agreeing tickets sift through the sieve in a loose cascade over 5 seconds and fade to gray in the basket. The red-flagged ticket stays, its glow pulsing once. End state: ticket morphing into a command card with a gold edge."

**Scene 11**
- **Image:** STYLE BLOCK. "A hand-drawn vertical line labelled with a notch, representing a threshold, with a command card sitting just above it, gold edged. Below, a heavy double-lock gate: the left lock open, the right lock closed. A clipboard beside it shows an empty page. Deep navy background, strong vertical composition."
- **Animation:** "The card rises across the threshold line with a gentle upward arc, and the left lock clicks open. The right lock shakes slightly and stays shut. The empty clipboard page flutters once. Hold 2 seconds on the closed lock. End state: the card lowered gently onto a small stand."

**Scene 12**
- **Image:** STYLE BLOCK + CHARACTER BLOCK. "A small courtroom-style witness stand with the teal Voice ribbon standing in it as a figure with a simple mouth shape. A judge's bench behind it is empty. Foreground: a filing cabinet with closed drawers, the ribbon figure's arms stretched toward it but too thin to grip. Beside the cabinet, a second figure drawn in Southwest blue, the system, opening the top drawer."
- **Animation:** "The ribbon figure gestures as it testifies (small ribbon waves). Its ribbon arms try the drawer handle and slip off. The blue system figure opens the drawer smoothly and lays a cream record beside the testimony. End state: record and testimony merge into one card."

**Scene 13**
- **Image:** STYLE BLOCK + CHARACTER BLOCK. "Central proposal card in cream with a gold edge. From it, three dashed (ghosted) concentric ripples spread outward toward three small vignettes: a crew badge with a gauge nearly at its limit; three passengers with a connection arrow shortened; a gate with two overlapping aircraft outlines. A small cream 'synthetic' tag on each vignette. Red appears only on the overlapping aircraft outlines."
- **Animation:** "The ripples expand as dashed rings over 4 seconds, each reaching its vignette one second apart. The gauge needle edges toward its limit, the connection arrow shortens, the aircraft outlines overlap. Everything stays dashed and translucent. End state: a pen hand enters at bottom edge above the card."

**Scene 14**
- **Image:** STYLE BLOCK + CHARACTER BLOCK. "Over-the-shoulder view of the Controller, a coffee mug at their elbow, signing a cream proposal card with a pen. In the background, the Board is mid-flip, showing a red delay panel with a small relieved smile. Below the Board, a small tag reading a version number (no text, just two stacked blank tags). At the edge, a faint second hand holding an old record, stopped by a gentle barrier."
- **Animation:** "The pen signs across the card (1.5 seconds). The Board's flap rolls over in a quick sequence of flips, ending on the red panel; the smile softens. The version tag ticks to the next tag. The faint hand bounces off the barrier and fades. End state: the Board's flaps still, the clock dissolve begins."

**Scene 15**
- **Image:** STYLE BLOCK. "The two clocks again. The right clock's hand has caught up to the left; a faint ghost hand marks where it would have stood 35 minutes later, with a gold arc between the two positions. Three small icons (crew badge, boarding pass, gate sign) relax, each with a small green tick."
- **Animation:** "The right clock's hand sweeps up to the left clock's time (3 seconds). The gold arc draws on and glows. The icons straighten and their ticks appear one by one. End state: both clocks side by side, hands aligned, pulling back slightly."

**Scene 16**
- **Image:** STYLE BLOCK. "A cream paper ledger board with three columns, divided by thin ink lines. Column one holds illustrations of an aircraft, a flight strip and a gate, with a small blue tag. Column two holds a baggage cart, a crew badge and a group of passengers, each with a faded outline to suggest placeholder. Column three holds a dollar sign with a question mark. A padlock icon sits over column one. No text."
- **Animation:** "Items slide into their columns from the left one by one (every 0.6 seconds). Placeholder items settle with a slightly faded edge. The padlock clicks shut over column one. End state: the ledger folds into a paper airplane that flies out of frame to the left."

**Scene 17**
- **Image:** STYLE BLOCK + CHARACTER BLOCK. "Final composition: the two clocks side by side on a navy field, a single human hand resting on a shared dial between them. The right clock has a small ear. A teal ribbon flows from the left clock into the ear. Layout leaves the lower third empty for the final question."
- **Animation:** "The ribbon flows into the ear; the right clock ticks in step with the left (3 seconds). The hand turns the dial a notch. Then crane up and back over 8 seconds into a wide dusk aerial of the ramp, showing dozens of tiny teal ribbons curling out of cockpits, ramp radios and windows, most reaching nothing. The unreached ribbons shimmer. Fade to navy. End state: empty navy frame for the final lettering."

---

## H. Sound design and music direction

**Music:** sparse, warm, contemporary. Solo piano with a soft synth pad underneath, no drums until scene 13, and then only a gentle pulse. The piano plays one question-shaped motif (rising, unresolved) that first appears in scene 3, recurs in scene 4 unanswered, is blocked mid-phrase in scene 11, and resolves fully in scene 15. The final scene thins back to a single note.

**Cue sheet**

| Time | Cue |
|---|---|
| 0:00 | Silence under apron ambience; radio squelch on the keyed mic |
| 0:12 | A single clean split-flap click as the Board appears |
| 0:23 | Two clock ticks begin in sync and drift apart; piano motif enters |
| 0:38 | Motif asks the question and does not resolve |
| 0:51 | Soft typing ticks; a gentle chime as the gauge fills |
| 1:22 | Five whooshes in rising order |
| 1:57 | Scale creak and a low tension tone on the red flag |
| 2:30 | Hopeful rising figure that stops dead when the second lock holds |
| 3:09 | Light pulse for each ripple, then silence |
| 3:30 | The split-flap clatter, the loudest sound in the film, plus a pen scratch |
| 3:47 | The motif resolves; clock ticks align |
| 4:21 | A half-second of silence before the final image; music thins to one note |

**Voice-over direction:** warm, unhurried, conversational, with slight smile on the hook and quiet gravity on scene 11 and scene 16. No announcer cadence. Leave a short breath after "hydraulic" in scene 1 and after "on time" in scene 2.

**Mix:** narration always on top; sound effects soft and physical, never cartoonish; the clatter in scene 14 is the only sound allowed to briefly duck the music.

---

## I. Continuity and factual-accuracy checklist

### I.1 Fact-to-source map

| Claim in the video | Where it comes from |
|---|---|
| Five desks: Flight Ops, Gate Ops, Ramp Ops, Crew Ops, Customer Impact | `FLOW.md` §2 Stage 2 table |
| Radio call becomes text with a confidence that blends audio quality and plausibility | `TRACE_WALKTHROUGH.md` §2 (C2) |
| "Thirty to forty" read as 35, original words untouched | `TRACE_WALKTHROUGH.md` §2 (`hints.minutes: [35]`, "left untouched") |
| Routing: flight operations 0.92, crew 0.41, customer impact 0.34; runners-up kept | `TRACE_WALKTHROUGH.md` §3 (C3) |
| Evidence is a literal substring of the transcript | `TRACE_WALKTHROUGH.md` §3; `FLOW.md` §6 |
| System reads current state first: ON_TIME, no delay | `TRACE_WALKTHROUGH.md` §4 (C4) |
| MATCH / NEW_INFO / DISCREPANCY; MATCH filtered | `FLOW.md` §5 |
| Auto threshold 0.9; flights and crew never auto-applied; allowlist empty for FLIGHT_OPS | `FLOW.md` §6; `TRACE_WALKTHROUGH.md` §5 |
| Knock-on effects shown before committing (crew 725 of 780 minutes, 3 passengers to a 10-minute connection, gate conflict) | `TRACE_WALKTHROUGH.md` §7 (synthetic mock data) |
| Version-checked write; a stale write is refused | `TRACE_WALKTHROUGH.md` §4 and `STATUS`-linked contract notes (`expectedVersion`) |
| 35 minutes of lead time in the demo | `PRESENTATION_GUIDE.md` §12 (HUD metric on the hero run) |
| Flight data from Amadeus test environment; ramp, crew, connections are placeholders; speech engine is a stand-in with the real interface; nothing written to Amadeus; no measured savings | `PRESENTATION_GUIDE.md` §3 slide 5, §6 Q1 to Q3, Q6; `AMADEUS_INTEGRATION.md` §2 and "Out of scope"; `FLOW.md` §8 |

### I.2 Things to confirm before recording

1. **"35 minutes before Flight Ops did"** (scene 15) repeats the guide's wording. It is a HUD metric on the hero run, and the exact definition of "lead time" should be confirmed with the team so the line says precisely what was measured.
2. **Flight number.** The traced run uses AV1842 (a placeholder carrier code); the presentation and portal use WN1628. The video avoids spoken flight numbers; the on-screen proposal card uses WN1628 to match the live demo. Keep that consistent.
3. **The knock-on numbers** (725 of 780 duty minutes, 3 passengers, 10-minute connection, gate conflict) come from synthetic mock data. The video labels them "illustrative placeholder data" on screen in scene 13 and says "ramp, crew and connection details are placeholders" in scene 16. Do not remove either.
4. **Approval in the deployed stack.** `TRACE_WALKTHROUGH.md` §10 notes there is no deployed CONFIRM/REJECT endpoint on AWS; the approval step is shown in the local demo. The video says "the controller approves" without claiming it runs on AWS.
5. **Known limitation not shown:** `SESSION_MISMATCH.md` describes two actions raised for one fact in the deployed path, where the second one then fails with a version conflict. The video shows the intended flow, so state this honestly if asked.
6. **Brand usage.** No Southwest logo or heart is drawn. Verify palette and usage against the official brand guide before any public release.
7. **Speech accuracy.** Do not imply recognition accuracy. The guide says not to quote an accuracy figure for speech recognition.

### I.3 Quality-control review

| Check | Result |
|---|---|
| Opening creates curiosity within 10 seconds | Yes: scenes 1 and 2 pose the paradox (a pilot says "hydraulic", the system says "on time"). |
| Clear narrative progression | Hook, question, three steps (hear, route and check, propose), the human decision, the honesty beat, the payoff. |
| Every concept has a visual | Confidence is a gauge; routing is arcs of different thickness; evidence is a marker stroke; reconciliation is a scale; allowlist is a double lock; version check is a barrier; cascades are ripples. |
| Visuals evolve rather than disconnect | The Voice ribbon and the two clocks run through the film; every transition transforms an object already on screen. |
| Narration fits runtime | Yes: about 4:40 at 140 words per minute, with the transitions included. |
| Each scene has one purpose | Scenes 1 to 3 set the problem, 4 asks the question, 5 to 12 answer it, 13 to 15 show the consequence and the human decision, 16 is the honesty beat, 17 is the payoff. |
| Recurring elements consistent | Section F defines characters, palette and rules; the CHARACTER BLOCK in G.0 repeats them in every prompt. |
| Ending delivers a payoff | The closing image shows the unheard ribbons across the airport and ends on a question, not on a thank-you. |
| Slideshow check | Scene 10 (the filter) is the most static; it is built as a falling-and-sifting event, not a diagram. |

### Duration check

597 words at 140 words per minute is 4:16 of speech; plus 1.5 seconds between each of the 17 scenes gives about 4:40. Computed from the narration in section D (words counted as letter and digit runs).
