import Document, { Head, Html, Main, NextScript } from 'next/document'

import GoogleFonts from 'next-google-fonts'

class MyDocument extends Document {
  render () {
    return (
      <Html lang='en'>
        <Head>
          <GoogleFonts href='https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;351;400;700&display=swap' />
          <GoogleFonts href='https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap' />
          <meta charSet='utf-8' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
