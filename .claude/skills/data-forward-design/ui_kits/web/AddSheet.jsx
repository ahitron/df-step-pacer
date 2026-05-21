/* global React, Icon, Input, Button, Eyebrow, Badge */

const METRIC_OPTIONS = [
  { id: "weight",  label: "Weight",  icon: "scale",   unit: "lb",  placeholder: "168.4" },
  { id: "sleep",   label: "Sleep",   icon: "moon",    unit: "h",   placeholder: "6.8" },
  { id: "spend",   label: "Spend",   icon: "wallet",  unit: "$",   placeholder: "42" },
  { id: "reading", label: "Reading", icon: "book",    unit: "min", placeholder: "30" },
];

function AddSheet({ open, onClose, onSubmit }) {
  const [metric, setMetric] = React.useState("weight");
  const [value, setValue] = React.useState("");
  const [note, setNote] = React.useState("");
  const [mood, setMood] = React.useState("steady");
  const opt = METRIC_OPTIONS.find(m => m.id === metric);

  // Reset when re-opened
  React.useEffect(() => {
    if (open) {
      setValue("");
      setNote("");
      setMetric("weight");
      setMood("steady");
    }
  }, [open]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit && onSubmit({ metric, value, unit: opt.unit, note, mood });
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        background: "var(--df-overlay)",
        backdropFilter: "blur(2px)",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        paddingTop: "10vh",
        animation: "df-fade 200ms var(--df-ease-out)",
      }}
    >
      <style>{`
        @keyframes df-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes df-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        style={{
          width: 480,
          maxWidth: "92vw",
          background: "var(--df-surface)",
          border: "1px solid var(--df-line)",
          borderRadius: 14,
          boxShadow: "var(--df-shadow-lg)",
          animation: "df-rise 240ms var(--df-ease-out)",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "18px 20px",
          borderBottom: "1px solid var(--df-line-soft)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <Eyebrow style={{ fontSize: 10 }}>Quick log</Eyebrow>
            <div style={{ fontFamily: "var(--df-font-sans)", fontWeight: 400, fontSize: 20, color: "var(--df-ink)", letterSpacing: "-0.015em", marginTop: 2, lineHeight: 1.2 }}>
              Add an entry for today
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              all: "unset", cursor: "pointer",
              width: 28, height: 28, borderRadius: 6,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              color: "var(--df-ink-3)",
            }}
          >
            <Icon name="x" size={16} />
          </button>
        </div>

        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Metric chooser */}
          <div>
            <Eyebrow style={{ fontSize: 10, marginBottom: 8 }}>Metric</Eyebrow>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {METRIC_OPTIONS.map(m => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setMetric(m.id)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    border: `1px solid ${metric === m.id ? "var(--df-clay)" : "var(--df-line)"}`,
                    background: metric === m.id ? "var(--df-clay-tint)" : "var(--df-surface)",
                    borderRadius: 8,
                    padding: "10px 8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    color: metric === m.id ? "var(--df-on-clay-tint)" : "var(--df-ink-2)",
                    transition: "all 120ms var(--df-ease-out)",
                  }}
                >
                  <Icon name={m.icon} size={16} />
                  <span style={{ fontSize: 12, fontWeight: 500 }}>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Value + when */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input
              label={opt.label}
              unit={opt.unit}
              placeholder={opt.placeholder}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
            />
            <Input
              label="When"
              defaultValue="just now"
            />
          </div>

          {/* Mood pills */}
          <div>
            <Eyebrow style={{ fontSize: 10, marginBottom: 8 }}>Mood</Eyebrow>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["low", "steady", "good", "great"].map(m => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setMood(m)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    padding: "5px 12px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 500,
                    border: `1px solid ${mood === m ? "var(--df-clay)" : "var(--df-line)"}`,
                    background: mood === m ? "var(--df-clay-tint)" : "var(--df-surface)",
                    color: mood === m ? "var(--df-on-clay-tint)" : "var(--df-ink-2)",
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Note */}
          <Input
            label="Note"
            hint="optional"
            placeholder="One line about the morning…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Footer */}
        <div style={{
          padding: "14px 20px",
          borderTop: "1px solid var(--df-line-soft)",
          background: "var(--df-surface-2)",
          borderRadius: "0 0 14px 14px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ fontSize: 12, color: "var(--df-ink-3)" }}>
            Saving stays local until you sync.
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
            <Button variant="primary" type="submit" disabled={!value.trim()}>Save entry</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

Object.assign(window, { AddSheet });
