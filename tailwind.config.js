/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: '#0f0b1e',
        surface: '#1a0b2e',
        accent: '#7127ba',
        accent2: '#9857d3',
        sand: '#f5ecff',
        accentText: '#f5ec99',
      },
      boxShadow: {
        panel: '0 30px 90px rgba(0,0,0,0.45)',
        glow: '0 0 60px rgba(168,85,247,0.35)',
      },
      backgroundImage: {
        noise:
          'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
        'aurora-1':
          'conic-gradient(from 140deg at 50% 50%, rgba(113,39,186,0.24), rgba(152,87,211,0.2), rgba(113,39,186,0.24))',
      },
    },
  },
  plugins: [],
}
