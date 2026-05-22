import { NavLink } from 'react-router-dom';
import { Home, Settings } from 'lucide-react';

export function TabBar() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex items-center justify-around z-40"
      style={{
        background: 'var(--df-canvas-translucent)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderTop: '1px solid var(--df-line-soft)',
        paddingTop: '6px',
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)',
      }}
    >
      <NavLink
        to="/"
        end
        className="flex flex-col items-center gap-0.5 py-1.5 px-5 transition-colors duration-[120ms]"
        style={({ isActive }) => ({ color: isActive ? 'var(--df-clay)' : 'var(--df-ink-3)' })}
        aria-label="Today"
      >
        <Home size={20} strokeWidth={1.5} />
        <span className="text-[10px] font-medium">Today</span>
      </NavLink>

      <NavLink
        to="/config"
        className="flex flex-col items-center gap-0.5 py-1.5 px-5 transition-colors duration-[120ms]"
        style={({ isActive }) => ({ color: isActive ? 'var(--df-clay)' : 'var(--df-ink-3)' })}
        aria-label="Settings"
      >
        <Settings size={20} strokeWidth={1.5} />
        <span className="text-[10px] font-medium">Settings</span>
      </NavLink>
    </nav>
  );
}
