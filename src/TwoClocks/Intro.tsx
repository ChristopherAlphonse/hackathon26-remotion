import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { Art, C, Hand } from "./art";
import { FPS } from "./timing";

// "Runway Rebels presents", in the film's own hand-drawn style: every letter is a brick.
//   0.8-1.9  the bottom row, R E B E L S, drops in and lands one brick at a time
//   2.0-3.1  the top row, R U N W A Y, drops on top of it
//   3.5      "presents" is lettered in underneath
//   5.8-6.6  the bricks fall away, leaving the navy the film starts on
// Times are in seconds. The sound is public/sfx/intro.wav (scripts/make-intro-sfx.py), one thud per landing.

const COLS = 6;
const BW = 196; // brick width
const BH = 172; // brick height
const GAP = 8;
const WALL_W = COLS * BW + (COLS - 1) * GAP;
const LEFT = 960 - WALL_W / 2;
const BOTTOM_Y = 700; // bottom edge of the bottom row
const FALL = 0.45; // seconds in the air
const DROP_FROM = 1100; // px above its place a brick starts

type Brick = {
  ch: string;
  x: number;
  y: number;
  land: number;
  fill: string;
  ink: string;
  row: 0 | 1;
};

const ROWS: {
  word: string;
  row: 0 | 1;
  start: number;
  fill: string;
  ink: string;
}[] = [
  { word: "REBELS", row: 0, start: 0.8, fill: C.blue, ink: C.cream },
  { word: "RUNWAY", row: 1, start: 2.0, fill: C.gold, ink: C.ink },
];

/** Landing times, shared with scripts/make-intro-sfx.py. */
export const BRICK_LANDINGS: number[] = ROWS.flatMap((r) =>
  Array.from({ length: COLS }).map((_, i) => r.start + i * 0.14 + FALL),
);

const BRICKS: Brick[] = ROWS.flatMap((r) =>
  r.word.split("").map((ch, i) => ({
    ch,
    x: LEFT + i * (BW + GAP),
    y: BOTTOM_Y - (r.row + 1) * BH - r.row * GAP,
    land: r.start + i * 0.14 + FALL,
    fill: r.fill,
    ink: r.ink,
    row: r.row,
  })),
);

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

/** Falls under gravity, bounces twice, squashes on every landing. */
const motion = (t: number, land: number) => {
  const fall = t - (land - FALL);
  if (fall < 0) return { dy: -DROP_FROM, sy: 1, sx: 1 };
  if (t < land) {
    const u = fall / FALL;
    return { dy: -DROP_FROM * (1 - u * u), sy: 1 + 0.06 * u, sx: 1 - 0.03 * u }; // stretches as it speeds up
  }
  const tau = t - land;
  const decay = Math.exp(-tau * 7);
  return {
    dy: -Math.abs(Math.sin(tau * 15)) * 22 * decay,
    sy: 1 - 0.17 * Math.exp(-tau * 16) * Math.abs(Math.cos(tau * 15)),
    sx: 1 + 0.07 * Math.exp(-tau * 16) * Math.abs(Math.cos(tau * 15)),
  };
};

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;

  const presents = clamp01((t - 3.5) / 0.9);
  const presentsOut = 1 - clamp01((t - 5.6) / 0.6);

  return (
    <AbsoluteFill>
      <Audio src={staticFile("sfx/intro.wav")} volume={0.7} />
      <Art>
        {/* warm light behind the wall */}
        <ellipse
          cx={960}
          cy={560}
          rx={760}
          ry={420}
          fill={C.gold}
          opacity={0.07 * clamp01((t - 1.2) / 1.5) * presentsOut}
        />
        {/* ground the bricks land on */}
        <rect
          x={LEFT - 140}
          y={BOTTOM_Y}
          width={WALL_W + 280}
          height={22}
          rx={8}
          fill={C.panel}
          stroke={C.ink}
          strokeWidth={6}
          opacity={clamp01((t - 0.3) / 0.5) * presentsOut}
        />

        {BRICKS.map((b, i) => {
          const m = motion(t, b.land);
          // after the lettering is done, the bricks fall away: top row first, left to right
          const exitAt = 5.8 + (b.row === 1 ? 0 : 0.12) + (i % COLS) * 0.05;
          const e = Math.max(0, t - exitAt);
          const exitDy = 2800 * e * e;
          const exitRot = (i % 2 ? 1 : -1) * e * 40;
          const cx = b.x + BW / 2;
          const base = b.y + BH;
          const puff = clamp01((t - b.land) / 0.5);
          return (
            <g key={i}>
              {/* dust where it lands */}
              {t >= b.land && puff < 1
                ? [-1, 1].map((side) => (
                    <circle
                      key={side}
                      cx={cx + side * (BW * 0.42 + puff * 46)}
                      cy={base - 8 - puff * 14}
                      r={10 + puff * 22}
                      fill={C.cream}
                      opacity={0.5 * (1 - puff)}
                    />
                  ))
                : null}
              <g
                transform={`translate(${cx} ${base + m.dy + exitDy}) rotate(${exitRot}) scale(${m.sx} ${m.sy}) translate(${-cx} ${-base})`}
              >
                <rect
                  x={b.x}
                  y={b.y}
                  width={BW}
                  height={BH}
                  rx={14}
                  fill={b.fill}
                  stroke={C.ink}
                  strokeWidth={9}
                  strokeLinejoin="round"
                />
                {/* a lighter top edge and two scratches, so each one reads as a chunky brick */}
                <path
                  d={`M${b.x + 16} ${b.y + 18} L${b.x + BW - 16} ${b.y + 18}`}
                  stroke={C.cream}
                  strokeOpacity={b.fill === C.gold ? 0.55 : 0.28}
                  strokeWidth={7}
                  strokeLinecap="round"
                />
                <path
                  d={`M${b.x + 22} ${b.y + BH - 20} l22 0 M${b.x + BW - 52} ${b.y + BH - 20} l18 0`}
                  stroke={C.ink}
                  strokeOpacity={0.3}
                  strokeWidth={6}
                  strokeLinecap="round"
                />
                <text
                  x={cx}
                  y={b.y + BH / 2 + 46}
                  textAnchor="middle"
                  fontFamily="Inter, sans-serif"
                  fontWeight={900}
                  fontSize={132}
                  fill={b.ink}
                >
                  {b.ch}
                </text>
              </g>
            </g>
          );
        })}

        <Hand
          x={960}
          y={BOTTOM_Y + 150}
          size={110}
          fill={C.gold}
          opacity={presents * presentsOut}
          rotate={-2}
        >
          presents
        </Hand>
        <path
          d={`M${960 - 150} ${BOTTOM_Y + 178} C${960 - 60} ${BOTTOM_Y + 192} ${960 + 60} ${BOTTOM_Y + 170} ${960 + 150} ${BOTTOM_Y + 184}`}
          fill="none"
          stroke={C.gold}
          strokeWidth={7}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={`${presents} 2`}
          opacity={presents > 0 ? presentsOut : 0} // a 0-length dash with a round cap still paints a dot
        />
      </Art>
    </AbsoluteFill>
  );
};
