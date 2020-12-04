import {
  BlogPostMetadata,
  PostData,
  getPostData,
  getPostIds
} from 'lib/static/posts'
import { GetStaticPaths, GetStaticProps } from 'next'

import Layout from 'components/layout/Layout'
import MDX from 'components/mdx/MDX'
import { Params } from 'next/dist/next-server/server/router'
import SocialHead from 'components/head/PostHead'
import cn from 'classnames'
import { format } from 'date-fns'
import hydrate from 'next-mdx-remote/hydrate'
import mdxComponents from 'components/mdx/mdx-components'
import useScroll from 'lib/use-scroll'

function BackToTop () {
  const [_, scrolled] = process.browser
    ? useScroll(window, undefined, 500)
    : ['up', false]
  return (
    <>
      <div id='top' className='absolute top-0'></div>
      <div className='fixed bottom-0 z-50 w-full pointer-events-none'>
        <div className='container flex justify-end p-4 mx-auto sm:p-8 lg:container-lg'>
          <a
            href='#top'
            className={cn(
              'pointer-events-auto px-6 py-2 bg-green-900 text-white font-mono',
              'rounded text-md sm:text-xl shadow-md hover:shadow-lg transition-all duration-300',
              {
                'pointer-events-auto': scrolled,
                'opacity-0': !scrolled
              }
            )}
          >
            up()
          </a>
        </div>
      </div>
    </>
  )
}

function BlogHeader ({
  metadata: {
    title,
    description,
    readingTime: { text: readingTime },
    timestamp
  }
}: {
  metadata: BlogPostMetadata
}) {
  return (
    <header className='pb-16 text-white bg-green-900 select-text'>
      <div className='container px-8 pt-10 pb-8 mx-auto lg:container-lg'>
        <p className='mb-2 font-mono text-sm text-white text-opacity-75 sm:hidden'>
          {format(timestamp, 'MMM d, y')}
          <span className='font-bold'> · </span>
          {readingTime}
        </p>
        <p className='hidden mb-1 font-mono text-white text-opacity-75 sm:block'>
          {format(timestamp, "Lo 'of' MMMM, y")}
          <span className='font-bold'> · </span>
          {readingTime}
        </p>
        <h1 className='text-xl sm:text-3xl'>{title}</h1>
        <p className='mt-2 font-light text-white text-md sm:text-lg text-opacity-80'>
          {description}
        </p>
      </div>
    </header>
  )
}

export default function BlogPost ({ source, metadata }: PostData) {
  const content = hydrate(source, {
    components: mdxComponents
  })
  const { description, title: postTitle, id } = metadata
  const title = `${postTitle} - Dani Guardiola's blog`
  const url = `blog/${id}`
  return (
    <>
      <SocialHead title={title} description={description} url={url} />
      <article>
        <BackToTop />
        <BlogHeader metadata={metadata} />
        <MDX>{content}</MDX>
        <div className='h-16' />
      </article>
    </>
  )
}

BlogPost.Layout = Layout

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getPostIds('blog')
  return {
    paths: ids.map(id => ({ params: { id } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const { id } = params
  const props = await getPostData('blog', id)
  return { props }
}
