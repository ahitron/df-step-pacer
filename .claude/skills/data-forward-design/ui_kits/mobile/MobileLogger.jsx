/* global React, Icon, Eyebrow, Button */

const MOBILE_METRICS = [
  { id: "weight",  label: "Weight",  icon: "scale",   unit: "lb",  placeholder: "168.4" },
  { id: "sleep",   label: "Sleep",   icon: "moon",    unit: "h",   placeholder: "6.8" },
  { id: "spend",   label: "Spend",   icon: "wallet",  unit: "$",   placeholder: "42" },
  { id: "reading", label: "Reading", icon: "book",    unit: "min", placeholder: "30" },
];

function MobileLogger({ open, onClose, onSubmit }) {
  const [metric, setMetric] = React.useState("weight");
  const [value, setValue] = React.useState("");
  const [mood, setMood] = React.useState("steady");
  const opt = MOBILE_METRICS.find(m => m.id === metric);

  React.useEffect(() => {
    if (open) { setValue(""); setMetric("weight"); setMood("steady"); }
  }, [open]);

  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit && onSubmit({ metric, value, unit: opt.unit, mood });
  };

  return (
    <>
      <style>{`
        @keyframes df-m-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes df-m-up { from { transform: translateY(100%) } to { transform: translateY(0) } }
      `}</style>
      {/* Scrim */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(42, 38, 32, 0.4)",
          zIndex: 70,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 240ms var(--df-ease-out)",
        }}
      />
      {/* Sheet */}
      <form
        onSubmit={submit}
        style={{
          position: "absolute",
          left: 0, right: 0, bottom: 0,
          background: "var(--df-surface)",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          zIndex: 80,
          paddingBottom: 36,
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: "transform 320ms var(--df-ease-out)",
          boxShadow: "0 -8px 32px rgba(42,38,32,0.18)",
        }}
      >
        {/* Grabber */}
        <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 4px" }}>
          <div style={{ width: 36, height: 4, borderRadius: 999, background: "var(--df-line-strong)" }}></div>
        </div>

        {/* Header */}
        <div style={{ padding: "8px 20px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <Eyebrow style={{ fontSize: 10 }}>Quick log</Eyebrow>
            <div style={{
              fontFamily: "var(--df-font-sans)",
              fontWeight: 300,
              fontSize: 26,
              color: "var(--df-ink)",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              marginTop: 2,
            }}>
              What do you want to log?
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              all: "unset", cursor: "pointer",
              width: 30, height: 30, borderRadius: 999,
              background: "var(--df-surface-2)",
              color: "var(--df-ink-2)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Icon name="x" size={14} />
          </button>
        </div>

        {/* Metric grid */}
        <div style={{ padding: "0 20px 14px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {MOBILE_METRICS.map(m => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMetric(m.id)}
              style={{
                all: "unset",
                cursor: "pointer",
                padding: "12px 8px",
                borderRadius: 10,
                border: `1px solid ${metric === m.id ? "var(--df-clay)" : "var(--df-line)"}`,
                background: metric === m.id ? "var(--df-clay-tint)" : "var(--df-surface)",
                color: metric === m.id ? "var(--df-on-clay-tint)" : "var(--df-ink-2)",
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: 4,
              }}
            >
              <Icon name={m.icon} size={18} />
              <span style={{ fontSize: 11, fontWeight: 500 }}>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Big numeric input */}
        <div style={{ padding: "0 20px 14px" }}>
          <div style={{
            background: "var(--df-surface-2)",
            border: "1px solid var(--df-line)",
            borderRadius: 12,
            padding: "20px 18px",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: 8,
          }}>
            <input
              autoFocus
              type="text"
              inputMode="decimal"
              placeholder={opt.placeholder}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{
                all: "unset",
                fontFamily: "var(--df-font-sans)",
                fontWeight: 300,
                fontSize: 56,
                lineHeight: 1,
                color: "var(--df-ink)",
                letterSpacing: "-0.025em",
                fontVariantNumeric: "tabular-nums",
                textAlign: "center",
                width: 220,
              }}
            />
            <span style={{ fontSize: 16, color: "var(--df-ink-3)", fontWeight: 500 }}>{opt.unit}</span>
          </div>
        </div>

        {/* Mood */}
        <div style={{ padding: "0 20px 16px" }}>
          <Eyebrow style={{ fontSize: 10, marginBottom: 8 }}>Mood</Eyebrow>
          <div style={{ display: "flex", gap: 6 }}>
            {["low", "steady", "good", "great"].map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setMood(m)}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  flex: 1,
                  textAlign: "center",
                  padding: "8px 0",
                  borderRadius: 8,
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

        {/* Save button — full width */}
        <div style={{ padding: "0 20px" }}>
          <button
            type="submit"
            disabled={!value.trim()}
            style={{
              all: "unset",
              cursor: value.trim() ? "pointer" : "not-allowed",
              opacity: value.trim() ? 1 : 0.55,
              width: "100%",
              boxSizing: "border-box",
              textAlign: "center",
              padding: "14px 16px",
              borderRadius: 12,
              background: "var(--df-clay)",
              color: "var(--df-ink-inverse)",
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            Save entry
          </button>
        </div>
      </form>
    </>
  );
}

Object.assign(window, { MobileLogger });
