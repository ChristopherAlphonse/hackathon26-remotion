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
  PACE,
  Plane,
  Ribbon,
  Strip,
  Tick,
  handsFor,
  mix,
  prog,
  seg,
  segLin,
  useT,
} from "./art";
import { LEAD, NARR, endOf, when } from "./timing";

// Scenes 1 to 9 of presentation/educational-video-package.md (section E).

// ---------- 1 · The word ----------
export const S1: React.FC = () => {
  const t = useT();
  const zoom = mix(1, 1.14, segLin(t, 0, endOf(0)));
  // The captain's whole radio call, shown line by line as it is spoken
  const callAt = when(0, "Ground, sixteen");
  const line2At = when(0, "Maintenance is walking");
  const line3At = when(0, "Probably thirty");
  const p = seg(t, callAt - 0.1, line2At);
  const talk = t > callAt && t < LEAD + NARR[0] ? (Math.sin(t * 16) > -0.2 ? 1 : 0.15) : 0;
  const ribbon = "M1345 640 C1440 560 1500 420 1600 470 C1700 520 1700 640 1780 600 C1860 560 1880 700 1800 770";
  return (
    <Art
      overlay={
        <>
          <g opacity={prog(t, 0.4, 0.8)}>
            <rect x={110} y={84} width={640} height={64} rx={12} fill={C.cream} />
            <Label x={430} y={128} size={30} fill={C.ink}>
              WN1628 · GATE A12 · PUSH 15:40
            </Label>
          </g>
          <g opacity={prog(t, callAt - 0.2, 0.5)}>
            <rect x={200} y={826} width={1520} height={206} rx={16} fill={C.panel} fillOpacity={0.94} stroke={C.teal} strokeWidth={4} />
            <Label x={240} y={870} size={24} fill={C.teal} anchor="start" spacing={3}>
              CAPTAIN · GROUND FREQUENCY · 15:36
            </Label>
            <Label x={240} y={922} size={38} fill={C.cream} anchor="start" spacing={0.5} opacity={prog(t, callAt, 0.4)}>
              “Ground, WN1628. We have a hydraulic system two caution.
            </Label>
            <Label x={240} y={970} size={38} fill={C.cream} anchor="start" spacing={0.5} opacity={prog(t, line2At, 0.4)}>
              Maintenance is walking out to us now.
            </Label>
            <Label x={240} y={1018} size={38} fill={C.gold} anchor="start" spacing={0.5} opacity={prog(t, line3At, 0.4)}>
              Probably thirty to forty minutes before we can push.”
            </Label>
          </g>
        </>
      }
    >
      <rect width={1920} height={1080} fill="url(#dusk)" />
      <g transform={`translate(1330 650) scale(${zoom}) translate(-1330 -650)`}>
        {/* distant terminal + tower */}
        <rect x={-20} y={600} width={620} height={180} fill={C.panel} />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={20 + i * 48} y={650} width={22} height={30} fill={C.gold} opacity={0.65} />
        ))}
        <rect x={1700} y={420} width={36} height={360} fill={C.panel} />
        <rect x={1680} y={380} width={76} height={50} rx={8} fill={C.panel} stroke={C.ink} strokeWidth={5} />
        <circle cx={1718} cy={405} r={8} fill={C.gold} />
        <Ground y={770} />
        {/* wheels */}
        <g stroke={C.ink} strokeWidth={6}>
          <line x1={1316} y1={720} x2={1316} y2={744} />
          <circle cx={1316} cy={752} r={22} fill={C.ink} />
          <line x1={900} y1={720} x2={900} y2={744} />
          <circle cx={900} cy={752} r={22} fill={C.ink} />
        </g>
        <Plane
          x={40}
          y={420}
          s={2}
          windowFill={C.panel}
          cockpit={<Bust x={643} y={100} s={0.28} skin={C.skinB} shirt={C.cream} kind="pilot" talk={talk} />}
        />
        <Ribbon d={ribbon} p={p} len={0.55} />
      </g>
    </Art>
  );
};

