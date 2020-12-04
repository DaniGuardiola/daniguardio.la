const postcss = require('postcss')
const tailwind = require('tailwindcss')
const autoprefixer = require('autoprefixer')

async function compileTailwind (css) {
  return postcss([tailwind, autoprefixer]).process(css, { from: undefined })
}

function cleanString (selector) {
  return selector
    .replace(/\s+/g, ' ')
    .replace(/\s,/g, ',')
    .trim()
}

function propToCamelCase (prop) {
  return prop
    .replace(
      /([a-zA-Z0-1])-([a-zA-Z0-1])/g,
      (_, p1, p2) => `${p1}${p2.toUpperCase()}`
    )
    .replace(/-+/g, '')
}

function parseSelector (selector) {
  return cleanString(selector)
}

function parseProp (prop) {
  return propToCamelCase(cleanString(prop))
}

function parseValue (val) {
  const result = {}
  const props = val
    .match(/[\s\S]+?:[\s\S]+?;/g)
    .map(prop => prop.match(/([\s\S]+?):([\s\S]+?);/))
    .map(match => ({
      key: match[1],
      value: match[2]
    }))
  props.forEach(
    ({ key, value }) => (result[parseProp(key)] = cleanString(value))
  )
  return result
}

module.exports = async function parseCSS (css) {
  const { css: compiledCSS } = await compileTailwind(css)
  console.log(compiledCSS)
  const result = {}
  const groups = compiledCSS
    .match(/[\s\S]+? {[\s\S]+?}/g)
    .map(block => block.match(/([\s\S]+?) {([\s\S]+?)}/))
    .map(match => ({
      selector: match[1],
      value: match[2]
    }))
  groups.forEach(
    ({ selector, value }) =>
      (result[parseSelector(selector)] = parseValue(value))
  )
  return result
}
