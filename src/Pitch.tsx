import React from "react";
import {
  AbsoluteFill,
  Freeze,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import "./fonts.css";

// 3:00 showcase of presentation/presentation-script.md, narrated with footage of the real
// Swoice app UI (public/ui/hero.mp4: a recorded run of the hero flight WN1628 against the
// local stack). Every cue is in seconds from the start and mirrors the script's timing table.
export const PITCH_FPS = 24;
export const PITCH_DURATION = 180 * PITCH_FPS;

const sec = (s: number) => Math.round(s * PITCH_FPS);

const NAVY = "#0b1b3a";
const PANEL = "#13264f";
const GOLD = "#ffb81c";
const MUTED = "#a9b8d4";

// ---------- shared pieces ----------

const Fade: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - sec(delay), fps, config: { damping: 200 } });
  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)`,
      }}
    >
      {children}
    </div>
  );
};

const Label: React.FC<{ n: number; title: string }> = ({ n, title }) => (
  <div
    style={{
      position: "absolute",
      top: 56,
      left: 100,
      fontSize: 32,
      fontWeight: 700,
      color: MUTED,
      letterSpacing: 2,
      textTransform: "uppercase",
    }}
  >
    {n} · {title}
  </div>
);

// ---------- app footage ----------

type Crop = { x: number; y: number; w: number; h: number };
const FULL: Crop = { x: 0, y: 0, w: 1920, h: 1080 };

// Source regions of hero.mp4 (1920x1080) worth zooming into.
const CROP = {
  portal: { x: 20, y: 340, w: 960, h: 300 }, // WN1404 + WN1628 rows, before
  portalAfter: { x: 20, y: 450, w: 960, h: 270 }, // WN1628 row, after approval
  heard: { x: 480, y: 140, w: 960, h: 600 }, // transcript + 4 pipeline stages
  check: { x: 480, y: 560, w: 960, h: 420 }, // owning system + voice vs record
  approval: { x: 480, y: 380, w: 960, h: 600 }, // held for a human, approve, ripple
  hud: { x: 560, y: 0, w: 480, h: 300 }, // "35 min detected early" card
  source: { x: 10, y: 100, w: 480, h: 300 }, // Staged / Live Amadeus switch
  panels: { x: 1085, y: 0, w: 640, h: 400 }, // voice card + transcript
};

// Times in hero.mp4 (seconds) where each state is on screen.
const SRC = {
  portalBefore: 3,
  twinLoad: 7,
  heroArrives: 10,
  heard: 24,
  approval: 33,
  approved: 38.5,
  twinAfter: 47,
  portalAfter: 54,
};

const WIN_W = 1040;
const WIN_X = 780;

/**
 * A window onto the recorded app. `play` seconds of footage run at 1x from `at`, then the
 * last frame holds; `play=0` holds one frame. `zoomTo` drifts the crop over the segment.
 */
const Footage: React.FC<{
  at: number;
  crop: Crop;
  title: string;
  caption?: string;
  play?: number;
  zoomTo?: Crop;
  top?: number;
}> = ({ at, crop, title, caption, play = 0, zoomTo, top = 190 }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const p = zoomTo ? interpolate(frame, [0, durationInFrames], [0, 1]) : 0;
  const c = zoomTo
    ? {
        x: interpolate(p, [0, 1], [crop.x, zoomTo.x]),
        y: interpolate(p, [0, 1], [crop.y, zoomTo.y]),
        w: interpolate(p, [0, 1], [crop.w, zoomTo.w]),
        h: interpolate(p, [0, 1], [crop.h, zoomTo.h]),
      }
    : crop;
  const s = WIN_W / c.w;
  const h = c.h * s;
  const enter = spring({ frame, fps, config: { damping: 200 } });
  return (
    <div
      style={{
        position: "absolute",
        left: WIN_X,
        top,
        width: WIN_W,
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [24, 0])}px)`,
      }}
    >
      <div
        style={{
          background: PANEL,
          borderRadius: "16px 16px 0 0",
          padding: "10px 18px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontFamily: "Inter",
          fontSize: 24,
          fontWeight: 700,
          color: MUTED,
        }}
      >
        <span style={{ display: "flex", gap: 8 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((col) => (
            <i
              key={col}
              style={{ width: 14, height: 14, borderRadius: 7, background: col }}
            />
          ))}
        </span>
        {title}
      </div>
      <div
        style={{
          width: WIN_W,
          height: h,
          overflow: "hidden",
          position: "relative",
          background: "#050d1f",
          border: `3px solid ${PANEL}`,
          borderTop: "none",
          borderRadius: "0 0 16px 16px",
        }}
      >
        <Freeze frame={Math.min(frame, sec(play))}>
          <OffthreadVideo
            src={staticFile("ui/hero.mp4")}
            startFrom={sec(at)}
            muted
            style={{
              position: "absolute",
              left: -c.x * s,
              top: -c.y * s,
              width: 1920 * s,
              height: 1080 * s,
            }}
          />
        </Freeze>
      </div>
      {caption ? (
        <div
          style={{
            marginTop: 24,
            fontFamily: "Inter",
            fontSize: 34,
            fontWeight: 700,
            lineHeight: 1.3,
            color: GOLD,
          }}
        >
          {caption}
        </div>
      ) : null}
    </div>
  );
};

