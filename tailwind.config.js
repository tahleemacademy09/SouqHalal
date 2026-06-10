/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest:   '#0f3d2e',
        emerald:  { DEFAULT: '#1a6b4a', light: '#2a9d6f' },
        jade:     '#2a9d6f',
        mint:     '#d4efe3',
        sage:     '#8fbc9e',
        gold:     { DEFAULT: '#b8922a', light: '#d4aa4a', pale: '#fdf4e3' },
        parchment:'#f9f5ee',
        cream:    '#fdfaf5',
        ink:      { DEFAULT: '#161410', soft: '#3a3530' },
        muted:    '#8a8278',
      },
      fontFamily: {
        sans:    ['Outfit', 'sans-serif'],
        serif:   ['Playfair Display', 'serif'],
        arabic:  ['Amiri', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft':  '0 2px 16px rgba(0,0,0,0.06)',
        'card':  '0 4px 24px rgba(0,0,0,0.08)',
        'lifted':'0 12px 40px rgba(0,0,0,0.1)',
        'green': '0 6px 28px rgba(15,61,46,0.3)',
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease forwards',
        'fade-in':   'fadeIn 0.4s ease forwards',
        'slide-down':'slideDown 0.3s ease forwards',
      },
      keyframes: {
        fadeUp:    { from:{ opacity:'0', transform:'translateY(20px)' }, to:{ opacity:'1', transform:'translateY(0)' } },
        fadeIn:    { from:{ opacity:'0' }, to:{ opacity:'1' } },
        slideDown: { from:{ opacity:'0', transform:'translateY(-8px)' }, to:{ opacity:'1', transform:'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
