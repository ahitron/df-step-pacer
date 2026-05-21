---
name: data-forward-design
description: Use this skill to generate well-branded interfaces and assets for Data Forward, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# Data Forward — design skill

Data Forward is a small constellation of personal-data tools — sleep,
weight, spend, reading, goals — designed for a single user. The
aesthetic is **warm, modern, and subtle**: cream paper canvas, warm ink,
one clay accent, one type family (Geist) used with restraint.

## Use this skill

Read the **`README.md`** in this folder first. It contains the brand
context, content fundamentals (voice, casing, examples), and visual
foundations (colors, type, spacing, shadows, motion, hover/press,
iconography).

Then explore the other files:

- **`colors_and_type.css`** — every design token as CSS variables, plus
  semantic typography classes. Always import this rather than hardcoding
  hex codes.
- **`preview/*.html`** — small reference cards showing each foundational
  decision in isolation (palettes, type scale, spacing, shadows, buttons,
  inputs, etc.). Useful when you need to see a token in context.
- **`assets/`** — `logo.svg`, `logo-mono.svg`, `wordmark.svg`. Reference
  these by path, don't redraw them.
- **`ui_kits/web/`** — desktop dashboard kit. Read its `README.md` for
  component contracts. Components: `Sidebar`, `TopBar`, `MetricCard`,
  `ChartCard`, `LogList`, `AddSheet`, plus primitives (`Icon`, `Button`,
  `Input`, `Badge`, `Card`, `Eyebrow`, `Kbd`).
- **`ui_kits/mobile/`** — phone companion kit. iPhone frame +
  `MobileHeader`, `MobileHero`, `MobileMetricGrid`, `MobileEntryList`,
  `MobileSuggestion`, `MobileTabBar`, `MobileLogger`.

## What to do

- **For visual artifacts** (slides, throwaway prototypes, mocks, marketing
  pages): copy `colors_and_type.css` and `assets/` into your output
  folder, lift components from the relevant `ui_kits/*` directory, and
  produce static HTML the user can open.
- **For production code**: copy tokens and read the rules in `README.md`
  to become an expert in designing with this brand. Don't lift the JSX
  files wholesale — they're cosmetic recreations, not production
  components.

## Non-negotiables

- **One family — Geist.** No second display face, no serif italic, no
  cute substitutes. Mono is `Geist Mono`.
- **One accent — clay (`#B8593A` light / `#D67651` dark).** All primary
  actions, focus, active states. Semantic colors (sage / ochre / rust /
  teal) are desaturated so they coexist quietly.
- **Warm near-black ink (`#2A2620`)**, never pure `#000`. Same for
  shadows: warm `rgba(42, 38, 32, …)`.
- **Dark mode is supported.** Set `data-theme="dark"` on `<html>` —
  every token swaps to a warm-dark equivalent. Never bypass the tokens.
- **No emoji.** No exclamation points. Sentence case everywhere except
  the all-caps `.df-eyebrow` label.
- **Lucide icons**, outline, 1.5 px stroke, 16/20/24 px boxes.
- **No gradients** in UI chrome. No glass cards in the product. Backdrop
  blur is only used on the mobile tab bar and a sticky web header.
- **Sentence-case copy, you-form**, short and specific. "You've slept
  6 h 48 m on average this week." See README → *Content fundamentals*
  for the yes/no table.

## If the user invokes without guidance

Ask what they want to build, then ask:

1. Which surface — web dashboard, mobile, marketing/about page, or one-off
   asset (slide, hero image, social card)?
2. What metric or flow is at the centre? Sleep, weight, spend, reading,
   goals, or something new?
3. Is this a quick sketch, a polished mock, or production-bound code?
4. Light mode only, or do they want a dark variant explored?

Then produce HTML artifacts (for sketches / mocks) or production-ready
code (for codebase work), always rooted in the tokens and components
here.
