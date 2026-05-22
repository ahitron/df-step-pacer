import { NavLink } from 'react-router-dom';
import { Home, Settings } from 'lucide-react';

export function TabBar() {
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
      <NavLink
        to="/"
        end
        className="flex flex-col items-center gap-0.5 py-1 px-5 rounded-df-md transition-colors duration-100"
        style={({ isActive }) => ({ color: isActive ? 'var(--df-clay)' : 'var(--df-ink-3)' })}
        aria-label="Today"
      >
        <Home size={20} strokeWidth={1.5} />
        <span style={{ fontSize: 'var(--df-text-xs)', fontWeight: 'var(--df-weight-medium)' }}>
          Today
        </span>
      </NavLink>

      <NavLink
        to="/config"
        className="flex flex-col items-center gap-0.5 py-1 px-5 rounded-df-md transition-colors duration-100"
        style={({ isActive }) => ({ color: isActive ? 'var(--df-clay)' : 'var(--df-ink-3)' })}
        aria-label="Settings"
      >
        <Settings size={20} strokeWidth={1.5} />
        <span style={{ fontSize: 'var(--df-text-xs)', fontWeight: 'var(--df-weight-medium)' }}>
          Settings
        </span>
      </NavLink>
    </nav>
  );
}
