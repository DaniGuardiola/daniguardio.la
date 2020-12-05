import { Source } from 'next-mdx-remote/hydrate'
import { promises as fs } from 'fs'
import path from 'path'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import renderToString from 'next-mdx-remote/render-to-string'

export async function getAboutMe () {
  const aboutMePath = path.join(process.cwd(), 'content', 'about-me.mdx')
  const content = await fs.readFile(aboutMePath, 'utf-8')
  const source: Source = await renderToString(content, {
    mdxOptions: {
      rehypePlugins: [rehypeAccessibleEmojis]
    }
  })
  return { source }
}
