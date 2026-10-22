import { launch } from "./capture.tmp.mjs";
import fs from "node:fs";
const dir = "/tmp/rec"; fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
const { browser, c, ev, sleep, go } = await launch();
const frames = []; const marks = []; let rec = true; const t0 = Date.now();
const mark = (name) => { marks.push({ name, t: Date.now() - t0 }); console.log("mark", name, Date.now() - t0); };
const loop = async () => {
  let i = 0;
  while (rec) {
    try {
      const r = (await Promise.race([c.send("Page.captureScreenshot", { format: "jpeg", quality: 85, optimizeForSpeed: true }), new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 2500))])).value;
      const f = `${dir}/f${String(i).padStart(5, "0")}.jpg`;
      fs.writeFileSync(f, Buffer.from(r.data, "base64"));
      frames.push({ f, t: Date.now() - t0 }); i++;
    } catch (e) { if (!globalThis.__e) { globalThis.__e = 1; console.log("capture err", e?.message); } await sleep(50); }
  }
};
const waitFor = async (expr, max = 60) => { for (let k = 0; k < max * 2; k++) { if (await ev(expr)) return true; await sleep(500); } return false; };

// 1. portal before
await go("http://localhost:5173/systems.html");
loop();
await waitFor(`document.body.innerText.includes('WN1628')`);
await ev(`(()=>{const e=[...document.querySelectorAll('*')].reverse().find(x=>x.children.length===0&&x.textContent.trim()==='WN1628'); e?.scrollIntoView({block:'center'})})()`);
mark("portal_before"); await sleep(5000);
// 2. twin
await go("http://localhost:5173/?live=1&auto=1&view=terminal");
mark("twin_loaded");
await waitFor(`[...document.querySelectorAll('.convo')].some(b=>b.textContent.includes('WN1628'))`, 90);
mark("hero_arrived"); await sleep(5000);
await ev(`[...document.querySelectorAll('.convo')].find(b=>b.textContent.includes('WN1628')).click()`);
mark("hero_selected"); await sleep(4000);
await ev(`document.getElementById('openDetail').click()`);
await waitFor(`!!document.getElementById('btnConfirmReview')`, 30);
mark("detail_top"); await sleep(4500);
const body = `document.querySelector('.d-body, .detail-body, [class*=detail] [class*=body]') || document.getElementById('btnConfirmReview').closest('[style*=overflow], .d-scroll, .d-body') `;
const scrollTo = async (sel, name, hold) => {
  await ev(`(()=>{const e=${sel}; e&&e.scrollIntoView({block:'start'})})()`);
  mark(name); await sleep(hold);
};
await scrollTo(`[...document.querySelectorAll('*')].find(e=>e.children.length===0&&e.textContent.trim()==='VOICE VS THE SYSTEM OF RECORD'||e.children.length===0&&e.textContent.trim().toLowerCase()==='voice vs the system of record')`, "detail_mismatch", 4500);
await ev(`document.getElementById('btnConfirmReview').scrollIntoView({block:'center'})`);
mark("detail_approval"); await sleep(5500);
await ev(`document.getElementById('btnConfirmReview').click()`);
mark("approved_click"); await sleep(4500);
await scrollTo(`[...document.querySelectorAll('*')].find(e=>e.children.length===0&&/knock-on effects committed|what it would ripple into/i.test(e.textContent))`, "detail_cascades", 4500);
await ev(`document.querySelector('[class*=close], #dClose, button[aria-label*=lose]')?.click()`);
mark("detail_closed"); await sleep(5000);
// 3. portal after
await go("http://localhost:5173/systems.html");
await waitFor(`document.body.innerText.includes('DELAYED')`, 20);
await ev(`(()=>{const e=[...document.querySelectorAll('*')].reverse().find(x=>x.children.length===0&&x.textContent.trim()==='WN1628'); e?.scrollIntoView({block:'center'})})()`);
mark("portal_after"); await sleep(6000);
rec = false; await sleep(800);
mark("end");
fs.writeFileSync(`${dir}/frames.json`, JSON.stringify({ frames, marks }));
console.log("frames", frames.length, "fps", (frames.length / (Date.now() - t0) * 1000).toFixed(1));
await browser.close({ silent: true });
