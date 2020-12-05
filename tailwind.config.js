const merge = require('lodash.merge')
const baseConfig = require('./tailwind.base.config')
const typography = require('@tailwindcss/typography')
const styles = require('./src/styles/mdx-styles.compiled.json')
module.exports = merge(baseConfig, {
  plugins: [typography],
  theme: {
    extend: {
      typography: styles
    }
  }
})
