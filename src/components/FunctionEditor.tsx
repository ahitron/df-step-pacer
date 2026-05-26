import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { validateExpression } from '../lib/pacing'
import type { PacingFn } from '../lib/pacing'
import { CurvePreview } from './CurvePreview'

interface FunctionEditorProps {
  fn?: PacingFn
  onSave: (fn: PacingFn) => void
  onClose: () => void
}

export function FunctionEditor({ fn, onSave, onClose }: FunctionEditorProps) {
  const [name, setName] = useState(fn?.name ?? '')
  const [expression, setExpression] = useState(fn?.expression ?? '')
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const validation = expression.trim()
    ? validateExpression(expression)
    : { ok: false, error: undefined }

  const canSave = name.trim().length > 0 && validation.ok

  const handleSave = () => {
    if (!canSave) return
    onSave({
      id: fn?.id ?? crypto.randomUUID(),
      name: name.trim(),
      expression: expression.trim(),
    })
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'var(--df-overlay)' }}
      onClick={handleBackdropClick}
    >
      <div
        className="df-sheet-enter w-full max-w-lg bg-df-surface border border-df-line border-b-0 rounded-t-df-xl p-6 flex flex-col gap-5"
        style={{ boxShadow: 'var(--df-shadow-lg)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="df-h4">{fn ? 'Edit function' : 'Add function'}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-df-sm transition-colors duration-100"
            style={{ color: 'var(--df-ink-3)' }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--df-ink)'
              ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--df-surface-2)'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--df-ink-3)'
              ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
            }}
            aria-label="Close"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Name field */}
        <div className="flex flex-col gap-1.5">
          <label className="df-label" htmlFor="fn-name">
            Name
          </label>
          <input
            id="fn-name"
            ref={nameRef}
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Square root"
            className="df-input"
          />
        </div>

        {/* Expression field */}
        <div className="flex flex-col gap-1.5">
          <label className="df-label" htmlFor="fn-expr">
            Expression{' '}
            <span className="df-caption">use <code className="df-code">t</code> as the variable, ranging 0 → 1</span>
          </label>
          <textarea
            id="fn-expr"
            value={expression}
            onChange={e => setExpression(e.target.value)}
            rows={2}
            placeholder="e.g. Math.sqrt(t)"
            className="df-input resize-none"
            style={{ fontFamily: 'var(--df-font-mono)', fontSize: 'var(--df-text-sm)' }}
            spellCheck={false}
            autoCapitalize="none"
            autoCorrect="off"
          />
          {expression.trim() && !validation.ok && validation.error && (
            <p className="df-caption" style={{ color: 'var(--df-danger)' }}>
              {validation.error}
            </p>
          )}
          {expression.trim() && validation.ok && (
            <p className="df-caption" style={{ color: 'var(--df-success)' }}>
              f(0) = 0 and f(1) = 1 — looks good.
            </p>
          )}
        </div>

        {/* Live curve preview */}
        {expression.trim() && (
          <div className="flex flex-col gap-2">
            <span className="df-eyebrow">Curve preview</span>
            <CurvePreview expression={expression} width={280} height={100} />
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-1">
          <button onClick={onClose} className="df-btn-ghost">
            Cancel
          </button>
          <button onClick={handleSave} disabled={!canSave} className="df-btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
