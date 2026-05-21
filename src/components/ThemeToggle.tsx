import { Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    setIsDark(html.getAttribute('data-theme') === 'dark')

    const observer = new MutationObserver(() => {
      setIsDark(html.getAttribute('data-theme') === 'dark')
    })
    observer.observe(html, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  const toggle = () => {
    const next = isDark ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('df-theme', next)
    setIsDark(!isDark)
  }

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-df-md transition-colors duration-100"
      style={{ color: 'var(--df-ink-3)' }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--df-ink)'
        ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--df-surface-2)'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--df-ink-3)'
        ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
    </button>
  )
}
