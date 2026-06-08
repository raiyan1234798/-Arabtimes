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
        gold: {
          DEFAULT: '#B4913C',
          light: '#D4B865',
          dark: '#8A6E2A',
          pale: '#F7F0E0',
          muted: '#C9A84C',
        },
        cream: {
          DEFAULT: '#FAFAF8',
          warm: '#F5F3EE',
          deeper: '#EDE8DE',
          card: '#F0EDE8',
        },
        charcoal: {
          DEFAULT: '#1A1A1A',
          light: '#3A3A3A',
          muted: '#5A5A5A',
          pale: '#9A9A9A',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #8A6E2A 0%, #B4913C 50%, #D4B865 100%)',
        'cream-gradient': 'linear-gradient(160deg, #FDFCFA 0%, #F5F1E8 40%, #EDE8DE 100%)',
        'hero-warm': 'linear-gradient(160deg, #FDFCFA 0%, #F5F1E8 50%, #ECE6D8 100%)',
      },
      boxShadow: {
        'soft': '0 2px 16px rgba(0,0,0,0.06)',
        'card': '0 8px 32px rgba(0,0,0,0.09)',
        'hover': '0 20px 60px rgba(0,0,0,0.12)',
        'gold': '0 8px 32px rgba(180,145,60,0.2)',
      },
      animation: {
        'float': 'floatY 5s ease-in-out infinite',
        'shimmer-text': 'shimmerText 4s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-gold': 'pulseGold 2.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease forwards',
      },
    },
  },
  plugins: [],
};
