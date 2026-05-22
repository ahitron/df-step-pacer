import { useState, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { getTargetSteps, formatTime, getCurrentTimeDisplay } from '../lib/time';
import { safeEval, LINEAR_FN } from '../lib/pacing';
import { useAppState } from '../contexts/AppStateContext';

export function HomeScreen() {
  const { state, update } = useAppState();
  const [targetSteps, setTargetSteps] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  const allFns = [LINEAR_FN, ...state.customFns];
  const selectedFn = allFns.find(f => f.id === state.selectedFnId) ?? LINEAR_FN;

  const recalculate = useCallback(() => {
    const evaluate = (t: number) => safeEval(selectedFn.expression, t);
    setTargetSteps(getTargetSteps(state.dailyGoal, state.startTime, state.endTime, evaluate));
    setCurrentTime(getCurrentTimeDisplay());
  }, [state.dailyGoal, state.startTime, state.endTime, selectedFn.expression]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    recalculate();
    const id = setInterval(recalculate, 60_000);
    return () => clearInterval(id);
  }, [recalculate]);

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value, 10);
    if (!isNaN(v) && v > 0) update({ dailyGoal: v });
  };

  return (
    <div className="flex flex-col min-h-full px-4 pt-5 pb-8 max-w-lg mx-auto w-full">
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
            onChange={e => update({ selectedFnId: e.target.value })}
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
  );
}
