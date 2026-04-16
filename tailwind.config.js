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
        brand: {
          50:  '#FDF8F2',
          100: '#FAF0E4',
          200: '#F2D9B8',
          300: '#E8BE87',
          400: '#D9995A',
          500: '#C47B3A',
          600: '#A8612A',
          700: '#7D4620',
          800: '#5C2D0E',
          900: '#3A1A06',
          950: '#1A0800',
        },
        gold: {
          300: '#F5D680',
          400: '#E8B86D',
          500: '#D4A017',
          600: '#B8850F',
        },
        cream: '#FDF6EF',
        parchment: '#F7ECD8',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        jost: ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
        'brand-gradient': 'linear-gradient(135deg, #5C2D0E 0%, #A8612A 50%, #C47B3A 100%)',
        'hero-gradient': 'linear-gradient(to right, rgba(58,26,6,0.92) 0%, rgba(58,26,6,0.65) 60%, rgba(58,26,6,0.1) 100%)',
        'card-gradient': 'linear-gradient(to top, rgba(26,8,0,0.85) 0%, rgba(26,8,0,0.3) 50%, transparent 100%)',
      },
      animation: {
        shimmer: 'shimmer 2.5s infinite',
        float: 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(92, 45, 14, 0.15)',
        'luxury': '0 20px 60px rgba(92, 45, 14, 0.2)',
        'card-hover': '0 30px 80px rgba(92, 45, 14, 0.3)',
        'gold': '0 0 30px rgba(212, 160, 23, 0.3)',
      },
    },
  },
  plugins: [],
};
