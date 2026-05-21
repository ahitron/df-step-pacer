/* global React, Icon, Eyebrow, Card, Badge */

function ChartCard({ title, eyebrow, data, color = "var(--df-clay)", yUnit = "", showGoal, goalValue, goalLabel }) {
  const [range, setRange] = React.useState("30d");
  const [hover, setHover] = React.useState(null);
  const containerRef = React.useRef(null);

  // Filter data by range
  const filteredCount = range === "7d" ? 7 : range === "30d" ? 30 : data.length;
  const series = data.slice(-filteredCount);

  const w = 880;
  const h = 240;
  const padL = 36, padR = 16, padT = 24, padB = 28;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;

  const values = series.map(d => d.v);
  const dataMin = Math.min(...values);
  const dataMax = Math.max(...values);
  const yPad = (dataMax - dataMin) * 0.15 || 1;
  let yMin = dataMin - yPad;
  let yMax = dataMax + yPad;
  if (showGoal && goalValue != null) {
    yMin = Math.min(yMin, goalValue - 1);
    yMax = Math.max(yMax, goalValue + 1);
  }
  const yRange = yMax - yMin;

  const x = (i) => padL + (series.length === 1 ? plotW / 2 : (i / (series.length - 1)) * plotW);
  const y = (v) => padT + plotH - ((v - yMin) / yRange) * plotH;

  const linePath = series.map((d, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(d.v).toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${x(series.length - 1).toFixed(1)} ${padT + plotH} L${x(0).toFixed(1)} ${padT + plotH} Z`;

  // Y ticks (4 ticks)
  const ticks = [];
  for (let i = 0; i <= 4; i++) {
    const v = yMin + (yRange * i / 4);
    ticks.push({ v, y: y(v) });
  }

  // Mouse interactions
  const handleMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * w;
    const closest = series.reduce((best, d, i) => {
      const dx = Math.abs(x(i) - px);
      return dx < best.dx ? { dx, i, d } : best;
    }, { dx: Infinity });
    if (closest.dx !== Infinity) setHover({ i: closest.i, d: closest.d });
  };

  return (
    <Card padding="20px 24px">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
        <div>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <div style={{ fontFamily: "var(--df-font-sans)", fontWeight: 400, fontSize: 22, color: "var(--df-ink)", letterSpacing: "-0.015em", lineHeight: 1.2, marginTop: 2 }}>
            {title}
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, background: "var(--df-surface-2)", padding: 3, borderRadius: 6 }}>
          {["7d", "30d", "all"].map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              style={{
                all: "unset",
                cursor: "pointer",
                padding: "4px 10px",
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 500,
                color: range === r ? "var(--df-ink)" : "var(--df-ink-3)",
                background: range === r ? "var(--df-surface)" : "transparent",
                boxShadow: range === r ? "var(--df-shadow-xs)" : "none",
              }}
            >
              {r === "7d" ? "7 days" : r === "30d" ? "30 days" : "All"}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMove}
        onMouseLeave={() => setHover(null)}
        style={{ position: "relative", width: "100%" }}
      >
        <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", display: "block" }}>
          <defs>
            <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.16" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Y gridlines + labels */}
          {ticks.map((t, i) => (
            <g key={i}>
              <line x1={padL} x2={w - padR} y1={t.y} y2={t.y} stroke="var(--df-line-soft)" strokeWidth="1" />
              <text x={padL - 8} y={t.y + 3} fontSize="10" fill="var(--df-ink-3)" textAnchor="end" fontFamily="var(--df-font-mono)">
                {t.v.toFixed(yRange < 5 ? 1 : 0)}
              </text>
            </g>
          ))}

          {/* Goal line */}
          {showGoal && goalValue != null && (
            <g>
              <line x1={padL} x2={w - padR} y1={y(goalValue)} y2={y(goalValue)} stroke="var(--df-clay)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
              <text x={w - padR - 4} y={y(goalValue) - 6} fontSize="10" fill="var(--df-clay)" textAnchor="end" fontFamily="var(--df-font-mono)">
                {goalLabel || `goal ${goalValue}`}
              </text>
            </g>
          )}

          {/* Area + line */}
          <path d={areaPath} fill="url(#chart-fill)" />
          <path d={linePath} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

          {/* X labels — first, middle, last */}
          {[0, Math.floor(series.length / 2), series.length - 1].map((i) => (
            <text key={i} x={x(i)} y={h - 6} fontSize="10" fill="var(--df-ink-3)" textAnchor="middle" fontFamily="var(--df-font-mono)">
              {series[i].label}
            </text>
          ))}

          {/* Hover */}
          {hover && (
            <g>
              <line x1={x(hover.i)} x2={x(hover.i)} y1={padT} y2={padT + plotH} stroke="var(--df-ink-2)" strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
              <circle cx={x(hover.i)} cy={y(hover.d.v)} r="3.5" fill={color} stroke="var(--df-surface)" strokeWidth="2" />
            </g>
          )}
        </svg>

        {/* Tooltip */}
        {hover && (
          <div style={{
            position: "absolute",
            left: `${(x(hover.i) / w) * 100}%`,
            top: 0,
            transform: "translate(-50%, -8px)",
            background: "var(--df-ink)",
            color: "var(--df-ink-inverse)",
            padding: "6px 10px",
            borderRadius: 6,
            fontSize: 12,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            boxShadow: "var(--df-shadow-md)",
          }}>
            <div style={{ fontFamily: "var(--df-font-mono)", fontSize: 10, opacity: 0.7 }}>{hover.d.label}</div>
            <div style={{ fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>{hover.d.v}{yUnit}</div>
          </div>
        )}
      </div>
    </Card>
  );
}

Object.assign(window, { ChartCard });
