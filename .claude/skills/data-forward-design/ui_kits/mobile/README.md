# Data Forward — Mobile UI kit

The phone companion: a one-thumb capture surface. Quick log, glanceable
trends, light navigation. Not a port of the dashboard — a different
information density.

## Run

Open `index.html`. It loads React + Babel from CDN and uses the shared
device frame (`ios-frame.jsx`) plus the kit components in this folder.

## What's here

```
ui_kits/mobile/
├── index.html         ← shell + script tags
├── ios-frame.jsx      ← iOS 26 device chrome (status bar, home indicator)
├── MobileApp.jsx      ← root composition + state
├── MobileScreen.jsx   ← header, hero, metric grid, entry list, suggestion
├── MobileTabBar.jsx   ← bottom tab bar (Home / Trends / + / Log / You)
└── MobileLogger.jsx   ← bottom-sheet composer with big numeric input
```

Primitives (`Icon`, `Eyebrow`, `Badge`) are shared with the web kit and
loaded from `../web/Primitives.jsx`.

## Interactive bits

- **Tap a tab** in the bottom bar to switch views. Only `Home` is built
  out — the rest show a stub.
- **Tap the floating + button** (or any "add" affordance) to open the
  quick-log sheet from the bottom. Pick a metric, type a value, tap a
  mood pill, save.
- **Submitting** prepends a new row to the "Recent" list.

## Layout decisions

- **Cream canvas inside the device chrome.** No card chrome on the page
  background — only the metric cards themselves are surfaces.
- **One hero metric per screen.** Whatever you've explicitly anchored on
  ("Weight" today) gets a big number + sparkline. Everything else lives
  in the 2×2 grid.
- **Bottom tab bar uses translucent canvas** with backdrop blur — the
  only blur in the system.
- **Floating + button** sits above the tab row, clay-filled, with a
  subtle clay shadow.
- **Quick-log sheet** is a true bottom sheet (animates up, dismisses by
  tapping the scrim or pulling the grabber). The numeric input is
  oversized — your value is the protagonist.

## What's intentionally not done

- **No real persistence.** Submissions live in component state.
- **Other tabs (Trends, Log, You)** are stubs.
- **No real iOS keyboard.** The text input uses the system keyboard via
  `inputMode="decimal"` on actual devices; in the preview the device
  frame omits it.
- **No dark mode.**
