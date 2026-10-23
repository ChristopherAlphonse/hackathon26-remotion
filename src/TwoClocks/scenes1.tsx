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
import { NARR, when } from "./timing";

// Scenes 1 to 9 of presentation/educational-video-package.md (section E).

// ---------- hydraulic actuator: pops in as the pilot says "hydraulic" ----------
const HydraulicActuator: React.FC<{ x: number; y: number; t: number; at: number }> = ({ x, y, t, at }) => {
  const pop = prog(t, at - 0.15, 0.5);
  const ext = 0.5 - 0.5 * Math.cos(Math.max(0, t - at) * 3.2); // piston strokes in and out
  const px = mix(-110, -40, ext); // piston head
  const flow = (t * 1.4) % 1; // fluid dots moving along the hoses
  const hose = (d: string) => (
    <>
      <path d={d} fill="none" stroke={C.ink} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={C.teal} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${pop})`} opacity={pop}>
      <rect x={-210} y={-115} width={420} height={170} rx={22} fill={C.panel} stroke={C.ink} strokeWidth={6} />
      {hose("M-110 -32 V-80 H-175")}
      {hose("M10 -32 V-80 H75")}
      <circle cx={mix(-110, -175, flow)} cy={flow < 0.5 ? mix(-32, -80, flow * 2) : -80} r={5} fill={C.cream} />
      <circle cx={mix(10, 75, flow)} cy={flow < 0.5 ? mix(-32, -80, flow * 2) : -80} r={5} fill={C.cream} />
      {/* fluid, piston and rod inside the cylinder */}
      <rect x={-165} y={-32} width={200} height={64} rx={10} fill={C.blue} stroke={C.ink} strokeWidth={6} />
      <rect x={-155} y={-22} width={px + 155} height={44} rx={4} fill={C.teal} opacity={0.85} />
      <rect x={px} y={-30} width={12} height={60} fill={C.cream} stroke={C.ink} strokeWidth={4} />
      <rect x={px + 12} y={-9} width={150} height={18} fill={C.muted} stroke={C.ink} strokeWidth={5} />
      <rect x={28} y={-32} width={14} height={64} rx={4} fill={C.blueDark} stroke={C.ink} strokeWidth={5} />
      <circle cx={-180} cy={0} r={13} fill={C.gold} stroke={C.ink} strokeWidth={5} />
      <circle cx={px + 172} cy={0} r={13} fill={C.gold} stroke={C.ink} strokeWidth={5} />
      {/* a drop and a caution triangle: the fluid is the trouble */}
      <path d="M-30 -96 C-14 -76 -10 -64 -30 -56 C-50 -64 -46 -76 -30 -96 Z" fill={C.teal} stroke={C.ink} strokeWidth={5} />
      <path d="M150 -70 L180 -20 L120 -20 Z" fill={C.gold} stroke={C.ink} strokeWidth={5} strokeLinejoin="round" />
      <line x1={150} y1={-56} x2={150} y2={-38} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      <circle cx={150} cy={-29} r={3.5} fill={C.ink} />
    </g>
  );
};

// ---------- 1 · The word ----------
export const S1: React.FC = () => {
  const t = useT();
  const zoom = mix(1, 1.14, lin(t, 0, NARR[0] + 1));
  const said = when(0, "hydraulic");
  const p = prog(t, said - 0.1, 1.6);
  const talk = t > said - 0.4 && t < said + 0.5 ? 1 : 0;
  const ribbon = "M1345 640 C1440 560 1500 420 1600 470 C1700 520 1700 640 1780 600 C1860 560 1880 700 1800 770";
  // arrow: starts at the bottom of the hydraulic card (screen 860,350), drawn in plane coordinates so it zooms with the plane
  const arrow = prog(t, said + 0.1, 0.5);
  const start = { x: 1330 + (860 - 1330) / zoom, y: 650 + (350 - 650) / zoom };
  const tgt = { x: 770, y: 740 };
  const R = 125;
  const dx = tgt.x - start.x, dy = tgt.y - start.y, dist = Math.hypot(dx, dy);
  const end = { x: tgt.x - (dx / dist) * R, y: tgt.y - (dy / dist) * R };
  const tip = { x: mix(start.x, end.x, arrow), y: mix(start.y, end.y, arrow) };
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
  return (
    <Art
      overlay={
        <>
          <g opacity={prog(t, 0.4, 0.8)}>
            <rect x={110} y={84} width={330} height={64} rx={12} fill={C.cream} />
            <Label x={275} y={128} size={30} fill={C.ink}>
              SCHEDULED 15:40
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
        {/* arrow from the hydraulic card to the part of the plane it runs through (wing, flaps, landing gear) */}
        {arrow > 0 && (
          <g opacity={Math.min(1, arrow * 3)}>
            <circle cx={tgt.x} cy={tgt.y} r={R * (1 + 0.05 * Math.sin(t * 6))} fill={C.red} fillOpacity={0.18} stroke={C.red} strokeWidth={8} strokeDasharray="24 14" />
            <line x1={start.x} y1={start.y} x2={tip.x} y2={tip.y} stroke={C.ink} strokeWidth={22} strokeLinecap="round" />
            <line x1={start.x} y1={start.y} x2={tip.x} y2={tip.y} stroke={C.gold} strokeWidth={11} strokeLinecap="round" />
            <polygon points="8,0 -36,-26 -36,26" transform={`translate(${tip.x} ${tip.y}) rotate(${ang})`} fill={C.gold} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
          </g>
        )}
        <Hand x={1600} y={380} size={92} fill={C.teal} rotate={-6} opacity={prog(t, said + 0.5, 0.6)}>
          hydraulic
        </Hand>
      </g>
      <HydraulicActuator x={860} y={290} t={t} at={said} />

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
  const pan = mix(110, -150, prog(t, 0.6, NARR[1]));
  const reach = prog(t, 0.3, 2.6);
  const ripple = lin(t, 3.0, 1.6);
  const walk = Math.max(0, t - when(1, "Maintenance"));
  const wx = mix(700, 1000, lin(t, when(1, "Maintenance"), 3.2));
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
  const run = lin(t, when(2, "One shows"), 7.0);
  const left = handsFor(15, 40 + 35 * run);
  const right = handsFor(15, 40);
  const zoom = mix(1, 1.18, prog(t, when(2, "And in the gap"), 4.5));
  const wob = (k: number) => Math.sin(t * 5 + k) * 6;
  const gapIn = prog(t, when(2, "And in the gap"), 0.8);
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
          what is typed in
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
// Staged so only a couple of things are on screen at once: ramp -> system -> (ramp leaves) -> gate + controller.
export const S4: React.FC = () => {
  const t = useT();
  const hearAt = when(3, "Could the system");
  const ifAt = when(3, "And if it could");
  const letAt = when(3, "how do you");
  const gateAt = when(3, "without letting");
  const rampOut = 1 - prog(t, ifAt, 0.7);
  const rampIn = prog(t, 0.3, 0.8) * rampOut;
  const sysIn = prog(t, hearAt, 0.8);
  const recIn = prog(t, letAt, 0.8);
  const shift = -120 * prog(t, ifAt, 0.9);
  const listening = t >= 0.9;
  const lt = Math.max(0, t - 0.9);
  const talk = listening && rampOut > 0.5 ? 0.5 + 0.5 * Math.sin(t * 11) : 0;
  // sound waves leave the ramp worker's mouth and travel to the system
  const mouth = { x: 470, y: 548 };
  const waves = [0, 1, 2].map((i) => {
    const ph = (lt * 0.7 + i / 3) % 1;
    const r = 30 + ph * 300;
    const pt = (s: number) => `${mouth.x + Math.cos(s * 0.6) * r} ${mouth.y + Math.sin(s * 0.6) * r}`;
    return { d: `M${pt(-1)} A${r} ${r} 0 0 1 ${pt(1)}`, o: listening ? Math.min(1, ph * 6) * (1 - ph) : 0 };
  });
  // the system's reply: a gold pulse that heads for the record but is stopped at the gate
  const startX = 1135 + shift;
  const pulseX = mix(startX, 1205, lin(t, letAt + 0.5, 1.5));
  const pulseR = 16 * (1 - prog(t, gateAt + 0.7, 0.5));
  const closed = prog(t, gateAt, 0.7);
  const armDeg = mix(-82, 0, closed);
  return (
    <Art>
      <g transform="translate(0 70)">
        {/* the ramp: someone talking on the radio, and what they know */}
        <g opacity={rampIn}>
          <Bust x={330} y={540} s={1.6} skin={C.skinB} shirt={C.blue} kind="ramp" look={1} talk={talk} />
          {waves.map((w, i) => (
            <path key={i} d={w.d} fill="none" stroke={C.teal} strokeWidth={14} strokeLinecap="round" opacity={w.o} />
          ))}
        </g>
        {/* the system: a screen that listens */}
        <g opacity={sysIn} transform={`translate(${shift} 0)`}>
          <rect x={780} y={440} width={340} height={230} rx={20} fill={C.panel} stroke={C.cream} strokeWidth={9} />
          <rect x={930} y={670} width={40} height={40} fill={C.cream} stroke={C.ink} strokeWidth={5} />
          <rect x={880} y={706} width={140} height={22} rx={8} fill={C.cream} stroke={C.ink} strokeWidth={5} />
          {Array.from({ length: 9 }).map((_, i) => {
            const h = t >= hearAt ? 18 + 70 * Math.abs(Math.sin(t * 6 + i * 1.7)) * Math.abs(Math.sin(i * 0.9 + 1)) + 10 : 10;
            return <rect key={i} x={812 + i * 30} y={600 - h} width={18} height={h} rx={6} fill={C.teal} />;
          })}
        </g>
        {/* the person who decides, on the far side of the gate */}
        <g opacity={recIn}>
          <Bust x={1610} y={540} s={1.6} skin={C.skinA} shirt={C.blueDark} kind="controller" look={-1} />
        </g>
        {/* the gate between the system and the record */}
        <g opacity={recIn}>
          <g transform={`translate(1248 712) rotate(${armDeg})`}>
            <rect x={-14} y={-200} width={28} height={200} rx={8} fill={C.cream} stroke={C.ink} strokeWidth={5} />
            {[30, 85, 140].map((y) => (
              <rect key={y} x={-14} y={-y - 30} width={28} height={30} fill={C.red} />
            ))}
          </g>
          <circle cx={1248} cy={712} r={20} fill={C.gold} stroke={C.ink} strokeWidth={5} />
        </g>
        {/* the pulse the system wants to send, held back at the gate */}
        {t > letAt + 0.5 && pulseR > 0.5 ? <circle cx={pulseX} cy={548} r={pulseR} fill={C.gold} stroke={C.ink} strokeWidth={5} /> : null}
      </g>
      {/* one hand-lettered line at a time */}
      <Hand x={960} y={180} size={96} fill={C.cream} opacity={prog(t, hearAt, 0.7) * (1 - prog(t, gateAt - 0.3, 0.5))}>
        Could the system hear it?
      </Hand>
      <Hand x={960} y={180} size={84} fill={C.gold} opacity={prog(t, gateAt + 0.1, 0.7)}>
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

// ---------- 6 · Thirty to forty becomes thirty-five ----------
export const S6: React.FC = () => {
  const t = useT();
  const range = prog(t, when(5, "Probably"), 1.0);
  const pin = prog(t, when(5, "thirty-five"), 1.0);
  const lid = prog(t, when(5, "stay untouched"), 0.9);
  const x0 = 300;
  const x1 = 1100;
  const rx = 1520;
  return (
    <Art
      overlay={
        <>
          <Label x={x0} y={636} size={44} fill={C.cream}>
            30
          </Label>
          <Label x={x1} y={636} size={44} fill={C.cream}>
            40
          </Label>
          <Label x={(x0 + x1) / 2} y={636} size={64} fill={C.gold} weight={900} opacity={pin}>
            35
          </Label>
          <Label x={rx} y={780} size={26} opacity={lid}>
            ORIGINAL WORDS, NEVER EDITED
          </Label>
        </>
      }
    >
      {/* ruler */}
      <g opacity={prog(t, 0.4, 0.8)}>
        <rect x={x0 - 40} y={500} width={x1 - x0 + 80} height={90} rx={10} fill={C.cream} stroke={C.ink} strokeWidth={7} />
        {Array.from({ length: 21 }).map((_, i) => (
          <line key={i} x1={x0 + (i * (x1 - x0)) / 20} y1={500} x2={x0 + (i * (x1 - x0)) / 20} y2={i % 5 === 0 ? 548 : 530} stroke={C.ink} strokeWidth={i % 5 === 0 ? 6 : 4} />
        ))}
      </g>
      {/* stretchy range */}
      <rect x={x0} y={452} width={(x1 - x0) * range} height={34} rx={17} fill={C.gold} fillOpacity={0.35} stroke={C.gold} strokeWidth={5} />
      <Hand x={(x0 + x1) / 2} y={335} size={58} fill={C.cream} opacity={range}>
        "probably thirty to forty"
      </Hand>
      {/* pin */}
      <g transform={`translate(${mix(x0, (x0 + x1) / 2, pin)} ${mix(380, 0, 1) + mix(-24, 0, pin)})`} opacity={pin > 0 ? 1 : 0}>
        <path d="M0 470 L-22 428 A28 28 0 1 1 22 428 Z" fill={C.gold} stroke={C.ink} strokeWidth={6} />
        <circle cx={0} cy={410} r={9} fill={C.ink} />
      </g>
      {/* glass case */}
      <g opacity={prog(t, 0.6, 0.8)}>
        <rect x={rx - 250} y={430} width={500} height={260} rx={14} fill="#bdeaff" fillOpacity={0.15} stroke={C.teal} strokeWidth={7} />
        <Strip x={rx} y={590} w={400} h={90} lines={2} seed={3} />
        <g transform={`rotate(${mix(-52, 0, lid)} ${rx - 250} 430)`}>
          <rect x={rx - 260} y={412} width={520} height={30} rx={10} fill={C.teal} stroke={C.ink} strokeWidth={6} />
        </g>
      </g>
    </Art>
  );
};

// ---------- 7 · Step two: who owns this? ----------
export const S7: React.FC = () => {
  const t = useT();
  const cards = [
    { x: 700, name: "FLIGHT OPS", w: 26, score: "0.92", at: when(6, "ninety-two") },
    { x: 960, name: "GATES", w: 3, score: "", at: 0 },
    { x: 1220, name: "RAMP", w: 3, score: "", at: 0 },
    { x: 1480, name: "CREW", w: 12, score: "0.41", at: when(6, "forty-one") },
    { x: 1740, name: "CONNECTIONS", w: 8, score: "0.34", at: when(6, "thirty-four") },
  ];
  const shoot = when(6, "Hydraulic");
  const zoom = mix(1, 1.25, prog(t, NARR[6] - 3.2, 2.4));
  const zoomT = `translate(700 520) scale(${zoom}) translate(-700 -520)`;
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
  const sweep = prog(t, when(7, "the sentence"), 1.6);
  const receipt = prog(t, when(7, "quoted word"), 0.9);
  const check = prog(t, when(7, "They can read"), 0.6);
  const lens = prog(t, when(7, "Nobody has"), 1.4);
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
  const drop = prog(t, when(8, "contradicts"), 1.4);
  const tilt = prog(t, when(8, "contradicts") + 1.1, 1.1);
  const a = (tilt * 11 * Math.PI) / 180;
  const beamY = (x: number) => 430 + (x - 960) * Math.tan(a);
  const pans = [
    { x: 740, label: "MATCH", at: when(8, "agrees") },
    { x: 960, label: "NEW INFO", at: when(8, "adds something") },
    { x: 1180, label: "DISCREPANCY", at: when(8, "contradicts") },
  ];
  const pulse = (at: number) => Math.max(0, 1 - Math.abs(t - at - 0.5) * 1.2);
  const ticket = {
    x: mix(1620, 1180, drop),
    y: mix(230, beamY(1180) + 170 - 40, drop * drop),
  };
  const thread = prog(t, when(8, "that gap"), 1.0);
  const flapPulse = prog(t, when(8, "Look up"), 0.6);
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
