export type SocialLink = {
  title: string
  url: string
  className?: string
}

export type NavLinkData = {
  title: string
  path: string
  subpath?: string
}

export const BASE_DOMAIN = 'daniguardio-la.vercel.app'

export const SOCIAL_LINKS: SocialLink[] = [
  {
    title: 'github',
    url: 'https://github.com/DaniGuardiola'
  },
  {
    title: 'twitter',
    url: 'https://twitter.com/daniguardiolame',
    className: 'text-blue-500'
  },
  {
    title: 'email',
    url: 'mailto:hi@daniguardiola.me'
  }
]

export const NAV_LINKS: NavLinkData[] = [
  {
    title: 'blog',
    path: '/',
    subpath: '/blog/'
  },
  {
    title: 'projects',
    path: '/projects',
    subpath: '/project/'
  },
  {
    title: 'about me',
    path: '/about-me'
  }
]
