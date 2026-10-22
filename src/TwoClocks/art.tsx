import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FPS } from "./timing";

// ---------- palette (presentation/educational-video-package.md, section F) ----------
export const C = {
  navy: "#0a1124",
  panel: "#0f1c36",
  blue: "#304cb2",
  blueDark: "#223a8a",
  gold: "#ffbf27",
  cream: "#f3ead8",
  teal: "#38bdf8",
  red: "#c21b17",
  green: "#22c55e",
  ink: "#08101f",
  muted: "#8fa3c4",
  skinA: "#c98a5b",
  skinB: "#8d5a3b",
  skinC: "#efc8a0",
};

// ---------- time helpers ----------
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** Eased 0..1 progress that starts at `at` seconds and lasts `dur` seconds. */
export const prog = (t: number, at: number, dur: number) => ease(clamp01((t - at) / dur));
/** Linear 0..1 progress. */
export const lin = (t: number, at: number, dur: number) => clamp01((t - at) / dur);
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;
/** Local scene time in seconds. */
export const useT = () => useCurrentFrame() / FPS;

// ---------- the drawing surface ----------
// One SVG for the illustration (wobbled like a hand-drawn "boiling line") and one crisp SVG for
// labels, so text stays readable.
export const Art: React.FC<{ children: React.ReactNode; overlay?: React.ReactNode }> = ({
  children,
  overlay,
}) => {
  const f = useCurrentFrame();
  const seed = (Math.floor(f / 3) % 5) + 1;
  return (
    <AbsoluteFill>
      <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves={2} seed={seed} result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale={4.5} xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={14} result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0a1124" />
            <stop offset="0.62" stopColor="#14264f" />
            <stop offset="0.86" stopColor="#3a3f73" />
            <stop offset="1" stopColor="#b9772b" />
          </linearGradient>
        </defs>
        <g filter="url(#rough)">{children}</g>
      </svg>
      {overlay ? (
        <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: "absolute" }}>
          {overlay}
        </svg>
      ) : null}
    </AbsoluteFill>
  );
};

// ---------- text ----------
export const Hand: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  opacity?: number;
  rotate?: number;
  weight?: number;
}> = ({ x, y, children, size = 56, fill = C.cream, anchor = "middle", opacity = 1, rotate = 0, weight = 700 }) => (
  <text
    x={x}
    y={y}
    fontFamily="Caveat, cursive"
    fontWeight={weight}
    fontSize={size}
    fill={fill}
    textAnchor={anchor}
    opacity={opacity}
    transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
    style={{ paintOrder: "stroke", stroke: C.navy, strokeWidth: size * 0.12, strokeLinejoin: "round" }}
  >
    {children}
  </text>
);

export const Label: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  opacity?: number;
  weight?: number;
  spacing?: number;
}> = ({ x, y, children, size = 30, fill = C.muted, anchor = "middle", opacity = 1, weight = 700, spacing = 2 }) => (
  <text
    x={x}
    y={y}
    fontFamily="Inter, sans-serif"
    fontWeight={weight}
    fontSize={size}
    fill={fill}
    textAnchor={anchor}
    opacity={opacity}
    letterSpacing={spacing}
  >
    {children}
  </text>
);

// ---------- the Voice ribbon ----------
/** A teal ribbon of sound. `p` is how far the head has travelled (0..1); `len` is the visible tail. */
export const Ribbon: React.FC<{ d: string; p: number; len?: number; w?: number; opacity?: number }> = ({
  d,
  p,
  len = 1,
  w = 16,
  opacity = 1,
}) => {
  const start = Math.max(0, p - len);
  const dash = `${Math.max(0.0001, p - start)} 2`;
  const off = -start;
  return (
    <g opacity={opacity} strokeLinecap="round" fill="none">
      <path d={d} pathLength={1} stroke={C.ink} strokeWidth={w + 8} strokeDasharray={dash} strokeDashoffset={off} />
      <path d={d} pathLength={1} stroke={C.teal} strokeWidth={w} strokeDasharray={dash} strokeDashoffset={off} />
      <path d={d} pathLength={1} stroke="#bdeaff" strokeWidth={w * 0.3} strokeDasharray={dash} strokeDashoffset={off} />
    </g>
  );
};

