import puppeteer, { LaunchOptions } from 'puppeteer'

import Promise from 'bluebird'
import { promises as fs } from 'fs'
import path from 'path'
import { renderToStaticMarkup } from 'react-dom/server'

type GenerateOGImagesInput<T> = {
  Template: React.FunctionComponent<T>
  outputPath: string | ((params: T) => string)
  targets: T[] | T
  puppeteerLaunchOptions?: LaunchOptions
}

export default async function generateOGImages<T> ({
  Template,
  outputPath,
  targets,
  puppeteerLaunchOptions
}: GenerateOGImagesInput<T>) {
  // start puppeteer
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'], // without this argument, it breaks when run as root
    ...puppeteerLaunchOptions
  })
  // open a page and setup its viewport
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 628 })
  // support single target argument
  if (!Array.isArray(targets)) targets = [targets]
  await Promise.mapSeries(targets, async data => {
    // render React component into html
    const TemplateElement = Template(data)
    if (TemplateElement === null)
      throw new Error("A template component can't return 'null'")
    const html = renderToStaticMarkup(TemplateElement)
    // load html
    await page.setContent(html, { waitUntil: 'networkidle0' })
    // output screenshot
    const finalImagePath =
      typeof outputPath === 'string' ? outputPath : `${outputPath(data)}.png`
    await fs.mkdir(path.join(finalImagePath, '..'), { recursive: true })
    await page.screenshot({ path: finalImagePath })
  })
  await browser.close()
}
