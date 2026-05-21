/* global React */
// Shared primitives for Data Forward web kit.
// Buttons, inputs, badges, and an Icon component with a small inline lookup.

const { useState, useRef, useEffect } = React;

// ----- Icon -----------------------------------------------------------------
// Inline SVG paths mimicking Lucide's outline style (1.5 stroke, rounded caps).
const ICON_PATHS = {
  "dashboard":     '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  "scale":         '<path d="M6 6h12l-2 14H8z"/><circle cx="12" cy="10" r="1.5"/>',
  "moon":          '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  "wallet":        '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><circle cx="17" cy="14" r="1.5"/>',
  "book":          '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  "target":        '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  "compare":       '<path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/>',
  "trending-up":   '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  "trending-down": '<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>',
  "plus":          '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  "minus":         '<line x1="5" y1="12" x2="19" y2="12"/>',
  "search":        '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/>',
  "settings":      '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  "user":          '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  "chevron-right": '<polyline points="9 18 15 12 9 6"/>',
  "chevron-down":  '<polyline points="6 9 12 15 18 9"/>',
  "check":         '<polyline points="20 6 9 17 4 12"/>',
  "x":             '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  "more":          '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  "bell":          '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  "filter":        '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  "calendar":      '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  "arrow-up":      '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
  "arrow-down":    '<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',
  "arrow-up-right":'<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>',
  "command":       '<path d="M18 3h-3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h3a3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3h3a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>',
  "edit":          '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
  "trash":         '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/>',
  "logo":          null, // sentinel — use SVG image path
};

function Icon({ name, size = 18, color, stroke = 1.5, style, ...rest }) {
  if (name === "logo") {
    return <img src="../../assets/logo.svg" alt="" width={size} height={size} style={style} {...rest} />;
  }
  const path = ICON_PATHS[name];
  if (!path) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "inline-block", flex: "none", ...style }}
      dangerouslySetInnerHTML={{ __html: path }}
      {...rest}
    />
  );
}

// ----- Button --------------------------------------------------------------
const btnBase = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  height: 36,
  padding: "0 16px",
  borderRadius: 6,
  border: "1px solid var(--df-line)",
  background: "var(--df-surface)",
  color: "var(--df-ink)",
  fontSize: 14,
  fontWeight: 500,
  fontFamily: "var(--df-font-sans)",
  cursor: "pointer",
  transition: "background 120ms var(--df-ease-out), border-color 120ms var(--df-ease-out), box-shadow 120ms var(--df-ease-out), color 120ms var(--df-ease-out)",
  whiteSpace: "nowrap",
  userSelect: "none",
};

function Button({ variant = "secondary", size = "md", icon, iconRight, children, style, ...rest }) {
  const variants = {
    primary:   { background: "var(--df-clay)", color: "var(--df-ink-inverse)", borderColor: "var(--df-clay)" },
    secondary: {},
    ghost:     { background: "transparent", borderColor: "transparent", color: "var(--df-ink-2)" },
    danger:    { background: "#B14F40", color: "#FBF8F2", borderColor: "#B14F40" },
  };
  const sizes = {
    sm: { height: 28, padding: "0 10px", fontSize: 12, borderRadius: 5 },
    md: {},
    lg: { height: 44, padding: "0 22px", fontSize: 15, borderRadius: 8 },
    icon: { width: 36, padding: 0 },
  };
  return (
    <button {...rest} style={{ ...btnBase, ...variants[variant], ...sizes[size], ...style }}>
      {icon && <Icon name={icon} size={size === "sm" ? 14 : 16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "sm" ? 14 : 16} />}
    </button>
  );
}

// ----- Input ---------------------------------------------------------------
function Input({ label, hint, unit, error, style, wrapperStyle, ...rest }) {
  const inputStyle = {
    height: 36,
    width: "100%",
    padding: unit ? "0 44px 0 12px" : "0 12px",
    border: `1px solid ${error ? "#B14F40" : "var(--df-line-strong)"}`,
    background: "var(--df-surface)",
    borderRadius: 6,
    fontSize: 14,
    fontFamily: "var(--df-font-sans)",
    color: "var(--df-ink)",
    outline: "none",
    boxSizing: "border-box",
    ...style,
  };
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, ...wrapperStyle }}>
      {label && (
        <span style={{ fontSize: 12, fontWeight: 500, color: "var(--df-ink-2)" }}>
          {label}
          {hint && <span style={{ color: "var(--df-ink-3)", fontWeight: 400 }}> — {hint}</span>}
        </span>
      )}
      <span style={{ position: "relative", display: "block" }}>
        <input
          {...rest}
          style={inputStyle}
          onFocus={(e) => { e.target.style.borderColor = "var(--df-clay)"; e.target.style.boxShadow = "0 0 0 3px rgba(184,89,58,0.18)"; rest.onFocus && rest.onFocus(e); }}
          onBlur={(e) => { e.target.style.borderColor = "var(--df-line-strong)"; e.target.style.boxShadow = "none"; rest.onBlur && rest.onBlur(e); }}
        />
        {unit && (
          <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "var(--df-ink-3)", fontFamily: "var(--df-font-mono)", pointerEvents: "none" }}>
            {unit}
          </span>
        )}
      </span>
    </label>
  );
}

