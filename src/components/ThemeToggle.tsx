import { Sun, Moon } from 'lucide-react';
import { useThemeContext } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-df-md transition-colors duration-100"
      style={{ color: 'var(--df-ink-3)' }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--df-ink)';
        (e.currentTarget as HTMLButtonElement).style.background = 'var(--df-surface-2)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--df-ink-3)';
        (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
      }}
      aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {mode === 'dark' ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
    </button>
  );
}