// ---------- clocks ----------
export const Clock: React.FC<{
  cx: number;
  cy: number;
  r: number;
  rim: string;
  minDeg: number;
  hourDeg: number;
  scale?: number;
}> = ({ cx, cy, r, rim, minDeg, hourDeg, scale = 1 }) => (
  <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
    <circle r={r + 6} fill={C.ink} />
    <circle r={r} fill={C.cream} stroke={rim} strokeWidth={18} />
    {Array.from({ length: 12 }).map((_, i) => (
      <line
        key={i}
        x1={0}
        y1={-r + 28}
        x2={0}
        y2={-r + (i % 3 === 0 ? 62 : 46)}
        stroke={C.ink}
        strokeWidth={i % 3 === 0 ? 9 : 5}
        strokeLinecap="round"
        transform={`rotate(${i * 30})`}
      />
    ))}
    <line x1={0} y1={0} x2={0} y2={-r * 0.5} stroke={C.ink} strokeWidth={16} strokeLinecap="round" transform={`rotate(${hourDeg})`} />
    <line x1={0} y1={0} x2={0} y2={-r * 0.78} stroke={C.ink} strokeWidth={10} strokeLinecap="round" transform={`rotate(${minDeg})`} />
    <circle r={14} fill={C.gold} stroke={C.ink} strokeWidth={5} />
  </g>
);
/** Clock-hand angles for a time (hours, minutes). */
export const handsFor = (h: number, m: number) => ({ hourDeg: ((h % 12) + m / 60) * 30, minDeg: m * 6 });

// ---------- the Board (departure-board character) ----------
export const BoardChar: React.FC<{
  x: number;
  y: number;
  s?: number;
  status?: string;
  delayed?: number; // 0 = calm, 1 = delayed
  flip?: number; // 0..1 flip animation of the status flap
  mood?: "smile" | "relieved";
  flight?: string;
}> = ({ x, y, s = 1, status = "ON TIME", delayed = 0, flip = 1, mood = "smile", flight = "WN1628" }) => {
  const scaleY = Math.abs(Math.cos(flip * Math.PI)) < 0.02 ? 0.02 : Math.abs(Math.cos(flip * Math.PI));
  const flapFill = delayed > 0.5 ? C.red : C.cream;
  const flapInk = delayed > 0.5 ? C.cream : C.ink;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-150} y={250} width={26} height={110} fill={C.ink} />
      <rect x={124} y={250} width={26} height={110} fill={C.ink} />
      <rect x={-210} y={-170} width={420} height={430} rx={30} fill={C.blue} stroke={C.ink} strokeWidth={8} />
      {/* face */}
      <circle cx={-60} cy={-95} r={26} fill={C.cream} stroke={C.ink} strokeWidth={5} />
      <circle cx={60} cy={-95} r={26} fill={C.cream} stroke={C.ink} strokeWidth={5} />
      <circle cx={-54} cy={-92} r={11} fill={C.ink} />
      <circle cx={66} cy={-92} r={11} fill={C.ink} />
      <path
        d={mood === "smile" ? "M-70 -42 Q0 10 70 -42" : "M-60 -40 Q0 -2 60 -40"}
        fill="none"
        stroke={C.ink}
        strokeWidth={8}
        strokeLinecap="round"
      />
      {mood === "relieved" ? (
        <path d="M-100 -150 Q-60 -170 -30 -148 M30 -148 Q60 -170 100 -150" fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      ) : null}
      {/* flap panel */}
      <rect x={-180} y={10} width={360} height={220} rx={14} fill={C.ink} />
      <rect x={-160} y={26} width={320} height={80} rx={8} fill={C.cream} />
      <line x1={-160} y1={66} x2={160} y2={66} stroke={C.ink} strokeOpacity={0.25} strokeWidth={3} />
      <text x={0} y={82} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={46} fill={C.ink} letterSpacing={4}>
        {flight}
      </text>
      <g transform={`translate(0 160) scale(1 ${scaleY}) translate(0 -160)`}>
        <rect x={-160} y={124} width={320} height={80} rx={8} fill={flapFill} />
        <text x={0} y={182} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight={900} fontSize={delayed > 0.5 ? 40 : 46} fill={flapInk} letterSpacing={3}>
          {status}
        </text>
      </g>
    </g>
  );
};

