# The Two Clocks

A narrated, animated explainer built with [Remotion](https://www.remotion.dev/). It shows how a spoken radio call from the ramp ("hydraulic") becomes a checked, human-approved update in an airline's system of record, instead of sitting unheard while the system says "on time".

<p align="center">
    <img src="cover.png">
</p>

- 1920x1080 at 24 fps, about 4 minutes 25 seconds (264.5 s): a 7 s "Runway Rebels presents" intro, 17 narrated scenes (246 s), then about 11.5 s of credits.
- One composition, `TwoClocks` (`src/Root.tsx`).
- Narration is generated with ElevenLabs (voice: a cloned voice, "christopher alphonse", using the eleven_v4 model). The music bed and intro sound effect are in the repo, so you only need an ElevenLabs key if you change the narration.

## Setup

Requires Node `^20.19.0 || ^22.13.0 || >=24`.

```console
npm install
```

## Commands

```console
npm run dev       # open Remotion Studio and preview the video
npm run render    # render to out/twoclocks.mp4
npm run build     # bundle the project (remotion bundle)
npm run lint      # eslint + tsc
npm run upgrade   # upgrade Remotion
```

## Project layout

| Path | What it is |
|---|---|
| `src/Root.tsx` | Registers the `TwoClocks` composition |
| `src/TwoClocks/TwoClocks.tsx` | Top-level sequence: intro, scenes 1 to 17, credits, audio |
| `src/TwoClocks/Intro.tsx` | "Runway Rebels presents" intro |
| `src/TwoClocks/scenes1.tsx`, `scenes2.tsx` | Scenes S1 to S9 and S10 to S17 |
| `src/TwoClocks/art.tsx` | Shared drawn pieces (plane, ground, clocks, crew, and so on) |
| `src/TwoClocks/timing.ts` | Narration text, clip lengths, scene lengths and music plan |
| `src/TwoClocks/Music.tsx` | Builds the music bed (intro, loop, ending) to fit the video length |
| `public/twoclocks/n1.wav` to `n17.wav` | Narration, one clip per scene |
| `public/music/bed.mp3` | Music bed, 120 BPM |
| `public/sfx/intro.wav` | Intro sound effect |
| `scripts/` | Narration and sound-effect generators (see below) |
| `presentation/` | Video production package and the 3-minute presentation script |
| `src/server/` | Optional image server (see below) |

## Timing

Everything is driven by `src/TwoClocks/timing.ts`. Scene starts and narration land on the music's beat grid (120 BPM, one beat is 0.5 s), and each scene length is derived from its narration clip length. If you change the narration, update `NARR_RAW` (the raw clip lengths in seconds); scene lengths, cuts, the music loop and the credits length are computed from it.

- Each narration line starts 1 s (2 beats) into its scene and gets at least 1 s of silence after it. Scene lengths round up to whole seconds.
- Clips play 10% faster than they were recorded (`VOICE_RATE = 1.1`) to match the music's tempo. `NARR_RAW` holds the recorded lengths, before the speed-up.
- Credits are sized so the music's own ending lands on the last frame, with at least 8 s of credits.

## Regenerate the narration

Needs an ElevenLabs key and macOS (`afconvert` is used to make the WAV files).

1. Put `ELEVENLABS_API_KEY=...` in `.env.local` (see `.env.example`). `.env.local` is gitignored.
2. Run the command that matches the current narration (model `eleven_v3`, tag `[upbeat]`):

```console
npx tsx --env-file=.env.local scripts/generate-narration.mts --model eleven_v3 --tag "[upbeat]"
```

The script's own defaults differ: with no flags it uses `eleven_multilingual_v2` and no tag, so the result will not match the shipped narration.

Options:

| Option | Default | Notes |
|---|---|---|
| `--scenes 1,2,3` | all | Redo only these scenes |
| `--out DIR` | `public/twoclocks` | Output folder |
| `--model ID` | `eleven_multilingual_v2` | `eleven_v3` skips previous/next text stitching |
| `--tag "[upbeat]"` | none | Audio tag, `eleven_v3` and `eleven_v4` only. Older models read it aloud |
| `--stability N` | `0.35` | Voice stability |
| `--style N` | `0.5` | Not supported on `eleven_v4` |
| `--speed N` | `1.1` | Not supported on `eleven_v4` |

The script reads the lines from `TEXT` in `timing.ts` and writes `n1.wav` to `n17.wav` (mono, 44.1 kHz, 16-bit).

After regenerating, measure each new clip and update `NARR_RAW` in `timing.ts`:

```console
afinfo public/twoclocks/n1.wav | grep "estimated duration"
```

## Regenerate the intro sound effect

Needs Python 3 and numpy.

```console
python3 scripts/make-intro-sfx.py
```

It writes `public/sfx/intro.wav`. Brick timings in the script must match `ROWS`, `FALL` and the exit time in `src/TwoClocks/Intro.tsx`.

## Presentation material

- `presentation/educational-video-package.md`: titles, narrative approach, scene plan and a source map for every fact in the video.
- `presentation/presentation-script.md`: the 3-minute "The Ramp Knows" presentation script.

## Image server (from the template)

The project started from the Remotion still-image template, and the server is still included. It renders a composition as a still image on request.

```console
npm run server
```

Then open `http://localhost:8000/TwoClocks.png`. Use the composition ID in the path and a `.png` or `.jpeg` extension. Query strings are passed as input props, for example `?title=Hello+World`. The server needs [Bun](https://bun.sh) (installed as a dev dependency).

Caching is set by `CACHE_MODE` in `src/server/config.ts`:

- `"filesystem"` (default) caches images locally.
- `"none"` renders every request.
- `"s3-bucket"` caches in S3. Set `AWS_BUCKET_NAME` and `AWS_REGION` in `config.ts`, and provide `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` in `.env` (see `.env.example`).

The server has no authentication or access control, so put it behind something before exposing it publicly. A `Dockerfile` is included for deploying it. For serverless stills, see [Remotion Lambda](https://remotion.dev/lambda).

## Docs and help

- [Remotion fundamentals](https://www.remotion.dev/docs/the-fundamentals)
- [Remotion Discord](https://discord.gg/6VzzNDwUwV)
- [Report a Remotion issue](https://github.com/remotion-dev/remotion/issues/new)

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
