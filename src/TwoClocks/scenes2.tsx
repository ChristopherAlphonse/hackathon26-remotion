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
  // first a routine bag-count update rides up, clears the bar and applies itself (then steps aside), so the delay is the contrast
  const bagAt = when(8, "bag count");
  const appliesAt = when(8, "applies itself");
  const belowAt = when(8, "Below");
  const bagIn = prog(t, bagAt - 0.7, 0.5);
  const bagRise = seg(t, bagAt - 0.4, appliesAt);
  const bagOut = seg(t, belowAt - 0.1, belowAt + 0.4);
  const bagVis = bagIn * (1 - bagOut);
  const open = Math.max(seg(t, cross, cross + 0.45), seg(t, appliesAt + 0.1, appliesAt + 0.5) * (1 - bagOut));
  const barTop = 200;
  const barBot = 880;
  const yAt = (v: number) => barBot - (barBot - barTop) * v;
  const cardY = mix(yAt(0.1), yAt(0.92), rise);
  const rule = prog(t, when(8, "Seventy-five"), 0.8);
  const bagY = mix(yAt(0.3), yAt(0.9), bagRise);
  // the second lock (a critical decision) comes in as "the second lock" is said, and rattles shut on "stays shut"
  const secondAt = when(8, "the second lock");
  const shutAt = when(8, "stays shut");
  const second = prog(t, secondAt - 0.5, 0.7);
  const rattle = Math.sin(t * 46) * 7 * seg(t, shutAt - 0.1, shutAt + 0.1) * (1 - seg(t, shutAt + 0.7, shutAt + 1.0));
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
          <Label x={520} y={bagY - 12} size={22} fill={C.ink} weight={900} opacity={bagVis}>
            BAG COUNT +2
          </Label>
          <Label x={520} y={bagY + 30} size={34} fill={C.ink} weight={900} opacity={bagVis * bagRise}>
            0.90
          </Label>
          <Label x={520} y={cardY + 16} size={44} fill={C.ink} weight={900} opacity={rise}>
            0.92
          </Label>
          <Label x={1080} y={474} size={26} fill={C.cream}>
            CONFIDENCE
          </Label>
          <Label x={1080} y={786} size={21} fill={C.cream} opacity={second}>
            FLIGHT DELAY · CREW CHANGE
          </Label>
          <Label x={1080} y={830} size={28} fill={C.gold} weight={900} opacity={prog(t, shutAt - 0.1, 0.5)}>
            STAYS SHUT
          </Label>
        </>
      }
    >
      {/* scale */}
      <rect x={260} y={barTop} width={34} height={barBot - barTop} rx={17} fill={C.panel} stroke={C.ink} strokeWidth={7} />
      <line x1={280} y1={yAt(0.75)} x2={860} y2={yAt(0.75)} stroke={C.gold} strokeWidth={7} strokeDasharray="22 14" />
      {/* the routine card: clears the bar, applies itself */}
      <g transform={`translate(520 ${bagY})`} opacity={bagVis}>
        <rect x={-130} y={-48} width={260} height={96} rx={12} fill={C.cream} stroke={C.green} strokeWidth={9} />
      </g>
      {/* the command card */}
      <g transform={`translate(520 ${cardY})`} opacity={prog(t, when(8, "This one") - 0.6, 0.4)}>
        <rect x={-130} y={-48} width={260} height={96} rx={12} fill={C.cream} stroke={C.gold} strokeWidth={9} />
      </g>
      {/* the locks: confidence clears the bar, but a critical decision is a second lock */}
      <rect x={880} y={150} width={400} height={720} rx={22} fill={C.panel} stroke={C.ink} strokeWidth={9} />
      <Lock x={1080} y={330} open={open} s={0.8} />
      <g opacity={second}>
        <Lock x={1080} y={640} open={0} shake={rattle} s={0.8} />
      </g>
    </Art>
  );
};

