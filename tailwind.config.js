/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F2EDE4',
        'cream-dark': '#E8E0D3',
        'cream-darker': '#DDD3C4',
        paper: '#FAFAF7',
        ink: '#111111',
        'ink-light': '#2C2C2C',
        stone: '#8C8070',
        'stone-light': '#B5A99A',
        orange: {
          DEFAULT: '#D4500A',
          light: '#E8671F',
          pale: '#F5E6DC',
          muted: '#C4784A',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          warm: '#F9F6F1',
        },
        border: {
          DEFAULT: 'rgba(17,17,17,0.08)',
          hover: 'rgba(17,17,17,0.16)',
          strong: 'rgba(17,17,17,0.25)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
        display: ['var(--font-cal)', 'var(--font-space)', 'sans-serif'],
        heading: ['var(--font-space)', 'sans-serif'],
      },
      fontSize: {
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '0.95' }],
        '10xl': ['10rem', { lineHeight: '0.9' }],
      },
      animation: {
        'float': 'float 7s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'slide-up': 'slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
        'cursor-blink': 'cursor-blink 1.1s step-end infinite',
        'marquee': 'marquee 25s linear infinite',
        'blob-morph': 'blob-morph 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(3deg)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'blob-morph': {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '50%': { borderRadius: '50% 60% 30% 60% / 30% 40% 70% 50%' },
          '75%': { borderRadius: '40% 50% 60% 40% / 60% 50% 40% 60%' },
        },
      },
      boxShadow: {
        'card': '0 2px 20px rgba(17,17,17,0.06), 0 1px 4px rgba(17,17,17,0.04)',
        'card-hover': '0 12px 40px rgba(17,17,17,0.12), 0 2px 8px rgba(17,17,17,0.06)',
        'orange-glow': '0 8px 30px rgba(212,80,10,0.25)',
        'inner-cream': 'inset 0 1px 0 rgba(255,255,255,0.6)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