// ---------- small figure that walks (maintenance) ----------
const Walker: React.FC<{ x: number; y: number; s?: number; step: number }> = ({ x, y, s = 1, step }) => {
  const sw = Math.sin(step) * 22;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={C.ink} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
      <line x1={-8} y1={60} x2={-8 + sw} y2={140} />
      <line x1={8} y1={60} x2={8 - sw} y2={140} />
      <rect x={-26} y={-20} width={52} height={86} rx={14} fill={C.blue} />
      <rect x={-30} y={6} width={60} height={14} fill={C.gold} stroke="none" />
      <circle cx={0} cy={-46} r={26} fill={C.skinA} />
      <path d="M-28 -52 Q0 -86 28 -52 Z" fill={C.gold} />
      <rect x={28} y={50} width={36} height={26} rx={4} fill={C.muted} />
    </g>
  );
};

// ---------- 2 · Everyone hears, the Board smiles ----------
export const S2: React.FC = () => {
  const t = useT();
  const hearsAt = when(1, "Everyone hears");
  const butAt = when(1, "But Flight");
  const pan = mix(110, -150, seg(t, 0.6, endOf(1)));
  // the sound travels while "everyone hears it" is said, and hits the glass at "But Flight Operations"
  const reach = seg(t, hearsAt, butAt);
  const ripple = segLin(t, butAt, butAt + 1.4);
  const walk = Math.max(0, t - when(1, "Everyone hears"));
  const wx = mix(700, 1000, segLin(t, hearsAt, butAt));
  const ribbon = "M-40 470 C 200 380 520 400 700 450 S 1000 480 1090 540";
  return (
    <Art>
      <rect width={1920} height={1080} fill="url(#dusk)" />
      <g transform={`translate(${pan} 0)`}>
        <Ground y={800} />
        {/* ops-room window */}
        <rect x={1120} y={200} width={660} height={560} rx={16} fill="#1c2c52" stroke={C.ink} strokeWidth={9} />
        <rect x={1140} y={220} width={620} height={520} rx={8} fill="#26396b" />
        <BoardChar x={1450} y={470} s={0.9} status="ON TIME" />
        <Hand x={1450} y={262} size={56} fill={C.teal} opacity={prog(t, when(1, "Flight Operations"), 0.6)}>
          Flight Ops system
        </Hand>
        <Hand x={1450} y={870} size={46} fill={C.cream} opacity={prog(t, when(1, "the record"), 0.6)}>
          crews · gates · connections plan from this
        </Hand>
        <path d="M1450 200 L1450 760 M1120 480 L1780 480" stroke={C.ink} strokeWidth={8} opacity={0.5} />
        {/* ramp lead + maintenance */}
        <Bust x={380} y={600} s={1.5} skin={C.skinA} shirt="#4a5f9a" kind="ramp" look={-1} talk={0} />
        <Walker x={wx} y={640} s={1.15} step={walk * 5} />
        <Ribbon d={ribbon} p={reach} len={1} />
        {/* ripples where the ribbon meets the glass */}
        {[0, 0.3, 0.6].map((d, i) => {
          const q = Math.min(1, Math.max(0, ripple - d));
          return (
            <ellipse key={i} cx={1100} cy={540} rx={20 + q * 90} ry={34 + q * 160} fill="none" stroke={C.teal} strokeWidth={6} opacity={(1 - q) * (ripple > 0 ? 0.9 : 0)} />
          );
        })}
      </g>
    </Art>
  );
};

