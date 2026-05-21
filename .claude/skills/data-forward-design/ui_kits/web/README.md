# Data Forward — Web UI kit

The desktop dashboard. The single most-used surface in the product: see
this week's averages, the current trend, and quickly log a new entry.

## Run

Open `index.html`. It loads React + Babel from CDN and the JSX files in this
folder.

## What's here

```
ui_kits/web/
├── index.html        ← shell + script tags
├── App.jsx           ← top-level layout + state + sample data
├── Sidebar.jsx       ← 240 px left nav (Track / Decide groups + profile)
├── TopBar.jsx        ← greeting + ⌘K search + bell + Add entry
├── MetricCard.jsx    ← KPI card with inline sparkline
├── ChartCard.jsx     ← large line chart with range toggle + hover tooltip
├── LogList.jsx       ← recent-entries table with hover-revealed delete
├── AddSheet.jsx      ← modal composer (metric picker, value, mood, note)
└── Primitives.jsx    ← Icon (inline-SVG lookup), Button, Input, Badge, Card, Eyebrow, Kbd
```

## Interactive bits

- **Sidebar items** switch the main view. Only `Dashboard` is built out —
  the rest show a stub explaining that.
- **Add entry** (top right *or* the "Quick log" button in the decision
  panel) opens the composer. It supports four metrics, a value field with
  unit suffix, a mood pill row, and an optional note. Submitting adds a
  fake row to the log list and shows a toast.
- **Metric cards** are clickable; selected card gets a clay border ring.
- **Chart range toggle** flips between 7-day, 30-day, and all-time.
- **Hover the chart** for a tooltip with the day's value.
- **Hover a log row** to reveal the delete affordance.

## Component contracts (quick reference)

```jsx
<Button variant="primary|secondary|ghost|danger" size="sm|md|lg|icon"
        icon="plus" iconRight="chevron-right" onClick={...}>
  Add entry
</Button>

<Input label="Weight today" hint="optional" unit="lb" placeholder="168.4"
       value={…} onChange={…} />

<Badge tone="clay|sage|ochre|rust|teal|neutral" dot>on track</Badge>

<MetricCard icon="scale" label="Weight" value="168.4" unit="lb"
            spark={[…]} sparkColor="var(--df-clay)"
            delta="1.4 lb" deltaDirection="down" deltaSub="in 14 days" />

<ChartCard eyebrow="Weight" title="Quiet downward trend"
           data={[{label, v}, …]} color="var(--df-clay)"
           yUnit=" lb" showGoal goalValue={165} goalLabel="goal · 165" />
```

## What's intentionally not done

- **No real persistence.** Submissions live in component state.
- **Other tabs (Sleep, Spend, Reading, Goals, Compare)** are stubs.
  They'd reuse `MetricCard` + `ChartCard` + `LogList` against different
  metric series.
- **No dark mode.** Cream surface only, for now.
- **No empty states for the chart.** Sample data is hardcoded.
