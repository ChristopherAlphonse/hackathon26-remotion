import React from "react";
import {
  Art,
  BoardChar,
  Bust,
  C,
  Clock,
  CrewBadge,
  Ground,
  Hand,
  Label,
  Mug,
  PACE,
  Plane,
  Ribbon,
  handsFor,
  mix,
  prog,
  seg,
  segLin,
  useT,
} from "./art";
import { LEAD, when } from "./timing";

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
  // the card climbs while "This one: ninety-two" is said and lands on 0.92 as the number finishes
  const cross = when(8, "ninety-two") + 0.1;
  const rise = seg(t, when(8, "This one") - 0.2, cross);
  const open = seg(t, cross, cross + 0.45);
  const barTop = 200;
  const barBot = 880;
  const yAt = (v: number) => barBot - (barBot - barTop) * v;
  const cardY = mix(yAt(0.1), yAt(0.92), rise);
  const rule = prog(t, when(8, "Seventy-five"), 0.8);
  return (
    <Art
      overlay={
        <>
          <Label x={560} y={yAt(0.75) - 24} size={24} fill={C.gold} opacity={rule}>
            0.75 AND UP: APPLIES ON ITS OWN
          </Label>
          <Label x={560} y={yAt(0.75) + 46} size={24} fill={C.cream} opacity={rule}>
            BELOW: ASKS A PERSON
          </Label>
          <Label x={520} y={cardY + 12} size={34} fill={C.ink} weight={900} opacity={rise}>
            0.92
          </Label>
          <Label x={1080} y={474} size={26} fill={C.cream}>
            CONFIDENCE
          </Label>
        </>
      }
    >
      {/* scale */}
      <rect x={260} y={barTop} width={34} height={barBot - barTop} rx={17} fill={C.panel} stroke={C.ink} strokeWidth={7} />
      <line x1={280} y1={yAt(0.75)} x2={860} y2={yAt(0.75)} stroke={C.gold} strokeWidth={7} strokeDasharray="22 14" />
      {/* the command card */}
      <g transform={`translate(520 ${cardY})`}>
        <rect x={-130} y={-48} width={260} height={96} rx={12} fill={C.cream} stroke={C.gold} strokeWidth={9} />
      </g>
      {/* the lock: confidence clears the bar */}
      <rect x={880} y={150} width={400} height={440} rx={22} fill={C.panel} stroke={C.ink} strokeWidth={9} />
      <Lock x={1080} y={330} open={open} s={0.8} />
    </Art>
  );
};

