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
        teal: {
          50: '#effaf6',
          100: '#d7f3e8',
          200: '#b0e6d2',
          300: '#7ad3b5',
          400: '#44ba93',
          500: '#259d7a',
          600: '#197e64',
          700: '#146551',
          800: '#125141',
          900: '#0f4336',
        },
        cream: {
          50: '#fefcf7',
          100: '#fdf6e8',
          200: '#faeaad',
          300: '#f7da7a',
          400: '#f4c644',
          500: '#f2b220',
          600: '#e09514',
          700: '#ba6f13',
          800: '#945817',
          900: '#784718',
        },
        navy: {
          50: '#f0f3f9',
          100: '#d9e0ef',
          200: '#b3c0df',
          300: '#859bc9',
          400: '#5976b0',
          500: '#3c5b96',
          600: '#2e487e',
          700: '#273b67',
          800: '#233357',
          900: '#1f2c4a',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
