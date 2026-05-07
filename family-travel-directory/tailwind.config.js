/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        premium: {
          gold: '#D4AF37',
          light: '#F5E6A3',
          dark: '#B8860B',
        },
        surface: '#FAFAFA',
        card: '#FFFFFF',
        heading: '#0A0A0A',
        body: '#52525B',
        danger: '#E11D48',
        success: '#10B981',
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        default: '0.75rem',
        card: '1rem',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.06)',
        'card-hover': '0 10px 25px -5px rgba(0,0,0,0.08), 0 4px 10px -6px rgba(0,0,0,0.04)',
        'premium': '0 20px 40px -12px rgba(13, 148, 136, 0.15)',
        'glow': '0 0 20px rgba(212, 175, 55, 0.15)',
      },
      keyframes: {
        'score-fill': {
          '0%': { width: '0%' },
          '100%': { width: 'var(--score-width)' },
        },
        'count-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'score-fill': 'score-fill 1s ease-out forwards',
        'count-up': 'count-up 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};
