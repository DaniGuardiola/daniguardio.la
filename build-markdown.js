const fs = require('fs-extra')
const path = require('path')
const Promise = require('bluebird')

const markedModule = require('marked')
const highlightjs = require('highlight.js')
const yaml = require('js-yaml')

// constants
const SOURCE_PATH = path.join(__dirname, './articles')
const DEST_PATH = path.join(__dirname, './public/articles')
const IMAGE_PATH = path.join(__dirname, './public/img/articles')
const DATA_PATH = path.join(__dirname, './src/data')
const IMAGE_EXTENSIONS = 'jpg,jpeg,gif,png,webp,bmp,svg'.split(',')

// utils
const read = async file => fs.readFile(path.join(SOURCE_PATH, file), 'utf8')

const write = async (file, data, dir = DEST_PATH) => {
  const filePath = path.join(dir, file)
  await fs.ensureFile(filePath)
  return fs.writeFile(filePath, data)
}

const copy = async (from, to) => fs.copy(path.join(SOURCE_PATH, from), to)

const marked = (data, opts = {}) => {
  const renderer = new markedModule.Renderer()

  // images
  const oImage = renderer.image.bind(renderer)
  renderer.image = (href, title, text) => {
    if (href.startsWith('./')) href = href.replace('./', `/img/articles/${opts.dir}/`)
    return oImage(href, title, text)
  }

  // links
  renderer.link = (href, title, text) => {
    const hrefCopy = href
    let titleAttr = ''
    let onclick = ''
    if (title) titleAttr = ` title="${title.replace(/"/g, '\\"')}"`
    if (href.startsWith('./')) {
      href = '#'
      onclick = ` onclick="navigate(event, '${hrefCopy.substring(1)}')"`
    }
    return `<a href="${href}"${titleAttr}${onclick}>${text}</a>`
  }

  const options = {
    highlight: (code, lang) =>
      highlightjs.highlight(lang, code).value,
    renderer
  }

  return markedModule(data, options)
}

const processFile = async (file, type, opts = {}) => {
  console.log(`- ${type}: ${file}`)
  const name = opts.name || false
  const sourceData = await read(file)
  let data = sourceData
  let dest = file
  let dir
  switch (type) {
    case 'markdown':
      const html = marked(sourceData)
      data = JSON.stringify({ name, html })
      dest = dest.replace(/\.md$/, '.json')
      break
    default:
      throw new Error(`Unknown type '${type}'`)
  }

  if (opts.data) return data

  return write(opts.dest || dest, data, opts.dir || dir)
}

const clean = async () => {
  await Promise.map([
    DEST_PATH,
    IMAGE_PATH,
    DATA_PATH
  ], dir => fs.remove(dir))
}

// file filters
const markdownFilter = filename => filename.endsWith('.md')
const dirFilter = filename => !filename.includes('.')
const imageFilter = filename => IMAGE_EXTENSIONS
  .some(ext => filename.endsWith(`.${ext}`))

// dirs
const processDirArticle = async (dir, data) => {
  console.log(`- article`)
  const article = await read(path.join(dir, 'article.md'))
  const html = marked(article, { dir })
  const dest = path.join(path.dirname(dir), `${path.basename(dir)}.json`)
  const result = JSON.stringify({ ...data, html })
  await write(dest, result)
}

const processDirData = async dir => {
  console.log(`- data`)
  const yamlData = await read(path.join(dir, 'data.yaml'))
  const data = yaml.safeLoad(yamlData)
  data.id = path.basename(dir)
  return data
}

const processDir = async dir => {
  console.log(`\n> ${dir}`)
  const files = (await fs.readdir(path.join(SOURCE_PATH, dir)))
    .map(f => path.join(dir, f))

  const data = await processDirData(dir)

  await processDirArticle(dir, data)

  const imageFiles = files.filter(imageFilter)
  await Promise.mapSeries(imageFiles, file => {
    console.log(`- image: ${file}`)
    copy(file, path.join(IMAGE_PATH, file))
  })

  return data
}

// "namespaces"
const processNamespace = async dir => {
  console.log(`\n\n>>> '/${dir}'`)
  const files = await fs.readdir(path.join(SOURCE_PATH, dir))
  const dirs = files.filter(dirFilter)
  return Promise.mapSeries(dirs, d => processDir(path.join(dir, d)))
}

// execution
const run = async () => {
  console.log('Building articles!')
  const files = await fs.readdir(SOURCE_PATH)

  console.log('\n> Cleaning up')
  await clean()

  let html404

  console.log('\n> Transforming root markdown files')
  const rootFiles = files.filter(markdownFilter)
  await Promise.mapSeries(rootFiles, async file => {
    if (file === '404.md') html404 = await processFile(file, 'markdown', { data: true })
    else processFile(file, 'markdown')
  })

  console.log('\n> Transforming namespaces')
  const namespaces = files.filter(dirFilter)
  const namespaceResult = await Promise.mapSeries(namespaces, processNamespace)

  console.log('\n> Creating data files in src')
  const namespaceData = {}
  namespaces.forEach((key, i) => (namespaceData[key] = namespaceResult[i]))
  await write('articles.json', JSON.stringify(namespaceData, null, 2), DATA_PATH)
  await write('404.json', html404, DATA_PATH)

  console.log(`\n✓ Done :)\nData written to:\n${[DEST_PATH, DATA_PATH, IMAGE_PATH].join('\n')}`)
}

run()
