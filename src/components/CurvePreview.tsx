import { safeEval } from '../lib/pacing'

interface CurvePreviewProps {
  expression: string
  width?: number
  height?: number
}

export function CurvePreview({ expression, width = 240, height = 96 }: CurvePreviewProps) {
  const SAMPLES = 80
  const PAD = 1

  const points: { x: number; y: number }[] = []
  let hasError = false

  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES
    const v = safeEval(expression, t)
    if (v === null) {
      hasError = true
      break
    }
    const clampedV = Math.max(-0.1, Math.min(1.1, v))
    points.push({
      x: PAD + t * (width - PAD * 2),
      y: height - PAD - clampedV * (height - PAD * 2),
    })
  }

  const pathD =
    points.length > 1
      ? `M ${points.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L ')}`
      : ''

  const diagX1 = PAD
  const diagY1 = height - PAD
  const diagX2 = width - PAD
  const diagY2 = PAD

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="rounded-df-sm border border-df-line block"
      style={{ background: 'var(--df-surface-2)' }}
      aria-hidden="true"
    >
      {/* Reference diagonal */}
      <line
        x1={diagX1}
        y1={diagY1}
        x2={diagX2}
        y2={diagY2}
        stroke="var(--df-line-strong)"
        strokeWidth="1"
        strokeDasharray="4 3"
      />

      {/* Curve */}
      {!hasError && pathD && (
        <path
          d={pathD}
          fill="none"
          stroke="var(--df-clay)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {hasError && (
        <text
          x={width / 2}
          y={height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: '11px',
            fill: 'var(--df-ink-4)',
            fontFamily: 'var(--df-font-mono)',
          }}
        >
          invalid expression
        </text>
      )}
    </svg>
  )
}
