import { BASE_DOMAIN } from 'lib/constants'
import Head from 'next/head'

export default function PostHead ({
  title,
  image,
  description,
  url
}: {
  title: string
  image?: string
  description: string
  url: string
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta key='description' name='description' content={description}></meta>

      {/* open graph */}
      <meta
        key='og-url'
        property='og:url'
        content={`https://${BASE_DOMAIN}/${url}`}
      />
      <meta key='og-type' property='og:type' content='article' />
      <meta key='og-title' property='og:title' content={title} />
      <meta
        key='og-description'
        property='og:description'
        content={description}
      />
      {image && <meta key='og-image' property='og:image' content={image} />}

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
      {image && (
        <meta key='twitter-image' name='twitter:image' content={image} />
      )}
      <meta key='twitter-url' name='twitter:url' content={url} />
    </Head>
  )
}
