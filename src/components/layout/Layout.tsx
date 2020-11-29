import Head from 'next/head'
import Header from './Header'
import { PropsWithChildren } from 'react'
import useScroll from 'lib/use-scroll'

export default function Layout ({ children }: PropsWithChildren<{}>) {
  const [lastScrollDirection, scrolled] = process.browser
    ? useScroll(window, 100)
    : ['up', false]
  return (
    <>
      <Head>
        <meta
          key='description'
          name='description'
          content="Dani Guardiola's personal site. Engineering, fun projects, music and more!"
        ></meta>
        <link key='favicon' rel='icon' href='favicon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <div className='select-none font-slab'>
        <Header
          scrolled={scrolled}
          collapsed={lastScrollDirection === 'down'}
        />
        {children}
      </div>
    </>
  )
}
