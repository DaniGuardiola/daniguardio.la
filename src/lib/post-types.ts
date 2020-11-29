import { Source } from 'next-mdx-remote/hydrate'
import computeReadingTime from 'reading-time'

export type Category = 'blog' | 'project'

export type BlogPostMetadata = {
  draft?: boolean
  url: string
  id: string
  title: string
  description: string
  tags: string[]
  timestamp: number
  image?: string
  readingTime: ReturnType<typeof computeReadingTime>
}

export type PostData = {
  source: Source
  metadata: BlogPostMetadata
}

export type PostList = BlogPostMetadata[]
