import Head from 'next/head'
import Header from './Header'
import { PropsWithChildren } from 'react'
import useScroll from 'lib/use-scroll'

export default function Layout ({ children }: PropsWithChildren<{}>) {
  const [lastScrollDirection, scrolled] = process.browser
    ? useScroll(window, 300)
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
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;351;400;700&display=swap'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap'
        />
      </Head>
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
