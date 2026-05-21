import { useState } from 'react'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { ThemeToggle } from '../components/ThemeToggle'
import { FunctionEditor } from '../components/FunctionEditor'
import { LINEAR_FN } from '../lib/pacing'
import type { PacingFn } from '../lib/pacing'
import type { AppState } from '../lib/storage'

interface ConfigScreenProps {
  state: AppState
  onUpdate: (partial: Partial<AppState>) => void
}

export function ConfigScreen({ state, onUpdate }: ConfigScreenProps) {
  const [editingFn, setEditingFn] = useState<PacingFn | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const allFns = [LINEAR_FN, ...state.customFns]

  const handleSaveFn = (fn: PacingFn) => {
    const exists = state.customFns.some(f => f.id === fn.id)
    const nextFns = exists
      ? state.customFns.map(f => (f.id === fn.id ? fn : f))
      : [...state.customFns, fn]
    onUpdate({ customFns: nextFns })
    setEditingFn(null)
    setIsAdding(false)
  }

  const handleDelete = (id: string) => {
    const nextFns = state.customFns.filter(f => f.id !== id)
    const update: Partial<AppState> = { customFns: nextFns }
    if (state.selectedFnId === id) update.selectedFnId = 'linear'
    onUpdate(update)
  }

  const showEditor = editingFn !== null || isAdding

  return (
    <div className="flex flex-col min-h-full px-6 pt-5 pb-8 max-w-lg mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="df-h4">Settings</h1>
        <ThemeToggle />
      </div>

      {/* Active window */}
      <section className="mb-8">
        <h2 className="df-eyebrow mb-3">Active window</h2>
        <div
          className="bg-df-surface border border-df-line rounded-df-md overflow-hidden"
          style={{ boxShadow: 'var(--df-shadow-sm)' }}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3">
            <label className="df-label" htmlFor="start-time">
              Start
            </label>
            <input
              id="start-time"
              type="time"
              value={state.startTime}
              onChange={e => onUpdate({ startTime: e.target.value })}
              className="df-input"
              style={{ width: 'auto', flex: '0 0 auto' }}
            />
          </div>
          <div className="h-px bg-df-line mx-4" />
          <div className="flex items-center justify-between gap-4 px-4 py-3">
            <label className="df-label" htmlFor="end-time">
              End
            </label>
            <input
              id="end-time"
              type="time"
              value={state.endTime}
              onChange={e => onUpdate({ endTime: e.target.value })}
              className="df-input"
              style={{ width: 'auto', flex: '0 0 auto' }}
            />
          </div>
        </div>
      </section>

      {/* Pacing functions */}
      <section>
        <h2 className="df-eyebrow mb-3">Pacing functions</h2>
        <div
          className="bg-df-surface border border-df-line rounded-df-md overflow-hidden"
          style={{ boxShadow: 'var(--df-shadow-sm)' }}
        >
          {allFns.map((fn, i) => (
            <div key={fn.id}>
              {i > 0 && <div className="h-px bg-df-line mx-4" />}
              <div className="flex items-center px-4 py-3 gap-3">
                <div className="flex-1 min-w-0">
                  <p className="df-body truncate">{fn.name}</p>
                  <p
                    className="df-caption truncate"
                    style={{ fontFamily: 'var(--df-font-mono)', marginTop: 1 }}
                  >
                    {fn.expression}
                  </p>
                </div>

                {fn.id === 'linear' ? (
                  <span
                    className="df-eyebrow shrink-0"
                    style={{ color: 'var(--df-ink-4)', fontSize: 'var(--df-text-xs)' }}
                  >
                    built in
                  </span>
                ) : (
                  <div className="flex items-center gap-0.5 shrink-0">
                    <button
                      onClick={() => setEditingFn(fn)}
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
                      aria-label={`Edit ${fn.name}`}
                    >
                      <Pencil size={15} strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => handleDelete(fn.id)}
                      className="p-1.5 rounded-df-sm transition-colors duration-100"
                      style={{ color: 'var(--df-ink-3)' }}
                      onMouseEnter={e => {
                        ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--df-danger)'
                        ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--df-surface-2)'
                      }}
                      onMouseLeave={e => {
                        ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--df-ink-3)'
                        ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                      }}
                      aria-label={`Delete ${fn.name}`}
                    >
                      <Trash2 size={15} strokeWidth={1.5} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="df-btn-ghost w-full mt-3"
        >
          <Plus size={15} strokeWidth={1.5} />
          Add function
        </button>
      </section>

      {/* Function editor modal */}
      {showEditor && (
        <FunctionEditor
          fn={editingFn ?? undefined}
          onSave={handleSaveFn}
          onClose={() => {
            setEditingFn(null)
            setIsAdding(false)
          }}
        />
      )}
    </div>
  )
}
