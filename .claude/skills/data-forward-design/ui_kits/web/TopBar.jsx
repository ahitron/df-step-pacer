/* global React, Icon, Button, Kbd, ThemeToggle */

function TopBar({ greeting, sub, onAdd }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "24px 32px 16px",
      borderBottom: "1px solid var(--df-line-soft)",
    }}>
      {/* Greeting */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: "var(--df-font-sans)",
          fontWeight: 300,
          fontSize: 32,
          letterSpacing: "-0.02em",
          color: "var(--df-ink)",
          lineHeight: 1.1,
        }}>
          {greeting}
        </div>
        <div style={{ fontSize: 13, color: "var(--df-ink-3)", marginTop: 4 }}>{sub}</div>
      </div>

      {/* Search */}
      <div style={{
        position: "relative",
        width: 280,
      }}>
        <Icon name="search" size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--df-ink-3)" }} />
        <input
          placeholder="Find a metric, day, or note"
          style={{
            height: 34,
            width: "100%",
            padding: "0 50px 0 32px",
            border: "1px solid var(--df-line)",
            background: "var(--df-surface)",
            borderRadius: 6,
            fontSize: 13,
            color: "var(--df-ink)",
            outline: "none",
            boxSizing: "border-box",
            fontFamily: "var(--df-font-sans)",
          }}
        />
        <span style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", display: "flex", gap: 3 }}>
          <Kbd>⌘</Kbd><Kbd>K</Kbd>
        </span>
      </div>

      {/* Bell */}
      <button style={{
        all: "unset", cursor: "pointer",
        width: 34, height: 34, borderRadius: 6,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        color: "var(--df-ink-2)",
        border: "1px solid var(--df-line)",
        background: "var(--df-surface)",
        position: "relative",
      }}>
        <Icon name="bell" size={16} />
        <span style={{ position: "absolute", top: 8, right: 9, width: 6, height: 6, borderRadius: 999, background: "var(--df-clay)" }}></span>
      </button>

      {/* Theme toggle */}
      <ThemeToggle />

      {/* Add button */}
      <Button variant="primary" icon="plus" onClick={onAdd}>Add entry</Button>
    </div>
  );
}

Object.assign(window, { TopBar });
