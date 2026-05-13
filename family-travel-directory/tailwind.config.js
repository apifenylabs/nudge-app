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
        // WCAG AA-verified sage green palette
        primary: {
          50: '#F4F7F4',
          100: '#E8EFE8',
          200: '#D1DFD1',
          500: '#5A7D5E',
          600: '#4A6B4E',
          700: '#3D5A41',
          800: '#2F4732',
          900: '#1B2E1E',
        },
        accent: {
          50: '#E8F2F2',
          100: '#E8F2F2',
          200: '#E8F2F2',
          300: '#E8F2F2',
          400: '#3D7A78',
          500: '#3D7A78',
          600: '#3D7A78',
          700: '#2D5C5A',
          800: '#2D5C5A',
          900: '#2D5C5A',
          DEFAULT: '#3D7A78',
          light: '#E8F2F2',
          dark: '#2D5C5A',
        },
        premium: {
          gold: '#D4AF37',
          light: '#F5E6A3',
          dark: '#B8860B',
        },
        // Vibe Engine accent palette — WCAG AA verified
        vibe: {
          teal: '#3D7A78',
          coral: '#E11D48',
          amber: '#F59E0B',
          plum: '#7C3AED',
          sky: '#0284C7',
          subtle: '#FEF2F2',
          sage: '#5A7D5E',
        },
        surface: '#F8F6F3',
        card: '#FFFFFF',
        heading: '#1B2838',
        body: '#2D2D2D',
        'body-secondary': '#595959',
        'text-muted': '#7A7A7A',
        navy: '#1B2838',
        'navy-light': '#2D3F54',
        'navy-dark': '#0F1A24',
        'warm-white': '#F8F6F3',
        sand: {
          100: '#EDE8DF',
          200: '#E0D8C8',
          300: '#D4C5A9',
        },
        charcoal: '#2D2D2D',
        'charcoal-light': '#595959',
        muted: '#7A7A7A',
        danger: '#B84A4A',
        success: '#4A7C59',
        warning: '#BD8E3C',
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
        'premium': '0 20px 40px -12px rgba(74, 107, 78, 0.15)',
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
