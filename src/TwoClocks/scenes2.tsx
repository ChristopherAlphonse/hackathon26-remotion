import React from "react";
import {
  Art,
  BoardChar,
  BoardingPass,
  Bust,
  C,
  Clock,
  CrewBadge,
  GateSign,
  Ground,
  Hand,
  Label,
  Mug,
  Plane,
  Ribbon,
  Strip,
  Tick,
  handsFor,
  lin,
  mix,
  prog,
  useT,
} from "./art";
import { when } from "./timing";

// Scenes 10 to 17 of presentation/educational-video-package.md (section E).

// small helper: a hand-drawn ticket
const Ticket: React.FC<{ x: number; y: number; s?: number; rot?: number; flag?: boolean; opacity?: number; gray?: number }> = ({
  x,
  y,
  s = 1,
  rot = 0,
  flag,
  opacity = 1,
  gray = 0,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={opacity}>
    <rect x={-60} y={-38} width={120} height={76} rx={8} fill={gray > 0.5 ? C.muted : C.cream} stroke={C.ink} strokeWidth={5} />
    <rect x={-60} y={-38} width={120} height={20} fill={flag ? C.red : gray > 0.5 ? "#6d7ea3" : C.green} stroke={C.ink} strokeWidth={5} />
    <path d="M-38 6 L38 6 M-38 22 L6 22" stroke={C.ink} strokeOpacity={0.5} strokeWidth={5} strokeLinecap="round" />
  </g>
);

// ---------- 10 · The filter ----------
export const S10: React.FC = () => {
  const t = useT();
  const start = when(9, "get filtered");
  const redIn = prog(t, 0.3, 0.9);
  const glow = 0.6 + Math.sin(t * 4) * 0.2;
  const fallers = Array.from({ length: 8 }).map((_, i) => ({
    x: 760 + ((i * 97) % 400),
    delay: start + i * 0.32,
    rot: ((i * 31) % 40) - 20,
  }));
  return (
    <Art
      overlay={
        <Label x={960} y={960} size={28} fill={C.cream} opacity={prog(t, start + 1.2, 0.8)}>
          AGREES WITH THE RECORD: FILTERED OUT
        </Label>
      }
    >
      {/* sieve */}
      <g>
        <path d="M600 300 L1320 300 L1120 540 L800 540 Z" fill={C.panel} stroke={C.ink} strokeWidth={9} strokeLinejoin="round" />
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={i} x1={680 + i * 90} y1={300} x2={845 + i * 38} y2={540} stroke={C.muted} strokeOpacity={0.55} strokeWidth={4} />
        ))}
        <line x1={640} y1={380} x2={1280} y2={380} stroke={C.muted} strokeOpacity={0.5} strokeWidth={4} />
        <line x1={720} y1={460} x2={1200} y2={460} stroke={C.muted} strokeOpacity={0.5} strokeWidth={4} />
        <rect x={580} y={286} width={760} height={24} rx={12} fill={C.cream} stroke={C.ink} strokeWidth={7} />
      </g>
      {/* basket */}
      <path d="M690 740 L1230 740 L1190 880 L730 880 Z" fill="#46506c" stroke={C.ink} strokeWidth={8} strokeLinejoin="round" />
      {/* falling "agrees" tickets */}
      {fallers.map((f, i) => {
        const q = lin(t, f.delay, 2.2);
        if (q <= 0) return i < 0 ? null : <Ticket key={i} x={f.x} y={120} s={0.6} rot={f.rot} />;
        const y = mix(120, 800, q * q);
        const x = mix(f.x, 960 + (f.x - 960) * 0.2, q);
        const past = y > 520 ? 1 : 0;
        return <Ticket key={i} x={x} y={y} s={mix(0.6, 0.42, q)} rot={f.rot + q * 30} gray={past} opacity={q >= 1 ? 0.5 : 1} />;
      })}
      {/* the one that stays */}
      <g transform={`translate(0 ${mix(-260, 0, redIn)})`} opacity={redIn}>
        <circle cx={960} cy={250} r={110} fill={C.gold} opacity={glow * 0.35} filter="url(#glow)" />
        <Ticket x={960} y={250} s={1.35} flag />
      </g>
    </Art>
  );
};