// ---------- aircraft (side profile, nose to the right, no logos) ----------
export const Plane: React.FC<{ x: number; y: number; s?: number; windowFill?: string; cockpit?: React.ReactNode }> = ({ x, y, s = 1, windowFill = C.cream, cockpit }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={C.ink} strokeWidth={7} strokeLinejoin="round">
    {/* tail */}
    <path d="M70 70 L30 -70 L120 -70 L210 62 Z" fill={C.red} />
    <path d="M52 8 L38 -44 L84 -44 L118 8 Z" fill={C.gold} stroke="none" />
    <path d="M70 92 L0 84 L0 100 L96 108 Z" fill={C.blueDark} />
    {/* fuselage */}
    <path d="M40 100 Q40 56 130 52 L560 52 Q680 58 712 102 Q680 146 560 150 L130 150 Q40 146 40 100 Z" fill={C.blue} />
    <path d="M70 120 L690 120 L702 128 Q690 142 560 146 L130 146 Q70 142 70 120 Z" fill={C.cream} stroke="none" />
    <path d="M60 108 L704 108 L708 118 L66 118 Z" fill={C.gold} stroke="none" />
    {/* windows */}
    {Array.from({ length: 14 }).map((_, i) => (
      <circle key={i} cx={190 + i * 30} cy={86} r={8} fill={windowFill} strokeWidth={3} />
    ))}
    <clipPath id="cockpitClip">
      <path d="M610 72 Q650 70 676 92 L640 94 Q620 92 610 72 Z" />
    </clipPath>
    <path d="M610 72 Q650 70 676 92 L640 94 Q620 92 610 72 Z" fill={windowFill} strokeWidth={4} />
    {cockpit ? <g clipPath="url(#cockpitClip)">{cockpit}</g> : null}
    {/* wing + engine */}
    <path d="M360 110 L270 220 L350 220 L500 118 Z" fill={C.blueDark} />
    <ellipse cx={430} cy={166} rx={56} ry={26} fill={C.muted} />
    <circle cx={474} cy={166} r={14} fill={C.ink} />
  </g>
);

// ---------- people ----------
export const Bust: React.FC<{
  x: number;
  y: number;
  s?: number;
  skin: string;
  shirt: string;
  kind: "pilot" | "ramp" | "controller" | "plain";
  look?: number; // -1 left, 0 centre, 1 right
  talk?: number; // 0..1 mouth open
}> = ({ x, y, s = 1, skin, shirt, kind, look = 0, talk = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={C.ink} strokeWidth={5} strokeLinejoin="round">
    <path d="M-100 130 Q-100 44 -44 34 L44 34 Q100 44 100 130 Z" fill={shirt} />
    {kind === "ramp" ? (
      <g>
        <path d="M-78 130 L-62 40 L-34 36 L-30 130 Z" fill={C.gold} />
        <path d="M78 130 L62 40 L34 36 L30 130 Z" fill={C.gold} />
        <path d="M-72 100 L-31 100 M31 100 L72 100" stroke={C.cream} strokeWidth={9} />
      </g>
    ) : null}
    {kind === "pilot" ? (
      <g>
        <rect x={-96} y={52} width={34} height={12} fill={C.gold} />
        <rect x={62} y={52} width={34} height={12} fill={C.gold} />
        <path d="M0 40 L0 130" stroke={C.ink} strokeWidth={4} />
      </g>
    ) : null}
    {kind === "controller" ? (
      <g>
        <path d="M-22 36 L0 110 L22 36" fill="none" stroke={C.gold} strokeWidth={7} />
        <rect x={-14} y={106} width={28} height={36} rx={4} fill={C.cream} />
      </g>
    ) : null}
    <rect x={-15} y={8} width={30} height={34} fill={skin} />
    <circle cx={0} cy={-26} r={46} fill={skin} />
    {kind === "pilot" ? (
      <g>
        <path d="M-50 -34 Q0 -104 50 -34 L50 -28 L-50 -28 Z" fill={C.panel} />
        <rect x={-54} y={-34} width={108} height={12} rx={5} fill={C.gold} />
        <path d="M-48 -26 Q-58 -66 0 -72 Q58 -66 48 -26" fill="none" strokeWidth={7} />
        <circle cx={-50} cy={-18} r={13} fill={C.ink} />
        <path d="M-50 -6 Q-46 18 -22 14" fill="none" strokeWidth={5} />
        <circle cx={-22} cy={14} r={6} fill={C.ink} />
      </g>
    ) : null}
    {kind === "ramp" ? (
      <g>
        <path d="M-48 -30 Q0 -92 48 -30 Q30 -52 0 -52 Q-30 -52 -48 -30" fill={C.ink} />
        <path d="M-46 34 Q0 62 46 34" fill="none" stroke={C.ink} strokeWidth={9} />
        <circle cx={-46} cy={34} r={11} fill={C.gold} />
        <circle cx={46} cy={34} r={11} fill={C.gold} />
      </g>
    ) : null}
    {kind === "controller" ? (
      <path d="M-46 -34 Q-40 -86 0 -80 Q44 -86 46 -34 Q24 -58 0 -56 Q-24 -58 -46 -34" fill="#3b2a20" />
    ) : null}
    <circle cx={-16 + look * 6} cy={-28} r={5} fill={C.ink} stroke="none" />
    <circle cx={16 + look * 6} cy={-28} r={5} fill={C.ink} stroke="none" />
    <path
      d={`M-14 -8 Q0 ${4 + talk * 12} 14 -8`}
      fill={talk > 0.4 ? C.ink : "none"}
      strokeWidth={4}
      strokeLinecap="round"
    />
  </g>
);

export const Mug: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={C.ink} strokeWidth={5}>
    <rect x={-24} y={-34} width={48} height={52} rx={6} fill={C.cream} />
    <path d="M24 -22 Q50 -20 24 4" fill="none" strokeWidth={6} />
    <path d="M-10 -48 Q-4 -60 -10 -72 M8 -48 Q14 -60 8 -72" fill="none" stroke={C.muted} strokeWidth={4} strokeLinecap="round" />
  </g>
);

