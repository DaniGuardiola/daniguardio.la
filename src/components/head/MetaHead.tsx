import { BASE_DOMAIN } from 'data'
import Head from 'next/head'

export default function MetaHead ({
  type,
  title,
  description,
  url,
  image
}: {
  type: string
  title: string
  description: string
  url: string
  image?: string
}) {
  const fullBaseDomain = `https://${BASE_DOMAIN}/`
  const postUrl = `${fullBaseDomain}${url}`
  const imageUrl = image
    ? `${fullBaseDomain}${image}`
    : `${postUrl}/og-image.png`
  return (
    <Head>
      <title>{title}</title>
      <meta key='description' name='description' content={description}></meta>

      {/* open graph */}
      <meta key='og-url' property='og:url' content={postUrl} />
      <meta key='og-type' property='og:type' content={type} />
      <meta key='og-title' property='og:title' content={title} />
      <meta
        key='og-description'
        property='og:description'
        content={description}
      />
      <meta key='og-image' property='og:image' content={imageUrl} />

      {/* twitter */}
      <meta
        key='twitter-card'
        name='twitter:card'
        content='summary_large_image'
      />
      <meta key='twitter-site' name='twitter:site' content='@daniguardio_la' />
      <meta key='twitter-title' name='twitter:title' content={title} />
      <meta
        key='twitter-description'
        name='twitter:description'
        content={description}
      />
      <meta key='twitter-image' name='twitter:image' content={imageUrl} />
      <meta key='twitter-url' name='twitter:url' content={url} />
    </Head>
  )
}
