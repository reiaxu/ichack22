module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'reverse-spin': 'reverse-spin 1s linear infinite'
      },
      keyframes: {
        "reverse-spin": {
          from: {
            transform: 'rotate(360deg)'
          },
        }
      }
    },
    fontFamily: {
      Loto: ["Loto, sans-serif"]
    },
    container: {
      center: true,
      padding: '1rem'
    },
    
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
