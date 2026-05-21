# Data Forward — Design System

> A warm, modern, and subtle system for a collection of personal-data tools
> that help one human track their life and make data-based decisions.

## Brand at a glance

**Data Forward** is a small constellation of personal-use tools built around
the idea that *your own data is worth tracking, plotting, and listening to.*
It is **not** an enterprise BI suite. It is a quiet, paper-feeling space where
charts of your sleep, your weight, your reading log, your finances, and your
goals live side by side, and where the interface tries to disappear so the
data can talk.

The aesthetic borrows from the almanac, the field notebook, and the calm
end of modern dashboards. Warm cream paper. Clay-red ink for the things
that matter. Type that feels written, not generated.

### Products represented in this system

This system was scoped against **two surfaces**:

1. **Data Forward Web** — the main desktop dashboard where charts, logs,
   and decisions are managed. UI kit at `ui_kits/web/`.
2. **Data Forward Mobile** — a companion for quick capture (weight, mood,
   spend, a one-line note). UI kit at `ui_kits/mobile/`.

A third optional surface — a public **marketing/about page** — is partially
covered by the components in `ui_kits/web/` (Hero, FeatureRow) but isn't
broken out yet.

### Source material

No external design assets were provided. This system was authored from the
brand brief alone:

> *"Data Forward: a collection of tools — mostly for personal use only —
> that help me track data in my life and make data-based decisions.
> Design should be warm, modern, and subtle."*

If you have an existing codebase, Figma, or moodboard, drop it in and
this README will be updated against it.

---

## Index — what's in this folder

```
.
├── README.md                  ← you are here
├── SKILL.md                   ← invocation contract (Claude Code compatible)
├── colors_and_type.css        ← all design tokens as CSS vars + utility classes
├── fonts/                     ← (empty — see Caveats; fonts load from Google Fonts)
├── assets/
│   ├── logo.svg               ← primary mark
│   ├── logo-mono.svg          ← monochrome lockup
│   ├── wordmark.svg           ← wordmark only
│   └── icons/                 ← see Iconography section
├── preview/                   ← Design System tab cards (one HTML per card)
├── ui_kits/
│   ├── web/                   ← desktop dashboard kit
│   │   ├── index.html         ← interactive demo
│   │   └── *.jsx              ← Sidebar, MetricCard, Chart, Composer, etc.
│   └── mobile/                ← phone kit (iOS frame)
│       ├── index.html
│       └── *.jsx              ← TabBar, QuickLogger, EntryCard, etc.
└── slides/                    ← (not generated — no template was provided)
```

---

## Content fundamentals

Data Forward writes like a thoughtful, slightly literary friend who happens
to keep meticulous records. Copy is **short, lowercase-leaning, and direct.**
It assumes the reader is the *one user* — you — and never markets at them.

### Voice

- **Singular & personal.** Use "you", not "users". The product is a tool *for
  one person*, and copy reflects that. "Your week" not "this user's week".
- **Calm, not corporate.** No "powerful", no "unlock", no "leverage". Prefer
  verbs of observation: *notice, track, log, see, ask, compare*.
- **Specific over generic.** "Down 1.4 lb from last Tuesday" beats "trending
  downward". Numbers are part of the voice.
- **Light, not jokey.** Occasional small warmth ("welcome back"), never
  cute mascots or exclamation points.

### Casing & punctuation

- **Sentence case everywhere** — buttons, headers, menu items. Never Title Case
  for UI. Never ALL CAPS except in `.df-eyebrow` (tracked-out labels).
- **No exclamation marks.** Period or nothing.
- **Em dashes are welcomed** — like this, for asides.
- **Numbers are written as numerals** even when small. "3 entries today",
  not "three entries today."
- **Units stay close to numbers** with a thin space if you can manage it:
  `7.4 lb`, `2 h 14 m`, `$42`, `68 °F`.

### Examples — yes / no

| ✅ Yes                                          | ❌ No                                            |
|------------------------------------------------|--------------------------------------------------|
| "Welcome back. 2 logs waiting."                | "Welcome back, User! Let's get productive! 🚀"   |
| "Add weight"                                   | "Log Your Weight Entry"                          |
| "You've slept 6 h 48 m on average this week."  | "Sleep performance trending negative."           |
| "Nothing logged yesterday — want to add now?"  | "Missing data detected. Please input values."    |
| "Compare to last month"                        | "Generate Comparative Analysis"                  |
| "Quietly tracking 14 metrics."                 | "POWERFUL ANALYTICS AT YOUR FINGERTIPS"          |

### Emoji & symbols

- **Emoji: no.** Not in UI, not in copy. The visual language is paper, ink,
  and small line icons — emoji break the spell.
- **Unicode punctuation: yes.** Use proper em dashes (—), en dashes (–) for
  ranges (`Mon–Fri`), curly quotes ("like this"), ellipses (…), `°` for
  degrees, `×` for "by" (`1280×720`).
- **Math glyphs: yes when honest.** `±`, `≈`, `Δ`, `↑ ↓` arrows for trends.

