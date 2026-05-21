export function toMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m
}

export function getTargetSteps(
  goal: number,
  startTime: string,
  endTime: string,
  evaluate: (t: number) => number | null,
): number {
  const now = new Date()
  const nowMins = now.getHours() * 60 + now.getMinutes()
  const startMins = toMinutes(startTime)
  const endMins = toMinutes(endTime)

  if (endMins <= startMins) return 0
  if (nowMins <= startMins) return 0
  if (nowMins >= endMins) return goal

  const t = (nowMins - startMins) / (endMins - startMins)
  const ratio = evaluate(t)
  if (ratio === null) return 0
  return Math.round(Math.max(0, Math.min(1, ratio)) * goal)
}

export function formatTime(timeStr: string): string {
  const [h, m] = timeStr.split(':').map(Number)
  const period = h >= 12 ? 'pm' : 'am'
  const h12 = h % 12 || 12
  return `${h12}:${m.toString().padStart(2, '0')} ${period}`
}

export function getCurrentTimeDisplay(): string {
  const now = new Date()
  const h = now.getHours()
  const m = now.getMinutes()
  const period = h >= 12 ? 'pm' : 'am'
  const h12 = h % 12 || 12
  return `${h12}:${m.toString().padStart(2, '0')} ${period}`
}
