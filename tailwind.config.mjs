/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: '#04070F',
        surface: '#080D1A',
        cyan: '#00CFFF',
        violet: '#7C3AED',
        'text-primary': '#E8F0FF',
        muted: '#6B7A99',
      },
      fontFamily: {
        grotesk: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'draw-arc': 'drawArc 2s ease forwards 0.5s',
        'count-up': 'countUp 2s ease forwards 0.8s',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        drawArc: {
          from: { 'stroke-dashoffset': '565' },
          to: { 'stroke-dashoffset': '118' },
        },
      },
    },
  },
  plugins: [],
};
