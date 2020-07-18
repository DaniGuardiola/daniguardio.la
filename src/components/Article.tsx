import React, {
  ElementType,
  useState,
  useEffect,
  useRef,
  useLayoutEffect
} from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { FANCY_SCROLLBAR, SHADOW_ON_HOVER } from 'utils/style-utils'
import Centerer from 'utils/Centerer'
import mdxComponents from './mdx-components'
import { IListItem } from 'content/data'
import computeReadingTime from 'reading-time'

const useStyles = makeStyles({
  articleWrapper: FANCY_SCROLLBAR,
  article: {
    userSelect: 'text',
    '& p': {
      fontWeight: 350,
      lineHeight: '32px',
      '-webkitFontSmoothing': 'antialiased'
    },
    '& a': {
      textDecoration: 'none',
      color: '#3f51b5',
      fontWeight: 400
    },
    '& a:hover': {
      textDecoration: 'underline'
    },
    '& img': {
      maxWidth: '100%',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: '4px',
      ...SHADOW_ON_HOVER
    },
    '& blockquote': {
      borderLeft: '4px solid #8c8c8c',
      paddingLeft: 16,
      marginInlineStart: '16px',
      marginBlockStart: 0,
      marginBlockEnd: 0
    },
    '& blockquote p': {
      margin: 0,
      padding: '8px 0',
      fontWeight: 400
    },
    '& code': {
      fontFamily: '"Roboto Mono", monospace'
    },
    '& >div> pre,& li> pre': {
      overflowX: 'auto',
      overflowY: 'hidden',
      borderRadius: 6,
      color: '#fff',
      backgroundColor: '#23241f',
      fontSize: 15,
      cursor: 'text',
      ...FANCY_SCROLLBAR,
      ...SHADOW_ON_HOVER
    }
  }
})

export default function Article ({
  MDXDocument,
  data
}: {
  data?: IListItem
  MDXDocument: ElementType
}) {
  const [mdxDocument, setMdxDocument] = useState(
    <MDXDocument components={mdxComponents} />
  )
  const [readingTime, setReadingTime] = useState('')
  const wrapperRef = useRef<HTMLDivElement>(null)
  const classes = useStyles()

  useEffect(() => {
    setMdxDocument(<MDXDocument components={mdxComponents} />)
  }, [MDXDocument])

  useLayoutEffect(() => {
    // until I find a better way, I'm gonna have to stick with this :(
    setTimeout(() => {
      if (wrapperRef.current?.textContent) {
        const { text } = computeReadingTime(wrapperRef.current.textContent, {
          wordsPerMinute: 250
        })
        setReadingTime(text)
      }
    }, 200)
  }, [MDXDocument])

  return (
    <Box
      width='100%'
      height='100%'
      position='relative'
      // @ts-ignore
      ref={wrapperRef}
    >
      {data && (
        <Box
          width='100%'
          bgcolor='#00561f'
          fontFamily='"Roboto Mono", monospace'
          color='#fff'
          boxSizing='border-box'
          paddingX={2}
          paddingTop={3}
          paddingBottom={4}
        >
          <Centerer>
            <Box>
              <h1>
                {data?.strongTitle ? `${data?.strongTitle}: ` : ''}
                <span style={data?.strongTitle ? { fontWeight: 300 } : {}}>
                  {data?.title}
                </span>
              </h1>
            </Box>
            <Box component='span'>
              {
                <span
                  style={{
                    transition: 'opacity .5s ease-in',
                    opacity: readingTime ? 1 : 0
                  }}
                >
                  {readingTime || '.'}
                </span>
              }
            </Box>
          </Centerer>
        </Box>
      )}
      <Centerer contentWidth={700}>
        <Box
          component='article'
          className={classes.article}
          padding='24px 16px'
          fontSize={19}
        >
          {mdxDocument}
        </Box>
      </Centerer>
    </Box>
  )
}
