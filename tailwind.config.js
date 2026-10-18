/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#FFFFFF',
      blue: '#2563EB',
      yellow: '#FACC15',
    },
    fontFamily: {
      display: ['"Archivo Black"', '"Space Grotesk"', 'sans-serif'],
      sans: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
      mono: ['"Space Mono"', 'monospace'],
    },
    extend: {
      borderWidth: {
        DEFAULT: '1px',
        3: '3px',
        4: '4px',
      },
      borderRadius: {
        none: '0',
        brut: '4px',
      },
      boxShadow: {
        brutal: '6px 6px 0 #000000',
        'brutal-sm': '3px 3px 0 #000000',
        'brutal-lg': '8px 8px 0 #000000',
        none: 'none',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.25' },
        },
      },
      animation: {
        blink: 'blink 1.2s steps(2, start) infinite',
      },
    },
  },
  plugins: [],
};
