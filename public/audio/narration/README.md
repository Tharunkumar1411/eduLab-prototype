# Narration audio assets

Drop pre-generated narration clips here and the `CharacterNarrator` component
will automatically light up its Play / Pause / Replay controls. Nothing in the
lesson engine needs to change.

If a file is missing or fails to load, the narrator falls back to **text-only**
mode — the transcript is always rendered, and the controls panel is hidden.

## File layout

Served at `/audio/narration/<file>` because Vite exposes the `public/` folder
at the site root.

## Naming convention

`ms-c1-<slug>.m4a` — module-course-event. The slug matches the narration key
in `src/data/narrations/course1Narrations.ts`.

### Course 1 — What Is a Financial Market?

| Narration key              | Expected file                      |
| -------------------------- | ---------------------------------- |
| `intro`                    | `ms-c1-intro.m4a`                  |
| `fundingDecision`          | `ms-c1-funding-decision.m4a`       |
| `investors`                | `ms-c1-investors.m4a`              |
| `secondaryMarket`          | `ms-c1-secondary-market.m4a`       |
| `exploreIntro`             | `ms-c1-explore-intro.m4a`          |
| `knowledgeCheckIntro`      | `ms-c1-check-intro.m4a`            |
| `feedbackIncorrect`        | `ms-c1-feedback-incorrect.m4a`     |
| `feedbackCorrect`          | `ms-c1-feedback-correct.m4a`       |
| `completion`               | `ms-c1-completion.m4a`             |

## Format

- M4A/AAC (shipped), MP3, WAV, OGG, or any format the browser natively
  supports via `<audio>`.
- Keep clips short (10–20s). The transcript is the source of truth.
- No specific sample rate / bitrate requirement — the player uses the browser
  decoder.

## Regenerating the shipped clips (macOS, offline, no API key)

The current M4A clips were generated with macOS `say` + `afconvert`. To
regenerate (e.g. with a different voice), run the snippet below from this
directory:

```sh
VOICE="Samantha"   # list voices with: say -v '?'
RATE=180
mkdir -p .tmp
gen () {
  say -v "$VOICE" -r "$RATE" -o ".tmp/$1.aiff" "$2"
  afconvert -f m4af -d aac ".tmp/$1.aiff" "$1.m4a"
}
gen ms-c1-intro             "Hey! Let's help Sunny Bakery grow..."
gen ms-c1-funding-decision  "Sunny Bakery has a few choices..."
# ...one gen line per narration entry — see
# src/data/narrations/course1Narrations.ts for the full scripts.
rm -rf .tmp
```

To swap in professionally recorded clips, just overwrite the same filenames —
nothing else needs to change.

## Adding narration to a new lesson

1. Add an entry to a `*Narrations.ts` file under `src/data/narrations/`.
2. Drop the MP3 here using the matching slug.
3. In the lesson, import the key and pass it via the `narration` prop on
   `SceneScaffold` (or embed `<CharacterNarrator narration={...} />` anywhere).

No files committed to this folder yet — the system runs in text-only mode out
of the box.
