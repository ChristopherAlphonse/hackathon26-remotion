import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  continueRender,
  delayRender,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import "./fonts.css";
import { C } from "./art";
import { FPS, LEAD, SCENE_SEC, TOTAL_FRAMES } from "./timing";
import { S1, S2, S3, S4, S5, S6, S7, S8, S9 } from "./scenes1";
import { S10, S11, S12, S13, S14, S15, S16, S17 } from "./scenes2";

export const TWO_CLOCKS_FRAMES = TOTAL_FRAMES;
export const TWO_CLOCKS_FPS = FPS;

const SCENES: React.FC[] = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16, S17];

// whole-frame start/length for each scene, rounded so there are no gaps or overlaps
const FRAMES = (() => {
  let acc = 0;
  return SCENE_SEC.map((s, i) => {
    const from = Math.round(acc * FPS);
    acc += s;
    const to = i === SCENE_SEC.length - 1 ? TOTAL_FRAMES : Math.round(acc * FPS);
    return { from, len: to - from };
  });
})();

const FadeShell: React.FC<{ len: number; children: React.ReactNode }> = ({ len, children }) => {
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
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)" }} />
    <svg width={1920} height={1080} style={{ position: "absolute", mixBlendMode: "soft-light", opacity: 0.35, pointerEvents: "none" }}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency={0.9} numOctaves={2} seed={7} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  </>
);

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
    <AbsoluteFill style={{ backgroundColor: C.navy }}>
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${C.navy} 0%, #0d1830 100%)` }} />
      {SCENES.map((Scene, i) => (
        <Sequence key={i} from={FRAMES[i].from} durationInFrames={FRAMES[i].len}>
          <FadeShell len={FRAMES[i].len}>
            <Scene />
          </FadeShell>
          <Sequence from={Math.round(LEAD * FPS)}>
            <Audio src={staticFile(`twoclocks/n${i + 1}.wav`)} />
          </Sequence>
        </Sequence>
      ))}
      <Grain />
    </AbsoluteFill>
  );
};
