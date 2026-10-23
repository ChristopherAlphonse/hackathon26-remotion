import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { C } from "./art";
import { FPS, INTRO_SEC } from "./timing";

// "Runway Rebels presents": a slow cinematic title.
//   0.5-2.0  a light streak draws across the black frame
//   2.0      the title resolves out of a blur as the hit lands, its letters drawing in from wide to tight
//   2.4-4.0  a gold glint sweeps across the letters
//   3.4      "presents" drifts up under it
//   5.4-6.4  the title pushes forward and dissolves; the letterbox bars open
//   6.3-7.0  the intro background fades into the navy the film starts on
// Timings are in seconds so they survive an fps change. The sound is public/sfx/intro.wav
// (made by scripts/make-intro-sfx.py), cut to the same timeline.

const BAR = 138; // 2.39:1 letterbox at 1920 wide
const ease = Easing.bezier(0.16, 1, 0.3, 1); // long, soft landing
const inOut = Easing.inOut(Easing.cubic);
const span = (
  t: number,
  a: number,
  b: number,
  fn: (x: number) => number = ease,
) => fn(Math.min(1, Math.max(0, (t - a) / (b - a))));

const DUST = Array.from({ length: 36 }).map((_, i) => ({
  x: (i * 541) % 1920,
  y: (i * 313) % 1080,
  r: 1.2 + (i % 4) * 0.8,
  speed: 8 + (i % 7) * 4,
  drift: 14 + (i % 5) * 6,
  phase: i * 1.7,
}));

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;

  const bgOut = 1 - span(t, 6.3, INTRO_SEC, inOut);
  const barH = BAR * (1 - span(t, 5.7, 6.8, inOut));

  // the light streak
  const streakW = 1700 * span(t, 0.5, 2.0);
  const streakA = interpolate(t, [0.5, 1.9, 2.05, 3.4], [0, 0.85, 1, 0.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // the title
  const titleIn = span(t, 2.0, 3.1);
  const tracking = interpolate(span(t, 2.0, 4.6), [0, 1], [0.55, 0.26]); // em
  const blur = 26 * (1 - titleIn) + 10 * span(t, 5.4, 6.4, inOut);
  const out = 1 - span(t, 5.4, 6.4, inOut);
  const scale =
    interpolate(span(t, 2.0, 6.4, Easing.linear), [0, 1], [1.07, 1.0]) +
    0.06 * span(t, 5.4, 6.4, inOut);
  const glint = interpolate(span(t, 2.5, 4.2, inOut), [0, 1], [130, -30]); // background-position %

  // "presents"
  const presentsIn = span(t, 3.4, 4.5);
  const presentsY = (1 - presentsIn) * 26;

  return (
    <AbsoluteFill style={{ opacity: 1 }}>
      <Audio src={staticFile("sfx/intro.wav")} />
      <AbsoluteFill
        style={{
          opacity: bgOut,
          background:
            "radial-gradient(ellipse at 50% 48%, #162a55 0%, #0a1124 52%, #04060d 100%)",
        }}
      />

      {/* floating dust in the projector beam */}
      <AbsoluteFill style={{ opacity: bgOut * span(t, 0.8, 2.4) * out }}>
        {DUST.map((d, i) => {
          const y = (d.y - d.speed * t + 1080 * 4) % 1080;
          const x = d.x + Math.sin(t * 0.6 + d.phase) * d.drift;
          const tw = 0.35 + 0.35 * Math.sin(t * 2 + d.phase);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: d.r * 2,
                height: d.r * 2,
                borderRadius: "50%",
                background: C.cream,
                opacity: tw * 0.55,
                filter: "blur(0.6px)",
              }}
            />
          );
        })}
      </AbsoluteFill>

      {/* anamorphic light streak */}
      <div
        style={{
          position: "absolute",
          left: 960 - streakW / 2,
          top: 540 - 1.5,
          width: streakW,
          height: 3,
          opacity: streakA * bgOut,
          background:
            "linear-gradient(90deg, rgba(255,243,208,0) 0%, #fff3d0 50%, rgba(255,243,208,0) 100%)",
          boxShadow:
            "0 0 24px 6px rgba(255,191,39,0.55), 0 0 90px 24px rgba(56,189,248,0.25)",
        }}
      />

      {/* the title */}
      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "center", opacity: out }}
      >
        <div style={{ transform: `scale(${scale})`, textAlign: "center" }}>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 900,
              fontSize: 128,
              lineHeight: 1,
              letterSpacing: `${tracking}em`,
              paddingLeft: `${tracking}em`, // balances the trailing letter-spacing so the line stays centred
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              opacity: titleIn,
              filter: `blur(${blur}px)`,
              backgroundImage: `linear-gradient(105deg, ${C.cream} 0%, ${C.cream} 38%, #ffffff 46%, ${C.gold} 52%, ${C.cream} 60%, ${C.cream} 100%)`,
              backgroundSize: "260% 100%",
              backgroundPosition: `${glint}% 0`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              textShadow: "none",
            }}
          >
            Runway Rebels
          </div>
          <div
            style={{
              marginTop: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 34,
              opacity: presentsIn,
              transform: `translateY(${presentsY}px)`,
              filter: `blur(${(1 - presentsIn) * 8}px)`,
            }}
          >
            <div
              style={{
                width: 120 * presentsIn,
                height: 2,
                background: `linear-gradient(90deg, rgba(255,191,39,0), ${C.gold})`,
              }}
            />
            <div
              style={{
                fontFamily: "Caveat, cursive",
                fontWeight: 700,
                fontSize: 84,
                color: C.gold,
                lineHeight: 1,
              }}
            >
              presents
            </div>
            <div
              style={{
                width: 120 * presentsIn,
                height: 2,
                background: `linear-gradient(270deg, rgba(255,191,39,0), ${C.gold})`,
              }}
            />
          </div>
        </div>
      </AbsoluteFill>

      {/* letterbox bars */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: barH,
          background: "#000",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: barH,
          background: "#000",
        }}
      />
    </AbsoluteFill>
  );
};
