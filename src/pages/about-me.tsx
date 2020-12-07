import hydrate, { Source } from 'next-mdx-remote/hydrate'

import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from 'components/layout/Layout'
import MDX from 'components/mdx/MDX'
import { getAboutMe } from 'lib/static/about-me'
import { generateAboutMeOGImage } from 'lib/static/gen-og-images'
import MetaHead from 'components/head/MetaHead'

export default function AboutMe ({ source }: { source: Source }) {
  const content = hydrate(source)
  return (
    <>
      <MetaHead
        type='website'
        title='About Dani Guardiola'
        url='about-me'
        image='og/about-me.png'
        description='Some of the stuff I love includes music, engineering, interface design, free software (as in freedom), reverse-engineering, and not taking things seriously. Cats, too.'
      />
      <div className='text-white bg-green-900'>
        <div className='container p-8 mx-auto lg:container-lg'>
          <h1 className='text-xl sm:text-3xl'>
            "The opposite of war isn't peace, it's creation."
          </h1>
        </div>
      </div>
      <article>
        <MDX>{content}</MDX>
      </article>
    </>
  )
}

AboutMe.Layout = Layout

export const getStaticProps: GetStaticProps = async () => {
  const props = await getAboutMe()
  await generateAboutMeOGImage()
  return { props }
}
