/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jadoo: {
          dark: '#181E4B',
          navy: '#14183E',
          orange: '#DF6951',
          yellow: '#F1A501',
          coral: '#F05A28',
          text: '#5E6282',
          heading: '#14183E',
          purple: '#8A79DF',
          lavender: '#DFD7F9',
          lightBg: '#FFF1DA'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Volkhov', 'serif'],
        volkhov: ['Volkhov', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'card': '0px 100px 80px rgba(0, 0, 0, 0.02), 0px 64.8148px 46.8519px rgba(0, 0, 0, 0.0151852), 0px 38.5185px 25.4815px rgba(0, 0, 0, 0.0121481), 0px 20px 13px rgba(0, 0, 0, 0.01), 0px 8.14815px 6.51852px rgba(0, 0, 0, 0.00785185), 0px 1.85185px 3.14815px rgba(0, 0, 0, 0.00481481)',
        'service': '0px 40px 60px rgba(0, 0, 0, 0.06)',
        'btn': '0px 20px 35px rgba(241, 165, 1, 0.25)',
        'play': '0px 15px 30px rgba(223, 105, 81, 0.3)',
      }
    },
  },
  plugins: [],
}