// ---------- 3 · Two clocks ----------
export const S3: React.FC = () => {
  const t = useT();
  const run = segLin(t, when(2, "One shows"), when(2, "We're missing out"));
  const left = handsFor(15, 40 + 35 * run);
  const right = handsFor(15, 40);
  const zoom = mix(1, 1.18, seg(t, when(2, "We're missing out"), endOf(2)));
  const wob = (k: number) => Math.sin(t * 5 + k) * 6;
  const gapIn = prog(t, when(2, "We're missing out"), 0.8);
  return (
    <Art>
      <g transform={`translate(960 520) scale(${zoom}) translate(-960 -520)`}>
        <g opacity={prog(t, 0.5, 0.9)}>
          <Clock cx={560} cy={500} r={240} rim={C.teal} {...left} />
        </g>
        <g opacity={prog(t, 0.8, 0.9)}>
          <Clock cx={1360} cy={500} r={240} rim={C.gold} {...right} />
        </g>
        <Hand x={560} y={850} size={64} fill={C.teal} opacity={prog(t, when(2, "One shows"), 0.7)}>
          what is happening
        </Hand>
        <Hand x={1360} y={850} size={64} fill={C.gold} opacity={prog(t, when(2, "The other"), 0.7)}>
          our current systems
        </Hand>
        <Hand x={560} y={925} size={44} fill={C.cream} opacity={prog(t, when(2, "this flight"), 0.7)}>
          WN1628 is really leaving ~16:15
        </Hand>
        <Hand x={1360} y={925} size={44} fill={C.cream} opacity={prog(t, when(2, "The other"), 0.7)}>
          Flight Ops: WN1628 on time 15:40
        </Hand>
        {/* the gap */}
        <g opacity={gapIn}>
          <path d="M850 500 L1070 500" stroke={C.cream} strokeWidth={5} strokeDasharray="14 12" />
          <path d="M850 500 l24 -16 M850 500 l24 16 M1070 500 l-24 -16 M1070 500 l-24 16" stroke={C.cream} strokeWidth={5} strokeLinecap="round" />
          <g transform={`translate(0 ${wob(0)})`}>
            <CrewBadge x={960} y={330} s={0.55} />
          </g>
          <g transform={`translate(0 ${wob(2)})`}>
            <BoardingPass x={960} y={640} s={0.6} rot={wob(1)} />
          </g>
          <g transform={`translate(0 ${wob(4)})`}>
            <GateSign x={960} y={760} s={0.5} />
          </g>
        </g>
      </g>
    </Art>
  );
};

// ---------- 4 · The question ----------
export const S4: React.FC = () => {
  const t = useT();
  const hearAt = when(3, "Could the system");
  const listenAt = when(3, "and listen");
  const p = seg(t, hearAt, listenAt);
  const lean = seg(t, listenAt, endOf(3));
  const handUp = seg(t, listenAt, endOf(3));
  const ribbon = "M520 440 C760 330 880 590 1120 450 C1180 420 1230 430 1290 450";
  return (
    <Art>
      <g opacity={prog(t, 0.3, 0.8)}>
        <Clock cx={360} cy={450} r={170} rim={C.teal} {...handsFor(16, 12)} />
      </g>
      {/* the second clock has become an ear */}
      <g transform={`translate(${mix(0, 22, lean)} 0)`} opacity={prog(t, 0.5, 0.9)}>
        <path
          d="M1300 360 C1300 250 1460 230 1490 350 C1515 440 1440 500 1420 560 C1404 612 1345 640 1312 596"
          fill={C.cream}
          stroke={C.ink}
          strokeWidth={9}
          strokeLinejoin="round"
        />
        <path d="M1352 380 C1362 338 1426 346 1432 396 C1436 438 1388 466 1378 520" fill="none" stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
        <circle cx={1470} cy={560} r={0} />
      </g>
      <Ribbon d={ribbon} p={p} len={1} />
      {/* the dial: a needle that swings toward "decide" but is held back */}
      <g opacity={prog(t, when(3, "and listen"), 0.8)}>
        <circle cx={960} cy={830} r={130} fill={C.panel} stroke={C.cream} strokeWidth={9} />
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={i} x1={0} y1={-112} x2={0} y2={-92} stroke={C.cream} strokeWidth={7} strokeLinecap="round" transform={`translate(960 830) rotate(${-120 + i * 24})`} />
        ))}
        <line x1={960} y1={830} x2={960} y2={745} stroke={C.gold} strokeWidth={12} strokeLinecap="round" transform={`rotate(${mix(-100, -20, handUp)} 960 830)`} />
        <circle cx={960} cy={830} r={14} fill={C.gold} stroke={C.ink} strokeWidth={5} />
      </g>
      {/* hand-lettered question */}
      <Hand x={960} y={180} size={96} fill={C.cream} opacity={prog(t, hearAt, 0.7)}>
        Could the system hear it?
      </Hand>
      <Hand x={960} y={300} size={80} fill={C.gold} opacity={prog(t, when(3, "without taking"), 0.7)}>
        ...without it taking over?
      </Hand>
    </Art>
  );
};

