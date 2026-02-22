import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        text: {
          DEFAULT: '#0f172a',
          secondary: '#64748b',
          muted: '#94a3b8',
        },
        accent: {
          purple: '#8b5cf6',
          blue: '#3b82f6',
          pink: '#ec4899',
          orange: '#f97316',
        },
      },
      fontFamily: {
        sans: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
        body: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['3.5rem', { lineHeight: '1.1' }],
        'display-md': ['2.5rem', { lineHeight: '1.2' }],
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out forwards',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gradient-signature': 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 25%, #ec4899 50%, #f97316 100%)',
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 24px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}

export default config
