/* global React, ReactDOM, Sidebar, TopBar, MetricCard, ChartCard, LogList, AddSheet, Card, Eyebrow, Badge, Button, Icon */

const { useState, useEffect } = React;

// Sample data — invented for the demo.
const SLEEP_SPARK   = [6.2, 6.8, 6.4, 7.1, 6.9, 6.5, 6.8];
const WEIGHT_SPARK  = [170.1, 169.6, 169.8, 169.0, 168.7, 168.9, 168.4];
const SPEND_SPARK   = [180, 240, 310, 420, 580, 760, 1284].map(v => v / 10);
const READ_SPARK    = [12, 0, 22, 30, 15, 0, 45];

function genWeightSeries() {
  const start = 172;
  const days = 30;
  const out = [];
  let v = start;
  for (let i = 0; i < days; i++) {
    v -= 0.12 + (Math.sin(i * 0.7) * 0.18);
    if (i % 5 === 0) v += 0.4;
    const date = new Date(2026, 3, 22 + i);
    out.push({
      label: `${date.toLocaleString("en", { month: "short" })} ${date.getDate()}`,
      v: Math.round(v * 10) / 10,
    });
  }
  return out;
}

const WEIGHT_SERIES = genWeightSeries();

const INITIAL_ENTRIES = [
  { id: 1, date: "May 21", note: "After morning walk", value: 168.4, unit: "lb", trend: "down" },
  { id: 2, date: "May 20", note: null, value: 168.9, unit: "lb", trend: "flat" },
  { id: 3, date: "May 19", note: "Travel day, light dinner", value: 169.2, unit: "lb", trend: "up" },
  { id: 4, date: "May 18", note: null, value: 169.0, unit: "lb", trend: "down" },
  { id: 5, date: "May 17", note: "Rest day", value: 169.6, unit: "lb", trend: "up" },
];

function ToastStack({ toasts }) {
  if (toasts.length === 0) return null;
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 60,
      display: "flex", flexDirection: "column", gap: 8,
    }}>
      <style>{`
        @keyframes df-toast-in { from { opacity:0; transform: translateY(8px) } to { opacity:1; transform: translateY(0) } }
      `}</style>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: "var(--df-ink)",
          color: "var(--df-ink-inverse)",
          padding: "10px 14px",
          borderRadius: 8,
          fontSize: 13,
          boxShadow: "var(--df-shadow-lg)",
          display: "flex", alignItems: "center", gap: 10,
          animation: "df-toast-in 200ms var(--df-ease-out)",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: "#9CB58A" }}></span>
          {t.message}
        </div>
      ))}
    </div>
  );
}

function StatRow({ entries }) {
  // small stats above the chart
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0,
      background: "var(--df-surface)", border: "1px solid var(--df-line)",
      borderRadius: 10, padding: "14px 0", marginBottom: 16,
    }}>
      {[
        { lbl: "current", val: "168.4 lb", sub: "today" },
        { lbl: "7-day avg", val: "168.9 lb", sub: "↓ 0.8 from prev" },
        { lbl: "lowest, 30 d", val: "168.4", sub: "May 21" },
        { lbl: "to goal", val: "3.4 lb", sub: "target 165" },
      ].map((s, i) => (
        <div key={i} style={{
          padding: "0 20px",
          borderLeft: i === 0 ? "none" : "1px solid var(--df-line-soft)",
        }}>
          <Eyebrow style={{ fontSize: 10 }}>{s.lbl}</Eyebrow>
          <div style={{
            fontFamily: "var(--df-font-sans)",
            fontSize: 22,
            fontWeight: 500,
            marginTop: 4,
            color: "var(--df-ink)",
            letterSpacing: "-0.01em",
            fontVariantNumeric: "tabular-nums",
            lineHeight: 1.1,
          }}>{s.val}</div>
          <div style={{ fontSize: 11, color: "var(--df-ink-3)", marginTop: 2 }}>{s.sub}</div>
        </div>
      ))}
    </div>
  );
}

function DashboardView({ onAddRequest, onMetricClick, activeMetric, entries, onDelete }) {
  return (
    <div style={{ padding: "20px 32px 60px" }}>
      {/* Metric row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        <MetricCard
          icon="moon"  label="Sleep · 7d avg" value="6h 48m"
          spark={SLEEP_SPARK} sparkColor="#527A7A"
          delta="22m" deltaDirection="up" deltaSub="vs last week"
          active={activeMetric === "sleep"}
          onClick={() => onMetricClick("sleep")}
        />
        <MetricCard
          icon="scale" label="Weight" value="168.4" unit="lb"
          spark={WEIGHT_SPARK} sparkColor="var(--df-clay)"
          delta="1.4 lb" deltaDirection="down" deltaSub="in 14 days"
          active={activeMetric === "weight"}
          onClick={() => onMetricClick("weight")}
        />
        <MetricCard
          icon="wallet" label="Spend · MTD" value="$1,284"
          spark={SPEND_SPARK} sparkColor="#C49A3B"
          delta="68%" deltaSub="of monthly budget"
          active={activeMetric === "spend"}
          onClick={() => onMetricClick("spend")}
        />
        <MetricCard
          icon="book"  label="Reading · 7d" value="2h 4m"
          spark={READ_SPARK} sparkColor="#6B8E5A"
          delta="14m" deltaDirection="up" deltaSub="vs last week"
          active={activeMetric === "reading"}
          onClick={() => onMetricClick("reading")}
        />
      </div>

      <StatRow />

      {/* Chart + side */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16, marginBottom: 16 }}>
        <ChartCard
          eyebrow="Weight"
          title="Quiet downward trend"
          data={WEIGHT_SERIES}
          color="var(--df-clay)"
          yUnit=" lb"
          showGoal
          goalValue={165}
          goalLabel="goal · 165"
        />
        <DecisionPanel onAddRequest={onAddRequest} />
      </div>

      {/* Recent log */}
      <LogList title="Weight log" entries={entries} onDelete={onDelete} />
    </div>
  );
}

