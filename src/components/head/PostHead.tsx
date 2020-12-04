import { BASE_DOMAIN } from 'data'
import Head from 'next/head'

export default function PostHead ({
  title,
  description,
  url
}: {
  title: string
  description: string
  url: string
}) {
  const postUrl = `https://${BASE_DOMAIN}/${url}`
  const image = `${postUrl}/og-image.png`
  return (
    <Head>
      <title>{title}</title>
      <meta key='description' name='description' content={description}></meta>

      {/* open graph */}
      <meta key='og-url' property='og:url' content={postUrl} />
      <meta key='og-type' property='og:type' content='article' />
      <meta key='og-title' property='og:title' content={title} />
      <meta
        key='og-description'
        property='og:description'
        content={description}
      />
      <meta key='og-image' property='og:image' content={image} />

      {/* twitter */}
      <meta
        key='twitter-card'
        name='twitter:card'
        content='summary_large_image'
      />
      <meta key='twitter-site' name='twitter:site' content='@daniguardiolame' />
      <meta key='twitter-title' name='twitter:title' content={title} />
      <meta
        key='twitter-description'
        name='twitter:description'
        content={description}
      />
      <meta key='twitter-image' name='twitter:image' content={image} />
      <meta key='twitter-url' name='twitter:url' content={url} />
    </Head>
  )
}
