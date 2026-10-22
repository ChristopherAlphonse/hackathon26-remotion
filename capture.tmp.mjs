import { openBrowser } from "@remotion/renderer";
import fs from "node:fs";
export async function launch(w = 1920, h = 1080) {
  const browser = await openBrowser("chrome", { chromiumOptions: { gl: "angle" }, viewport: { width: w, height: h, deviceScaleFactor: 1 } });
  const page = await browser.newPage({ context: () => null, logLevel: "error", indent: false, pageIndex: 0, onBrowserLog: () => {}, onLog: () => {} });
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  const c = page._client();
  const shot = async (out) => { const { data } = (await c.send("Page.captureScreenshot", { format: "png" })).value; fs.writeFileSync(out, Buffer.from(data, "base64")); };
  const ev = async (expr) => (await c.send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true })).value?.result?.value;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const go = (url) => page.goto({ url, timeout: 60000, context: null, logLevel: "error", indent: false });
  return { browser, page, c, shot, ev, sleep, go };
}