// ----- Badge ---------------------------------------------------------------
function Badge({ tone = "neutral", dot, children, style }) {
  const tones = {
    neutral: { background: "var(--df-surface-2)", color: "var(--df-ink-2)", dot: "var(--df-ink-3)" },
    clay:    { background: "var(--df-clay-tint)", color: "#8D3E27", dot: "var(--df-clay)" },
    sage:    { background: "#DDE5D0", color: "#3F5532", dot: "#6B8E5A" },
    ochre:   { background: "#EFE0BC", color: "#7A5E1E", dot: "#C49A3B" },
    rust:    { background: "#EDD0CB", color: "#7C2E22", dot: "#B14F40" },
    teal:    { background: "#D2DEDE", color: "#2F4F4F", dot: "#527A7A" },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      height: 22, padding: "0 10px", borderRadius: 999,
      fontSize: 11, fontWeight: 500,
      background: t.background, color: t.color, ...style
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 999, background: t.dot }}></span>}
      {children}
    </span>
  );
}

// ----- Card ----------------------------------------------------------------
function Card({ as = "div", padding = "20px 24px", style, children, ...rest }) {
  const Cmp = as;
  return (
    <Cmp {...rest} style={{
      background: "var(--df-surface)",
      border: "1px solid var(--df-line)",
      borderRadius: 10,
      boxShadow: "var(--df-shadow-sm)",
      padding,
      ...style,
    }}>
      {children}
    </Cmp>
  );
}

// ----- Eyebrow + label helpers --------------------------------------------
function Eyebrow({ children, style }) {
  return (
    <div style={{
      fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
      color: "var(--df-ink-3)", fontWeight: 500, ...style
    }}>{children}</div>
  );
}

function Kbd({ children }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      height: 18, minWidth: 18, padding: "0 5px",
      borderRadius: 4, border: "1px solid var(--df-line)",
      background: "var(--df-surface)",
      fontFamily: "var(--df-font-mono)", fontSize: 10, color: "var(--df-ink-3)",
      lineHeight: 1,
    }}>{children}</span>
  );
}

// ----- Sparkline (shared) --------------------------------------------------
function Sparkline({ data, color = "var(--df-clay)", highlightLast = true, height = 36 }) {
  if (!data || data.length === 0) return null;
  const w = 100, h = 100;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = w / (data.length - 1);
  const pts = data.map((v, i) => [i * stepX, h - ((v - min) / range) * h * 0.85 - h * 0.075]);
  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${w} ${h} L0 ${h} Z`;
  const last = pts[pts.length - 1];
  const gradId = `sparkfill-${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height, display: "block" }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      {highlightLast && (
        <circle cx={last[0]} cy={last[1]} r="2.2" fill={color} vectorEffect="non-scaling-stroke" />
      )}
    </svg>
  );
}

// ----- ThemeToggle ---------------------------------------------------------
// Reads + writes a `data-theme` attr on <html> and persists to localStorage.
// Emits a custom event so other components can react if they need to.
function ThemeToggle({ size = 34, style }) {
  const initial = (() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.dataset.theme || "light";
  })();
  const [theme, setTheme] = React.useState(initial);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("df-theme");
      if (stored === "dark" || stored === "light") {
        document.documentElement.dataset.theme = stored;
        setTheme(stored);
      }
    } catch (_) {}
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("df-theme", next); } catch (_) {}
    window.dispatchEvent(new CustomEvent("df-theme-change", { detail: next }));
  };

  return (
    <button
      onClick={toggle}
      title={theme === "dark" ? "Switch to light" : "Switch to dark"}
      style={{
        all: "unset", cursor: "pointer",
        width: size, height: size, borderRadius: 6,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        color: "var(--df-ink-2)",
        border: "1px solid var(--df-line)",
        background: "var(--df-surface)",
        ...style,
      }}
    >
      {theme === "dark" ? (
        // Sun icon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <line x1="12" y1="3" x2="12" y2="5"/>
          <line x1="12" y1="19" x2="12" y2="21"/>
          <line x1="3"  y1="12" x2="5"  y2="12"/>
          <line x1="19" y1="12" x2="21" y2="12"/>
          <line x1="5.6" y1="5.6"  x2="7.0" y2="7.0"/>
          <line x1="17.0" y1="17.0" x2="18.4" y2="18.4"/>
          <line x1="5.6" y1="18.4" x2="7.0" y2="17.0"/>
          <line x1="17.0" y1="7.0"  x2="18.4" y2="5.6"/>
        </svg>
      ) : (
        // Moon icon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}

Object.assign(window, { Icon, Button, Input, Badge, Card, Eyebrow, Kbd, Sparkline, ThemeToggle });
