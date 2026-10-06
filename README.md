# The Scriptwriter’s Atlas

A practical, English-language course in professional video scriptwriting—from the first idea to a production-ready script. The course is organized as 12 progressive phases with 16 core lessons, four workshops, a workbook, case studies, worked scripts, a reference desk, and a final Arabic-only recording lesson.

## Course source of truth

The Markdown in [`course/`](course/README.md) is the canonical course content. The static website renders those Markdown files directly; it does not keep a second copy of lesson text. The supplied [`THE SCRIPTWRITERS ATLAS.zip`](THE%20SCRIPTWRITERS%20ATLAS.zip) archive is preserved unchanged.

## Website and Vercel

This repository is configured for a no-dependency static deployment on Vercel:

- `vercel.json` runs `node build.mjs` and publishes `dist/`.
- It deliberately sets **no** `framework` value. There is no framework here to detect, so Vercel falls back to its **Other** preset on its own. Note that `"framework": "other"` is *not* valid in `vercel.json` — “Other” is only a label in the dashboard’s Framework Preset menu, not one of the framework slugs the schema accepts — so writing it makes every deployment fail configuration validation.
- The build copies the website, full Markdown course, generated audio and playlists, and original source archive into the deployment output.
- No environment variables, package install, database, or external runtime service are required.

### Deploying

1. Import this repository into Vercel as a new project.
2. Leave **Framework Preset** on **Other** (the default for this repository) and do **not** add a `framework` key to `vercel.json`.
3. Leave **Build Command** (`node build.mjs`) and **Output Directory** (`dist`) at their configured values — both come from `vercel.json`, so the dashboard fields can stay untouched.
4. Deploy. No environment variables are needed.

The committed `vercel.json` is the source of truth for build settings; the dashboard values are only a fallback. If a deploy ever fails during “Validating configuration”, compare `vercel.json` against [Vercel’s project configuration schema](https://openapi.vercel.sh/vercel.json) — the `$schema` key in the file gives the same validation in your editor before you push.

### Building locally

For a local production build, run:

```sh
node build.mjs
```

Then serve `dist/` with any static web server. For example, with Python installed:

```sh
python3 -m http.server 4173 --directory dist
```

## Start learning

Open the [course roadmap](course/ROADMAP.md), then follow the phase sequence in the [course guide](course/README.md). The website includes browser search and locally saved lesson-completion progress. Audio is now generated for all 16 English lessons: Phase 1 Lessons 1–2, Phase 2 Lesson 3, Phase 3 Lessons 4–5, Phase 4 Lesson 6, Phase 5 Lesson 7, Phase 6 Lessons 8–9, Phase 7 Lesson 10, Phase 8 Lesson 11, Phase 9 Lesson 12, Phase 10 Lessons 13–14, Phase 11 Lesson 15, and Phase 12 Lesson 16. Each lesson has a read-along player and playlist. On audio-supported lessons, the matching script is shown in a read-along transcript: the current sentence is highlighted, key terms are colored and shown with short Arabic meanings, and the lesson section being explained gets a subtle live highlight. Open the transcript full-screen for larger, easier-to-read text. A fixed bottom play/pause control stays visible while reading and can reopen the transcript. Playback speed is adjustable. Sentence and section timing is estimated from audio progress because the supplied MP3 files do not include word-level caption timestamps.
