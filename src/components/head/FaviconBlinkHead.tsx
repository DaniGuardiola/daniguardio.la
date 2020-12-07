import Head from 'next/head'

export default function FaviconBlinkHead ({ cursor }: { cursor: boolean }) {
  return (
    <Head>
      <link
        key='favicon'
        rel='icon'
        href={cursor ? '/favicon.ico' : '/favicon_off.ico'}
      />
    </Head>
  )
}
