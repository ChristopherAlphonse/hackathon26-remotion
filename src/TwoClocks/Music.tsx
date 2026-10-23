import React from "react";
import { Audio, interpolate, Sequence, staticFile } from "remotion";
import {
  CREDITS_SEC,
  FPS,
  LEAD,
  MUSIC_ENDING,
  MUSIC_HEAD,
  MUSIC_LEN,
  MUSIC_LOOP_LEN,
  MUSIC_LOOP_START,
  MUSIC_LOOPS,
  MUSIC_START,
  NARR,
  SCENE_START,
  TOTAL_SEC,
} from "./timing";

// Gains (the track itself is loud: about -9.5 dB RMS against -21 dB RMS for the narration).
const UNDER_VOICE = 0.06; // about 14 dB below the narrator
const IN_GAP = 0.3; // between lines the music comes up
const HIT = 0.8; // the drop into scene 2
const FULL = 0.6; // credits

const XF = 2; // crossfade between music segments, in frames

/** Music gain over video time (seconds): ducks under each spoken line, lifts between lines. */
const POINTS: [number, number][] = (() => {
  const p: [number, number][] = [];
  NARR.forEach((n, i) => {
    const vs = SCENE_START[i] + LEAD;
    const ve = vs + n;
    if (i === 1) {
      // the track's drop lands on the cut into scene 2: swell through the intro, hold the hit, then duck for the voice
      p.push([SCENE_START[1] - 0.1, HIT], [SCENE_START[1] + 0.4, HIT], [vs - 0.05, UNDER_VOICE]);
    } else if (i > 1) {
      p.push([vs - 0.5, IN_GAP]);
    }
    p.push([vs, UNDER_VOICE], [ve, UNDER_VOICE]);
    if (i < NARR.length - 1 && i !== 0) p.push([ve + 0.7, IN_GAP]);
  });
  const lastEnd = SCENE_START[NARR.length - 1] + LEAD + NARR[NARR.length - 1];
  p.push([lastEnd + 1.5, FULL], [TOTAL_SEC + CREDITS_SEC, FULL]);
  return p;
})();

const gainAt = (frame: number): number => {
  const t = frame / FPS;
  return interpolate(
    t,
    POINTS.map((x) => x[0]),
    POINTS.map((x) => x[1]),
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
};

type Seg = { src: number; len: number }; // seconds of the source track

const SEGS: Seg[] = [
  { src: 0, len: MUSIC_HEAD },
  ...Array.from({ length: MUSIC_LOOPS }, () => ({ src: MUSIC_LOOP_START, len: MUSIC_LOOP_LEN })),
  { src: MUSIC_ENDING, len: MUSIC_LEN - MUSIC_ENDING },
];

export const Music: React.FC = () => {
  let pos = MUSIC_START; // video seconds where this segment's music begins
  return (
    <>
      {SEGS.map((s, i) => {
        const first = i === 0;
        const last = i === SEGS.length - 1;
        const pre = first ? 0 : XF; // overlap into the previous segment
        const from = Math.round(pos * FPS) - pre;
        const dur = (last ? Math.ceil(s.len * FPS) : Math.round(s.len * FPS)) + pre;
        const startFrom = Math.round(s.src * FPS) - pre;
        pos += s.len;
        return (
          <Sequence key={i} from={from} durationInFrames={dur}>
            <Audio
              src={staticFile("music/bed.mp3")}
              startFrom={startFrom}
              endAt={last ? undefined : startFrom + dur}
              volume={(f) => {
                const fadeIn = first ? interpolate(f, [0, 12], [0, 1], { extrapolateRight: "clamp" }) : interpolate(f, [0, XF], [0, 1], { extrapolateRight: "clamp" });
                const fadeOut = last ? 1 : interpolate(f, [dur - XF, dur], [1, 0], { extrapolateLeft: "clamp" });
                return gainAt(from + f) * fadeIn * fadeOut;
              }}
            />
          </Sequence>
        );
      })}
    </>
  );
};
