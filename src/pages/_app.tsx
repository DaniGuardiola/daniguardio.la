import '../styles/global.css'

import {
  AppPropsType,
  NextWebVitalsMetric
} from 'next/dist/next-server/lib/utils'

import { PropsWithChildren } from 'react'

const Noop = ({ children }: PropsWithChildren<{}>) => children

function MyApp ({ Component, pageProps }: AppPropsType) {
  // @ts-ignore
  const Layout = Component.Layout || Noop

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
