import React from "react";
import { Audio, interpolate, Sequence, staticFile } from "remotion";
import {
  ACT1,
  ACT1_SEC,
  CREDITS_SEC,
  FPS,
  LEAD,
  MUSIC1,
  MUSIC2,
  MUSIC_HEAD_END,
  MUSIC_LEN,
  MUSIC_LOOP_LEN,
  MUSIC_LOOP_START,
  MusicPlan,
  NARR,
  SCENE_START,
  TOTAL_SEC,
} from "./timing";

// Gains (the track itself is loud: about -9.5 dB RMS against -21 dB RMS for the narration).
const UNDER_VOICE = 0.06; // about 14 dB below the narrator
const IN_GAP = 0.3; // between lines the music comes up
const HIT = 0.8; // the drop into scene 2
const FULL = 0.6; // the finale: after the last line, through the credits

const XF = 2; // crossfade between music segments, in frames

/**
 * Music gain over video time (seconds): ducks under each spoken line, lifts between lines.
 * `first..last` are the scene indexes of the act; `drop` is the scene whose cut the track's drop lands on.
 */
const pointsFor = (first: number, last: number, drop: number, endSec: number): [number, number][] => {
  const p: [number, number][] = [];
  for (let i = first; i <= last; i++) {
    const vs = SCENE_START[i] + LEAD;
    const ve = vs + NARR[i];
    if (i === drop) {
      // the drop lands on the cut: swell through the cut, hold the hit, then duck for the voice
      p.push([SCENE_START[i] - 0.1, HIT], [SCENE_START[i] + 0.4, HIT], [vs - 0.05, UNDER_VOICE]);
    } else if (i > first) {
      p.push([vs - 0.5, IN_GAP]);
    }
    p.push([vs, UNDER_VOICE], [ve, UNDER_VOICE]);
    if (i < last && i !== first) p.push([ve + 0.7, IN_GAP]);
  }
  p.push([SCENE_START[last] + LEAD + NARR[last] + 1.5, FULL], [endSec, FULL]);
  // short scenes can make neighbouring points cross: keep the times strictly increasing
  p.sort((x, y) => x[0] - y[0]);
  for (let i = 1; i < p.length; i++) if (p[i][0] <= p[i - 1][0]) p[i][0] = p[i - 1][0] + 0.01;
  return p;
};

const POINTS1 = pointsFor(0, ACT1 - 1, 1, ACT1_SEC);
const POINTS2 = pointsFor(ACT1, NARR.length - 1, ACT1, TOTAL_SEC + CREDITS_SEC);

const gainAt = (points: [number, number][], frame: number): number => {
  const t = frame / FPS;
  return interpolate(
    t,
    points.map((x) => x[0]),
    points.map((x) => x[1]),
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
};

type Seg = { src: number; len: number }; // seconds of the source track

const segsFor = (plan: MusicPlan): Seg[] => [
  { src: plan.from, len: MUSIC_HEAD_END - plan.from },
  ...Array.from({ length: plan.loops }, () => ({ src: MUSIC_LOOP_START, len: MUSIC_LOOP_LEN })),
  { src: plan.ending, len: MUSIC_LEN - plan.ending },
];

const MusicRun: React.FC<{ plan: MusicPlan; points: [number, number][]; fadeIn: number }> = ({ plan, points, fadeIn }) => {
  const segs = segsFor(plan);
  let pos = plan.start; // video seconds where this segment's music begins
  return (
    <>
      {segs.map((s, i) => {
        const first = i === 0;
        const last = i === segs.length - 1;
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
                const fi = first ? interpolate(f, [0, fadeIn], [0, 1], { extrapolateRight: "clamp" }) : interpolate(f, [0, XF], [0, 1], { extrapolateRight: "clamp" });
                const fadeOut = last ? 1 : interpolate(f, [dur - XF, dur], [1, 0], { extrapolateLeft: "clamp" });
                return gainAt(points, from + f) * fi * fadeOut;
              }}
            />
          </Sequence>
        );
      })}
    </>
  );
};

/** Two runs of the same track: one for the scenes before the demo and one for the closing scenes. The demo has its own sound. */
export const Music: React.FC = () => (
  <>
    <MusicRun plan={MUSIC1} points={POINTS1} fadeIn={12} />
    <MusicRun plan={MUSIC2} points={POINTS2} fadeIn={6} />
  </>
);