// ---------- paper strip with illegible marks ----------
export const Strip: React.FC<{ x: number; y: number; w?: number; h?: number; lines?: number; fill?: string; seed?: number }> = ({
  x,
  y,
  w = 760,
  h = 130,
  lines = 3,
  fill = C.cream,
  seed = 1,
}) => (
  <g transform={`translate(${x} ${y})`} stroke={C.ink} strokeWidth={5} strokeLinejoin="round">
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={10} fill={fill} />
    {Array.from({ length: lines }).map((_, i) => {
      const yy = -h / 2 + (h / (lines + 1)) * (i + 1);
      let d = `M${-w / 2 + 28} ${yy}`;
      const n = 20 + ((i + seed) % 4);
      for (let k = 1; k <= n; k++) {
        const xx = -w / 2 + 28 + ((w - 56) / n) * k;
        const wob = ((k * 7 + i * 3 + seed) % 5) - 2;
        d += ` L${xx - 4} ${yy + wob * 2} L${xx} ${yy - wob}`;
      }
      return <path key={i} d={d} fill="none" stroke={C.ink} strokeOpacity={0.55} strokeWidth={4} strokeLinecap="round" />;
    })}
  </g>
);

// ---------- small icons used in several scenes ----------
export const CrewBadge: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={C.ink} strokeWidth={5}>
    <rect x={-6} y={-70} width={12} height={30} fill={C.muted} />
    <rect x={-52} y={-44} width={104} height={130} rx={12} fill={C.cream} />
    <circle cx={0} cy={0} r={24} fill={C.skinB} />
    <path d="M-34 66 Q0 24 34 66 Z" fill={C.blue} />
    <rect x={-34} y={72} width={68} height={8} fill={C.gold} stroke="none" />
  </g>
);
export const BoardingPass: React.FC<{ x: number; y: number; s?: number; rot?: number }> = ({ x, y, s = 1, rot = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} stroke={C.ink} strokeWidth={5}>
    <rect x={-84} y={-44} width={168} height={88} rx={10} fill={C.cream} />
    <rect x={-84} y={-44} width={168} height={22} fill={C.blue} />
    <path d="M-60 6 L10 6 M-60 24 L-14 24" stroke={C.ink} strokeOpacity={0.5} strokeWidth={6} strokeLinecap="round" />
    <path d="M40 -4 L68 10 L40 24 Z" fill={C.gold} />
  </g>
);
export const GateSign: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={C.ink} strokeWidth={5}>
    <rect x={-8} y={-10} width={16} height={86} fill={C.muted} />
    <rect x={-58} y={-70} width={116} height={68} rx={10} fill={C.blue} />
    <path d="M-32 -36 L-4 -52 L-4 -20 Z M8 -52 H34 M8 -36 H34 M8 -20 H34" fill={C.cream} stroke={C.cream} strokeWidth={5} strokeLinecap="round" />
  </g>
);

export const Tick: React.FC<{ x: number; y: number; s?: number; color?: string; p?: number }> = ({ x, y, s = 1, color = C.green, p = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={p}>
    <circle r={26} fill={color} stroke={C.ink} strokeWidth={5} />
    <path d="M-12 2 L-3 12 L14 -10" fill="none" stroke={C.ink} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

export const Ground: React.FC<{ y?: number }> = ({ y = 800 }) => (
  <g>
    <rect x={-20} y={y} width={1960} height={1080 - y + 20} fill={C.panel} />
    <rect x={-20} y={y} width={1960} height={10} fill={C.ink} />
    {Array.from({ length: 9 }).map((_, i) => (
      <rect key={i} x={40 + i * 230} y={y + 120} width={120} height={10} rx={5} fill={C.gold} opacity={0.5} />
    ))}
  </g>
);
