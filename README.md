# df-step-pacer

A mobile-first web app that tells you how many steps you should have taken by now, given a daily goal and a pacing curve of your choosing.

## What it does

You set a daily step goal and a time window (e.g. 7 am – 9 pm). Throughout the day, the app shows the exact step count you should have reached by the current time based on a pacing function — a curve from (0, 0) to (1, 1) that maps how far through the window you are to how far through your goal you should be.

The default pacing is linear (steady rate all day). You can add custom curves by writing any JavaScript expression in `t` — `Math.sqrt(t)` front-loads your steps, `t * t` back-loads them, `t < 0.5 ? 0 : 2 * t - 1` squeezes them all into the second half of the window.

The target refreshes every minute automatically. Everything — goal, window, functions, selected function — persists to `localStorage`.

## Running it

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm build    # production bundle → dist/
pnpm preview  # preview the production build locally
```

## Stack

- **Vite 5** + **React 18** + **TypeScript**
- **Tailwind CSS v3** extended with Data Forward design tokens
- **lucide-react** for icons

## Design

Part of the [Data Forward](../.claude/skills/data-forward-design/README.md) suite. Warm cream paper canvas, clay accent, Geist typeface, full light/dark theme.
