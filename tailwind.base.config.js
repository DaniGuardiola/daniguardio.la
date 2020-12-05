module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        slab: '"Roboto Slab", serif',
        mono: '"Roboto Mono", monospace'
      },
      fontWeight: {
        'normal-light': '351'
      },
      colors: {
        'deep-green': '#1a281e'
      }
    }
  },
  variants: {
    extend: {
      margin: ['first', 'last'],
      height: ['hover']
    }
  }
}
