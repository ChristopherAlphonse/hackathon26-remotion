// Regenerates the TwoClocks narration with ElevenLabs.
//
//   npx tsx --env-file=.env.local scripts/generate-narration.mts [--out DIR] [--voice ID] [--scenes 1,2,3] [--model ID] [--stability N] [--style N] [--speed N] [--tag "[upbeat]"]
//
// Reads each line from src/TwoClocks/timing.ts (TEXT) and writes n1.wav .. n16.wav (mono, 44.1 kHz, 16-bit)
// into --out (default public/twoclocks). The key is read from ELEVENLABS_API_KEY; it is never printed.
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { TEXT } from "../src/TwoClocks/timing";

const arg = (name: string, fallback: string): string => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
};

// Default is Matilda, the voice the original narration used. Pass --voice pvS1ZIJpQEGNG9v2Ixl9 for "christopher alphonse" (cloned).
const VOICE_ID = arg("voice", "XrExE9yKIg1WjnnlVkGX");
const out = arg("out", "public/twoclocks");
const model = arg("model", "eleven_multilingual_v2");
const stability = Number(arg("stability", "0.35"));
const isV4 = model.startsWith("eleven_v4");
const stitch = model !== "eleven_v3"; // eleven_v3 does not accept previous_text / next_text
const tag = arg("tag", ""); // audio tag such as "[upbeat]" (v3/v4 only; older models would read it aloud)
const style = Number(arg("style", "0.5")); // not supported on eleven_v4
const speed = Number(arg("speed", "1.1")); // not supported on eleven_v4
const wanted = arg("scenes", "")
  .split(",")
  .filter(Boolean)
  .map(Number);

if (!process.env.ELEVENLABS_API_KEY) {
  throw new Error("ELEVENLABS_API_KEY is not set. Run with: npx tsx --env-file=.env.local scripts/generate-narration.mts");
}

const client = new ElevenLabsClient();
mkdirSync(out, { recursive: true });

for (let i = 0; i < TEXT.length; i++) {
  const scene = i + 1;
  if (wanted.length > 0 && !wanted.includes(scene)) continue;

  // previous_text / next_text keep the tone and pacing continuous across separate requests
  const audio = await client.textToSpeech.convert(VOICE_ID, {
    text: tag ? `${tag} ${TEXT[i]}` : TEXT[i],
    modelId: model,
    voiceSettings: isV4 ? { stability, similarityBoost: 0.75 } : { stability, similarityBoost: 0.75, style, speed, useSpeakerBoost: true },
    previousText: stitch && i > 0 ? TEXT[i - 1] : undefined,
    nextText: stitch && i < TEXT.length - 1 ? TEXT[i + 1] : undefined,
    outputFormat: "mp3_44100_128",
  });

  const chunks: Uint8Array[] = [];
  for await (const chunk of audio) chunks.push(chunk);
  const mp3 = join(out, `n${scene}.mp3`);
  const wav = join(out, `n${scene}.wav`);
  writeFileSync(mp3, Buffer.concat(chunks));
  execFileSync("afconvert", ["-f", "WAVE", "-d", "LEI16@44100", "-c", "1", mp3, wav]);
  rmSync(mp3);
  console.log(`scene ${scene}: wrote ${wav}`);
}