// ---------- a lock ----------
const Lock: React.FC<{ x: number; y: number; open: number; shake?: number; s?: number }> = ({ x, y, open, shake = 0, s = 1 }) => (
  <g transform={`translate(${x + shake} ${y}) scale(${s})`} stroke={C.ink} strokeWidth={8} strokeLinecap="round">
    <path d={`M-48 -10 L-48 ${-70 - open * 36} A48 48 0 0 1 48 ${-70 - open * 36} L48 ${open > 0.5 ? -50 : -10}`} fill="none" stroke={C.cream} strokeWidth={16} />
    <rect x={-84} y={-12} width={168} height={130} rx={18} fill={open > 0.5 ? C.green : C.gold} />
    <circle cx={0} cy={44} r={16} fill={C.ink} />
    <rect x={-6} y={44} width={12} height={34} rx={4} fill={C.ink} />
  </g>
);

// ---------- 11 · The temptation ----------
export const S11: React.FC = () => {
  const t = useT();
  const rise = prog(t, when(10, "Confidence is"), 2.2);
  const cross = when(10, "Confidence is") + 1.6;
  const open = prog(t, cross, 0.6);
  const shake = Math.sin(t * 38) * 7 * Math.max(0, 1 - Math.abs(t - when(10, "Still no") - 0.4) * 1.1);
  const blank = prog(t, when(10, "is empty"), 0.8);
  const barTop = 200;
  const barBot = 880;
  const yAt = (v: number) => barBot - (barBot - barTop) * v;
  const cardY = mix(yAt(0.1), yAt(0.92), rise);
  return (
    <Art
      overlay={
        <>
          <Label x={520} y={yAt(0.9) + 92} size={26} fill={C.gold}>
            0.90 AUTOMATIC THRESHOLD
          </Label>
          <Label x={520} y={cardY + 12} size={34} fill={C.ink} weight={900} opacity={rise}>
            0.92
          </Label>
          <Label x={1080} y={474} size={26} fill={C.cream}>
            CONFIDENCE
          </Label>
          <Label x={1080} y={784} size={26} fill={C.cream}>
            ON THE ALLOWLIST?
          </Label>
          <Label x={1640} y={392} size={19} fill={C.ink} opacity={blank}>
            ALLOWED TO CHANGE
          </Label>
          <Label x={1640} y={420} size={19} fill={C.ink} opacity={blank}>
            ON ITS OWN
          </Label>
          <Label x={1640} y={600} size={46} fill={C.red} weight={900} opacity={blank}>
            (none)
          </Label>
        </>
      }
    >
      {/* scale */}
      <rect x={260} y={barTop} width={34} height={barBot - barTop} rx={17} fill={C.panel} stroke={C.ink} strokeWidth={7} />
      <line x1={280} y1={yAt(0.9)} x2={860} y2={yAt(0.9)} stroke={C.gold} strokeWidth={7} strokeDasharray="22 14" />
      {/* the command card */}
      <g transform={`translate(520 ${cardY})`}>
        <rect x={-130} y={-48} width={260} height={96} rx={12} fill={C.cream} stroke={C.gold} strokeWidth={9} />
      </g>
      {/* two locks */}
      <rect x={880} y={150} width={400} height={720} rx={22} fill={C.panel} stroke={C.ink} strokeWidth={9} />
      <Lock x={1080} y={330} open={open} s={0.8} />
      <Lock x={1080} y={640} open={0} shake={shake} s={0.8} />
      {/* clipboard */}
      <g transform="translate(1640 540)">
        <rect x={-170} y={-230} width={340} height={380} rx={14} fill={C.blueDark} stroke={C.ink} strokeWidth={8} />
        <rect x={-140} y={-190} width={280} height={310} rx={6} fill={C.cream} stroke={C.ink} strokeWidth={5} />
        <rect x={-46} y={-250} width={92} height={50} rx={10} fill={C.gold} stroke={C.ink} strokeWidth={6} />
      </g>
    </Art>
  );
};

