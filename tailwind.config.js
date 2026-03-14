/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Custom color utilities
    'bg-gi-deep',
    'bg-gi-slate', 
    'bg-gi-mist',
    'bg-gi-horizon',
    'bg-gi-stone',
    'bg-gi-water',
    'bg-gi-white',
    'bg-gi-gold',
    'bg-gi-ember',
    'bg-surface-0',
    'bg-surface-1', 
    'bg-surface-2',
    'bg-surface-3',
    'text-gi-deep',
    'text-gi-slate',
    'text-gi-mist', 
    'text-gi-horizon',
    'text-gi-stone',
    'text-gi-water',
    'text-gi-white',
    'text-gi-gold',
    'text-gi-ember',
    'border-gi-deep',
    'border-gi-slate',
    'border-gi-mist',
    'border-gi-horizon',
    'border-gi-stone',
    'border-gi-water',
    'border-gi-white',
    'border-gi-gold',
    'border-gi-ember',
    // Custom component classes
    'gi-card',
    'gi-button-primary',
    'gi-button-secondary',
    // Custom spacing and utilities
    'tracking-wider',
    'leading-relaxed',
  ],
  theme: {
    extend: {
      colors: {
        // Genba Ikigai Design System
        'gi-deep':    '#1C2B3A',  // primary bg, nav
        'gi-slate':   '#2E4156',  // card bg, panels
        'gi-mist':    '#4A6478',  // secondary text, borders
        'gi-horizon': '#7A9BB0',  // dividers, inactive
        'gi-stone':   '#3D3530',  // icon accents
        'gi-water':   '#E8EFF5',  // light bg, inputs
        'gi-white':   '#F4F7FA',  // primary text on dark
        'gi-gold':    '#FFD559',  // accent only (CTAs)
        'gi-ember':   '#C0392B',  // errors, Red Bus only
        // Surface layers
        'surface-0':  '#1C2B3A',
        'surface-1':  '#253545',
        'surface-2':  '#2E4156',
        'surface-3':  '#3A5269',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest-xl': '0.15em',
        'widest-lg': '0.12em',
        'widest-md': '0.08em',
      },
      boxShadow: {
        'gi-card': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'gi-deep': '0 8px 32px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'gi-gradient': 'linear-gradient(180deg, #1C2B3A 0%, #2E4156 50%, #1C2B3A 100%)',
        'gi-slider':   'linear-gradient(90deg, #4A6478, #FFD559)',
      },
      borderRadius: {
        'gi': '12px',
      },
    },
  },
  plugins: [],
}
