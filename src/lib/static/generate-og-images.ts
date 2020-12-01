import Promise from 'bluebird'
import { promises as fs } from 'fs'
import path from 'path'
import puppeteer from 'puppeteer'
import { renderToStaticMarkup } from 'react-dom/server'

export default async function generateOGImages<T> (
  Template: React.FunctionComponent<T>,
  imagePath: string | ((params: T) => string),
  targets: T[] | T
) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox']
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 628 })
  if (!Array.isArray(targets)) targets = [targets]
  await Promise.mapSeries(targets, async data => {
    const TemplateElement = Template(data)
    if (TemplateElement === null)
      throw new Error("A template component should not return 'null'")
    const markup = renderToStaticMarkup(TemplateElement)
    await page.setContent(markup, { waitUntil: 'networkidle0' })
    const finalImagePath =
      typeof imagePath === 'string' ? imagePath : `${imagePath(data)}.png`
    await fs.mkdir(path.join(finalImagePath, '..'), { recursive: true })
    await page.screenshot({ path: finalImagePath })
  })
  await browser.close()
}
