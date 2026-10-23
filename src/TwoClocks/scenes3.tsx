import React from "react";
import { Art, Bust, C, Clock, Hand, Label, Ribbon, Strip, Tick, handsFor, mix, prog, seg, useT } from "./art";
import { endOf, when } from "./timing";

// Scenes after the demo (video1): the value (index 13), the rollout plan (14) and the conclusion (15).
// Everything is cued to the spoken words with when(); lines that are only on screen are not in the narration.

// ---------- 17 · What earlier awareness is worth ----------
export const S17: React.FC = () => {
  const t = useT();
  const title = prog(t, when(13, "What is earlier") - 0.1, 0.8);
  // The impact leads. The numbers land as they are spoken; the calculation is a quiet line that only appears after them.
  const aFrom = when(13, "two hundred");
  const aTo = when(13, "aircraft minutes") + 0.3;
  const bFrom = when(13, "roughly");
  const bTo = when(13, "dollars") + 0.5;
  const pA = seg(t, aFrom, aTo);
  const pB = seg(t, bFrom, bTo);
  const cardA = prog(t, aFrom - 0.5, 0.7);
  const cardB = prog(t, bFrom - 0.5, 0.7);
  const calc = prog(t, when(13, "It starts with"), 0.9);
  const tagsHead = prog(t, when(13, "That time can come") - 0.1, 0.6);
  // each tag lands on the word that names it
  const tags: { s: string; at: number }[][] = [
    [
      { s: "Maintenance delays", at: when(13, "maintenance") - 0.1 },
      { s: "Turn delays", at: when(13, "turns") - 0.1 },
      { s: "Fueling · cleaning · bags · pushback", at: when(13, "turns") + 0.25 },
      { s: "Gate conflicts", at: when(13, "gates") - 0.1 },
    ],
    [
      { s: "Crew impacts", at: when(13, "crews") - 0.1 },
      { s: "Misconnect risk", at: when(13, "connections") - 0.1 },
      { s: "IROPs coordination", at: when(13, "connections") + 0.3 },
    ],
  ];
  const tagW = (s: string) => s.length * 12.5 + 44;
  const tagItems = tags.flatMap((row, r) => {
    const total = row.reduce((a, g) => a + tagW(g.s), 0) + (row.length - 1) * 24;
    let x = 960 - total / 2;
    return row.map((g) => {
      const w = tagW(g.s);
      const item = { s: g.s, x, w, y: 800 + r * 54, o: prog(t, g.at, 0.5) };
      x += w + 24;
      return item;
    });
  });
  const note = prog(t, bTo, 0.8);
  return (
    <Art
      overlay={
        <>
          <Hand x={960} y={140} size={92} fill={C.gold} opacity={title}>
            Earlier awareness = operational value
          </Hand>
          <g opacity={cardA}>
            <Label x={500} y={392} size={150} fill={C.gold} weight={900} spacing={-2} opacity={pA > 0 ? 1 : 0}>
              {`~${Math.round(219 * pA)}K`}
            </Label>
            <Label x={500} y={460} size={26} fill={C.cream}>
              AIRCRAFT MINUTES RECOVERED PER YEAR*
            </Label>
            <Label x={500} y={512} size={30} fill={C.muted} weight={500} spacing={0.5}>
              ≈ 3,650 aircraft hours
            </Label>
          </g>
          <g opacity={cardB}>
            <Label x={1420} y={392} size={150} fill={C.gold} weight={900} spacing={-2} opacity={pB > 0 ? 1 : 0}>
              {`~$${(21.6 * pB).toFixed(1)}M`}
            </Label>
            <Label x={1420} y={460} size={26} fill={C.cream}>
              GROSS ANNUAL OPERATING-COST OPPORTUNITY*
            </Label>
            <Label x={1420} y={512} size={30} fill={C.muted} weight={500} spacing={0.5}>
              at $98.41 per aircraft block minute
            </Label>
          </g>
          {/* the calculation: one small muted line, never on screen without the results above it */}
          <Label x={960} y={622} size={24} fill={C.muted} weight={500} spacing={0.3} opacity={calc * 0.85}>
            5,000 flights/day × 365 days × 10% × 6 min × 20% = 219K min → × $98.41 = $21.6M
          </Label>
          <Label x={960} y={742} size={22} fill={C.muted} opacity={tagsHead}>
            WHERE THE TIME CAN COME FROM
          </Label>
          {tagItems.map((g) => (
            <Label key={g.s} x={g.x + g.w / 2} y={g.y + 8} size={22} fill={C.cream} weight={700} spacing={0.3} opacity={g.o}>
              {g.s}
            </Label>
          ))}
          <g opacity={note}>
            <Label x={960} y={1030} size={19} fill={C.muted} weight={500} spacing={0.2}>
              * Illustrative model. Event rate, lead time and realization are planning assumptions to validate in a pilot, not measured Southwest results.
            </Label>
          </g>
        </>
      }
    >
      {/* the two results */}
      <g opacity={cardA} transform={`translate(0 ${mix(30, 0, cardA)})`}>
        <rect x={100} y={262} width={800} height={290} rx={22} fill={C.panel} stroke={C.gold} strokeWidth={9} />
      </g>
      <g opacity={cardB} transform={`translate(0 ${mix(30, 0, cardB)})`}>
        <rect x={1020} y={262} width={800} height={290} rx={22} fill={C.panel} stroke={C.gold} strokeWidth={9} />
      </g>
      {/* where the time can come from */}
      {tagItems.map((g) => (
        <rect key={g.s} x={g.x} y={g.y - 20} width={g.w} height={40} rx={20} fill={C.panel} stroke={C.teal} strokeWidth={4} opacity={g.o} />
      ))}
    </Art>
  );
};

