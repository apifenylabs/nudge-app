/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'lifeos-bg': '#ffffff',
        'lifeos-fg': '#111827',
        'lifeos-muted': '#6b7280',
        'lifeos-border': '#e5e7eb',
        'lifeos-card': '#f9fafb',
        'lifeos-accent': '#14B8A6',
      },
    },
  },
  plugins: [],
};
