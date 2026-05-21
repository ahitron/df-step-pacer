/* global React, ReactDOM, IOSDevice,
  MobileHeader, MobileHero, MobileMetricGrid, MobileEntryList, MobileSuggestion,
  MobileTabBar, MobileLogger */

const { useState: useStateMobile } = React;

const MOBILE_SPARK = [170.1, 169.6, 169.8, 169.0, 168.7, 168.9, 168.4, 168.6, 168.2, 168.4];

const MOBILE_GRID_ITEMS = [
  { id: "sleep",   label: "Sleep",   icon: "moon",   color: "#527A7A", value: "6:48", unit: "h",  delta: "22 m",   deltaDirection: "up",   deltaSub: "vs last week" },
  { id: "spend",   label: "Spend",   icon: "wallet", color: "#C49A3B", value: "1,284", unit: "$", delta: "68%",    deltaDirection: "flat", deltaSub: "of budget" },
  { id: "reading", label: "Reading", icon: "book",   color: "#6B8E5A", value: "2:04", unit: "h",  delta: "14 m",   deltaDirection: "up",   deltaSub: "vs last week" },
  { id: "goal",    label: "To goal", icon: "target", color: "var(--df-clay)", value: "3.4", unit: "lb", delta: "Jul 4", deltaDirection: "flat", deltaSub: "at this rate" },
];

const MOBILE_ENTRIES = [
  { id: 1, icon: "scale",  label: "Weight",  sub: "this morning · after walk", value: "168.4", unit: "lb", iconBg: "var(--df-clay-tint)",  iconColor: "var(--df-on-clay-tint)" },
  { id: 2, icon: "moon",   label: "Sleep",   sub: "last night · in bed 11:08", value: "7:02",  unit: "h",  iconBg: "#D2DEDE",              iconColor: "#2F4F4F" },
  { id: 3, icon: "wallet", label: "Spend",   sub: "yesterday · groceries",     value: "42",    unit: "$",  iconBg: "#EFE0BC",              iconColor: "#7A5E1E" },
  { id: 4, icon: "book",   label: "Reading", sub: "yesterday · 'Stoner'",      value: "45",    unit: "m",  iconBg: "#DDE5D0",              iconColor: "#3F5532" },
];

function MobileApp() {
  const [tab, setTab] = useStateMobile("home");
  const [logger, setLogger] = useStateMobile(false);
  const [entries, setEntries] = useStateMobile(MOBILE_ENTRIES);

  const handleSubmit = ({ metric, value, unit }) => {
    const meta = MOBILE_GRID_ITEMS.find(i => i.id === metric) || { icon: "scale", iconBg: "var(--df-clay-tint)", iconColor: "var(--df-on-clay-tint)", label: metric };
    setEntries(e => [{
      id: Date.now(),
      icon: meta.icon,
      iconBg: meta.iconBg || "var(--df-clay-tint)",
      iconColor: meta.iconColor || "var(--df-on-clay-tint)",
      label: meta.label || metric,
      sub: "just now",
      value: String(value),
      unit,
    }, ...e]);
    setLogger(false);
  };

  return (
    <IOSDevice width={402} height={874} dark={false}>
      <div style={{
        position: "relative",
        height: "100%",
        background: "var(--df-canvas)",
        overflow: "hidden",
      }}>
        <div className="iphone-scroll" style={{
          height: "100%",
          overflow: "auto",
          paddingTop: 56,         // status bar room
          paddingBottom: 110,     // tab bar room
          boxSizing: "border-box",
        }}>
          {tab === "home" ? (
            <>
              <MobileHeader />
              <MobileHero
                label="Weight · today"
                value="168.4"
                unit="lb"
                spark={MOBILE_SPARK}
                delta="1.4 lb"
                deltaDirection="down"
                deltaSub="in 14 days"
              />
              <MobileMetricGrid items={MOBILE_GRID_ITEMS} />
              <MobileSuggestion />
              <MobileEntryList title="Recent" entries={entries.slice(0, 4)} />
            </>
          ) : (
            <MobileStub id={tab} />
          )}
        </div>

        <MobileTabBar active={tab} onChange={setTab} onAdd={() => setLogger(true)} />
        <MobileLogger open={logger} onClose={() => setLogger(false)} onSubmit={handleSubmit} />
      </div>
    </IOSDevice>
  );
}

function MobileStub({ id }) {
  return (
    <div style={{ padding: "40px 20px", color: "var(--df-ink-3)" }}>
      <div style={{
        fontFamily: "var(--df-font-sans)",
        fontWeight: 300,
        fontSize: 32,
        letterSpacing: "-0.025em",
        color: "var(--df-ink)",
        marginBottom: 8,
        lineHeight: 1.1,
      }}>
        {id} isn't built out
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.55 }}>
        The home tab demonstrates the core mobile components — header, hero, metric grid, suggestion, recent list, and the quick-log sheet. The other tabs would compose the same pieces.
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<MobileApp />);