// ---------- 18 · The rollout plan ----------
const STEPS = [
  {
    n: "1",
    name: "SHADOW",
    tag: "Listen and measure",
    cue: "Shadow:",
    lines: [
      ["One core station", C.cream],
      ["Listens to ramp radio calls", C.cream],
      ["NO operational writes", "#ff7a73"],
      ["Measure accuracy + minutes", C.cream],
    ],
    foot: ["Baselines: accuracy, routing,", "false positives, minutes gained"],
  },
  {
    n: "2",
    name: "ASSIST",
    tag: "Proposals for people",
    cue: "Assist:",
    lines: [
      ["Voice → state → proposal", C.cream],
      ["Inside existing workflows", C.cream],
      ["A human approves every change", "#7ee2a0"],
    ],
    foot: ["Track: acceptance rate,", "latency, minutes recovered"],
  },
  {
    n: "3",
    name: "CONTROLLED AUTOMATION",
    tag: "Only what is proven",
    cue: "Controlled automation:",
    lines: [
      ["AUTO: fueling · cleaning ·", "#7ee2a0"],
      ["boarding · conflict alerts", C.cream],
      ["HUMAN: flight status/ETD,", C.gold],
      ["aircraft, crew, gate", C.cream],
    ],
    foot: ["Only proven, low-risk", "workflows go automatic"],
  },
  {
    n: "4",
    name: "NETWORK SCALE",
    tag: "Wave by wave",
    cue: "Then network scale",
    lines: [
      ["Core stations first", C.cream],
      ["Waves: Flight · Ramp · Gate", C.cream],
      ["· Crew · Customer / IROPs", C.cream],
      ["Built on Southwest's systems", C.cream],
    ],
    foot: ["Year-end 2025: 803 aircraft,", "117 destinations"],
  },
] as const;

const CARD_W = 420;
const CARD_X = (i: number) => 66 + i * 456;
const CARD_CX = (i: number) => CARD_X(i) + CARD_W / 2;

