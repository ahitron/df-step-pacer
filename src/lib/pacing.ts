export interface PacingFn {
  id: string
  name: string
  expression: string
}

export const LINEAR_FN: PacingFn = {
  id: 'linear',
  name: 'Linear',
  expression: 't',
}

export function compileFn(expression: string): (t: number) => number {
  return new Function('t', `"use strict"; return (${expression})`) as (t: number) => number
}

export interface ValidationResult {
  ok: boolean
  error?: string
}

export function validateExpression(expression: string): ValidationResult {
  if (!expression.trim()) {
    return { ok: false, error: 'Expression cannot be empty.' }
  }

  let fn: (t: number) => number
  try {
    fn = compileFn(expression)
  } catch {
    return { ok: false, error: 'Syntax error in expression.' }
  }

  let at0: number, at1: number
  try {
    at0 = fn(0)
    at1 = fn(1)
  } catch (e) {
    return { ok: false, error: `Runtime error: ${e instanceof Error ? e.message : String(e)}` }
  }

  if (typeof at0 !== 'number' || !isFinite(at0)) {
    return { ok: false, error: 'f(0) must return a finite number.' }
  }
  if (typeof at1 !== 'number' || !isFinite(at1)) {
    return { ok: false, error: 'f(1) must return a finite number.' }
  }
  if (Math.abs(at0) > 0.001) {
    return { ok: false, error: `f(0) must equal 0 — got ${at0.toFixed(4)}.` }
  }
  if (Math.abs(at1 - 1) > 0.001) {
    return { ok: false, error: `f(1) must equal 1 — got ${at1.toFixed(4)}.` }
  }

  return { ok: true }
}

export function safeEval(expression: string, t: number): number | null {
  try {
    const fn = compileFn(expression)
    const result = fn(t)
    if (typeof result !== 'number' || !isFinite(result)) return null
    return result
  } catch {
    return null
  }
}
