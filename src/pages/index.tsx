// import { getPostList } from 'lib/posts'

import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from 'components/layout/Layout'
import PostList from 'components/ui/PostList'
import { PostList as PostListType } from 'lib/post-types'

const emptyChar = '‎' // this is an empty character, prevents height changes

export default function Blog ({ posts }: { posts: PostListType }) {
  return (
    <>
      <Head>
        <title>Dani Guardiola's blog</title>
        <meta
          name='description'
          content='Personal blog about engineering, tech, fun projects, music and more, written by Dani Guardiola.'
        ></meta>
      </Head>
      <div className='text-white bg-green-900'>
        <div className='container p-8 mx-auto lg:container-lg'>
          <h1 className='text-xl sm:text-3xl'>Thoughts about things</h1>
        </div>
      </div>
      <div className='container px-6 py-4 mx-auto font-mono lg:container-lg'>
        <PostList category='blog' posts={posts}></PostList>
      </div>
    </>
  )
}

Blog.Layout = Layout

export const getStaticProps: GetStaticProps = async () => {
  // const posts = await getPostList('blog')
  return {
    // props: { posts }
    props: { posts: [] }
  }
}
