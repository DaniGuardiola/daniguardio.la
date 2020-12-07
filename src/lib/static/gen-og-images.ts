import Template, { OGImageParams } from 'lib/static/OGImageTemplate'

import generateOGImages from 'lib/static/generate-og-images'
import path from 'path'

const outputDir = path.join(process.cwd(), 'public/og')
const outputPath = ({ id }: OGImageParams) => path.join(outputDir, id)

function genImage (targets: OGImageParams) {
  return generateOGImages<OGImageParams>({
    Template,
    outputPath,
    targets
  })
}

export const generateBlogOGImage = async () =>
  genImage({
    id: 'blog',
    title:
      `<span class="text-7xl">Dani Guardiola's blog</span>` +
      `\n<span class="font-bold font-mono" style="color: #1a281e">codeDrunk.then(refactorSober)</span>`,
    section: 'blog'
  })

export const generateAboutMeOGImage = async () =>
  genImage({
    id: 'about-me',
    title:
      `<span class="text-7xl">About Dani Guardiola</span>` +
      `\n<span class="font-bold font-mono" style="color: #1a281e">console.log(Dani.about())</span>`,
    section: 'about me'
  })
