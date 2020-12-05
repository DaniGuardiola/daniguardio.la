const postcss = require('postcss')
const postcssJs = require('postcss-js')
const tailwind = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const fs = require('fs').promises
const path = require('path')

const getPath = p => path.join(process.cwd(), 'src/styles', p)
const INPUT = getPath('mdx-styles.css')
const OUTPUT = getPath('mdx-styles.compiled.json')

async function compile (cssString) {
  const { root } = await postcss([
    tailwind('tailwind.base.config.js'),
    autoprefixer
  ]).process(postcss.parse(cssString), {
    from: undefined
  })
  return postcssJs.objectify(root)
}

async function tailwindHack () {
  const input = await fs.readFile(INPUT, 'utf-8')
  const result = await compile(input)
  const jsonResult = JSON.stringify(result)
  return fs.writeFile(OUTPUT, jsonResult)
}

tailwindHack()
