import { launch } from "./capture.tmp.mjs";
const { browser, shot, ev, sleep, go } = await launch();
await go("http://localhost:5173/?live=1&auto=1&view=terminal");
// wait for WN1628 card
for (let i = 0; i < 60; i++) { if (await ev(`[...document.querySelectorAll('.convo')].some(b=>b.textContent.includes('WN1628'))`)) break; await sleep(1000); }
await sleep(3000);
await ev(`[...document.querySelectorAll('.convo')].find(b=>b.textContent.includes('WN1628')).click()`);
await sleep(1500);
await shot("/tmp/d1.png");
await ev(`document.getElementById('openDetail').click()`);
await sleep(6000);
await shot("/tmp/d2.png");
console.log(await ev(`!!document.getElementById('btnConfirmReview')`));
await ev(`document.getElementById('btnConfirmReview')?.scrollIntoView({block:'center'})`);
await sleep(800);
await shot("/tmp/d3.png");
await browser.close({ silent: true });