// ---------- 12 · The witness ----------
export const S12: React.FC = () => {
  const t = useT();
  const limit = when(11, "The analogy");
  const right = prog(t, limit, 0.9);
  const wave = Math.sin(t * 6);
  const slip = prog(t, when(11, "can't open"), 0.8);
  const sysOpen = prog(t, when(11, "This system can"), 0.9);
  const merge = prog(t, when(11, "checks the testimony"), 1.2);
  // the witness's arm, in the figure's own coordinates: upper arm 100 long, forearm 92 long
  const rad = (d: number) => (d * Math.PI) / 180;
  const a1 = rad(mix(100, 14, right) + slip * 18); // upper arm: hangs, rises, sags
  const a2 = rad(mix(100, 4, right) + slip * 72); // forearm: hangs, reaches, drops
  const arm = (() => {
    const sx = 34;
    const sy = 66;
    const ex = sx + 100 * Math.cos(a1);
    const ey = sy + 100 * Math.sin(a1);
    const wx = ex + 92 * Math.cos(a2);
    const wy = ey + 92 * Math.sin(a2);
    return { sx, sy, ex, ey, wx, wy, hx: wx + 16 * Math.cos(a2), hy: wy + 16 * Math.sin(a2) };
  })();
  return (
    <Art
      overlay={
        <>
          <Label x={560} y={930} size={28} fill={C.cream} opacity={prog(t, 0.8, 0.7)}>
            WITNESS, NOT JUDGE
          </Label>
        </>
      }
    >
      {/* judge's bench, empty */}
      <g opacity={prog(t, 0.3, 0.7)}>
        <rect x={250} y={250} width={620} height={130} rx={14} fill={C.blue} stroke={C.ink} strokeWidth={8} />
        <rect x={500} y={150} width={120} height={110} rx={16} fill={C.panel} stroke={C.ink} strokeWidth={7} />
      </g>
      {/* witness stand */}
      <g opacity={prog(t, 0.5, 0.7)}>
        <path d="M330 540 L790 540 L760 860 L360 860 Z" fill={C.cream} stroke={C.ink} strokeWidth={8} strokeLinejoin="round" />
        <rect x={310} y={520} width={500} height={34} rx={10} fill={C.gold} stroke={C.ink} strokeWidth={7} />
      </g>
      {/* the Voice, as a witness */}
      <g transform={`translate(560 ${450 + wave * 4})`}>
        {/* the arm: shoulder -> elbow -> wrist -> hand. It rises to reach, then the forearm drops: it can't open the files. Drawn first so the shoulder tucks behind the body. */}
        <g opacity={right}>
          <path d={`M${arm.sx} ${arm.sy} L${arm.ex} ${arm.ey} L${arm.wx} ${arm.wy}`} fill="none" stroke={C.ink} strokeWidth={40} strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M${arm.sx} ${arm.sy} L${arm.ex} ${arm.ey} L${arm.wx} ${arm.wy}`} fill="none" stroke={C.teal} strokeWidth={24} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={arm.hx} cy={arm.hy} r={22} fill={C.teal} stroke={C.ink} strokeWidth={8} />
        </g>
        <path d="M-70 110 C-70 0 70 0 70 110" fill={C.teal} stroke={C.ink} strokeWidth={8} />
        <circle cx={0} cy={-34} r={54} fill={C.teal} stroke={C.ink} strokeWidth={8} />
        <circle cx={-18} cy={-42} r={6} fill={C.ink} />
        <circle cx={18} cy={-42} r={6} fill={C.ink} />
        <ellipse cx={0} cy={-14} rx={14} ry={Math.abs(wave) * 8 + 4} fill={C.ink} />
      </g>
      {/* filing cabinet */}
      <g opacity={right}>
        <rect x={1180} y={330} width={300} height={560} rx={14} fill={C.blue} stroke={C.ink} strokeWidth={9} />
        {[0, 1, 2].map((k) => (
          <g key={k} transform={`translate(${k === 0 ? sysOpen * -110 : 0} 0)`}>
            <rect x={1204} y={354 + k * 176} width={252} height={156} rx={8} fill={C.blueDark} stroke={C.ink} strokeWidth={6} />
            <rect x={1290} y={420 + k * 176} width={80} height={16} rx={8} fill={C.gold} stroke={C.ink} strokeWidth={5} />
          </g>
        ))}
        {/* record pulled out of the top drawer */}
        <g opacity={sysOpen} transform={`translate(${mix(0, -260, merge)} ${mix(0, 330, merge)})`}>
          <Strip x={1010} y={380} w={300} h={110} lines={2} seed={9} />
        </g>
      </g>
      {/* the system, in blue, opens the drawer */}
      <g opacity={right} transform={`translate(${mix(1760, 1640, sysOpen)} 640)`}>
        <rect x={-70} y={-40} width={140} height={200} rx={16} fill={C.blue} stroke={C.ink} strokeWidth={8} />
        <rect x={-62} y={-160} width={124} height={110} rx={14} fill={C.panel} stroke={C.ink} strokeWidth={8} />
        <circle cx={-22} cy={-110} r={8} fill={C.teal} />
        <circle cx={22} cy={-110} r={8} fill={C.teal} />
        <path d="M-24 -78 Q0 -62 24 -78" fill="none" stroke={C.teal} strokeWidth={6} strokeLinecap="round" />
        <path d={`M-70 20 L${-120 - sysOpen * 40} ${40 - sysOpen * 20}`} stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
      </g>
      {/* proposal card the two become */}
      <g opacity={merge} transform={`translate(${mix(760, 960, merge)} 900)`}>
        <rect x={-150} y={-46} width={300} height={92} rx={12} fill={C.cream} stroke={C.gold} strokeWidth={8} />
        <path d="M-110 -12 L110 -12 M-110 14 L40 14" stroke={C.ink} strokeOpacity={0.45} strokeWidth={6} strokeLinecap="round" />
      </g>
      <Hand x={1380} y={250} size={60} fill={C.gold} opacity={right} rotate={-4}>
        where the analogy stops
      </Hand>
    </Art>
  );
};

// ---------- 13 · The ripple, drawn in advance ----------
export const S13: React.FC = () => {
  const t = useT();
  const crew = prog(t, when(12, "crew near"), 1.4);
  const pax = prog(t, when(12, "three passengers"), 1.4);
  const gate = prog(t, when(12, "gate conflict"), 1.4);
  const ripple = (q: number, tx: number, ty: number) => {
    const x = mix(960, tx, q);
    const y = mix(500, ty, q);
    return (
      <>
        <path d={`M960 500 L${x} ${y}`} stroke={C.cream} strokeWidth={5} strokeDasharray="12 14" opacity={0.7} />
        <circle cx={960} cy={500} r={mix(120, 330, q)} fill="none" stroke={C.cream} strokeWidth={4} strokeDasharray="10 16" opacity={q > 0 ? 0.55 * (1 - q) : 0} />
      </>
    );
  };
  return (
    <Art
      overlay={
        <>
          <Label x={960} y={470} size={42} fill={C.ink} weight={900}>
            WN1628 · DELAYED +35 MIN
          </Label>
          <Label x={960} y={516} size={28} fill={C.ink}>
            REASON: HYDRAULIC
          </Label>
          <g opacity={prog(t, 0.8, 0.7)}>
            <rect x={780} y={544} width={360} height={46} rx={23} fill={C.gold} />
            <Label x={960} y={577} size={24} fill={C.ink}>
              PENDING REVIEW
            </Label>
          </g>
          <Label x={330} y={620} size={30} fill={C.cream} opacity={crew}>
            725 OF 780 DUTY MIN
          </Label>
          <Label x={1590} y={620} size={30} fill={C.cream} opacity={pax}>
            CONNECTION: 10 MIN
          </Label>
          <Label x={960} y={1010} size={30} fill={C.cream} opacity={gate}>
            GATE CONFLICT
          </Label>
        </>
      }
    >
      {ripple(crew, 330, 340)}
      {ripple(pax, 1590, 340)}
      {ripple(gate, 960, 830)}
      {/* the proposal card */}
      <g opacity={prog(t, 0.3, 0.7)}>
        <rect x={590} y={380} width={740} height={240} rx={20} fill={C.cream} stroke={C.gold} strokeWidth={11} />
      </g>
      {/* crew vignette */}
      <g opacity={crew * 0.95} strokeDasharray={crew < 1 ? "14 12" : undefined}>
        <CrewBadge x={330} y={340} s={1.1} />
        <rect x={190} y={520} width={280} height={30} rx={15} fill={C.panel} stroke={C.ink} strokeWidth={6} />
        <rect x={192} y={522} width={mix(0, 276 * (725 / 780), crew)} height={26} rx={13} fill={C.gold} />
        <line x1={190 + 280} y1={510} x2={190 + 280} y2={560} stroke={C.red} strokeWidth={7} />
      </g>
      {/* passengers vignette */}
      <g opacity={pax * 0.95}>
        {[0, 1, 2].map((k) => (
          <g key={k} transform={`translate(${1480 + k * 80} 330)`} stroke={C.ink} strokeWidth={5}>
            <circle r={24} fill={[C.skinA, C.skinB, C.skinC][k]} />
            <path d="M-34 80 Q0 20 34 80 Z" fill={[C.blue, C.gold, C.teal][k]} />
          </g>
        ))}
        <path d={`M1450 470 L${mix(1740, 1560, pax)} 470`} stroke={C.cream} strokeWidth={8} strokeLinecap="round" />
        <path d={`M${mix(1740, 1560, pax)} 470 l-24 -18 M${mix(1740, 1560, pax)} 470 l-24 18`} stroke={C.cream} strokeWidth={8} strokeLinecap="round" />
      </g>
      {/* gate vignette: two aircraft outlines overlapping */}
      <g opacity={gate * 0.95}>
        <rect x={700} y={900} width={520} height={14} rx={7} fill={C.muted} />
        <g opacity={0.9}>
          <Plane x={mix(640, 760, gate)} y={730} s={0.42} />
        </g>
        <g opacity={0.6}>
          <Plane x={mix(1000, 880, gate)} y={740} s={0.42} />
        </g>
        <circle cx={960} cy={830} r={mix(0, 70, gate)} fill="none" stroke={C.red} strokeWidth={8} />
      </g>
    </Art>
  );
};

// ---------- 14 · The human decides ----------
export const S14: React.FC = () => {
  const t = useT();
  const sign = prog(t, when(13, "approves"), 1.4);
  const flipAt = when(13, "Only then");
  const flip = prog(t, flipAt, 1.0);
  const delayed = flip > 0.5 ? 1 : 0;
  const ver = prog(t, flipAt + 0.9, 0.7);
  const hand = prog(t, when(13, "in the meantime"), 1.4);
  const bounce = prog(t, when(13, "in the meantime") + 1.3, 0.6);
  const handX = mix(2100, 1640, hand) + bounce * 160;
  return (
    <Art
      overlay={
        <>
          <Label x={1400} y={900} size={26} fill={C.cream} opacity={ver}>
            VERSION 7 → 8
          </Label>
          <g opacity={bounce}>
            <rect x={1280} y={966} width={460} height={52} rx={26} fill={C.red} />
            <Label x={1510} y={1001} size={26} fill={C.cream}>
              STALE WRITE REFUSED
            </Label>
          </g>
        </>
      }
    >
      {/* the Controller at the desk */}
      <rect x={-20} y={800} width={900} height={290} fill={C.panel} />
      <rect x={-20} y={790} width={900} height={22} fill={C.blue} stroke={C.ink} strokeWidth={6} />
      <Bust x={400} y={620} s={1.8} skin={C.skinC} shirt="#5a6aa8" kind="controller" look={1} />
      <Mug x={740} y={770} s={1.2} />
      {/* the card on the desk with its signature */}
      <g transform="translate(560 800) rotate(-4)">
        <rect x={-130} y={-60} width={260} height={90} rx={8} fill={C.cream} stroke={C.ink} strokeWidth={6} />
        <path d="M-96 -30 L60 -30 M-96 -10 L20 -10" stroke={C.ink} strokeOpacity={0.35} strokeWidth={5} strokeLinecap="round" />
        <path d="M-90 10 C-70 -4 -60 22 -40 8 S-10 -4 10 12 S50 6 80 8" pathLength={1} fill="none" stroke={C.blueDark} strokeWidth={6} strokeLinecap="round" strokeDasharray={`${sign} 2`} />
      </g>
      {/* the Board, flipping */}
      <BoardChar x={1400} y={430} s={0.95} status={delayed ? "DELAYED +35" : "ON TIME"} delayed={delayed} flip={flip} mood={flip > 0.5 ? "relieved" : "smile"} />
      {/* version tags */}
      <g opacity={flip > 0.5 ? 1 : 0.0}>
        <rect x={1270} y={810} width={120} height={56} rx={12} fill={C.panel} stroke={C.ink} strokeWidth={6} opacity={1 - ver} />
        <rect x={1410} y={810} width={120} height={56} rx={12} fill={C.gold} stroke={C.ink} strokeWidth={6} opacity={ver} />
      </g>
      {/* barrier + stale hand */}
      <rect x={1558} y={760} width={14} height={260} rx={7} fill={C.gold} stroke={C.ink} strokeWidth={5} opacity={hand > 0 ? 1 : 0} />
      <g transform={`translate(${handX} 880)`} opacity={hand > 0 ? 1 - bounce * 0.6 : 0} stroke={C.ink} strokeWidth={6} strokeLinejoin="round">
        <rect x={-30} y={-28} width={100} height={58} rx={26} fill={C.skinB} />
        <rect x={-120} y={-30} width={110} height={64} rx={8} fill={C.cream} />
        <path d="M-100 -4 L-30 -4 M-100 14 L-50 14" stroke={C.ink} strokeOpacity={0.5} strokeWidth={5} />
      </g>
    </Art>
  );
};

// ---------- 15 · Thirty-five minutes ----------
export const S15: React.FC = () => {
  const t = useT();
  const catchUp = prog(t, 0.8, 3.4);
  const rightHands = handsFor(15, 40 + 35 * catchUp);
  const leftHands = handsFor(16, 15);
  const arc = prog(t, 3.0, 1.2);
  const ticks = [when(14, "tell crew"), when(14, "rebook"), when(14, "move a gate")];
  const R = 240 * 0.78;
  const cx = 1360;
  const cy = 470;
  const a0 = (240 * Math.PI) / 180 - Math.PI / 2;
  const a1 = ((240 + 210 * arc) * Math.PI) / 180 - Math.PI / 2;
  const pt = (a: number) => `${cx + Math.cos(a) * R} ${cy + Math.sin(a) * R}`;
  return (
    <Art
      overlay={
        <>
          <Label x={960} y={176} size={44} fill={C.gold} weight={900} opacity={arc}>
            35 MIN EARLIER (IN THE DEMO)
          </Label>
        </>
      }
    >
      <Clock cx={560} cy={470} r={240} rim={C.teal} {...leftHands} />
      <Clock cx={cx} cy={cy} r={240} rim={C.gold} {...rightHands} />
      {/* the 35-minute arc on the right clock */}
      <path d={`M${pt(a0)} A${R} ${R} 0 ${arc > 0.86 ? 1 : 0} 1 ${pt(a1)}`} fill="none" stroke={C.gold} strokeWidth={22} strokeLinecap="round" opacity={0.9} filter="url(#glow)" />
      {/* icons relax and tick off */}
      <g transform="translate(0 850)">
        <CrewBadge x={620} y={-30} s={0.6} />
        <BoardingPass x={960} y={0} s={0.7} />
        <GateSign x={1300} y={-10} s={0.6} />
        <Tick x={700} y={-70} s={0.9} p={prog(t, ticks[0], 0.5)} />
        <Tick x={1050} y={-40} s={0.9} p={prog(t, ticks[1], 0.5)} />
        <Tick x={1380} y={-60} s={0.9} p={prog(t, ticks[2], 0.5)} />
      </g>
    </Art>
  );
};

// ---------- a padlock ----------
const Padlock: React.FC<{ x: number; y: number; s?: number; closed: number }> = ({ x, y, s = 1, closed }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke={C.ink} strokeWidth={7} strokeLinecap="round">
    <path d={`M-30 0 L-30 ${-34 - (1 - closed) * 26} A30 30 0 0 1 30 ${-34 - (1 - closed) * 26} L30 ${(1 - closed) * -20}`} fill="none" stroke={C.muted} strokeWidth={13} />
    <rect x={-50} y={-4} width={100} height={78} rx={14} fill={C.gold} />
    <circle cx={0} cy={30} r={9} fill={C.ink} />
  </g>
);

// ---------- 16 · What is real ----------
export const S16: React.FC = () => {
  const t = useT();
  const cols = [
    { x: 160, at: when(15, "flight data"), head: "REAL", tag: "Amadeus test environment", color: C.green },
    { x: 693, at: when(15, "Ramp, crew"), head: "PLACEHOLDER", tag: "ramp · crew · connections", color: C.gold },
    { x: 1226, at: when(15, "savings"), head: "NOT CLAIMED", tag: "savings: not measured", color: C.red },
  ];
  const stand = prog(t, when(15, "speech engine"), 0.8);
  const lock = prog(t, when(15, "Nothing is written"), 0.7);
  return (
    <Art
      overlay={
        <>
          {cols.map((c) => (
            <g key={c.head} opacity={prog(t, c.at - 0.2, 0.6)}>
              <Label x={c.x + 267} y={246} size={34} fill={C.ink} weight={900}>
                {c.head}
              </Label>
              <Label x={c.x + 267} y={790} size={24} fill={C.blueDark} weight={700}>
                {c.tag.toUpperCase()}
              </Label>
            </g>
          ))}
          <Label x={cols[1].x + 267} y={832} size={22} fill={C.blueDark} opacity={stand}>
            + SPEECH ENGINE: STAND-IN
          </Label>
          <Label x={cols[0].x + 267} y={832} size={22} fill={C.blueDark} opacity={lock}>
            NOTHING WRITTEN BACK
          </Label>
        </>
      }
    >
      <rect x={120} y={150} width={1680} height={760} rx={26} fill={C.cream} stroke={C.ink} strokeWidth={9} />
      <line x1={660} y1={190} x2={660} y2={870} stroke={C.ink} strokeOpacity={0.45} strokeWidth={5} strokeDasharray="4 14" strokeLinecap="round" />
      <line x1={1260} y1={190} x2={1260} y2={870} stroke={C.ink} strokeOpacity={0.45} strokeWidth={5} strokeDasharray="4 14" strokeLinecap="round" />
      {/* REAL */}
      <g opacity={prog(t, cols[0].at, 0.8)} transform={`translate(${mix(-60, 0, prog(t, cols[0].at, 0.8))} 0)`}>
        <Plane x={190} y={360} s={0.54} />
        <GateSign x={470} y={560} s={0.9} />
        <g stroke={C.ink} strokeWidth={5}>
          <rect x={200} y={600} width={190} height={56} rx={8} fill={C.panel} />
          <rect x={206} y={606} width={50} height={44} rx={6} fill={C.gold} />
        </g>
        <Padlock x={560} y={470} s={1.0} closed={lock} />
      </g>
      {/* PLACEHOLDER (faded, dashed) */}
      <g opacity={prog(t, cols[1].at, 0.8) * 0.8} transform={`translate(${mix(-60, 0, prog(t, cols[1].at, 0.8))} 0)`} strokeDasharray="10 8">
        <g stroke={C.ink} strokeWidth={5}>
          <rect x={760} y={560} width={150} height={60} rx={6} fill="#cdd5ea" />
          <circle cx={790} cy={640} r={16} fill="#cdd5ea" />
          <circle cx={880} cy={640} r={16} fill="#cdd5ea" />
          <rect x={780} y={516} width={46} height={44} fill="#e8d9a8" />
        </g>
        <CrewBadge x={1020} y={440} s={0.9} />
        {[0, 1, 2].map((k) => (
          <g key={k} transform={`translate(${1150 + k * 36} 640)`} stroke={C.ink} strokeWidth={5}>
            <circle r={18} fill={[C.skinA, C.skinB, C.skinC][k]} />
            <path d="M-26 60 Q0 14 26 60 Z" fill={[C.blue, C.gold, C.teal][k]} />
          </g>
        ))}
        <g opacity={stand} transform="translate(940 700)" stroke={C.ink} strokeWidth={5}>
          <rect x={-18} y={-50} width={36} height={64} rx={18} fill="#cdd5ea" />
          <path d="M-34 -6 Q-34 34 0 34 Q34 34 34 -6" fill="none" />
          <line x1={0} y1={34} x2={0} y2={60} />
        </g>
      </g>
      {/* NOT CLAIMED */}
      <g opacity={prog(t, cols[2].at, 0.8)} transform={`translate(${mix(-60, 0, prog(t, cols[2].at, 0.8))} 0)`}>
        <text x={1530} y={620} textAnchor="middle" fontFamily="Caveat, cursive" fontWeight={700} fontSize={300} fill={C.ink} opacity={0.75}>
          $?
        </text>
      </g>
    </Art>
  );
};

// ---------- 17 · The listening clock ----------
export const S17: React.FC = () => {
  const t = useT();
  const pull = prog(t, when(16, "The ramp already knows") - 0.6, 3.0);
  const q = prog(t, when(16, "What else"), 0.9);
  const run = lin(t, 1.0, 6.0);
  const leftHands = handsFor(15, 40 + 35 * run);
  const rightHands = handsFor(15, 40 + 35 * Math.max(0, run - 0.03));
  const dial = Math.sin(t * 0.8) * 30;
  const flow = prog(t, when(16, "letting the system listen") - 0.5, 2.0);
  const ribbon = "M730 500 C950 380 1000 640 1180 520";
  // the airport at dusk: everyone talking, their voices rising into the sky and fading, unheard
  const crew: { x: number; kind: "pilot" | "ramp" | "controller" | "plain"; skin: string; shirt: string }[] = [
    { x: 260, kind: "ramp", skin: C.skinA, shirt: "#4a5f9a" },
    { x: 620, kind: "pilot", skin: C.skinB, shirt: C.cream },
    { x: 980, kind: "controller", skin: C.skinC, shirt: "#5a4a9a" },
    { x: 1340, kind: "ramp", skin: C.skinB, shirt: "#4a5f9a" },
    { x: 1700, kind: "plain", skin: C.skinA, shirt: "#6a7fa8" },
  ];
  const aerial = pull;
  return (
    <Art
      overlay={
        <Hand x={960} y={960} size={92} fill={C.cream} opacity={q}>
          What else is being said out loud, and not yet heard?
        </Hand>
      }
    >
      {/* two clocks, one listening */}
      <g opacity={1 - pull} transform={`translate(960 540) scale(${mix(1, 0.3, pull)}) translate(-960 -540)`}>
        <Clock cx={520} cy={500} r={210} rim={C.teal} {...leftHands} />
        <Clock cx={1400} cy={500} r={210} rim={C.gold} {...rightHands} />
        {/* the ear (same shape as scene 4), clear of the right clock whose rim ends at x=1610 */}
        <g transform="translate(1745 500) scale(0.55) translate(-1400 -442)" stroke={C.ink} strokeLinejoin="round">
          <path d="M1300 360 C1300 250 1460 230 1490 350 C1515 440 1440 500 1420 560 C1404 612 1345 640 1312 596" fill={C.cream} strokeWidth={9} />
          <path d="M1352 380 C1362 338 1426 346 1432 396 C1436 438 1388 466 1378 520" fill="none" strokeWidth={8} strokeLinecap="round" />
        </g>
        <Ribbon d={ribbon} p={flow} len={0.8} />
        {/* the shared dial under a human hand */}
        <circle cx={960} cy={810} r={90} fill={C.panel} stroke={C.cream} strokeWidth={8} />
        <line x1={960} y1={810} x2={960} y2={745} stroke={C.gold} strokeWidth={12} strokeLinecap="round" transform={`rotate(${dial} 960 810)`} />
        <g transform="translate(960 930)" stroke={C.ink} strokeWidth={6} strokeLinejoin="round">
          <rect x={-46} y={-20} width={92} height={90} rx={30} fill={C.skinA} />
          {[-34, -12, 10, 32].map((fx) => (
            <rect key={fx} x={fx - 8} y={-76} width={16} height={62} rx={8} fill={C.skinA} />
          ))}
        </g>
      </g>
      {/* the airport: voices rising and fading, unheard */}
      <g opacity={aerial}>
        <rect width={1920} height={1080} fill={C.navy} />
        <Ground y={800} marks={false} />
        {crew.map((c, i) => {
          const len = 0.45;
          const cyc = (t * 0.22 + i * 0.37) % 1;
          const p = cyc * (1 + len);
          const sway = i % 2 ? -1 : 1;
          const d = `M${c.x} 640 C${c.x + 90 * sway} 540 ${c.x - 90 * sway} 440 ${c.x + 20 * sway} 340 S${c.x - 60 * sway} 220 ${c.x + 30 * sway} 130`;
          return (
            <g key={i}>
              <Bust x={c.x} y={709} s={0.7} skin={c.skin} shirt={c.shirt} kind={c.kind} look={0} talk={Math.sin(t * 7 + i * 2) > 0 ? 1 : 0} />
              <Ribbon d={d} p={p} len={len} w={10} opacity={0.9 * (1 - cyc * 0.85)} />
            </g>
          );
        })}
      </g>
    </Art>
  );
};