export const S18: React.FC = () => {
  const t = useT();
  const title = prog(t, when(14, "We roll it out") - 0.1, 0.8);
  const cues = STEPS.map((s) => when(14, s.cue));
  const shell = (i: number) => prog(t, when(14, "four steps") + i * 0.18, 0.6);
  const reveal = (i: number) => prog(t, cues[i] - 0.1, 0.6);
  const active = (i: number) => t >= cues[i] - 0.1 && (i === STEPS.length - 1 || t < cues[i + 1] - 0.1);
  // the marker on the trust track moves from step to step as each one is spoken
  let mx = CARD_CX(0);
  for (let i = 1; i < STEPS.length; i++) mx = mix(mx, CARD_CX(i), seg(t, cues[i] - 0.1, cues[i] + 0.7));
  const proof = prog(t, cues[2] + 1.2, 0.8);
  const earn = prog(t, when(14, "each one earning"), 0.7);
  const swing = prog(t, cues[2], 1.2);
  const pulse = ((t * 0.8) % 1);
  return (
    <Art
      overlay={
        <>
          <Hand x={960} y={140} size={92} fill={C.gold} opacity={title}>
            Four steps. Each one earns the next.
          </Hand>
          {STEPS.map((s, i) => {
            const o = reveal(i);
            const left = CARD_X(i);
            return (
              <g key={s.name}>
                <Label x={CARD_CX(i)} y={286} size={26} fill={active(i) ? C.gold : C.cream} weight={900} spacing={0.5} opacity={shell(i)}>
                  {s.name}
                </Label>
                <Hand x={CARD_CX(i)} y={500} size={50} fill={C.teal} opacity={o}>
                  {s.tag}
                </Hand>
                {s.lines.map(([text, color], k) => (
                  <Label key={text} x={left + 30} y={556 + k * 36} size={21} fill={color} weight={700} spacing={0.2} anchor="start" opacity={prog(t, cues[i] + 0.3 + k * 0.35, 0.5)}>
                    {text}
                  </Label>
                ))}
                {s.foot.map((text, k) => (
                  <Label key={text} x={CARD_CX(i)} y={782 + k * 27} size={19} fill={C.gold} weight={700} spacing={0.2} opacity={prog(t, cues[i] + 1.8, 0.6)}>
                    {text}
                  </Label>
                ))}
              </g>
            );
          })}
          {/* number badges */}
          {STEPS.map((s, i) => (
            <Label key={s.n} x={CARD_X(i) + 6} y={247} size={32} fill={C.ink} weight={900} spacing={0} opacity={shell(i)}>
              {s.n}
            </Label>
          ))}
          <Label x={100} y={958} size={20} fill={C.muted} anchor="start" opacity={earn}>
            LISTEN ONLY
          </Label>
          <Label x={960} y={958} size={22} fill={C.cream} opacity={earn}>
            TRUST IS EARNED STEP BY STEP
          </Label>
          <Label x={1820} y={958} size={20} fill={C.muted} anchor="end" opacity={earn}>
            ACTS AT NETWORK SCALE
          </Label>
          <Label x={960} y={1020} size={24} fill={C.cream} weight={500} spacing={0.3} opacity={proof}>
            Every action keeps: evidence · confidence · before/after state · provenance · audit history
          </Label>
        </>
      }
    >
      {STEPS.map((s, i) => {
        const cx = CARD_CX(i);
        const o = shell(i);
        const on = active(i);
        return (
          <g key={s.name} opacity={o} transform={`translate(0 ${mix(26, 0, o)})`}>
            <rect x={CARD_X(i)} y={215} width={CARD_W} height={610} rx={22} fill={C.panel} stroke={on ? C.gold : C.ink} strokeWidth={on ? 10 : 7} />
            <circle cx={CARD_X(i) + 6} cy={236} r={28} fill={C.gold} stroke={C.ink} strokeWidth={6} />
            <line x1={CARD_X(i) + 30} x2={CARD_X(i) + CARD_W - 30} y1={735} y2={735} stroke={C.ink} strokeWidth={4} strokeOpacity={0.6} />
            {/* icons */}
            <g opacity={reveal(i)}>
              {i === 0 ? (
                <g transform={`translate(${cx} 385) scale(0.4) translate(-1400 -430)`} stroke={C.ink} strokeLinejoin="round">
                  <path d="M1300 360 C1300 250 1460 230 1490 350 C1515 440 1440 500 1420 560 C1404 612 1345 640 1312 596" fill={C.cream} strokeWidth={12} />
                  <path d="M1352 380 C1362 338 1426 346 1432 396 C1436 438 1388 466 1378 520" fill="none" strokeWidth={10} strokeLinecap="round" />
                </g>
              ) : null}
              {i === 1 ? (
                <g>
                  <Bust x={cx - 20} y={338} s={0.6} skin={C.skinC} shirt="#5a6aa8" kind="controller" look={0} />
                  <Tick x={cx + 88} y={350} s={1} p={prog(t, cues[1] + 1.0, 0.5)} />
                </g>
              ) : null}
              {i === 2 ? (
                <g>
                  <circle cx={cx} cy={390} r={78} fill={C.panel} stroke={C.cream} strokeWidth={8} />
                  {Array.from({ length: 9 }).map((_, k) => (
                    <line key={k} x1={0} y1={-62} x2={0} y2={-50} stroke={C.cream} strokeWidth={5} strokeLinecap="round" transform={`translate(${cx} 390) rotate(${-100 + k * 25})`} />
                  ))}
                  <line x1={cx} y1={390} x2={cx} y2={332} stroke={C.gold} strokeWidth={9} strokeLinecap="round" transform={`rotate(${mix(-95, -35, swing)} ${cx} 390)`} />
                  <circle cx={cx} cy={390} r={10} fill={C.gold} stroke={C.ink} strokeWidth={4} />
                </g>
              ) : null}
              {i === 3 ? (
                <g>
                  {[0, 1, 2, 3, 4, 5].map((k) => {
                    const a = (k / 6) * Math.PI * 2 - Math.PI / 2;
                    const x = cx + Math.cos(a) * 82;
                    const y = 385 + Math.sin(a) * 66;
                    return (
                      <g key={k}>
                        <line x1={cx} y1={385} x2={x} y2={y} stroke={C.teal} strokeWidth={5} strokeLinecap="round" />
                        <circle cx={x} cy={y} r={13} fill={k % 2 ? C.gold : C.teal} stroke={C.ink} strokeWidth={4} />
                      </g>
                    );
                  })}
                  <circle cx={cx} cy={385} r={mix(20, 96, pulse)} fill="none" stroke={C.teal} strokeWidth={4} opacity={(1 - pulse) * 0.7} />
                  <circle cx={cx} cy={385} r={20} fill={C.gold} stroke={C.ink} strokeWidth={5} />
                </g>
              ) : null}
            </g>
          </g>
        );
      })}
      {/* the trust track along the bottom */}
      <g opacity={earn}>
        <path d="M100 905 L1800 905" stroke={C.cream} strokeWidth={7} strokeLinecap="round" />
        <path d="M1776 884 L1810 905 L1776 926" fill="none" stroke={C.cream} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
        {STEPS.map((s, i) => (
          <circle key={s.n} cx={CARD_CX(i)} cy={905} r={13} fill={C.panel} stroke={C.cream} strokeWidth={5} />
        ))}
        <circle cx={mx} cy={905} r={22} fill={C.gold} stroke={C.ink} strokeWidth={6} />
      </g>
    </Art>
  );
};

