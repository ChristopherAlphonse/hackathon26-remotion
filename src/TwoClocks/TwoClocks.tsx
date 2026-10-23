import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  continueRender,
  delayRender,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import "./fonts.css";
import { C } from "./art";
import {
  CREDITS_SEC,
  FPS,
  INTRO_SEC,
  LEAD,
  SCENE_SEC,
  TOTAL_FRAMES,
  VOICE_RATE,
} from "./timing";
import { Intro } from "./Intro";
import { Music } from "./Music";
import { S1, S2, S3, S4, S5, S6, S7, S8, S9 } from "./scenes1";
import { S10, S11, S12, S13, S14, S15, S16, S17 } from "./scenes2";

const CREDITS_FRAMES = Math.round(CREDITS_SEC * FPS); // sized so the music's ending lands on the end of the video
const INTRO_FRAMES = Math.round(INTRO_SEC * FPS);
export const TWO_CLOCKS_FRAMES = INTRO_FRAMES + TOTAL_FRAMES + CREDITS_FRAMES;
export const TWO_CLOCKS_FPS = FPS;

const SCENES: React.FC[] = [
  S1,
  S2,
  S3,
  S4,
  S5,
  S6,
  S7,
  S8,
  S9,
  S10,
  S11,
  S12,
  S13,
  S14,
  S15,
  S16,
  S17,
];

// whole-frame start/length for each scene, rounded so there are no gaps or overlaps
const FRAMES = (() => {
  let acc = 0;
  return SCENE_SEC.map((s, i) => {
    const from = Math.round(acc * FPS);
    acc += s;
    const to =
      i === SCENE_SEC.length - 1 ? TOTAL_FRAMES : Math.round(acc * FPS);
    return { from, len: to - from };
  });
})();

const FadeShell: React.FC<{ len: number; children: React.ReactNode }> = ({
  len,
  children,
}) => {
  const f = useCurrentFrame();
  const fade = 0.4 * FPS;
  const o = interpolate(f, [0, fade, len - fade, len], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

const Grain: React.FC = () => (
  <>
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)",
      }}
    />
    <svg
      width={1920}
      height={1080}
      style={{
        position: "absolute",
        mixBlendMode: "soft-light",
        opacity: 0.35,
        pointerEvents: "none",
      }}
    >
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency={0.9}
          numOctaves={2}
          seed={7}
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  </>
);

const NAMES = [
  "Abhinav Annabathula",
  "Christopher Alphonse",
  "Ikechukwu Anyanwu",
  "Jasmine Lorenz",
  "Sam Roberts",
];

// Southwest plane glides in from the bottom right, settles, then hovers
const Plane: React.FC = () => {
  const f = useCurrentFrame();
  const p = spring({
    frame: f - 1.0 * FPS,
    fps: FPS,
    config: { damping: 20, stiffness: 55, mass: 1.2 },
  });
  const hover = f > 2.5 * FPS ? Math.sin((f - 2.5 * FPS) / 30) * 6 : 0;
  const o = interpolate(f, [1.0 * FPS, 1.6 * FPS], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <Img
      src={staticFile("plane.png")}
      style={{
        position: "absolute",
        right: 60,
        bottom: 70,
        width: 640,
        opacity: o,
        transform: `translate(${(1 - p) * 900}px, ${(1 - p) * 140 + hover}px) rotate(${(1 - p) * -8}deg)`,
        filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.55))",
      }}
    />
  );
};

const Credits: React.FC = () => {
  const f = useCurrentFrame();
  const fade = (from: number, dur = 0.8) =>
    interpolate(f, [from * FPS, (from + dur) * FPS], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  const out = interpolate(
    f,
    [CREDITS_FRAMES - 0.8 * FPS, CREDITS_FRAMES],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: out,
        color: C.cream,
      }}
    >
      <div
        style={{
          fontFamily: "Caveat, cursive",
          fontWeight: 700,
          fontSize: 96,
          color: C.gold,
          opacity: fade(0.3),
        }}
      >
        Swoice
      </div>
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          fontSize: 28,
          letterSpacing: 8,
          paddingLeft: 8,
          textTransform: "uppercase",
          color: C.muted,
          margin: "8px 0 48px",
          opacity: fade(0.6),
        }}
      >
        Built by
      </div>
      <Plane />
      {NAMES.map((n, i) => (
        <div
          key={n}
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 900,
            fontSize: 60,
            lineHeight: 1.4,
            opacity: fade(1.1 + i * 0.45),
          }}
        >
          {n}
        </div>
      ))}
    </AbsoluteFill>
  );
};

export const TwoClocks: React.FC = () => {
  const [handle] = useState(() => delayRender("fonts"));
  useEffect(() => {
    Promise.all([
      document.fonts.load("700 40px Caveat"),
      document.fonts.load("900 40px Inter"),
      document.fonts.load("500 40px Inter"),
    ])
      .catch(() => undefined)
      .then(() => continueRender(handle));
  }, [handle]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.navy,
        translate: "-2px 0px"
      }}
    >
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${C.navy} 0%, #0d1830 100%)`,
        }}
      />
      <Sequence from={0} durationInFrames={INTRO_FRAMES}>
        <Intro />
      </Sequence>
      {/* the film proper starts after the intro; scene, voice, music and credits timings are all relative to this */}
      <Sequence from={INTRO_FRAMES}>
        {SCENES.map((Scene, i) => (
          <Sequence
            key={i}
            from={FRAMES[i].from}
            durationInFrames={FRAMES[i].len}
          >
            <FadeShell len={FRAMES[i].len}>
              <Scene />
            </FadeShell>
            <Sequence from={Math.round(LEAD * FPS)}>
              <Audio
                src={staticFile(`twoclocks/n${i + 1}.wav`)}
                playbackRate={VOICE_RATE}
              />
            </Sequence>
          </Sequence>
        ))}
        <Music />
        <Sequence from={TOTAL_FRAMES} durationInFrames={CREDITS_FRAMES}>
          <Credits />
        </Sequence>
      </Sequence>
      <Grain />
    </AbsoluteFill>
  );
};