// ---------- 5 · Step one: hear ----------
export const S5: React.FC = () => {
  const t = useT();
  const drops = [when(4, "how clean"), when(4, "how plausible"), when(4, "at an airport")];
  const levels = drops.map((d) => prog(t, d + 0.7, 0.7));
  const value = 0.22 * levels[0] + 0.3 * levels[1] + 0.42 * levels[2];
  const conf = value + (value > 0.9 ? 0.0 : 0) ;
  const needle = mix(-90, 90, Math.min(0.94, conf));
  const gx = 960;
  const gy = 820;
  const feeders = [
    { x: 560, label: "audio quality", d: drops[0] },
    { x: 960, label: "the words", d: drops[1] },
    { x: 1360, label: "airport sense", d: drops[2] },
  ];
  return (
    <Art
      overlay={
        <>
          <Label x={gx} y={936} size={104} fill={C.gold} weight={900} opacity={levels[2]}>
            {(Math.min(0.94, conf)).toFixed(2)}
          </Label>
          {feeders.map((f) => (
            <Label key={f.label} x={f.x} y={560} size={28} opacity={prog(t, f.d - 0.4, 0.6)}>
              {f.label.toUpperCase()}
            </Label>
          ))}
        </>
      }
    >
      <g transform={`translate(0 ${mix(-160, 0, prog(t, 0.4, 0.9))})`} opacity={prog(t, 0.4, 0.7)}>
        <Strip x={960} y={250} w={980} h={160} lines={3} seed={2} />
      </g>
      {/* feeders */}
      {feeders.map((f, i) => {
        const o = prog(t, f.d - 0.5, 0.6);
        const fall = prog(t, f.d + 0.1, 0.8);
        return (
          <g key={f.label} opacity={o}>
            {i === 0 ? (
              <path d="M500 450 l20 -30 l20 60 l20 -90 l20 90 l20 -60 l20 30" fill="none" stroke={C.teal} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
            ) : null}
            {i === 1 ? (
              <g stroke={C.ink} strokeWidth={6}>
                <rect x={900} y={420} width={110} height={50} rx={6} fill={C.cream} />
                <circle cx={1000} cy={440} r={34} fill="#bdeaff" fillOpacity={0.6} />
                <line x1={1024} y1={466} x2={1052} y2={496} strokeWidth={10} strokeLinecap="round" />
              </g>
            ) : null}
            {i === 2 ? (
              <g stroke={C.ink} strokeWidth={6} strokeLinejoin="round">
                <rect x={1290} y={420} width={150} height={60} fill={C.panel} />
                <rect x={1380} y={380} width={22} height={60} fill={C.panel} />
                <circle cx={1391} cy={376} r={14} fill={C.gold} />
              </g>
            ) : null}
            <circle cx={mix(f.x, gx, fall)} cy={mix(500, gy - 30, fall * fall)} r={18} fill={C.gold} stroke={C.ink} strokeWidth={5} opacity={fall > 0 && fall < 1 ? 1 : 0} />
          </g>
        );
      })}
      {/* gauge */}
      <g opacity={prog(t, 0.9, 0.8)}>
        <path d={`M${gx - 230} ${gy} A230 230 0 0 1 ${gx + 230} ${gy}`} fill="none" stroke={C.ink} strokeWidth={46} strokeLinecap="round" />
        <path d={`M${gx - 230} ${gy} A230 230 0 0 1 ${gx + 230} ${gy}`} fill="none" stroke={C.cream} strokeWidth={34} strokeLinecap="round" />
        <path d={`M${gx - 230} ${gy} A230 230 0 0 1 ${gx + 230} ${gy}`} fill="none" stroke={C.teal} strokeWidth={34} strokeLinecap="round" pathLength={1} strokeDasharray={`${Math.min(0.94, conf)} 2`} />
        <g transform={`rotate(${needle} ${gx} ${gy})`}>
          <line x1={gx} y1={gy} x2={gx} y2={gy - 190} stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
          <line x1={gx} y1={gy} x2={gx} y2={gy - 190} stroke={C.gold} strokeWidth={7} strokeLinecap="round" />
        </g>
        <circle cx={gx} cy={gy} r={22} fill={C.gold} stroke={C.ink} strokeWidth={6} />
      </g>
    </Art>
  );
};