// ---------- 19 · Conclusion: one clock ----------
export const S19: React.FC = () => {
  const t = useT();
  const knows = when(15, "The communications");
  const waits = when(15, "how long everyone else");
  const listen = when(15, "Let the system listen");
  const evidence = when(15, "show its evidence");
  const handAt = when(15, "keep a person's hand");
  const everyDesk = when(15, "operations can perform");
  const same = when(15, "headstart");
  const titleAt = endOf(15) + 0.2;

  const clocksIn = prog(t, knows - 0.2, 0.9);
  const gap = prog(t, waits, 0.7) * (1 - seg(t, everyDesk + 0.4, same + 0.3));
  const wob = Math.sin(t * 5) * 5;
  const ribbon = seg(t, listen, evidence + 0.4);
  const tag = prog(t, evidence, 0.8);
  const dial = prog(t, handAt - 0.2, 0.8);
  const sync = seg(t, everyDesk, same + 0.5);
  const fin = seg(t, titleAt, titleAt + 1.0);
  const done = prog(t, same + 0.4, 0.6);
  const left = handsFor(15, 40 + 35);
  const right = handsFor(15, 40 + 35 * sync);
  const needle = mix(-70, -22, seg(t, handAt, handAt + 1.4));
  const tip = { x: 960 + Math.sin((needle * Math.PI) / 180) * 80, y: 880 - Math.cos((needle * Math.PI) / 180) * 80 };
  return (
    <Art
      overlay={
        <>
          <g opacity={1 - 0.92 * fin}>
            <Hand x={560} y={745} size={56} fill={C.teal} opacity={clocksIn}>
              what the communications know
            </Hand>
            <Hand x={1360} y={745} size={56} fill={C.gold} opacity={clocksIn}>
              what everyone plans from
            </Hand>
          </g>
          <Hand x={960} y={470} size={130} fill={C.gold} opacity={fin}>
            The communications know.
          </Hand>
          <Label x={960} y={560} size={34} fill={C.cream} spacing={8} opacity={prog(t, titleAt + 0.7, 0.8)}>
            RUNWAY REBELS · THE TWO CLOCKS
          </Label>
        </>
      }
    >
      <g opacity={1 - 0.92 * fin}>
        {/* two clocks, one reality at last */}
        <g opacity={clocksIn}>
          {done > 0 ? <circle cx={560} cy={430} r={232} fill="none" stroke={C.teal} strokeWidth={10} opacity={done * 0.5} filter="url(#glow)" /> : null}
          {done > 0 ? <circle cx={1360} cy={430} r={232} fill="none" stroke={C.gold} strokeWidth={10} opacity={done * 0.5} filter="url(#glow)" /> : null}
          <Clock cx={560} cy={430} r={200} rim={C.teal} {...left} />
          <Clock cx={1360} cy={430} r={200} rim={C.gold} {...right} />
        </g>
        {/* the gap: still two clocks, until the system listens */}
        <g opacity={gap}>
          <path d="M790 430 L1130 430" stroke={C.cream} strokeWidth={5} strokeDasharray="14 12" />
          <path d="M790 430 l24 -16 M790 430 l24 16 M1130 430 l-24 -16 M1130 430 l-24 16" stroke={C.cream} strokeWidth={5} strokeLinecap="round" />
          <g transform={`translate(0 ${wob})`}>
            <rect x={900} y={330} width={120} height={60} rx={10} fill={C.red} stroke={C.ink} strokeWidth={5} />
            <path d="M920 350 L1000 350 M920 370 L968 370" stroke={C.cream} strokeWidth={6} strokeLinecap="round" />
          </g>
        </g>
        {/* the system listens: a ribbon from the communications clock to the system's clock */}
        {ribbon > 0 ? <Ribbon d="M766 440 C860 330 1010 560 1154 440" p={ribbon} len={1} /> : null}
        {/* the receipt: its evidence */}
        <g opacity={tag} transform={`translate(0 ${mix(20, 0, tag)})`}>
          <Strip x={960} y={600} w={300} h={96} lines={2} seed={4} />
        </g>
        {/* a person's hand on the dial */}
        <g opacity={dial}>
          <circle cx={960} cy={880} r={105} fill={C.panel} stroke={C.cream} strokeWidth={9} />
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={i} x1={0} y1={-88} x2={0} y2={-72} stroke={C.cream} strokeWidth={6} strokeLinecap="round" transform={`translate(960 880) rotate(${-100 + i * 25})`} />
          ))}
          <line x1={960} y1={880} x2={960} y2={800} stroke={C.gold} strokeWidth={11} strokeLinecap="round" transform={`rotate(${needle} 960 880)`} />
          <circle cx={960} cy={880} r={13} fill={C.gold} stroke={C.ink} strokeWidth={5} />
          <line x1={tip.x} y1={tip.y} x2={tip.x - 130} y2={tip.y - 6} stroke={C.ink} strokeWidth={46} strokeLinecap="round" />
          <line x1={tip.x} y1={tip.y} x2={tip.x - 130} y2={tip.y - 6} stroke="#5a6aa8" strokeWidth={34} strokeLinecap="round" />
          <circle cx={tip.x} cy={tip.y} r={24} fill={C.skinC} stroke={C.ink} strokeWidth={5} />
        </g>
        {/* one clock */}
        <Tick x={960} y={430} s={1.5} p={done} />
      </g>
    </Art>
  );
};
