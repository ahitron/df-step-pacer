/* global React, Icon, Eyebrow, Sparkline */

function MetricCard({ icon, label, value, unit, delta, deltaDirection, deltaSub, spark, sparkColor, active, onClick }) {
  const isUp = deltaDirection === "up";
  const isDown = deltaDirection === "down";
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        all: "unset",
        cursor: "pointer",
        display: "block",
        width: "100%",
        boxSizing: "border-box",
        background: "var(--df-surface)",
        border: `1px solid ${active ? "var(--df-clay)" : "var(--df-line)"}`,
        borderRadius: 10,
        boxShadow: hover ? "var(--df-shadow-md)" : "var(--df-shadow-sm)",
        padding: "16px 18px",
        transition: "box-shadow 120ms var(--df-ease-out), border-color 120ms var(--df-ease-out), transform 120ms var(--df-ease-out)",
        transform: hover ? "translateY(-1px)" : "translateY(0)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Icon name={icon} size={14} color="var(--df-ink-3)" />
        <Eyebrow style={{ fontSize: 10 }}>{label}</Eyebrow>
      </div>
      <div style={{
        marginTop: 6,
        fontFamily: "var(--df-font-sans)",
        fontWeight: 300,
        fontSize: 40,
        lineHeight: 1.05,
        color: "var(--df-ink)",
        letterSpacing: "-0.02em",
        fontVariantNumeric: "tabular-nums",
        display: "flex",
        alignItems: "baseline",
        gap: 6,
      }}>
        <span>{value}</span>
        {unit && <span style={{ fontSize: 13, fontWeight: 500, color: "var(--df-ink-3)", letterSpacing: 0 }}>{unit}</span>}
      </div>
      <div style={{ marginTop: 6 }}>
        <Sparkline data={spark} color={sparkColor || "var(--df-clay)"} />
      </div>
      <div style={{ marginTop: 8, fontSize: 12, color: "var(--df-ink-3)", display: "flex", alignItems: "center", gap: 4 }}>
        {(isUp || isDown) && (
          <span style={{ color: isUp ? "#6B8E5A" : "#B14F40", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 2 }}>
            {isUp ? "↑" : "↓"} {delta}
          </span>
        )}
        {!(isUp || isDown) && delta && (
          <span style={{ color: "var(--df-ink-2)", fontWeight: 500 }}>{delta}</span>
        )}
        <span>{deltaSub}</span>
      </div>
    </button>
  );
}

Object.assign(window, { MetricCard });