---

## Visual foundations

### Color — warm earth, single accent

The palette is built around **warm paper** (`#F5F1EA`) as the base. Text is
**warm near-black** (`#2A2620`), never pure `#000`. One accent — **clay**
(`#B8593A`) — does almost all the work for primary actions, active states,
and "this is the important number". Everything else is a muted earth
neighbor.

- **Surfaces** step in warm tones: canvas → surface → surface-2 (recessed).
- **Semantic colors** (success/warning/danger/info) are deliberately desaturated
  — sage, ochre, rust, dusty teal — so they coexist with brand color without
  shouting.
- **Data viz** uses a 8-color categorical palette in the same warm family;
  there is no rainbow, no blue→red diverging.

Full tokens: `colors_and_type.css` (`--df-canvas`, `--df-ink`, `--df-clay`,
`--df-data-1..8`, etc.).

### Type — one family, used with restraint

The whole system runs on **one type family** — *Geist* — in three
weights, plus *Geist Mono* for code and timestamps. The voice is built
through size, weight, and tracking, not contrast between families.

- **Display & headlines** — *Geist* at **light (300)**, with subtly negative
  letter-spacing (−1.5 to −2 %). Airy, modern, almost editorial. Used for
  the big greeting, page titles, and section headers.
- **Hero numbers** — *Geist* light (300) with `tabular-nums`. Reads like a
  quietly confident financial dashboard, not a marketing splash.
- **UI & body** — *Geist* regular (400) and medium (500). Modern, neutral,
  designed for screen reading at small sizes.
- **Mono** — *Geist Mono* for keys, code, timestamps when grouping helps.

Scale: 11 → 13 → 15 → 17 → 20 → 24 → 32 → 44 → 60 → 84 px.
Body sets at **15 px / 1.5 line-height** by default.

### Spacing & rhythm

- **4 px base unit.** Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80.
- Components prefer the **smaller end** (12 / 16 / 20). Cards breathe but
  don't feel airy.
- **Containers** are typically `max-width: 1200 px` on web, with `24 px`
  page gutters.

### Corner radii

Soft but not pillowy:

- 4 px — chips, code spans
- 6 px — small buttons, inputs
- 10 px — default for cards, menus
- 14 px — large cards / panels
- 20 / 28 px — featured surfaces, modals
- 999 px — pills (avatar, status dot)

### Shadows — quiet, warm-toned

All shadows use `rgba(42, 38, 32, …)` (warm near-black) rather than pure
black so they sit on cream without looking blue. Five steps, low opacity:

- `--df-shadow-xs` — hairline
- `--df-shadow-sm` — resting card
- `--df-shadow-md` — hover / lifted
- `--df-shadow-lg` — modal / popover
- `--df-shadow-inset` — pressed state for buttons & wells

Cards are normally **shadow-sm + 1 px line** rather than heavy elevation.

### Borders & dividers

- 1 px lines in `--df-line` (`#E5DDD0`) — visible on cream without contrast
  shouting.
- Strong borders (`--df-line-strong`) only on inputs and focus rings.
- Dividers between list rows are `--df-line-soft` (4 % black) — almost
  invisible.

### Backgrounds, imagery & texture

- **No gradients** in UI chrome. The accent is solid.
- **Subtle paper texture** is permitted on full-bleed marketing surfaces
  (low-opacity noise SVG), never inside the product.
- **Hand-drawn or hatched line illustrations** are the preferred imagery
  style — think field notebook sketches. Photography is rare; when used,
  it's warm-toned, slightly grainy, never blue-graded.
- **Charts** sit on the canvas color directly; no card chrome around them
  unless they're part of a multi-section card.

### Animation & motion

- **Short, gentle, never bouncy.** 120 ms for hover / state, 200 ms for
  default transitions, 360 ms only for modals / sheets entering.
- **Easing** — `cubic-bezier(0.2, 0.7, 0.2, 1)` (out) for most things;
  `cubic-bezier(0.5, 0, 0.2, 1)` (in-out) for sheets.
- **Fades, not slides**, except for sheets coming up from below on mobile.
- **No spring/overshoot.** No skeleton shimmer. Chart values count up
  briefly (240 ms) on first render and stay still after that.

### Hover & press states

- **Hover** — small darkening of the accent (`--df-clay-hover`), or a
  shift to `--df-surface` on neutral surfaces. **No scale changes** on
  hover for buttons.
- **Press** — `--df-clay-press` + `--df-shadow-inset`, OR a 0.985 scale
  on cards. Buttons get a 1 px inward feel via inset shadow.
- **Focus** — 2 px ring of `--df-clay` at 35 % opacity, 2 px offset.
  Same ring for keyboard and pointer focus; never browser default blue.
- **Active link** — clay color, no underline by default; underline appears
  on hover (1 px, `text-underline-offset: 3px`).

### Cards — the workhorse

Default card recipe:

