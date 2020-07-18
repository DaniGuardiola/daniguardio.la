import { lazy } from 'react'
import { importMDX } from 'mdx.macro'

import { IListItem } from './data'

export const BLOG: IListItem[] = [
  {
    // in progress
    draft: true,
    key: 'logic-and-cousins',
    title: 'Logic and cousins: a complex genealogical tree with prolog',
    tags: ['prolog', 'logic'],
    Content: lazy(() => importMDX('./blog/logic-and-cousins.mdx'))
  },
  {
    // in progress
    draft: true,
    key: 'optimizing-the-load-time-of-my-website',
    title: 'Optimizing the load time of my website',
    tags: ['react', 'js', 'web', 'mdx', 'front-end'],
    Content: lazy(() =>
      importMDX('./blog/optimizing-the-load-time-of-my-website.mdx')
    )
  },
  {
    // done
    key: 'markdown-shortcodes',
    title: 'Markdown shortcodes: embedding anything into an article with MDX',
    tags: ['mdx', 'react', 'js', 'web', 'front-end'],
    Content: lazy(() => importMDX('./blog/markdown-shortcodes.mdx'))
  }
]
