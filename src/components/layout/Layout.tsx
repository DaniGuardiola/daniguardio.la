import Head from 'next/head'
import Header from './Header'
import { PropsWithChildren } from 'react'
import useScroll from 'lib/use-scroll'
import BaseHead from 'components/head/BaseHead'

export default function Layout ({ children }: PropsWithChildren<{}>) {
  const [lastScrollDirection, scrolled] = process.browser
    ? useScroll(window, 300)
    : ['up', false]
  return (
    <>
      <BaseHead />
      <div className='select-none font-slab'>
        <Header
          scrolled={scrolled}
          collapsed={lastScrollDirection === 'down'}
        />
        <main>{children}</main>
      </div>
    </>
  )
}
