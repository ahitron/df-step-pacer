# CLAUDE.md — df-step-pacer

## Running the app

```bash
pnpm install        # first time
pnpm dev            # dev server at http://localhost:5173
pnpm build          # tsc + vite build
pnpm lint           # eslint
firebase deploy --only hosting   # deploy (fill in .firebaserc project ID first)
```

## Architecture

Two screens with react-router-dom. State is a single `AppState` object persisted as one JSON blob under the `df-step-pacer` localStorage key. Theme is a React context.

```
src/
  App.tsx                        ← providers (ThemeContext, AppStateContext) + BrowserRouter + Routes
  contexts/
    ThemeContext.tsx              ← dark/light toggle; sets data-theme on <html>
    AppStateContext.tsx           ← AppState + update; localStorage persistence
  components/
    Layout.tsx                   ← Outlet wrapper + TabBar
    TabBar.tsx                   ← bottom nav (NavLink-based)
    ThemeToggle.tsx              ← consumes useThemeContext()
    CurvePreview.tsx             ← SVG curve visualization
    FunctionEditor.tsx           ← add/edit modal (bottom sheet)
  screens/
    HomeScreen.tsx               ← goal input, pacing selector, target display
    ConfigScreen.tsx             ← time window, pacing function list
  lib/
    pacing.ts                    ← compileFn, validateExpression, safeEval
    storage.ts                   ← loadState / saveState, AppState type
    time.ts                      ← getTargetSteps, formatTime
  sw.ts                          ← Workbox precaching + asset caching
```

Routes: `/` → `HomeScreen`, `/config` → `ConfigScreen` (both wrapped by `Layout`).

## Stack

- **React 19 + TypeScript**, built with **Vite 8**
- **Tailwind CSS v4** via `@tailwindcss/vite` (no `tailwind.config.ts` — CSS-first config)
- **react-router-dom v7** for routing
- **lucide-react** for all icons (outline, 1.5px stroke, 18/20px)
- **pnpm** as package manager
- **Firebase Hosting** (SPA, manual `firebase deploy`)

## Key invariants

- `LINEAR_FN` (`{ id: 'linear', expression: 't' }`) is defined in code, never stored. It cannot be deleted.
- Custom functions live in `AppState.customFns`. All other functions come from prepending `LINEAR_FN`.
- Pacing function validation: `f(0) ≈ 0` and `f(1) ≈ 1` (tolerance 0.001). No monotonicity check — intentional.
- `new Function('t', ...)` evaluates user expressions. This is a single-user personal tool; the risk is acceptable.
- Target steps: 0 before the window, full goal after the window, `Math.round(f(t) * goal)` during it.
- Theme is stored under the `df-theme` localStorage key and initialised via an inline `<script>` in `index.html` to prevent flash of unstyled content.

## Design system

Tokens live in `src/df-tokens.css` (canonical source shared with df-weight-tracker). Always use CSS custom properties — never hardcode hex values.

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
--df-radius-xs (4px), --df-radius-sm (6px), --df-radius-md (10px),
--df-radius-xl (20px), --df-radius-2xl (28px)
```

Typography classes defined in `src/df-tokens.css`: `.df-display`, `.df-h1`–`.df-h4`, `.df-eyebrow`, `.df-body`, `.df-body-lg`, `.df-small`, `.df-caption`, `.df-label`, `.df-numeric`, `.df-numeric-display`, `.df-mono`, `.df-code`.

Component CSS classes (`.df-input`, `.df-select`, `.df-btn-primary`, `.df-btn-ghost`, `.df-sheet-enter`) are defined in `src/index.css` under `@layer components`.

Tailwind v4 theme tokens (`bg-df-surface`, `border-df-line`, `rounded-df-md`, etc.) are mapped in the `@theme inline` block of `src/index.css`.

Dark mode: set `data-theme="dark"` on `<html>`. Every `--df-*` token swaps automatically.

## Content rules (Data Forward voice)

- Sentence case everywhere. No title case, no ALL CAPS except `.df-eyebrow` labels.
- No exclamation marks, no emoji.
- Numbers as numerals: "10,000 steps", not "ten thousand steps".
- Short and direct: "Target by now", not "Your current target step count".
