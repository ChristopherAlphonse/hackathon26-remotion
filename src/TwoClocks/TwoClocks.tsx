import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  continueRender,
  delayRender,
  Easing,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import "./fonts.css";
import { C } from "./art";
import {
  ACT1,
  DEMO_FRAMES,
  DEMO_SRC,
  DEMO_START,
  FPS,
  INTRO_SEC,
  LEAD,
  SCENE_SEC,
  SCENE_START,
  TOTAL_FRAMES,
  VOICE_RATE,
  X_IN,
  X_OUT,
} from "./timing";
import { Intro } from "./Intro";
import { Music } from "./Music";
import { S1, S2, S3, S4, S5, S7, S8, S9 } from "./scenes1";
import { S11, S12, S13, S14, S16 } from "./scenes2";
import { S17, S18, S19 } from "./scenes3";

const INTRO_FRAMES = Math.round(INTRO_SEC * FPS);
export const TWO_CLOCKS_FRAMES = INTRO_FRAMES + TOTAL_FRAMES;
export const TWO_CLOCKS_FPS = FPS;

const SCENES: React.FC[] = [
  S1,
  S2,
  S3,
  S4,
  S5,
  S7,
  S8,
  S9,
  S11,
  S12,
  S13,
  S14,
  S16,
  S17, // after the demo: the value
  S18, // the rollout plan
  S19, // the conclusion
];

// whole-frame start/length for each scene (relative to the end of the intro), rounded so there are no gaps or overlaps inside an act
const FRAMES = SCENE_SEC.map((sec, i) => {
  const from = Math.round(SCENE_START[i] * FPS);
  const to = i === SCENE_SEC.length - 1 ? TOTAL_FRAMES : Math.round((SCENE_START[i] + sec) * FPS);
  return { from, len: to - from };
});
const DEMO_FROM = Math.round(DEMO_START * FPS);

const FadeShell: React.FC<{ len: number; fadeIn?: number; fadeOut?: number; children: React.ReactNode }> = ({
  len,
  fadeIn = 0.4 * FPS,
  fadeOut = 0.4 * FPS,
  children,
}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, fadeIn, len - fadeOut, len], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

/** The screen recording (video1): it grows out of the last scene, plays with its own sound, and melts into the first closing scene. */
const Demo: React.FC = () => {
  const f = useCurrentFrame();
  const inF = X_IN * FPS;
  const outF = X_OUT * FPS;
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const o = interpolate(f, [0, inF, DEMO_FRAMES - outF, DEMO_FRAMES], [0, 1, 1, 0], clamp);
  const grow = interpolate(f, [0, inF], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const scale = 0.88 + 0.12 * grow;
  const radius = 40 * (1 - grow);
  return (
    <AbsoluteFill style={{ opacity: o, alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: 1888,
          height: 1080,
          transform: `scale(${scale})`,
          borderRadius: radius,
          overflow: "hidden",
          boxShadow: grow < 1 ? `0 0 0 ${6 * (1 - grow)}px ${C.gold}` : undefined,
        }}
      >
        <OffthreadVideo
          src={staticFile(DEMO_SRC)}
          style={{ width: 1888, height: 1080 }}
          volume={(fr) => interpolate(fr, [0, inF, DEMO_FRAMES - outF, DEMO_FRAMES], [0, 1, 1, 0], clamp)}
        />
      </div>
    </AbsoluteFill>
  );
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

/** The film grain and vignette are for the drawn scenes: they come off while the screen recording plays. */
const GrainGate: React.FC = () => {
  const f = useCurrentFrame();
  const a = INTRO_FRAMES + DEMO_FROM;
  const present = interpolate(f, [a, a + X_IN * FPS, a + DEMO_FRAMES - X_OUT * FPS, a + DEMO_FRAMES], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return present >= 1 ? null : (
    <AbsoluteFill style={{ opacity: 1 - present }}>
      <Grain />
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
        translate: "-1px 0px",
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
            <FadeShell
              len={FRAMES[i].len}
              fadeOut={i === ACT1 - 1 ? X_IN * FPS : undefined}
              fadeIn={i === ACT1 ? X_OUT * FPS : undefined}
            >
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
        <Sequence from={DEMO_FROM} durationInFrames={DEMO_FRAMES}>
          <Demo />
        </Sequence>
        <Music />
      </Sequence>
      <GrainGate />
    </AbsoluteFill>
  );
};