function DecisionPanel({ onAddRequest }) {
  return (
    <Card padding="20px 22px" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div>
        <Eyebrow>What the data says</Eyebrow>
        <div style={{ fontFamily: "var(--df-font-sans)", fontWeight: 300, fontSize: 26, color: "var(--df-ink)", letterSpacing: "-0.02em", marginTop: 2, lineHeight: 1.22 }}>
          You're <span style={{ color: "var(--df-clay)", fontWeight: 500 }}>2.3 lb</span> ahead of your trendline.
        </div>
        <div style={{ fontSize: 13, color: "var(--df-ink-2)", marginTop: 8, lineHeight: 1.55 }}>
          At this rate you'll reach 165 lb around <strong style={{ color: "var(--df-ink)", fontWeight: 500 }}>July 4</strong>. Sleep is up 22 m this week — the two seem linked.
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <SuggestionRow icon="trending-down" tone="sage" label="Keep evening reading habit" sub="14 m correlation last 21 days" />
        <SuggestionRow icon="trending-up" tone="ochre" label="Tuesday spend is high" sub="$94 avg vs $52 other days" />
        <SuggestionRow icon="target" tone="clay" label="Add a goal for sleep?" sub="No goal set yet" />
      </div>

      <Button variant="secondary" size="sm" icon="plus" onClick={onAddRequest} style={{ alignSelf: "flex-start" }}>
        Quick log
      </Button>
    </Card>
  );
}

function SuggestionRow({ icon, tone, label, sub }) {
  const tones = {
    sage: { bg: "#DDE5D0", fg: "#3F5532" },
    ochre: { bg: "#EFE0BC", fg: "#7A5E1E" },
    clay: { bg: "var(--df-clay-tint)", fg: "var(--df-on-clay-tint)" },
  };
  const t = tones[tone];
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderTop: "1px solid var(--df-line-soft)" }}>
      <span style={{
        width: 26, height: 26, borderRadius: 6, flex: "none",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        background: t.bg, color: t.fg,
      }}>
        <Icon name={icon} size={14} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: "var(--df-ink)" }}>{label}</div>
        <div style={{ fontSize: 11, color: "var(--df-ink-3)", marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}

function StubView({ id }) {
  return (
    <div style={{ padding: "60px 32px", color: "var(--df-ink-3)", fontSize: 14, maxWidth: 480 }}>
      <Eyebrow>{id}</Eyebrow>
      <div style={{ fontFamily: "var(--df-font-sans)", fontWeight: 300, fontSize: 32, letterSpacing: "-0.02em", color: "var(--df-ink)", marginTop: 4 }}>
        This view isn't built out in the kit.
      </div>
      <div style={{ marginTop: 10, lineHeight: 1.6 }}>
        The dashboard demonstrates the core components — sidebar, metric cards, chart, decision panel, and log list. Other tabs would compose the same primitives.
      </div>
    </div>
  );
}

function App() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [addOpen, setAddOpen] = useState(false);
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [toasts, setToasts] = useState([]);
  const [activeMetric, setActiveMetric] = useState("weight");

  const toast = (message) => {
    const id = Date.now();
    setToasts(t => [...t, { id, message }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2500);
  };

  const handleAddSubmit = ({ metric, value, unit, note }) => {
    setEntries(e => [{
      id: Date.now(),
      date: new Date().toLocaleString("en", { month: "short", day: "numeric" }),
      note: note || null,
      value: parseFloat(value) || value,
      unit,
      trend: Math.random() > 0.5 ? "down" : "up",
    }, ...e]);
    setAddOpen(false);
    toast(`Logged ${metric} · ${value} ${unit}`);
  };

  const handleDelete = (entry) => {
    setEntries(e => e.filter(x => x.id !== entry.id));
    toast("Entry removed");
  };

  // Greeting changes by time
  const hour = new Date().getHours();
  const greeting = hour < 6 ? "Up early" : hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Welcome back";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--df-canvas)" }}>
      <Sidebar activeId={activeNav} onSelect={setActiveNav} />

      <main style={{ flex: 1, minWidth: 0 }}>
        <TopBar
          greeting={`${greeting}.`}
          sub={`Friday, May 21 — 2 logs since you opened the app yesterday.`}
          onAdd={() => setAddOpen(true)}
        />
        {activeNav === "dashboard"
          ? <DashboardView
              onAddRequest={() => setAddOpen(true)}
              onMetricClick={setActiveMetric}
              activeMetric={activeMetric}
              entries={entries}
              onDelete={handleDelete}
            />
          : <StubView id={activeNav} />
        }
      </main>

      <AddSheet open={addOpen} onClose={() => setAddOpen(false)} onSubmit={handleAddSubmit} />
      <ToastStack toasts={toasts} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
