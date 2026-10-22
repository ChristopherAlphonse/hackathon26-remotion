# Presentation script: "The Ramp Knows"

Runtime: 3:00. The skit runs about 75 seconds. The presenter speaks for about 105 seconds (roughly 240 words at 135 words per minute). Rehearse once with a timer and adjust the skit pauses to land on 3:00. Timestamps are cues, not hard cuts.

Source: `/Users/e202919/Desktop/hackathon26/docs/SKIT.md`, tightened to fit. Facts come from `PRESENTATION_GUIDE.md` and `TRACE_WALKTHROUGH.md` in the same folder.

| Time | Part | Who |
|---|---|---|
| 0:00 to 0:40 | 1. The problem (skit) | PILOT, FLIGHT OPS, HUMAN |
| 0:40 to 1:15 | 2. The fix (skit) | PILOT, FLIGHT OPS, HUMAN |
| 1:15 to 1:25 | 3. The platform (slow zoom into the twin) | Presenter |
| 1:25 to 1:50 | 4. Feature overview | Presenter |
| 1:50 to 2:10 | 5. What is real | Presenter |
| 2:10 to 2:30 | 6. Cost saving | Presenter |
| 2:30 to 2:50 | 7. Implementation plan | Presenter |
| 2:50 to 3:00 | 8. Close | Presenter |

## Glossary

- **System of record**: the database ops teams treat as the official status of a flight.
- **Ramp**: the ground crew who service the aircraft and report by radio.
- **Proposal**: a suggested change to the system of record that waits for a person to approve it.

**Cast:** PILOT (on a handheld radio, calm, slightly too cheerful about bad news), FLIGHT OPS (at a laptop, the system of record, unaware), HUMAN (the ops controller, holds a coffee, decides things).

---

## 1. The problem (0:00 to 0:40)

*PILOT stands apart with the radio. FLIGHT OPS sits at the laptop, smiling at a screen that says ON TIME.*

**PILOT** *(into radio)*: Ground, WN1628, we have a hydraulic system two caution on the preflight, maintenance is walking out to us now, call it a thirty five minute delay before we can push.

*Beat. Nothing happens.*

**FLIGHT OPS** *(serene, to the audience)*: WN1628 is on time. Everything is fine.

**PILOT**: I said hydraulic.

**FLIGHT OPS**: Nobody has typed that in yet.

*HUMAN wanders in, sips coffee, squints at the screen.*

**HUMAN**: Has anyone told crew? Connections? The gate?

**FLIGHT OPS**: Nobody has typed that in yet.

*All three freeze for one beat.*

**HUMAN** *(to the audience)*: The ramp always knows before the system does. That gap is the whole problem.

## 2. The fix (0:40 to 1:15)

*Someone holds up a sign: SWOICE. PILOT repeats the call. This time a card passes hand to hand.*

**PILOT** *(into radio)*: Ground, WN1628, we have a hydraulic system two caution on the preflight, maintenance is walking out to us now, call it a thirty five minute delay before we can push.

*The card goes to FLIGHT OPS, who reads it like a clerk.*

**FLIGHT OPS**: Heard it. I say on time. The voice says delayed. We disagree.

**HUMAN**: Do not overwrite anything. The voice is a witness, not a boss.

**FLIGHT OPS**: Proposal: thirty-five minute delay, new departure 16:15. Evidence: *(points at the card)* "call it a thirty five minute delay." It is in the transcript.

*FLIGHT OPS hands the card to HUMAN.*

**HUMAN** *(sips coffee, nods)*: Approved.

*The screen flips from ON TIME to DELAYED. PILOT gives a thumbs up.*

---

## 3. The platform (1:15 to 1:25)

*The screen shows the digital twin of Dallas Love Field. The camera slowly pushes in toward the terminal. HUMAN steps forward as the presenter and the other two sit down.*

"This is the platform: a digital twin of Dallas Love Field. It is where the radio call lands."

## 4. Feature overview (1:25 to 1:50)

"What you just saw is our pipeline. Hear it, check it, propose it.

Hear it: we turn the radio call into a structured signal. Check it: we compare it with what the flight system believes. The system said on time, the voice said delayed. Propose it: we never overwrite the record. We open a proposal with the exact words as evidence, and a person approves, edits, or rejects it.

Voice is an untrusted sensor. Fast, useful, never in charge."

## 5. What is real (1:50 to 2:10)

"Here is what we measured, and nothing more.

In our demo, the system had the delay 35 minutes before Flight Ops did.

The flight data is real, from the Amadeus test environment. Ramp, crew, and connection data are labeled placeholders today."

## 6. Cost saving (2:10 to 2:30)

"What is it worth? We would rather show a method than invent a number.

Delays caught early per year, times minutes of lead time, times the cost of a delay minute. We have 35 minutes of lead time in the demo. The other two inputs come from Southwest operations, so they say VERIFY. We quote no savings figure until a pilot measures it."

## 7. Implementation plan (2:30 to 2:50)

"Now: a working pipeline with real Amadeus flight data, read-only. Next: real ramp, crew, and connection feeds, and real speech-to-text. Pilot: one station, a person approving every change, lead time measured live. Scale: more stations, and auto-apply only for a narrow allowlist.

The ask: a real pilot with operations."

## 8. Close (2:50 to 3:00)

"The ramp already knows. Voice in. Checked proposal out. A person decides.

Thank you. Questions?"

---

## Delivery notes

- **Numbers rule:** only say what was measured. The 35 minutes, the real Amadeus flight data, and the placeholder labels are the only claims. Add no dollar or percentage figure unless it has a source.
- **Props:** a handheld radio (a phone works), a laptop on a stool, an index card, a SWOICE sign.
- **If you run long:** cut the second "Nobody has typed that in yet" exchange in Part 1, then drop section 5.
- **If you have a live demo:** replace sections 3 and 4 with the live demo and keep sections 5 to 8.
- **Remotion link:** the `Pitch` composition (`src/Pitch.tsx`) matches this script scene for scene. Render it with `npx remotion render Pitch out/pitch.mp4 --port=3123` (the port avoids a clash with Studio on 3000).
