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
        sage: {
          50: '#f0f5f0',
          100: '#dce9dc',
          200: '#b9d3b9',
          300: '#8fb88f',
          400: '#6a9e6a',
          500: '#4a824a',
          600: '#3a6b3a',
          700: '#2d552d',
          800: '#234523',
          900: '#1a361a',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
}