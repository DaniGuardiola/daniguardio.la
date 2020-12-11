import OGImageTemplate, { OGImageParams } from './OGImageTemplate'
import rehypeTOC, { HtmlElementNode } from '@jsdevtools/rehype-toc'
import rehypeUrlInspector, { UrlMatch } from '@jsdevtools/rehype-url-inspector'

import { Promise } from 'bluebird'
import { Source } from 'next-mdx-remote/hydrate'
import { compareDesc } from 'date-fns'
import computeReadingTime from 'reading-time'
import { promises as fs } from 'fs'
import generateOGImages from './generate-og-images'
import matter from 'gray-matter'
import mdxComponents from 'components/mdx/mdx-components'
import path from 'path'
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
// @ts-ignore
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import renderToString from 'next-mdx-remote/render-to-string'

// types
// -----

type Category = 'blog' | 'project'

export type BlogPostMetadata = {
  draft?: boolean
  url: string
  id: string
  title: string
  description: string
  tags: string[]
  timestamp: number
  readingTime: ReturnType<typeof computeReadingTime>
}

export type PostData = {
  source: Source
  metadata: BlogPostMetadata
}

export type PostList = BlogPostMetadata[]

export type PrevNextPosts = {
  prevPost: BlogPostMetadata | null
  nextPost: BlogPostMetadata | null
}

// file paths
// ----------

function getPostsDir (category: Category) {
  return path.join(process.cwd(), 'content', category)
}
function getPostsPublicDir (category: Category) {
  return path.join(process.cwd(), 'public', category)
}

function getPostDir (category: Category, id: string) {
  return path.join(getPostsDir(category), id)
}

function getPostPublicDir (category: Category, id: string) {
  return path.join(getPostsPublicDir(category), id)
}

function getPostPath (category: Category, id: string) {
  return path.join(getPostDir(category, id), 'post.mdx')
}

const CACHE_BASE_PATH = path.join(process.cwd(), '.cache')

function getCachePath (key: string) {
  return path.join(CACHE_BASE_PATH, `${key}.json`)
}

// cache
// -----

async function writeCache (key: string, value: Record<string, any>) {
  await fs.mkdir(CACHE_BASE_PATH, { recursive: true })
  return fs.writeFile(getCachePath(key), JSON.stringify(value))
}

async function isCached (key: string) {
  try {
    await fs.access(getCachePath(key))
    return true
  } catch (error) {
    return false
  }
}

async function readCache (key: string) {
  const value = await fs.readFile(getCachePath(key), 'utf-8')
  return JSON.parse(value)
}

// file system
// -----------

async function getPostFile (category: Category, id: string) {
  return fs.readFile(getPostPath(category, id))
}

async function copyPostResources (category: Category, id: string) {
  const postDir = getPostDir(category, id)
  const postPublicDir = getPostPublicDir(category, id)
  // remove previous public post dir
  await fs.rmdir(postPublicDir, { recursive: true })
  // get filenames of post resources
  const files = await fs.readdir(postDir)
  // stop early if there are no files
  if (!files) return
  // create new public post dir
  await fs.mkdir(postPublicDir, { recursive: true })
  // copy all files except actual post
  return Promise.map(files, async file => {
    if (file === 'post.mdx') return
    const src = path.join(postDir, file)
    const dest = path.join(postPublicDir, file)
    return fs.copyFile(src, dest)
  })
}

async function copyOrGeneratePostOGImage (
  category: Category,
  id: string,
  { title }: BlogPostMetadata
) {
  const postDir = getPostDir(category, id)
  // TODO: check if already exists and copy instead of generating
  const postPublicDir = getPostPublicDir(category, id)
  await generateOGImages<OGImageParams>({
    Template: OGImageTemplate,
    outputPath: (_: OGImageParams) => path.join(postPublicDir, 'og-image'),
    targets: { id, title, section: 'blog' }
  })
}

async function cleanup (category: Category, postIds: string[]) {
  const postsPublicDir = getPostsPublicDir(category)
  // create public dir
  await fs.mkdir(postsPublicDir, { recursive: true })
  // get existing public post dirs (ids)
  const publicIds = await fs.readdir(postsPublicDir)
  // remove all dirs with no matching post id
  return Promise.map(publicIds, async id => {
    if (!postIds.includes(id))
      await fs.rmdir(getPostPublicDir(category, id), { recursive: true })
  })
}

// utils
// -----

function comparePosts (a: BlogPostMetadata, b: BlogPostMetadata) {
  return compareDesc(a.timestamp, b.timestamp)
}

