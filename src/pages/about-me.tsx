import hydrate, { Source } from 'next-mdx-remote/hydrate'

import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from 'components/layout/Layout'
import MDX from 'components/mdx/MDX'
import { getAboutMe } from 'lib/static/about-me'

export default function AboutMe ({ source }: { source: Source }) {
  const content = hydrate(source)
  return (
    <>
      <Head>
        <title>About Dani Guardiola</title>
      </Head>
      <article>
        <MDX>{content}</MDX>
      </article>
    </>
  )
}

AboutMe.Layout = Layout

export const getStaticProps: GetStaticProps = async () => {
  const props = await getAboutMe()
  return { props }
}
