module.exports = {
  purge: ['./src/*{.js}', './public/index.html'],
  darkMode: 'class',
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
        // Light mode equivalents
        reddit_light: {
          DEFAULT: '#DAE0E6',
          brighter: '#F6F7F8',
          brightest: '#FFFFFF',
        },
        reddit_light_border: {
          DEFAULT: '#EDEFF1',
        },
        reddit_light_text: {
          DEFAULT: '#1C1C1C',
          darker: '#5F6368',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'sidebar': '2px 0 8px rgba(0,0,0,0.15)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
