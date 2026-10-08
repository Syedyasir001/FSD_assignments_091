module.exports = {
  purge: ['./src/*{.js}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        reddit_orange: '#FF5700',
        reddit_red: '#FF4500',
        reddit_dark: {
          DEFAULT: '#0B1416',
          brighter: '#1A282D',
          brightest: '#2A3C42',
        },
        reddit_border: {
          DEFAULT: '#28383D',
        },
        reddit_text: {
          DEFAULT: '#D7DADC',
          darker: '#818384',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
