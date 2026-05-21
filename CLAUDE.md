# CLAUDE.md — df-step-pacer

## Running the app

```bash
pnpm install   # first time
pnpm dev       # dev server at http://localhost:3000
pnpm build     # production build
```

## Architecture

Two screens, no router. `src/App.tsx` holds all state and routes via a `screen` string (`'home' | 'config'`). State is a single `AppState` object persisted as one JSON blob under the `df-step-pacer` localStorage key.

```
src/
  App.tsx                  ← state management, screen routing
  lib/
    pacing.ts              ← compileFn, validateExpression, safeEval
    storage.ts             ← loadState / saveState, AppState type
    time.ts                ← getTargetSteps, formatTime
  components/
    TabBar.tsx             ← bottom nav
    ThemeToggle.tsx        ← flips data-theme on <html>
    CurvePreview.tsx       ← SVG curve visualization
    FunctionEditor.tsx     ← add/edit modal (bottom sheet)
  screens/
    HomeScreen.tsx         ← goal input, pacing selector, target display
    ConfigScreen.tsx       ← time window, pacing function list
```

## Key invariants

- `LINEAR_FN` (`{ id: 'linear', expression: 't' }`) is defined in code, never stored. It cannot be deleted.
- Custom functions live in `AppState.customFns`. All other functions come from prepending `LINEAR_FN`.
- Pacing function validation: `f(0) ≈ 0` and `f(1) ≈ 1` (tolerance 0.001). No monotonicity check — intentional.
- `new Function('t', ...)` evaluates user expressions. This is a single-user personal tool; the risk is acceptable.
- Target steps: 0 before the window, full goal after the window, `Math.round(f(t) * goal)` during it.
- Theme is stored under the `df-theme` localStorage key and initialised via an inline `<script>` in `index.html` to prevent flash of unstyled content.

## Design system

Tokens live in `src/df-tokens.css` (copied from `.claude/skills/data-forward-design/colors_and_type.css`). Always use CSS custom properties — never hardcode hex values.

```css
/* colors */
--df-canvas, --df-surface, --df-surface-2
--df-ink, --df-ink-2, --df-ink-3, --df-ink-4
--df-clay, --df-clay-hover, --df-clay-press
--df-line, --df-line-strong
--df-danger, --df-success

/* type */
--df-font-sans, --df-font-mono
--df-text-xs … --df-text-5xl
--df-weight-light … --df-weight-bold

/* spacing */
--df-space-1 (4px) … --df-space-20 (80px)

/* radii */
--df-radius-sm (6px), --df-radius-md (10px), --df-radius-xl (20px)
```

Typography classes (`.df-h4`, `.df-eyebrow`, `.df-label`, `.df-caption`, `.df-body`, `.df-numeric-display`) are defined in `src/df-tokens.css` and available globally.

Component CSS classes (`.df-input`, `.df-select`, `.df-btn-primary`, `.df-btn-ghost`, `.df-sheet-enter`) are defined in `src/index.css` under `@layer components`.

Tailwind is extended with `text-df-clay`, `bg-df-surface`, `border-df-line`, `rounded-df-md`, etc. Use these for layout; use inline `style={{ color: 'var(--df-clay)' }}` for one-offs.

Dark mode: set `data-theme="dark"` on `<html>`. Every `--df-*` token swaps automatically.

## Content rules (Data Forward voice)

- Sentence case everywhere. No title case, no ALL CAPS except `.df-eyebrow` labels.
- No exclamation marks, no emoji.
- Numbers as numerals: "10,000 steps", not "ten thousand steps".
- Short and direct: "Target by now", not "Your current target step count".