// ---------- 7 · Step two: who owns this? ----------
export const S7: React.FC = () => {
  const t = useT();
  const cards = [
    { x: 700, name: "FLIGHT OPS", w: 26, score: "0.92", at: when(5, "ninety-two") },
    { x: 960, name: "GATES", w: 3, score: "", at: 0 },
    { x: 1220, name: "RAMP", w: 3, score: "", at: 0 },
    { x: 1480, name: "CREW", w: 12, score: "0.41", at: when(5, "Runners-up") },
    { x: 1740, name: "CONNECTIONS", w: 8, score: "0.34", at: when(5, "Other desks") },
  ];
  const shoot = when(5, "Hydraulic");
  const zoom = mix(1, 1.06, seg(t, 0, endOf(5)));
  const zoomT = `translate(960 520) scale(${zoom}) translate(-960 -520)`;
  return (
    <Art
      overlay={
        // the overlay sits outside the zoomed drawing, so it needs the same zoom or the names and scores drift off their cards
        <g transform={zoomT}>
          {cards.map((c) => (
            <Label key={c.name} x={c.x} y={760} size={24} fill={C.cream} opacity={prog(t, 0.6, 0.7)}>
              {c.name}
            </Label>
          ))}
          {cards
            .filter((c) => c.score)
            .map((c) => (
              <g key={c.score} opacity={prog(t, c.at, 0.5)}>
                <rect x={c.x - 56} y={650} width={112} height={54} rx={12} fill={C.gold} />
                <Label x={c.x} y={690} size={34} fill={C.ink} weight={900}>
                  {c.score}
                </Label>
              </g>
            ))}
        </g>
      }
    >
      <g transform={zoomT}>
        <g opacity={prog(t, 0.3, 0.7)}>
          <Strip x={250} y={560} w={380} h={120} lines={3} seed={5} />
        </g>
        {cards.map((c, i) => {
          const lead = c.w > 10;
          const draw = prog(t, shoot + i * 0.28, 0.8);
          const d = `M250 500 C250 ${240 - i * 22}, ${c.x} ${240 - i * 22}, ${c.x} 400`;
          return (
            <g key={c.name}>
              <path d={d} pathLength={1} fill="none" stroke={C.ink} strokeWidth={c.w + 8} strokeLinecap="round" strokeDasharray={`${draw} 2`} opacity={0.9} />
              <path d={d} pathLength={1} fill="none" stroke={lead ? C.teal : "#5aa7d0"} strokeWidth={c.w} strokeLinecap="round" strokeDasharray={`${draw} 2`} opacity={c.w > 4 ? 1 : 0.5} />
              <g opacity={prog(t, 0.4 + i * 0.12, 0.6)}>
                <rect x={c.x - 110} y={400} width={220} height={330} rx={16} fill={i === 0 && t > shoot + 1 ? C.panel : C.panel} stroke={i === 0 ? C.gold : C.ink} strokeWidth={i === 0 ? 9 : 7} />
                {i === 0 ? (
                  <g stroke={C.ink} strokeWidth={5}>
                    {[0, 1, 2].map((k) => (
                      <g key={k}>
                        <rect x={c.x - 76} y={456 + k * 62} width={152} height={46} rx={6} fill={C.cream} />
                        <rect x={c.x - 76} y={456 + k * 62} width={34} height={46} rx={6} fill={k === 0 ? C.gold : C.blue} />
                      </g>
                    ))}
                  </g>
                ) : null}
                {i === 1 ? <GateSign x={c.x} y={540} s={1.1} /> : null}
                {i === 2 ? (
                  <g stroke={C.ink} strokeWidth={5}>
                    <rect x={c.x - 80} y={540} width={160} height={70} rx={6} fill={C.blue} />
                    <rect x={c.x - 56} y={492} width={52} height={48} fill={C.gold} />
                    <rect x={c.x + 8} y={504} width={46} height={36} fill={C.cream} />
                    <circle cx={c.x - 50} cy={628} r={18} fill={C.ink} />
                    <circle cx={c.x + 50} cy={628} r={18} fill={C.ink} />
                  </g>
                ) : null}
                {i === 3 ? <CrewBadge x={c.x} y={540} s={0.95} /> : null}
                {i === 4 ? <BoardingPass x={c.x} y={560} s={1.0} /> : null}
              </g>
            </g>
          );
        })}
      </g>
    </Art>
  );
};

