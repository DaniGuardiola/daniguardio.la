import { format, parseISO } from 'date-fns'

import Head from 'next/head'

function Tweet ({
  id,
  placeholder,
  userId,
  userName,
  date,
  disableConversation
}: {
  id: string
  userId: string
  placeholder?: string
  userName?: string
  date?: string
  disableConversation?: boolean
}) {
  return (
    <>
      <Head>
        <script
          key='twitter-widgets'
          async
          src='https://platform.twitter.com/widgets.js'
          charSet='utf-8'
        ></script>
      </Head>
      <div className='tweet-wrapper'>
        <blockquote
          className='mx-auto twitter-tweet'
          data-dnt='true'
          data-theme='light'
          data-conversation={disableConversation && 'none'}
        >
          <p lang='en' dir='ltr'>
            {placeholder || 'Loading tweet...'}
          </p>
          {userName && `— ${userName} (@${userId}) `}
          <a
            href={`https://twitter.com/${userId ||
              'x'}/status/${id}?ref_src=twsrc%5Etfw`}
          >
            {date ? format(parseISO(date), 'MMMM d, y') : 'Unknown date'}
          </a>
        </blockquote>
      </div>
      <style global jsx>{`
        .twitter-tweet-rendered {
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </>
  )
}

export default {
  Tweet
}