// ---------- 12 · Human in the loop ----------
export const S12: React.FC = () => {
  const t = useT();
  const title = prog(t, when(9, "human in the loop") - 0.3, 0.8);
  const lowAt = when(9, "too low");
  const critAt = when(9, "critical");
  const stopAt = when(9, "The system stops");
  const low = prog(t, lowAt - 0.4, 0.7);
  const crit = prog(t, critAt - 0.4, 0.7);
  const stop = prog(t, stopAt, 0.7);
  const who = prog(t, lowAt + 0.4, 0.8);
  const arrowLow = prog(t, lowAt + 0.6, 1.0);
  const arrowCrit = prog(t, critAt + 0.6, 1.0);
  const bx = (v: number) => 270 + 420 * v;
  return (
    <Art
      overlay={
        <>
          <Label x={480} y={362} size={30} fill={C.ink} weight={900} opacity={low}>
            CONFIDENCE TOO LOW
          </Label>
          <Label x={bx(0.75)} y={590} size={24} fill={C.ink} opacity={low}>
            0.75
          </Label>
          <Label x={bx(0.55)} y={478} size={26} fill={C.red} weight={900} opacity={low}>
            0.55
          </Label>
          <Label x={1440} y={362} size={30} fill={C.ink} weight={900} opacity={crit}>
            CRITICAL DECISION
          </Label>
          <Label x={1320} y={608} size={22} fill={C.ink} opacity={crit}>
            FLIGHT DELAY
          </Label>
          <Label x={1560} y={608} size={22} fill={C.ink} opacity={crit}>
            CREW CHANGE
          </Label>
          <Label x={960} y={1040} size={34} fill={C.gold} weight={900} opacity={stop}>
            THE SYSTEM STOPS AND ASKS
          </Label>
        </>
      }
    >
      <Hand x={960} y={190} size={120} fill={C.gold} opacity={title}>
        human in the loop
      </Hand>
      {/* trigger 1: confidence too low */}
      <g opacity={low}>
        <rect x={220} y={300} width={520} height={340} rx={20} fill={C.cream} stroke={C.ink} strokeWidth={8} />
        <rect x={270} y={510} width={420} height={26} rx={13} fill={C.panel} stroke={C.ink} strokeWidth={5} />
        <rect x={272} y={512} width={mix(0, 420 * 0.55 - 4, low)} height={22} rx={11} fill={C.red} />
        <line x1={bx(0.75)} y1={496} x2={bx(0.75)} y2={552} stroke={C.gold} strokeWidth={8} strokeLinecap="round" />
      </g>
      {/* trigger 2: critical decision */}
      <g opacity={crit}>
        <rect x={1180} y={300} width={520} height={340} rx={20} fill={C.cream} stroke={C.ink} strokeWidth={8} />
        <Ticket x={1320} y={500} s={1.1} flag />
        <CrewBadge x={1560} y={500} s={0.9} />
      </g>
      {/* both end up with a person */}
      <g opacity={who}>
        <rect x={560} y={930} width={800} height={200} fill={C.panel} />
        <rect x={560} y={920} width={800} height={22} fill={C.blue} stroke={C.ink} strokeWidth={6} />
        <Bust x={960} y={790} s={1.3} skin={C.skinC} shirt="#5a6aa8" kind="controller" look={0} />
      </g>
      <g fill="none" stroke={C.cream} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M480 650 C480 740 640 720 780 790" pathLength={1} strokeDasharray={`${arrowLow} 2`} />
        <path d="M1440 650 C1440 740 1280 720 1140 790" pathLength={1} strokeDasharray={`${arrowCrit} 2`} />
        <path d="M740 790 L784 792 L772 750" opacity={arrowLow > 0.95 ? 1 : 0} />
        <path d="M1180 790 L1136 792 L1148 750" opacity={arrowCrit > 0.95 ? 1 : 0} />
      </g>
    </Art>
  );
};

// ---------- 13 · The ripple, drawn in advance ----------
export const S13: React.FC = () => {
  const t = useT();
  const crew = prog(t, when(10, "crew near"), 1.4);
  const pax = prog(t, when(10, "three passengers"), 1.4);
  const gate = prog(t, when(10, "gate conflict"), 1.4);
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
  const sign = prog(t, when(11, "approves"), 1.4);
  const flipAt = when(11, "Only then");
  const flip = prog(t, flipAt, 1.0);
  const delayed = flip > 0.5 ? 1 : 0;
  const ver = prog(t, flipAt + 0.9, 0.7);
  const hand = prog(t, when(11, "meanwhile"), 1.4);
  const bounce = prog(t, when(11, "meanwhile") + 1.3 / PACE, 0.6);
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

// ---------- 16 · The listening clock ----------
export const S16: React.FC = () => {
  const t = useT();
  const pull = prog(t, when(12, "We told you about") - 0.6, 3.0);
  const q = prog(t, when(12, "now let's see it"), 0.9);
  const run = segLin(t, LEAD, when(12, "We told you about"));
  const leftHands = handsFor(15, 40 + 35 * run);
  const rightHands = handsFor(15, 40 + 35 * Math.max(0, run - 0.03));
  const dial = Math.sin(t * 0.8) * 30;
  const flow = prog(t, when(12, "letting the system listen") - 0.5, 2.0);
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
          Now let's see it.
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