// ---------- 8 · The receipt ----------
export const S8: React.FC = () => {
  const t = useT();
  const sweep = prog(t, when(6, "exact sentence"), 1.6);
  const receipt = prog(t, when(6, "behind the routing"), 0.9);
  const check = prog(t, when(6, "on trust"), 0.6);
  const lens = prog(t, when(6, "Nobody takes"), 1.4);
  return (
    <Art
      overlay={
        <>
          <text x={960} y={640} textAnchor="middle" fontFamily="Inter, sans-serif" fontStyle="italic" fontWeight={500} fontSize={38} fill={C.cream} opacity={sweep}>
            “…hydraulic system two caution, maintenance is heading out,
          </text>
          <text x={960} y={692} textAnchor="middle" fontFamily="Inter, sans-serif" fontStyle="italic" fontWeight={500} fontSize={38} fill={C.cream} opacity={sweep}>
            probably a thirty to forty minute delay”
          </text>
        </>
      }
    >
      <g opacity={prog(t, 0.3, 0.8)}>
        <Strip x={960} y={380} w={1500} h={200} lines={3} seed={6} />
      </g>
      <rect x={470} y={312} width={mix(0, 980, sweep)} height={136} rx={10} fill={C.gold} fillOpacity={0.55} />
      <Hand x={960} y={190} size={70} fill={C.gold} opacity={sweep}>
        word for word
      </Hand>
      {/* receipt tag */}
      <g transform={`translate(${mix(1100, 1560, receipt)} ${mix(560, 850, receipt)}) rotate(${mix(-14, 4, receipt)})`} opacity={receipt}>
        <rect x={-230} y={-82} width={460} height={164} rx={12} fill={C.cream} stroke={C.ink} strokeWidth={6} />
        <rect x={-240} y={-100} width={70} height={36} rx={8} fill={C.gold} stroke={C.ink} strokeWidth={5} />
        <Strip x={0} y={8} w={380} h={90} lines={2} seed={6} fill="#fff7e6" />
      </g>
      {/* magnifier comparing the two */}
      <g transform={`translate(${mix(960, 1540, lens)} ${mix(400, 850, lens)})`} opacity={lens > 0 ? 1 : 0}>
        <circle r={74} fill="#bdeaff" fillOpacity={0.25} stroke={C.ink} strokeWidth={12} />
        <line x1={52} y1={52} x2={118} y2={118} stroke={C.ink} strokeWidth={18} strokeLinecap="round" />
        <Tick x={0} y={0} s={1.1} p={check} />
      </g>
    </Art>
  );
};

