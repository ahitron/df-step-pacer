import { Home, Settings } from 'lucide-react'

export type Screen = 'home' | 'config'

interface TabBarProps {
  screen: Screen
  onNavigate: (s: Screen) => void
}

export function TabBar({ screen, onNavigate }: TabBarProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 h-16 border-t border-df-line flex items-center justify-around px-8 z-10"
      style={{
        background: 'var(--df-canvas-translucent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <button
        onClick={() => onNavigate('home')}
        className="flex flex-col items-center gap-0.5 py-1 px-5 rounded-df-md transition-colors duration-100"
        style={{ color: screen === 'home' ? 'var(--df-clay)' : 'var(--df-ink-3)' }}
        aria-label="Today"
      >
        <Home size={20} strokeWidth={1.5} />
        <span style={{ fontSize: 'var(--df-text-xs)', fontWeight: 'var(--df-weight-medium)' }}>
          Today
        </span>
      </button>

      <button
        onClick={() => onNavigate('config')}
        className="flex flex-col items-center gap-0.5 py-1 px-5 rounded-df-md transition-colors duration-100"
        style={{ color: screen === 'config' ? 'var(--df-clay)' : 'var(--df-ink-3)' }}
        aria-label="Settings"
      >
        <Settings size={20} strokeWidth={1.5} />
        <span style={{ fontSize: 'var(--df-text-xs)', fontWeight: 'var(--df-weight-medium)' }}>
          Settings
        </span>
      </button>
    </nav>
  )
}
