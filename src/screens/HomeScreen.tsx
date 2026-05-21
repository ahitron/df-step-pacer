import { useState, useEffect, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import { ThemeToggle } from '../components/ThemeToggle'
import { getTargetSteps, formatTime, getCurrentTimeDisplay } from '../lib/time'
import { safeEval, LINEAR_FN } from '../lib/pacing'
import type { AppState } from '../lib/storage'

interface HomeScreenProps {
  state: AppState
  onUpdate: (partial: Partial<AppState>) => void
}

export function HomeScreen({ state, onUpdate }: HomeScreenProps) {
  const [targetSteps, setTargetSteps] = useState(0)
  const [currentTime, setCurrentTime] = useState('')

  const allFns = [LINEAR_FN, ...state.customFns]
  const selectedFn = allFns.find(f => f.id === state.selectedFnId) ?? LINEAR_FN

  const recalculate = useCallback(() => {
    const evaluate = (t: number) => safeEval(selectedFn.expression, t)
    setTargetSteps(getTargetSteps(state.dailyGoal, state.startTime, state.endTime, evaluate))
    setCurrentTime(getCurrentTimeDisplay())
  }, [state.dailyGoal, state.startTime, state.endTime, selectedFn.expression])

  useEffect(() => {
    recalculate()
    const id = setInterval(recalculate, 60_000)
    return () => clearInterval(id)
  }, [recalculate])

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value, 10)
    if (!isNaN(v) && v > 0) onUpdate({ dailyGoal: v })
  }

  return (
    <div className="flex flex-col min-h-full px-6 pt-5 pb-8 max-w-lg mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="df-h4">Step pacer</h1>
        <ThemeToggle />
      </div>

      {/* Goal input */}
      <div className="flex flex-col gap-2 mb-5">
        <label className="df-label" htmlFor="goal">
          Daily goal
        </label>
        <input
          id="goal"
          type="number"
          min={1}
          step={500}
          value={state.dailyGoal}
          onChange={handleGoalChange}
          className="df-input"
        />
      </div>

      {/* Pacing function selector */}
      <div className="flex flex-col gap-2 mb-10">
        <label className="df-label" htmlFor="pacing">
          Pacing
        </label>
        <div className="relative">
          <select
            id="pacing"
            value={state.selectedFnId}
            onChange={e => onUpdate({ selectedFnId: e.target.value })}
            className="df-select"
          >
            {allFns.map(fn => (
              <option key={fn.id} value={fn.id}>
                {fn.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            strokeWidth={1.5}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--df-ink-3)' }}
          />
        </div>
      </div>

      {/* Target display — hero area */}
      <div className="flex flex-col items-center text-center flex-1 justify-center gap-3 py-8">
        <span className="df-eyebrow">Target by now</span>

        <span
          className="df-numeric-display"
          style={{
            fontSize: 'clamp(56px, 18vw, var(--df-text-5xl))',
            color: 'var(--df-clay)',
            lineHeight: 1,
          }}
        >
          {targetSteps.toLocaleString()}
        </span>

        <p className="df-caption">
          {formatTime(state.startTime)} – {formatTime(state.endTime)}
          {currentTime && (
            <span style={{ color: 'var(--df-ink-4)' }}> · now {currentTime}</span>
          )}
        </p>
      </div>
    </div>
  )
}
