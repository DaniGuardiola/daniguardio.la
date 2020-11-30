// import { getPostData, getPostIds } from 'lib/posts'
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
import { BlogPostMetadata, PostData } from 'lib/post-types'

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
    <div className='pb-16 text-white bg-green-900 select-text'>
      <div className='container p-8 mx-auto lg:container-lg'>
        <h1 className='text-xl sm:text-3xl'>{title}</h1>
        <p className='mt-1 mb-3 text-lg italic font-light'>{description}</p>
        <p className='mt-2 font-mono text-sm sm:hidden'>
          {format(timestamp, 'MMM d, y')} · {readingTime}
        </p>
        <p className='hidden mt-1 font-mono sm:block'>
          {format(timestamp, "Lo 'of' MMMM, y")} · {readingTime}
        </p>
      </div>
    </div>
  )
}

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

export default function BlogPost ({ source, metadata }: PostData) {
  const content = hydrate(source, {
    components: mdxComponents
  })
  const { image, description, title: postTitle, id } = metadata
  const title = `${postTitle} - Dani Guardiola's blog`
  const url = `blog/${id}`
  return (
    <>
      <BackToTop />
      <SocialHead
        title={title}
        description={description}
        image={image}
        url={url}
      />
      <BlogHeader metadata={metadata} />
      <MDX>{content}</MDX>
      <div className='h-16' />
    </>
  )
}

BlogPost.Layout = Layout

export const getStaticPaths: GetStaticPaths = async () => {
  // const ids = await getPostIds('blog')
  return {
    // paths: ids.map(id => ({ params: { id } })),
    paths: [],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const { id } = params
  const fakeMetadata: BlogPostMetadata = {
    id: 'test',
    title: 'test',
    description: 'test',
    url: 'test',
    tags: [],
    timestamp: 0,
    readingTime: {
      text: 'test',
      time: 0,
      words: 0,
      minutes: 0
    }
  }
  // const props = await getPostData('blog', id)
  // return { props }
  return { props: { metadata: fakeMetadata } }
}