async function getMetadataAndContent (category: Category, id: string) {
  // read cache
  const cacheKey = `.post.${category}.${id}.metadata`
  if (await isCached(cacheKey)) return readCache(cacheKey)

  const { data, content } = matter(await getPostFile(category, id))
  // get metadata from post frontmatter
  const { title, description, tags, date, draft } = data
  // compute reading time
  const readingTime = computeReadingTime(content)
  // get date in timestamp format (ms)
  const timestamp = date.getTime()
  // compute url
  const url = `/${category}/${id}`
  // compose metadata object
  const metadata: BlogPostMetadata = {
    draft: draft || false,
    url,
    id,
    title,
    description,
    tags,
    timestamp,
    readingTime
  }
  const result = { metadata, content }

  // write cache and return
  await writeCache(cacheKey, result)
  return result
}

// MDX rendering
// -------------

const rehypeHighlightWithOptions = [
  rehypeHighlight,
  {
    subset: false
  }
]

const rehypeTOCWithOptions = [
  rehypeTOC,
  {
    headings: ['h1', 'h2'],
    customizeTOC: (nav: HtmlElementNode) => {
      nav.children = [
        {
          type: 'element',
          tagName: 'p',
          properties: { className: 'toc-heading' },
          children: [{ type: 'text', value: '// table of contents' }]
        },
        ...(nav.children ? nav.children : [])
      ]
      return nav
    }
  }
]

const rehypeAutolinkHeadingsWithOptions = [
  rehypeAutolinkHeadings,
  { behavior: 'wrap' }
]

const getRehypeUrlInspectorWithOptions = ({
  url: postUrl
}: BlogPostMetadata) => [
  rehypeUrlInspector,
  {
    selectors: ['img[src]', 'a[href]'],
    inspectEach: ({ url, node }: UrlMatch) => {
      if (node.tagName === 'img') {
        if (url.startsWith('https://') || url.startsWith('/')) return
        node.properties = {
          ...node.properties,
          src: `${postUrl}/${url}`
        }
      }
      if (node.tagName == 'a') {
        if (url.startsWith('http')) {
          node.properties = {
            ...node.properties,
            target: '_blank'
          }
        }
      }
    }
  }
]

function renderMDX (content: string, metadata: BlogPostMetadata) {
  return renderToString(content, {
    components: mdxComponents,
    mdxOptions: {
      rehypePlugins: [
        rehypeAccessibleEmojis,
        rehypeSlug,
        rehypeHighlightWithOptions,
        rehypeTOCWithOptions,
        rehypeAutolinkHeadingsWithOptions,
        getRehypeUrlInspectorWithOptions(metadata)
      ]
    },
    scope: metadata
  })
}

// public
// ------

export async function getPostIds (category: Category): Promise<string[]> {
  // read cache
  const cacheKey = '.post-ids'
  if (await isCached(cacheKey)) return readCache(cacheKey)

  const postsDir = getPostsDir(category)
  await fs.mkdir(postsDir, { recursive: true })
  const result = await fs.readdir(postsDir)

  // write cache and return
  await writeCache(cacheKey, result)
  return result
}

export async function getPostData (
  category: Category,
  id: string
): Promise<PostData> {
  // read cache
  const cacheKey = `.post.${category}.${id}`
  if (await isCached(cacheKey)) return readCache(cacheKey)

  const { metadata, content } = await getMetadataAndContent(category, id)
  const source: Source = await renderMDX(content, metadata)
  await copyPostResources(category, id)
  await copyOrGeneratePostOGImage(category, id, metadata)
  const result = { source, metadata }

  // write cache and return
  await writeCache(cacheKey, result)
  return result
}

export async function getPostList (category: Category): Promise<PostList> {
  // read cache
  const cacheKey = '.post-list'
  if (await isCached(cacheKey)) return readCache(cacheKey)

  const postIds = await getPostIds(category)
  const posts = await Promise.map(postIds, async id => {
    const { metadata } = await getMetadataAndContent(category, id)
    return metadata
  })
  await cleanup(category, postIds)
  const result = posts.filter(({ draft }) => !draft).sort(comparePosts)

  // write cache and return
  await writeCache(cacheKey, result)
  return result
}

export async function getPrevNextPosts (
  category: Category,
  id: string
): Promise<PrevNextPosts> {
  const postList = await getPostList(category)
  const currentIndex = postList.findIndex(
    postMetadata => id === postMetadata.id
  )
  const nextPost = postList[currentIndex - 1] || null
  const prevPost = postList[currentIndex + 1] || null

  return { prevPost, nextPost }
}
