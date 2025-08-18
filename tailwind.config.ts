import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // USGC Color Palette
        'usgc-bg': '#0b0e14',
        'usgc-panel': '#0f1320',
        'usgc-line': '#1b2233',
        'usgc-text': '#e5e7eb',
        'usgc-muted': '#93a1b0',
        'usgc-accent': '#003399',
        // Semantic colors
        'usgc-success': '#10b981',
        'usgc-warning': '#f59e0b',
        'usgc-error': '#ef4444',
        'usgc-info': '#3b82f6',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '1.2' }],
        'sm': ['13px', { lineHeight: '1.25' }],
        'base': ['14px', { lineHeight: '1.25' }],
        'lg': ['16px', { lineHeight: '1.25' }],
        'xl': ['18px', { lineHeight: '1.2' }],
        '2xl': ['24px', { lineHeight: '1.2' }],
        '3xl': ['32px', { lineHeight: '1.1' }],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        'DEFAULT': '4px',
        'md': '6px',
        'lg': '8px',
      },
      borderWidth: {
        'hairline': '1px',
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
} satisfies Config;