// ---------- 9 · Step three: compare ----------
export const S9: React.FC = () => {
  const t = useT();
  const drop = prog(t, when(7, "Contradict"), 1.4);
  const tilt = prog(t, when(7, "Contradict") + 1.1 / PACE, 1.1);
  const a = (tilt * 11 * Math.PI) / 180;
  const beamY = (x: number) => 430 + (x - 960) * Math.tan(a);
  const pans = [
    { x: 740, label: "MATCH", at: when(7, "Agree") },
    { x: 960, label: "NEW INFO", at: when(7, "Add something") },
    { x: 1180, label: "DISCREPANCY", at: when(7, "Contradict") },
  ];
  const pulse = (at: number) => Math.max(0, 1 - Math.abs(t - at - 0.5) * 1.2);
  const ticket = {
    x: mix(1620, 1180, drop),
    y: mix(230, beamY(1180) + 170 - 40, drop * drop),
  };
  const thread = prog(t, when(7, "that gap"), 1.0);
  const flapPulse = prog(t, when(7, "flight system"), 0.6);
  return (
    <Art
      overlay={
        <>
          {pans.map((p) => (
            <Label key={p.label} x={p.x + 150} y={850} size={26} fill={C.cream}>
              {p.label}
            </Label>
          ))}
        </>
      }
    >
      <g transform="translate(150 0)">
      <g>
        <BoardChar x={300} y={470} s={0.78} status="ON TIME" />
      </g>
      {flapPulse > 0 && flapPulse < 1 ? <circle cx={300} cy={560} r={mix(60, 220, flapPulse)} fill="none" stroke={C.gold} strokeWidth={6} opacity={1 - flapPulse} /> : null}
      {/* beam */}
      <line x1={960} y1={430} x2={960} y2={690} stroke={C.ink} strokeWidth={22} />
      <line x1={600} y1={beamY(600)} x2={1320} y2={beamY(1320)} stroke={C.cream} strokeWidth={22} strokeLinecap="round" />
      <circle cx={960} cy={430} r={26} fill={C.gold} stroke={C.ink} strokeWidth={7} />
      {pans.map((p, i) => {
        const y = beamY(p.x);
        const glow = pulse(p.at);
        return (
          <g key={p.label}>
            <path d={`M${p.x} ${y} L${p.x - 70} ${y + 190} M${p.x} ${y} L${p.x + 70} ${y + 190}`} stroke={C.cream} strokeWidth={5} />
            <path d={`M${p.x - 100} ${y + 190} Q${p.x} ${y + 270} ${p.x + 100} ${y + 190} Z`} fill={C.muted} stroke={C.ink} strokeWidth={7} />
            <g transform={`translate(${p.x} ${y + 120}) scale(${1 + glow * 0.25})`}>
              {i === 0 ? <Tick x={0} y={0} s={1.2} /> : null}
              {i === 1 ? (
                <g stroke={C.ink} strokeWidth={6}>
                  <circle cx={0} cy={-6} r={26} fill={C.teal} />
                  <rect x={-14} y={20} width={28} height={16} fill={C.muted} />
                </g>
              ) : null}
              {i === 2 ? (
                <g stroke={C.ink} strokeWidth={6}>
                  <line x1={-10} y1={-34} x2={-10} y2={40} />
                  <path d="M-10 -34 L36 -20 L-10 -2 Z" fill={C.red} />
                </g>
              ) : null}
            </g>
          </g>
        );
      })}
      {/* ticket */}
      <g transform={`translate(${ticket.x} ${ticket.y}) rotate(${mix(-8, 0, drop)})`} opacity={prog(t, 0.4, 0.8)}>
        <rect x={-90} y={-54} width={180} height={108} rx={10} fill={C.cream} stroke={C.ink} strokeWidth={6} />
        <rect x={-90} y={-54} width={180} height={26} fill={C.red} stroke={C.ink} strokeWidth={6} />
        <path d="M-60 0 L56 0 M-60 22 L20 22" stroke={C.ink} strokeOpacity={0.55} strokeWidth={6} strokeLinecap="round" />
      </g>
      {/* the red thread: the gap */}
      <path d={`M${ticket.x - 60} ${ticket.y + 40} Q ${(ticket.x + 300) / 2} ${mix(780, 760, thread)} 380 640`} fill="none" pathLength={1} stroke={C.red} strokeWidth={9} strokeLinecap="round" strokeDasharray={`${thread} 2`} filter="url(#glow)" />
      <Hand x={810} y={960} size={64} fill={C.gold} opacity={thread}>
        the gap is the point
      </Hand>
      </g>
    </Art>
  );
};
