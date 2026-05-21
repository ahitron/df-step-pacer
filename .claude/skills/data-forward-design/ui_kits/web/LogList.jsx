/* global React, Icon, Eyebrow, Card, Badge, Button */

function LogList({ title, entries, onDelete }) {
  return (
    <Card padding="20px 24px">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <Eyebrow>Recent</Eyebrow>
          <div style={{ fontFamily: "var(--df-font-sans)", fontWeight: 400, fontSize: 22, color: "var(--df-ink)", letterSpacing: "-0.015em", lineHeight: 1.2, marginTop: 2 }}>
            {title}
          </div>
        </div>
        <Button variant="ghost" size="sm" iconRight="chevron-right">See all</Button>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Header row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "100px 1fr 110px 90px 32px",
          gap: 14,
          padding: "8px 4px",
          borderBottom: "1px solid var(--df-line-soft)",
          fontSize: 11,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--df-ink-3)",
          fontWeight: 500,
        }}>
          <div>Date</div>
          <div>Note</div>
          <div style={{ textAlign: "right" }}>Value</div>
          <div>Trend</div>
          <div></div>
        </div>

        {entries.map((e, i) => (
          <LogRow key={e.id || i} entry={e} onDelete={onDelete} />
        ))}

        {entries.length === 0 && (
          <div style={{ padding: "24px 8px", color: "var(--df-ink-3)", fontSize: 13, textAlign: "center" }}>
            Nothing logged yet. Add an entry to start.
          </div>
        )}
      </div>
    </Card>
  );
}

function LogRow({ entry, onDelete }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "100px 1fr 110px 90px 32px",
        gap: 14,
        padding: "10px 4px",
        alignItems: "center",
        borderBottom: "1px solid var(--df-line-soft)",
        fontSize: 13,
        background: hover ? "var(--df-surface-2)" : "transparent",
        transition: "background 80ms var(--df-ease-out)",
        borderRadius: 4,
      }}
    >
      <div style={{ fontFamily: "var(--df-font-mono)", color: "var(--df-ink-2)", fontSize: 12 }}>
        {entry.date}
      </div>
      <div style={{ color: entry.note ? "var(--df-ink-2)" : "var(--df-ink-4)" }}>
        {entry.note || "—"}
      </div>
      <div style={{ textAlign: "right", fontVariantNumeric: "tabular-nums", color: "var(--df-ink)", fontWeight: 500 }}>
        {entry.value}{entry.unit && <span style={{ color: "var(--df-ink-3)", fontWeight: 400, fontSize: 12, marginLeft: 3 }}>{entry.unit}</span>}
      </div>
      <div>
        {entry.trend === "down" && <Badge tone="sage" dot>down</Badge>}
        {entry.trend === "up" && <Badge tone="rust" dot>up</Badge>}
        {entry.trend === "flat" && <Badge tone="neutral">flat</Badge>}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {hover && (
          <button
            onClick={() => onDelete && onDelete(entry)}
            style={{
              all: "unset", cursor: "pointer",
              width: 24, height: 24, borderRadius: 4,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              color: "var(--df-ink-3)",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#B14F40"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--df-ink-3)"}
          >
            <Icon name="trash" size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { LogList, LogRow });
