import Head from 'next/head'

export default function BaseHead () {
  return (
    <Head>
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
  )
}
