import { lazy } from 'react'
import { importMDX } from 'mdx.macro'

export interface IListItem {
  draft?: boolean
  key: string
  strongTitle?: string
  title: string
  tags: string[]
  Content: React.LazyExoticComponent<any>
}

export const BASE_TITLE = 'Dani Guardiola'

export const SOCIAL = [
  {
    title: 'github',
    url: 'https://github.com/DaniGuardiola',
    color: '#000'
  },
  {
    title: 'twitter',
    url: 'https://twitter.com/daniguardiolame',
    color: '#0084ff'
  },
  {
    title: 'email',
    url: 'mailto:hi@daniguardiola.me',
    color: '#000'
  }
]

export const SECTIONS = [
  {
    title: 'blog',
    path: '/',
    subpath: 'blog'
  },
  {
    title: 'projects',
    path: '/projects',
    subpath: 'project'
  },
  {
    title: 'about me',
    path: '/about'
  }
]

export { PROJECTS } from './projects'
export { BLOG } from './blog'

export const AboutMe = lazy(() => importMDX('./about-me.mdx'))
