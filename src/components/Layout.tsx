import { Outlet } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { TabBar } from './TabBar';
import { useThemeContext } from '../contexts/ThemeContext';

export function Layout() {
  const { mode, toggleTheme } = useThemeContext();

  const iconBtnClass =
    'w-9 h-9 flex items-center justify-center rounded-md transition-colors duration-[120ms] text-[--df-ink-3] hover:text-[--df-ink] hover:bg-[--df-surface-2]';

  return (
    <div className="flex flex-col min-h-svh" style={{ background: 'var(--df-canvas)' }}>
      <header
        className="sticky top-0 z-30 flex items-center h-14 px-4 gap-4"
        style={{
          background: 'var(--df-canvas-translucent)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid var(--df-line-soft)',
        }}
      >
        <span
          className="flex-1 text-[15px] font-medium select-none"
          style={{ color: 'var(--df-ink)' }}
        >
          Step Pacer
        </span>

        <button className={iconBtnClass} onClick={toggleTheme} title="Toggle theme">
          {mode === 'dark' ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
        </button>
      </header>

      <div className="flex-1 pb-[calc(5rem+env(safe-area-inset-bottom))]">
        <Outlet />
      </div>

      <TabBar />
    </div>
  );
}
