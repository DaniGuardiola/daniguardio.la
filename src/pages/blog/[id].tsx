import {
  BlogPostMetadata,
  PostData,
  PrevNextPosts,
  getPostData,
  getPostIds,
  getPrevNextPosts
} from 'lib/static/posts'
import { GetStaticPaths, GetStaticProps } from 'next'

import Layout from 'components/layout/Layout'
import Link from 'next/link'
import MDX from 'components/mdx/MDX'
import MetaHead from 'components/head/MetaHead'
import { Params } from 'next/dist/next-server/server/router'
import TwitterIcon from 'components/icons/TwitterIcon'
import cn from 'classnames'
import { format } from 'date-fns'
import hydrate from 'next-mdx-remote/hydrate'
import mdxComponents from 'components/mdx/mdx-components'
import useScroll from 'lib/use-scroll'
import { useState } from 'react'

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
              'pointer-events-auto px-6 py-2 bg-deep-green text-white font-mono',
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

function TwitterButton ({ title, url }: BlogPostMetadata) {
  const [fullUrl] = useState(
    process.browser
      ? `https://${window.location.host}${window.location.pathname}`
      : `https://daniguardio.la${url}`
  )
  return (
    <a
      target='_blank'
      className='relative bottom-0.5'
      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
        fullUrl
      )}&text=${encodeURIComponent(title)}%20-%20by%20@daniguardio_la`}
    >
      <TwitterIcon className='inline w-5 h-5' />
    </a>
  )
}

function BlogHeader ({
  metadata,
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
      <div className='container relative px-8 pt-10 pb-8 mx-auto lg:container-lg'>
        <p className='mb-2 font-mono text-sm text-white text-opacity-75 sm:mb-1'>
          <span className='sm:hidden'>{format(timestamp, 'MMM d, y')}</span>
          <span className='hidden sm:inline'>
            {format(timestamp, "do 'of' MMMM, y")}
          </span>
          <span className='font-bold'> · </span>
          {readingTime}
          <span className='font-bold'> · </span>
          <TwitterButton {...metadata} />
        </p>
        <h1 className='text-xl sm:text-3xl'>{title}</h1>
        <p className='mt-2 font-light text-white text-md sm:text-lg text-opacity-80'>
          {description}
        </p>
      </div>
    </header>
  )
}

function PrevNextPost ({ prevPost, nextPost }: PrevNextPosts) {
  return (
    <div className='text-white bg-green-900'>
      <div className='container p-4 mx-auto lg:container-lg sm:p-8 sm:text-2xl'>
        {prevPost && (
          <p>
            <Link href={prevPost.url}>
              <a>
                {'<- '}
                {prevPost.title}
              </a>
            </Link>
          </p>
        )}
        {nextPost && (
          <p className='mt-8 text-right'>
            <Link href={nextPost.url}>
              <a>
                {nextPost.title}
                {' ->'}
              </a>
            </Link>
          </p>
        )}
      </div>
      <div className='h-24' />
    </div>
  )
}

export default function BlogPost ({
  source,
  metadata,
  prevPost,
  nextPost
}: PostData & PrevNextPosts) {
  const content = hydrate(source, {
    components: mdxComponents
  })
  const { description, title: postTitle, id } = metadata
  const title = `${postTitle} - Dani Guardiola's blog`
  const url = `blog/${id}`
  return (
    <>
      <MetaHead
        title={title}
        description={description}
        url={url}
        type='article'
      />
      <article>
        <BackToTop />
        <BlogHeader metadata={metadata} />
        <MDX>{content}</MDX>
        <PrevNextPost prevPost={prevPost} nextPost={nextPost} />
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
  const postData = await getPostData('blog', id)
  const prevNext = await getPrevNextPosts('blog', id)
  return { props: { ...postData, ...prevNext } }
}
