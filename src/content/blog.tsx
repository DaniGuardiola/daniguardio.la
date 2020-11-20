import { lazy } from 'react'
import { importMDX } from 'mdx.macro'

import { IListItem } from './data'

export const BLOG: IListItem[] = [
  {
    // in progress
    draft: true,
    key: 'logic-and-cousins',
    title: 'Logic and cousins: a complex genealogical tree with prolog',
    tags: ['prolog', 'logic', 'programming'],
    Content: lazy(() => importMDX('./blog/logic-and-cousins.mdx'))
  },
  {
    // in progress
    draft: true,
    key: 'optimizing-the-load-time-of-my-website',
    title: 'Optimizing the load time of my website',
    tags: ['react', 'js', 'web', 'mdx', 'front-end', 'programming'],
    Content: lazy(() =>
      importMDX('./blog/optimizing-the-load-time-of-my-website.mdx')
    )
  },
  {
    key: 'ingenieria-inversa-de-andar-por-casa',
    title: 'Ingeniería inversa de andar por casa (charla)',
    tags: ['reverse-engineering', 'js', 'web', 'programming'],
    Content: lazy(() => importMDX('./blog/ingenieria-inversa-de-andar-por-casa.mdx'))
  },
  {
    key: 'reading-a-file-line-by-line-in-node',
    title: 'Reading a file line-by-line in node',
    tags: ['nodejs', 'js', 'back-end', 'programming'],
    Content: lazy(() =>
      importMDX('./blog/reading-a-file-line-by-line-in-node.mdx')
    )
  },
  {
    key: 'markdown-shortcodes',
    title: 'Markdown shortcodes: embedding anything into an article with MDX',
    tags: ['mdx', 'react', 'js', 'web', 'front-end', 'programming'],
    Content: lazy(() => importMDX('./blog/markdown-shortcodes.mdx'))
  }
]
