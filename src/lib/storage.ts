import type { PacingFn } from './pacing'

export interface AppState {
  dailyGoal: number
  startTime: string
  endTime: string
  selectedFnId: string
  customFns: PacingFn[]
}

const KEY = 'df-step-pacer'

const DEFAULTS: AppState = {
  dailyGoal: 10000,
  startTime: '07:00',
  endTime: '21:00',
  selectedFnId: 'linear',
  customFns: [],
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...DEFAULTS }
    const parsed = JSON.parse(raw) as Partial<AppState>
    return { ...DEFAULTS, ...parsed }
  } catch {
    return { ...DEFAULTS }
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(KEY, JSON.stringify(state))
}