// ---------- parts 1 and 2: the skit, beside the app ----------

type Who = "PILOT" | "FLIGHT OPS" | "HUMAN" | "STAGE";

const WHO_COLOR: Record<Who, string> = {
  PILOT: "#5bc0ff",
  "FLIGHT OPS": GOLD,
  HUMAN: "#7ee0a1",
  STAGE: MUTED,
};

type Cue = { at: number; dur: number; who: Who; text: string; note?: string };

// The PILOT line is the transcript of the clip the app decodes (clip_hyd_01).
const CALL =
  "Ground, WN1628, we have a hydraulic system two caution on the preflight, maintenance is walking out to us now, call it a thirty five minute delay before we can push.";

const SKIT: Cue[] = [
  // Part 1: the problem (0:00 to 0:40)
  { at: 3, dur: 12, who: "PILOT", note: "on the radio", text: CALL },
  { at: 15.5, dur: 4, who: "FLIGHT OPS", text: "WN1628 is on time. Everything is fine." },
  { at: 20, dur: 3, who: "PILOT", text: "I said hydraulic." },
  { at: 23.5, dur: 4, who: "FLIGHT OPS", text: "Nobody has typed that in yet." },
  { at: 28, dur: 4.5, who: "HUMAN", text: "Has anyone told crew? Connections? The gate?" },
  { at: 33, dur: 3, who: "FLIGHT OPS", text: "Nobody has typed that in yet." },
  { at: 36, dur: 4, who: "HUMAN", text: "The ramp always knows before the system does. That gap is the whole problem." },
  // Part 2: the fix (0:40 to 1:15)
  { at: 40, dur: 3, who: "STAGE", text: "Same call. This time, SWOICE is listening." },
  { at: 43, dur: 12, who: "PILOT", note: "on the radio", text: CALL },
  { at: 55, dur: 5, who: "FLIGHT OPS", text: "Heard it. I say on time. The voice says delayed. We disagree." },
  { at: 60, dur: 5, who: "HUMAN", text: "Do not overwrite anything. The voice is a witness, not a boss." },
  { at: 65, dur: 8, who: "FLIGHT OPS", text: "Proposal: thirty-five minute delay, new departure 16:15. Evidence: ‘call it a thirty five minute delay.’" },
  { at: 73, dur: 2, who: "HUMAN", text: "Approved." },
];

