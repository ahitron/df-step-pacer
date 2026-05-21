/* global React, Icon, Eyebrow, Sparkline, Badge, ThemeToggle */

function MobileHeader({ name = "today" }) {
  return (
    <div style={{ padding: "8px 20px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <Eyebrow style={{ fontSize: 10 }}>Friday, May 21</Eyebrow>
        <div style={{ display: "flex", gap: 8 }}>
          <ThemeToggle size={30} />
          <button style={{
            all: "unset", cursor: "pointer",
            width: 30, height: 30, borderRadius: 999,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            background: "var(--df-surface)",
            color: "var(--df-ink-2)",
            border: "1px solid var(--df-line)",
          }}>
            <Icon name="search" size={14} />
          </button>
        </div>
      </div>
      <div style={{
        fontFamily: "var(--df-font-sans)",
        fontWeight: 300,
        fontSize: 38,
        lineHeight: 1.05,
        color: "var(--df-ink)",
        letterSpacing: "-0.025em",
      }}>
        Good morning. <br/>
        <span style={{ color: "var(--df-clay)", fontWeight: 500 }}>2 logs</span> waiting.
      </div>
    </div>
  );
}

// Hero metric — the one number that matters today
function MobileHero({ value, unit, label, delta, deltaDirection, deltaSub, spark }) {
  const isUp = deltaDirection === "up";
  const isDown = deltaDirection === "down";
  return (
    <div style={{
      margin: "0 16px 12px",
      background: "var(--df-surface)",
      border: "1px solid var(--df-line)",
      borderRadius: 16,
      boxShadow: "var(--df-shadow-sm)",
      padding: "18px 20px",
    }}>
      <Eyebrow style={{ fontSize: 10 }}>{label}</Eyebrow>
      <div style={{
        marginTop: 6,
        fontFamily: "var(--df-font-sans)",
        fontWeight: 300,
        fontSize: 60,
        lineHeight: 1,
        letterSpacing: "-0.025em",
        color: "var(--df-ink)",
        fontVariantNumeric: "tabular-nums",
        display: "flex",
        alignItems: "baseline",
        gap: 8,
      }}>
        <span>{value}</span>
        <span style={{ fontFamily: "var(--df-font-sans)", fontStyle: "normal", fontSize: 18, fontWeight: 500, color: "var(--df-ink-3)" }}>{unit}</span>
      </div>
      <div style={{ height: 50, marginTop: 8 }}>
        <Sparkline data={spark} color="var(--df-clay)" height={50} />
      </div>
      <div style={{ marginTop: 6, fontSize: 13, color: "var(--df-ink-3)" }}>
        {(isUp || isDown) && (
          <span style={{ color: isUp ? "#6B8E5A" : "#B14F40", fontWeight: 500 }}>
            {isUp ? "↑" : "↓"} {delta}{" "}
          </span>
        )}
        {deltaSub}
      </div>
    </div>
  );
}

function MobileMetricGrid({ items, onTap }) {
  return (
    <div style={{
      margin: "0 16px 12px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
    }}>
      {items.map((it, i) => (
        <button
          key={i}
          onClick={() => onTap && onTap(it)}
          style={{
            all: "unset",
            cursor: "pointer",
            background: "var(--df-surface)",
            border: "1px solid var(--df-line)",
            borderRadius: 12,
            padding: "14px 14px 12px",
            boxShadow: "var(--df-shadow-xs)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name={it.icon} size={14} color={it.color} />
            <Eyebrow style={{ fontSize: 10 }}>{it.label}</Eyebrow>
          </div>
          <div style={{
            marginTop: 4,
            fontFamily: "var(--df-font-sans)",
            fontWeight: 300,
            fontSize: 28,
            color: "var(--df-ink)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            fontVariantNumeric: "tabular-nums",
          }}>
            {it.value} <span style={{ fontFamily: "var(--df-font-sans)", fontStyle: "normal", fontSize: 11, color: "var(--df-ink-3)", fontWeight: 500 }}>{it.unit}</span>
          </div>
          <div style={{ marginTop: 6, fontSize: 11, color: "var(--df-ink-3)" }}>
            <span style={{ color: it.deltaDirection === "up" ? "#6B8E5A" : it.deltaDirection === "down" ? "#B14F40" : "var(--df-ink-3)", fontWeight: 500 }}>
              {it.deltaDirection === "up" ? "↑" : it.deltaDirection === "down" ? "↓" : ""} {it.delta}
            </span>{" "}
            {it.deltaSub}
          </div>
        </button>
      ))}
    </div>
  );
}

function MobileEntryList({ title, entries }) {
  return (
    <div style={{ margin: "0 16px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 4px 8px" }}>
        <Eyebrow>{title}</Eyebrow>
        <button style={{
          all: "unset", cursor: "pointer", fontSize: 12, color: "var(--df-clay)", fontWeight: 500,
          display: "inline-flex", alignItems: "center", gap: 2,
        }}>
          See all <Icon name="chevron-right" size={12} />
        </button>
      </div>
      <div style={{
        background: "var(--df-surface)",
        border: "1px solid var(--df-line)",
        borderRadius: 12,
        overflow: "hidden",
      }}>
        {entries.map((e, i) => (
          <div key={e.id || i} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 14px",
            borderTop: i === 0 ? "none" : "1px solid var(--df-line-soft)",
          }}>
            <span style={{
              width: 32, height: 32, borderRadius: 8,
              background: e.iconBg || "var(--df-clay-tint)",
              color: e.iconColor || "var(--df-clay)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon name={e.icon} size={15} />
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--df-ink)" }}>{e.label}</div>
              <div style={{ fontSize: 11, color: "var(--df-ink-3)", marginTop: 1 }}>{e.sub}</div>
            </div>
            <div style={{
              fontFamily: "var(--df-font-sans)",
              fontVariantNumeric: "tabular-nums",
              fontSize: 14,
              fontWeight: 500,
              color: "var(--df-ink)",
              textAlign: "right",
            }}>
              {e.value}
              {e.unit && <span style={{ fontSize: 11, color: "var(--df-ink-3)", fontWeight: 400, marginLeft: 2 }}>{e.unit}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileSuggestion() {
  return (
    <div style={{
      margin: "0 16px 12px",
      background: "var(--df-clay-tint)",
      borderRadius: 12,
      padding: "14px 16px",
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
    }}>
      <span style={{
        width: 30, height: 30, borderRadius: 999,
        background: "var(--df-clay)",
        color: "var(--df-ink-inverse)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        flex: "none",
      }}>
        <Icon name="trending-down" size={14} />
      </span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: "var(--df-on-clay-tint)" }}>
          You're 2.3 lb ahead of trend.
        </div>
        <div style={{ fontSize: 11, color: "var(--df-on-clay-soft)", marginTop: 2, lineHeight: 1.5 }}>
          At this rate you'll reach 165 lb around July 4. Sleep is up 22 m this week — the two seem linked.
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { MobileHeader, MobileHero, MobileMetricGrid, MobileEntryList, MobileSuggestion });
