/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef9ff',
          100: '#dcf3ff',
          200: '#b3e7ff',
          300: '#66d3ff',
          400: '#1ab6ff',
          500: '#0099ff', // main color
          600: '#007acc',
          700: '#0066b3',
          800: '#005299',
          900: '#003d73',
        }
      },
      keyframes: {
        enter: {
          '0%': { 
            transform: 'translate3d(0, -20%, 0) scale(0.95)',
            opacity: 0 
          },
          '100%': { 
            transform: 'translate3d(0, 0, 0) scale(1)', 
            opacity: 1 
          },
        },
        leave: {
          '0%': { 
            transform: 'translate3d(0, 0, 0) scale(1)', 
            opacity: 1 
          },
          '100%': { 
            transform: 'translate3d(0, -20%, 0) scale(0.95)', 
            opacity: 0 
          },
        },
        'confetti-1': {
          '0%': { transform: 'translateY(0) rotate(45deg)', opacity: 1 },
          '100%': { transform: 'translateY(40vh) rotate(225deg)', opacity: 0 }
        },
        'confetti-2': {
          '0%': { transform: 'translateY(0) rotate(45deg)', opacity: 1 },
          '100%': { transform: 'translateY(45vh) rotate(180deg)', opacity: 0 }
        },
        'confetti-3': {
          '0%': { transform: 'translateY(0) rotate(45deg)', opacity: 1 },
          '100%': { transform: 'translateY(35vh) rotate(270deg)', opacity: 0 }
        },
        'confetti-4': {
          '0%': { transform: 'translateY(0) rotate(45deg)', opacity: 1 },
          '100%': { transform: 'translateY(50vh) rotate(315deg)', opacity: 0 }
        },
        'confetti-5': {
          '0%': { transform: 'translateY(0) rotate(45deg)', opacity: 1 },
          '100%': { transform: 'translateY(42vh) rotate(190deg)', opacity: 0 }
        },
        'confetti-6': {
          '0%': { transform: 'translateY(0) rotate(45deg)', opacity: 1 },
          '100%': { transform: 'translateY(48vh) rotate(240deg)', opacity: 0 }
        },
        'confetti-7': {
          '0%': { transform: 'translateY(0) rotate(45deg)', opacity: 1 },
          '100%': { transform: 'translateY(38vh) rotate(280deg)', opacity: 0 }
        },
        'confetti-8': {
          '0%': { transform: 'translateY(0) rotate(45deg)', opacity: 1 },
          '100%': { transform: 'translateY(45vh) rotate(210deg)', opacity: 0 }
        },
      },
      animation: {
        enter: 'enter 0.25s ease-out',
        leave: 'leave 0.2s ease-in forwards',
        'confetti-1': 'confetti-1 1s ease-out forwards',
        'confetti-2': 'confetti-2 1.2s ease-out forwards',
        'confetti-3': 'confetti-3 1.1s ease-out forwards',
        'confetti-4': 'confetti-4 1.3s ease-out forwards',
        'confetti-5': 'confetti-5 1.4s ease-out forwards',
        'confetti-6': 'confetti-6 1.2s ease-out forwards',
        'confetti-7': 'confetti-7 1.1s ease-out forwards',
        'confetti-8': 'confetti-8 1.3s ease-out forwards',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
} 