const CueView: React.FC<{ cue: Cue }> = ({ cue }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = sec(cue.dur);
  const enter = spring({ frame, fps, config: { damping: 200 } });
  const exit = interpolate(frame, [dur - 6, dur], [1, 0], {
    extrapolateLeft: "clamp",
  });
  const color = WHO_COLOR[cue.who];
  const isStage = cue.who === "STAGE";
  const long = cue.text.length > 110;
  return (
    <div
      style={{
        position: "absolute",
        left: 100,
        top: 200,
        width: 640,
        opacity: Math.min(enter, exit),
        transform: `translateY(${interpolate(enter, [0, 1], [24, 0])}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 22,
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          fontSize: 32,
          fontWeight: 900,
          letterSpacing: 3,
          color,
          textTransform: "uppercase",
        }}
      >
        {isStage ? "Scene" : cue.who}
        {cue.note ? (
          <span style={{ color: MUTED, fontWeight: 500 }}> · {cue.note}</span>
        ) : null}
      </div>
      <div
        style={{
          fontSize: long ? 36 : 50,
          fontWeight: isStage ? 500 : 700,
          fontStyle: isStage ? "italic" : "normal",
          lineHeight: 1.25,
          color: isStage ? MUTED : "white",
          borderLeft: `10px solid ${color}`,
          paddingLeft: 28,
        }}
      >
        {isStage ? cue.text : `“${cue.text}”`}
      </div>
    </div>
  );
};

const TWIN = "Swoice twin · Dallas Love Field (live)";
const PORTAL = "Flight Operations portal · system of record";
const DETAIL = "WN1628 · conversation (full process)";

// Footage for each stretch of the skit: [from, to] in video seconds, plus what to show.
const SkitFootage: React.FC = () => (
  <>
    <Sequence durationInFrames={sec(40)}>
      <Footage
        at={SRC.portalBefore}
        crop={CROP.portal}
        title={PORTAL}
        caption="WN1628 is ON_TIME. Nobody has typed the delay in yet."
      />
    </Sequence>
    <Sequence from={sec(40)} durationInFrames={sec(3)}>
      <Footage
        at={SRC.twinLoad}
        crop={FULL}
        title={TWIN}
        play={3}
        caption="Swoice listens to the radio."
      />
    </Sequence>
    <Sequence from={sec(43)} durationInFrames={sec(12)}>
      <Footage
        at={SRC.heroArrives}
        crop={FULL}
        title={TWIN}
        play={12}
        caption="The call is decoded and routed. A red arc means a person is needed."
      />
    </Sequence>
    <Sequence from={sec(55)} durationInFrames={sec(5)}>
      <Footage
        at={SRC.heard}
        crop={CROP.check}
        title={DETAIL}
        caption="Voice says DELAYED. The system says ON_TIME. Discrepancy found."
      />
    </Sequence>
    <Sequence from={sec(60)} durationInFrames={sec(5)}>
      <Footage
        at={SRC.approval}
        crop={CROP.approval}
        title={DETAIL}
        caption="Held for a human. Voice never silently overwrites a record."
      />
    </Sequence>
    <Sequence from={sec(65)} durationInFrames={sec(8)}>
      <Footage
        at={SRC.approval}
        crop={CROP.approval}
        zoomTo={{ x: 480, y: 560, w: 960, h: 420 }}
        title={DETAIL}
        caption="Proposal: 35 minutes, HYDRAULIC. Knock-on: crew, customers, gate."
      />
    </Sequence>
    <Sequence from={sec(73)} durationInFrames={sec(2)}>
      <Footage
        at={SRC.approved}
        crop={CROP.approval}
        title={DETAIL}
        caption="A person approves. Committed to FLIGHT_OPS."
      />
    </Sequence>
  </>
);

const Skit: React.FC = () => {
  const frame = useCurrentFrame();
  const part = frame < sec(40) ? { n: 1, t: "The problem" } : { n: 2, t: "The fix" };
  const bg = interpolate(frame, [0, sec(2.2), sec(3)], [1, 1, 0], {
    extrapolateRight: "clamp",
  });
  const text = interpolate(frame, [0, sec(0.8)], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: NAVY, fontFamily: "Inter", color: "white" }}>
      <Label n={part.n} title={part.t} />
      <SkitFootage />
      {SKIT.map((c) => (
        <Sequence key={c.at} from={sec(c.at)} durationInFrames={sec(c.dur)}>
          <CueView cue={c} />
        </Sequence>
      ))}
      <AbsoluteFill
        style={{
          backgroundColor: NAVY,
          justifyContent: "center",
          alignItems: "center",
          opacity: bg,
          pointerEvents: "none",
        }}
      >
        <div style={{ opacity: text, fontSize: 150, fontWeight: 900 }}>
          The ramp <span style={{ color: GOLD }}>knows.</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------- part 3: how it works (1:15 to 2:00) ----------

const STEPS = [
  {
    name: "Hear it",
    at: 2,
    end: 12,
    body: "Transcribe the radio call into a structured signal.",
    detail: "WN1628 · cause HYDRAULIC · 35 minutes",
  },
  {
    name: "Check it",
    at: 12,
    end: 23,
    body: "Compare the signal with what the flight system believes.",
    detail: "System: ON_TIME · Voice: DELAYED · discrepancy",
  },
  {
    name: "Propose it",
    at: 23,
    end: 34,
    body: "Never overwrite the record. Open a proposal for a person.",
    detail: "Evidence · before and after · approve or reject",
  },
];

const StepCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        left: 100,
        top: 230,
        width: 640,
        display: "flex",
        flexDirection: "column",
        gap: 22,
        fontFamily: "Inter",
        color: "white",
      }}
    >
      {STEPS.map((s, i) => {
        const active = frame >= sec(s.at) && frame < sec(s.end);
        const shown = spring({ frame: frame - sec(s.at), fps, config: { damping: 200 } });
        return (
          <div
            key={s.name}
            style={{
              background: PANEL,
              borderRadius: 20,
              padding: "26px 34px",
              border: `5px solid ${active ? GOLD : "transparent"}`,
              opacity: interpolate(shown, [0, 1], [0.15, active ? 1 : 0.55]),
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 44, fontWeight: 900, color: active ? GOLD : "white" }}>
              {i + 1}. {s.name}
            </div>
            <div style={{ fontSize: 30, fontWeight: 500, lineHeight: 1.3 }}>{s.body}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: MUTED }}>{s.detail}</div>
          </div>
        );
      })}
    </div>
  );
};

const HowItWorks: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: NAVY, fontFamily: "Inter", color: "white" }}>
    <Label n={3} title="How it works" />
    <div
      style={{
        position: "absolute",
        left: 100,
        top: 100,
        fontSize: 84,
        fontWeight: 900,
        color: GOLD,
      }}
    >
      Hear → Check → Propose
    </div>
    <StepCards />
    <Sequence from={sec(2)} durationInFrames={sec(10)}>
      <Footage
        at={SRC.heard}
        crop={CROP.heard}
        title={DETAIL}
        top={240}
        caption="Hear: the call becomes text, then a flight, a cause, and a delay."
      />
    </Sequence>
    <Sequence from={sec(12)} durationInFrames={sec(11)}>
      <Footage
        at={SRC.heard}
        crop={CROP.check}
        title={DETAIL}
        top={240}
        caption="Check: voice and system disagree on status, ETD, and reason."
      />
    </Sequence>
    <Sequence from={sec(23)} durationInFrames={sec(11)}>
      <Footage
        at={SRC.approval}
        crop={CROP.approval}
        title={DETAIL}
        top={240}
        caption="Propose: a person approves or rejects. Nothing commits before that."
      />
    </Sequence>
    <Sequence from={sec(34)} durationInFrames={sec(11)}>
      <Footage
        at={SRC.portalAfter}
        crop={CROP.portalAfter}
        title={PORTAL}
        top={240}
        caption="Voice is an untrusted sensor. Fast, useful, never in charge."
      />
    </Sequence>
  </AbsoluteFill>
);

// ---------- part 4: what is real (2:00 to 2:35) ----------

const Fact: React.FC<{ big: string; text: string; delay: number; gold?: boolean }> = ({
  big,
  text,
  delay,
  gold,
}) => (
  <Fade delay={delay}>
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: 80, fontWeight: 900, color: gold ? GOLD : "white" }}>
        {big}
      </div>
      <div style={{ fontSize: 30, fontWeight: 500, color: MUTED, lineHeight: 1.3 }}>
        {text}
      </div>
    </div>
  </Fade>
);

const WhatIsReal: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: NAVY, fontFamily: "Inter", color: "white" }}>
    <Label n={4} title="What is real" />
    <div
      style={{
        position: "absolute",
        left: 100,
        top: 170,
        width: 640,
        display: "flex",
        flexDirection: "column",
        gap: 36,
      }}
    >
      <Fact
        gold
        big="35 min"
        delay={0.5}
        text="of delay the system did not have, found from one radio call."
      />
      <Fact
        big="Staged data"
        delay={11}
        text="This run uses staged flights and seeded records. Live Amadeus is a read-only switch. Ramp, crew, and connection data are labeled placeholders."
      />
      <Fact
        big="Next"
        delay={22}
        text="No savings figure yet. A one-station pilot, with a person approving every change."
      />
    </div>
    <Sequence durationInFrames={sec(11)}>
      <Footage
        at={SRC.twinAfter}
        crop={CROP.hud}
        title={TWIN}
        top={260}
        caption="The twin shows it live: 35 min detected early."
      />
    </Sequence>
    <Sequence from={sec(11)} durationInFrames={sec(11)}>
      <Footage
        at={SRC.twinAfter}
        crop={CROP.source}
        title={TWIN}
        top={260}
        caption="Staged data by default. Live Amadeus is a switch."
      />
    </Sequence>
    <Sequence from={sec(22)} durationInFrames={sec(13)}>
      <Footage
        at={SRC.portalAfter}
        crop={CROP.portalAfter}
        title={PORTAL}
        top={260}
        caption="Approved by OPS_CONTROLLER, with the evidence attached."
      />
    </Sequence>
  </AbsoluteFill>
);

// ---------- part 5: close (2:35 to 3:00) ----------

const Close: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: NAVY, fontFamily: "Inter", color: "white" }}>
    <div
      style={{
        position: "absolute",
        left: 100,
        top: 190,
        width: 640,
        display: "flex",
        flexDirection: "column",
        gap: 34,
      }}
    >
      <Fade>
        <div style={{ fontSize: 68, fontWeight: 900, lineHeight: 1.1 }}>
          The ramp already knows.
        </div>
      </Fade>
      <Fade delay={4}>
        <div style={{ fontSize: 68, fontWeight: 900, lineHeight: 1.1 }}>
          The radio call already happened.
        </div>
      </Fade>
      <Fade delay={9}>
        <div style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.1, color: GOLD }}>
          Voice in. Checked proposal out. A person decides.
        </div>
      </Fade>
      <Fade delay={18}>
        <div style={{ fontSize: 44, fontWeight: 500, color: MUTED }}>
          Thank you. Questions?
        </div>
      </Fade>
    </div>
    <Footage
      at={SRC.twinAfter}
      crop={FULL}
      title={TWIN}
      top={250}
      play={0}
      caption="WN1628: heard, checked, proposed, approved."
    />
  </AbsoluteFill>
);

export const Pitch: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: NAVY }}>
    <Sequence durationInFrames={sec(75)}>
      <Skit />
    </Sequence>
    <Sequence from={sec(75)} durationInFrames={sec(45)}>
      <HowItWorks />
    </Sequence>
    <Sequence from={sec(120)} durationInFrames={sec(35)}>
      <WhatIsReal />
    </Sequence>
    <Sequence from={sec(155)} durationInFrames={sec(25)}>
      <Close />
    </Sequence>
  </AbsoluteFill>
);