```
background:    var(--df-surface);
border:        1px solid var(--df-line);
border-radius: var(--df-radius-md);   /* 10 px */
box-shadow:    var(--df-shadow-sm);
padding:       var(--df-space-5) var(--df-space-6);  /* 20px 24px */
```

For "lifted" data cards (the one showing this week's number), add
`--df-shadow-md` on hover only.

### Dark mode

Opt in by setting `data-theme="dark"` on `<html>` (or any ancestor).
`colors_and_type.css` swaps every token, so anything built on
`var(--df-…)` themes automatically.

```html
<html data-theme="dark">   <!-- force dark -->
<html data-theme="light">  <!-- force light, default -->
```

The web and mobile kits ship a `ThemeToggle` primitive that flips the
attribute on `<html>` and persists the choice to `localStorage` under
the key `df-theme`. The kits also ship `index-dark.html` shims so you
can preview the dark variant directly.

**Character of the dark palette** — warm dark, not pitch black. The
canvas (`#1A1714`) is the colour of coffee grounds; surfaces step *up*
in tone to indicate elevation; ink is a warm cream (`#F3EBDD`). Clay
brightens to `#D67651` so it still feels alive against the dark canvas.
Shadows lose almost all opacity — borders do most of the elevation work.

**On-colour text** — if you put text on top of a `clay-tint` /
`clay-soft` background, use `var(--df-on-clay-tint)` (or `-soft`) for
the foreground. These flip per theme: dark clay on light, lifted clay
on dark.

### Transparency, blur, scrim

- **Modal scrim** is `rgba(42, 38, 32, 0.45)` — warm, not blue.
- **Backdrop blur** (`backdrop-filter: blur(12px)`) is used **only** on
  the mobile tab bar and the sticky web header — never on cards.
- Frosted/glass cards are explicitly avoided; they fight the paper feel.

### Layout rules

- **Fixed elements** are minimal: a left sidebar (240 px) on web, a bottom
  tab bar (64 px) on mobile. Headers scroll with the page on desktop,
  stick on mobile.
- **Content max-width** is 1200 px on web. Reading width inside content
  capped at 68 ch.
- **Grid** — 12-col on web with 24 px gutters; on mobile, 16 px page
  margins, 12 px between cards.

---

## Iconography

**Approach.** Outline icons, 1.5 px stroke, rounded line caps & joins,
sized in 16 / 20 / 24 px boxes. Always one weight per surface. Icons sit
on the **same baseline as the label** at `flex-align: center`, with `gap:
8 px` between icon and text.

**System used.** [**Lucide**](https://lucide.dev) — loaded from CDN for
flexibility and because it matches the stroke style above.

```html
<!-- in <head> -->
<script src="https://unpkg.com/lucide@latest"></script>
<script>document.addEventListener('DOMContentLoaded', () => lucide.createIcons());</script>

<!-- usage -->
<i data-lucide="trending-up"></i>
```

> ⚠️ **Substitution flag.** No icon set was provided. Lucide is a
> reasonable default — open, free, MIT-licensed, matches the visual
> language — but if Data Forward later adopts a custom set, swap the
> references in `ui_kits/*/index.html` and document it here.

**Common icons in use** — `trending-up`, `trending-down`, `plus`, `minus`,
`scale`, `moon`, `dumbbell`, `book-open`, `wallet`, `target`, `calendar`,
`chevron-right`, `more-horizontal`, `search`, `settings`, `user`.

**Emoji & unicode glyphs.** Emoji are **not used.** Unicode arrows (`↑ ↓
→`), math glyphs (`±`, `≈`, `Δ`), and proper typography (em dash, ellipsis,
curly quotes) are encouraged.

**SVGs.** The logo, wordmark, and any custom marks live in `assets/` as
SVG. Don't inline-draw new ones in components — `import` or `<img>` from
`assets/`.

---

## Caveats — please help me iterate

These are the spots where I made assumptions and would love a real signal:

1. **Fonts.** I used Google Fonts CDN imports (`Geist`, `Geist Mono`)
   because no font files were provided. If Data Forward has licensed
   faces — a custom sans, etc. — drop the `.woff2` files in `fonts/` and
   update `colors_and_type.css`.
2. **Logo & wordmark.** The marks in `assets/` are my best read of the
   brand brief (a forward-tilted "df" lockup in clay). If you have an
   existing mark, swap it in.
3. **Voice samples.** All copy in the UI kits is invented from the brief.
   If you have real product copy, paste it and I'll align tone.
4. **Iconography.** Lucide is a placeholder until a real set is chosen.
5. **No slide template.** I skipped `slides/` because no decks were
   provided.
6. **Color of brand mark.** I assumed clay accent on cream; the dark
   variant uses a lifted clay (`#D67651`). Flag if either feels off.

---

## How to use this system

- Read `colors_and_type.css` for tokens.
- Look at `preview/*.html` in the Design System tab for visual reference.
- Pull components from `ui_kits/web/` or `ui_kits/mobile/` when building.
- For new designs, follow voice rules in *Content fundamentals* and visual
  rules in *Visual foundations*.
- For agent invocation, see `SKILL.md`.
