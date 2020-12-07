import { PostList as PostListType, getPostList } from 'lib/static/posts'

import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from 'components/layout/Layout'
import PostList from 'components/ui/PostList'
import { generateBlogOGImage } from 'lib/static/gen-og-images'
import MetaHead from 'components/head/MetaHead'

export default function Blog ({ posts }: { posts: PostListType }) {
  return (
    <>
      <MetaHead
        type='website'
        title="Dani Guardiola's blog"
        url=''
        image='og/blog.png'
        description='Personal blog about engineering, tech, fun projects, music and more, written by Dani Guardiola.'
      />
      <div className='text-white bg-green-900'>
        <div className='container p-8 mx-auto lg:container-lg'>
          <h1 className='text-xl sm:text-3xl'>Code drunk, refactor sober</h1>
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
  const posts = await getPostList('blog')
  await generateBlogOGImage()
  return {
    props: { posts }
  }
}
