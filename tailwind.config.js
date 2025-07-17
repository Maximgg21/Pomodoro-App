/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'font-roboto',
    'font-merriweather',
    'font-lora',
  ],
  theme: {
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif'],
      'merriweather': ['Merriweather', 'sans-serif'],
      'lora': ['Lora', 'sans-serif'],
    },
    extend: {
      colors: {
        logo: "rgba(190, 195, 225, 1)",
        theme1: "rgba(248, 112, 111, 1)",
        theme2: "rgba(112, 243, 248, 1)",
        theme3: "rgba(217, 129, 247, 1)",
        optionInput: "rgba(238, 241, 251, 1)",
        settingsIcon: "rgba(123, 127, 158, 1)",
        optionText: "rgba(94, 98, 125, 1)",
        background: "rgba(30, 33, 64, 1)",
        lighterBackground: "rgba(41, 45, 83, 1)",
        darkerBackground: "rgba(21, 25, 50, 1)",
        clockText: "rgba(215, 224, 255, 1)"
      },
      animation: {
        'appear': 'appear 0.3s ease-in forwards'
      },
      keyframes: {
        appear: {
          '0%': {background: 'inherit'},
          '100%': {background: 'current'}
        }
      }
    },
  },
  plugins: [],
}