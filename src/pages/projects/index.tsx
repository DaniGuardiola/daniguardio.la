import { PostList as PostListType, getPostList } from 'lib/static/posts'

import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from 'components/layout/Layout'
import PostList from 'components/ui/PostList'

export default function Projects ({ posts }: { posts: PostListType }) {
  return (
    <>
      <Head>
        <title>Dani Guardiola's projects</title>
      </Head>
      {/* <PostList category='projects' posts={posts} /> */}
    </>
  )
}

Projects.Layout = Layout

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPostList('project')
  return {
    props: { posts }
  }
}
