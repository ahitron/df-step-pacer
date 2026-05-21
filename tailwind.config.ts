import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'df-canvas':      'var(--df-canvas)',
        'df-surface':     'var(--df-surface)',
        'df-surface-2':   'var(--df-surface-2)',
        'df-clay':        'var(--df-clay)',
        'df-clay-hover':  'var(--df-clay-hover)',
        'df-ink':         'var(--df-ink)',
        'df-ink-2':       'var(--df-ink-2)',
        'df-ink-3':       'var(--df-ink-3)',
        'df-ink-4':       'var(--df-ink-4)',
        'df-line':        'var(--df-line)',
        'df-line-strong': 'var(--df-line-strong)',
        'df-danger':      'var(--df-danger)',
        'df-success':     'var(--df-success)',
      },
      fontFamily: {
        'df-sans': 'var(--df-font-sans)',
        'df-mono': 'var(--df-font-mono)',
      },
      borderRadius: {
        'df-xs': 'var(--df-radius-xs)',
        'df-sm': 'var(--df-radius-sm)',
        'df-md': 'var(--df-radius-md)',
        'df-lg': 'var(--df-radius-lg)',
        'df-xl': 'var(--df-radius-xl)',
        'df-2xl': 'var(--df-radius-2xl)',
      },
      boxShadow: {
        'df-sm': 'var(--df-shadow-sm)',
        'df-md': 'var(--df-shadow-md)',
        'df-lg': 'var(--df-shadow-lg)',
      },
    },
  },
  plugins: [],
} satisfies Config