// ---------- 12 · Human in the loop: the voice is a witness, a person takes the bench ----------
export const S12: React.FC = () => {
  const t = useT();
  // the person in the loop: shown, not captioned. They appear inside a ring, and each trigger sends its flag to them
  const personAt = when(9, "human in the loop");
  const person = prog(t, personAt - 0.3, 0.8) * (1 - seg(t, when(9, "The voice") - 0.3, when(9, "The voice") + 0.3));
  const lookDir = t < when(9, "critical") - 0.2 ? -1 : 1;
  const lowAt = when(9, "too low");
  const critAt = when(9, "critical");
  const witAt = when(9, "The voice");
  const testAt = when(9, "it testifies");
  const benchAt = when(9, "takes the bench");
  const low = prog(t, lowAt - 0.4, 0.7);
  const crit = prog(t, critAt - 0.4, 0.7);
  // the two triggers give way to the courtroom
  const out = seg(t, witAt - 0.3, witAt + 0.3);
  const court = prog(t, witAt - 0.1, 0.8);
  const testify = prog(t, testAt, 1.4);
  const sit = prog(t, benchAt, 0.9);
  const wave = Math.sin(t * 6) * (1 - sit);
  const bx = (v: number) => 270 + 420 * v;
  const WX = 440; // the witness stand
  const JX = 1280; // the judge's bench
  return (
    <Art
      overlay={
        <>
          <Label x={480} y={362} size={30} fill={C.ink} weight={900} opacity={low * (1 - out)}>
            CONFIDENCE TOO LOW
          </Label>
          <Label x={bx(0.75)} y={590} size={24} fill={C.ink} opacity={low * (1 - out)}>
            0.75
          </Label>
          <Label x={bx(0.55)} y={478} size={26} fill={C.red} weight={900} opacity={low * (1 - out)}>
            0.55
          </Label>
          <Label x={1440} y={362} size={30} fill={C.ink} weight={900} opacity={crit * (1 - out)}>
            CRITICAL DECISION
          </Label>
          <Label x={1320} y={608} size={22} fill={C.ink} opacity={crit * (1 - out)}>
            FLIGHT DELAY
          </Label>
          <Label x={1560} y={608} size={22} fill={C.ink} opacity={crit * (1 - out)}>
            CREW CHANGE
          </Label>
          <Label x={WX} y={930} size={30} fill={C.teal} weight={900} opacity={court}>
            WITNESS: THE VOICE
          </Label>
          <Label x={JX} y={930} size={30} fill={C.gold} weight={900} opacity={sit}>
            JUDGE: A PERSON
          </Label>
        </>
      }
    >
      {/* the human in the loop: a person inside a turning ring, both triggers feed them */}
      <g opacity={person}>
        <circle cx={960} cy={470} r={165} fill="none" stroke={C.gold} strokeWidth={6} strokeDasharray="16 16" transform={`rotate(${t * 18} 960 470)`} />
        <Bust x={960} y={470} s={0.95} skin={C.skinC} shirt="#5a6aa8" kind="controller" look={lookDir} />
      </g>
      <g stroke={C.gold} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" fill="none">
        <g opacity={low * (1 - out)}>
          <path d="M748 470 L792 470 M776 454 L792 470 L776 486" strokeDasharray={low < 1 ? "10 10" : undefined} />
        </g>
        <g opacity={crit * (1 - out)}>
          <path d="M1172 470 L1128 470 M1144 454 L1128 470 L1144 486" strokeDasharray={crit < 1 ? "10 10" : undefined} />
        </g>
      </g>
      {/* trigger 1: confidence too low */}
      <g opacity={low * (1 - out)}>
        <rect x={220} y={300} width={520} height={340} rx={20} fill={C.cream} stroke={C.ink} strokeWidth={8} />
        <rect x={270} y={510} width={420} height={26} rx={13} fill={C.panel} stroke={C.ink} strokeWidth={5} />
        <rect x={272} y={512} width={mix(0, 420 * 0.55 - 4, low)} height={22} rx={11} fill={C.red} />
        <line x1={bx(0.75)} y1={496} x2={bx(0.75)} y2={552} stroke={C.gold} strokeWidth={8} strokeLinecap="round" />
      </g>
      {/* trigger 2: critical decision */}
      <g opacity={crit * (1 - out)}>
        <rect x={1180} y={300} width={520} height={340} rx={20} fill={C.cream} stroke={C.ink} strokeWidth={8} />
        <Ticket x={1320} y={500} s={1.1} flag />
        <CrewBadge x={1560} y={500} s={0.9} />
      </g>
      {/* the judge's seat: empty until a person takes the bench */}
      <g opacity={court}>
        <rect x={JX - 60} y={300} width={120} height={150} rx={18} fill={C.panel} stroke={C.ink} strokeWidth={8} />
      </g>
      <g opacity={sit} transform={`translate(0 ${mix(40, 0, sit)})`}>
        <Bust x={JX} y={400} s={1.15} skin={C.skinC} shirt="#5a6aa8" kind="controller" look={0} />
      </g>
      <g opacity={court}>
        <rect x={JX - 300} y={500} width={600} height={150} rx={16} fill={C.blue} stroke={C.ink} strokeWidth={9} />
        <rect x={JX - 300} y={486} width={600} height={30} rx={10} fill={C.gold} stroke={C.ink} strokeWidth={7} />
      </g>
      {/* the witness stand */}
      <g opacity={court}>
        <path d={`M${WX - 220} 640 L${WX + 220} 640 L${WX + 192} 900 L${WX - 192} 900 Z`} fill={C.cream} stroke={C.ink} strokeWidth={8} strokeLinejoin="round" />
        <rect x={WX - 240} y={620} width={480} height={34} rx={10} fill={C.gold} stroke={C.ink} strokeWidth={7} />
      </g>
      {/* the voice, as a witness */}
      <g opacity={court} transform={`translate(${WX} ${540 + wave * 4})`}>
        <path d="M-70 110 C-70 0 70 0 70 110" fill={C.teal} stroke={C.ink} strokeWidth={8} />
        <circle cx={0} cy={-34} r={54} fill={C.teal} stroke={C.ink} strokeWidth={8} />
        <circle cx={-18} cy={-42} r={6} fill={C.ink} />
        <circle cx={18} cy={-42} r={6} fill={C.ink} />
        <ellipse cx={0} cy={-14} rx={14} ry={Math.abs(wave) * 8 + 4} fill={C.ink} />
      </g>
      {/* the testimony travels to the bench: a card, not a ruling */}
      <g opacity={testify} transform={`translate(${mix(WX + 120, JX - 150, testify)} ${mix(600, 560, testify) - Math.sin(testify * Math.PI) * 90})`}>
        <rect x={-85} y={-34} width={170} height={68} rx={10} fill={C.cream} stroke={C.gold} strokeWidth={7} />
        <path d="M-60 -8 L60 -8 M-60 14 L14 14" stroke={C.ink} strokeOpacity={0.45} strokeWidth={6} strokeLinecap="round" />
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
