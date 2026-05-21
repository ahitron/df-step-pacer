/* global React, Icon, Eyebrow, Kbd */
const { useState: useStateSidebar } = React;

const NAV_GROUPS = [
  {
    label: "Track",
    items: [
      { id: "dashboard", label: "Dashboard", icon: "dashboard", kbd: "⌘1" },
      { id: "weight",    label: "Weight",    icon: "scale",    count: 42 },
      { id: "sleep",     label: "Sleep",     icon: "moon",     count: 38 },
      { id: "spend",     label: "Spend",     icon: "wallet" },
      { id: "reading",   label: "Reading",   icon: "book" },
    ],
  },
  {
    label: "Decide",
    items: [
      { id: "goals",   label: "Goals",   icon: "target" },
      { id: "compare", label: "Compare", icon: "compare" },
    ],
  },
];

function Sidebar({ activeId, onSelect }) {
  return (
    <aside style={{
      width: 240,
      flex: "none",
      background: "var(--df-surface)",
      borderRight: "1px solid var(--df-line)",
      height: "100vh",
      position: "sticky",
      top: 0,
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 18px", borderBottom: "1px solid var(--df-line-soft)" }}>
        <img src="../../assets/logo.svg" alt="" width={28} height={28} style={{ borderRadius: 7 }} />
        <div style={{ fontFamily: "var(--df-font-sans)", fontSize: 18, fontWeight: 300, lineHeight: 1, color: "var(--df-ink)", letterSpacing: "-0.01em" }}>
          Data <span style={{ color: "var(--df-clay)", fontWeight: 500 }}>Forward</span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflow: "auto", padding: 8 }}>
        {NAV_GROUPS.map((grp) => (
          <div key={grp.label} style={{ marginBottom: 8 }}>
            <Eyebrow style={{ padding: "10px 10px 4px", fontSize: 10 }}>{grp.label}</Eyebrow>
            {grp.items.map((it) => {
              const active = it.id === activeId;
              return (
                <button
                  key={it.id}
                  onClick={() => onSelect && onSelect(it.id)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "7px 10px",
                    borderRadius: 6,
                    fontSize: 13,
                    width: "100%",
                    boxSizing: "border-box",
                    color: active ? "var(--df-on-clay-tint)" : "var(--df-ink-2)",
                    background: active ? "var(--df-clay-tint)" : "transparent",
                    fontWeight: active ? 500 : 400,
                    transition: "background 120ms var(--df-ease-out), color 120ms var(--df-ease-out)",
                  }}
                  onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = "var(--df-surface-2)"; e.currentTarget.style.color = "var(--df-ink)"; } }}
                  onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--df-ink-2)"; } }}
                >
                  <Icon name={it.icon} size={16} />
                  <span>{it.label}</span>
                  <span style={{ marginLeft: "auto", fontFamily: "var(--df-font-mono)", fontSize: 11, color: active ? "var(--df-on-clay-tint)" : "var(--df-ink-3)" }}>
                    {it.kbd || (typeof it.count === "number" ? it.count : "")}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Profile / footer */}
      <div style={{ padding: 10, borderTop: "1px solid var(--df-line-soft)" }}>
        <button style={{
          all: "unset", cursor: "pointer", width: "100%", boxSizing: "border-box",
          display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 6,
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "var(--df-surface-2)"}
        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
          <span style={{
            width: 26, height: 26, borderRadius: 999,
            background: "linear-gradient(135deg, #B8593A 0%, #C49A3B 100%)",
            color: "var(--df-ink-inverse)", display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 600, fontFamily: "var(--df-font-sans)",
          }}>D</span>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--df-ink)" }}>this is you</span>
            <span style={{ fontSize: 11, color: "var(--df-ink-3)" }}>local · synced 2 min ago</span>
          </div>
          <Icon name="settings" size={14} style={{ marginLeft: "auto", color: "var(--df-ink-3)" }} />
        </button>
      </div>
    </aside>
  );
}

Object.assign(window, { Sidebar });
