import React, { ComponentProps, ElementType } from 'react'
import { Components } from '@mdx-js/react'
import { Link } from 'react-router-dom'

import CodeBlock from '../utils/CodeBlock'
import TypewriterText from 'utils/TypewriterText'
import Centerer from 'utils/Centerer'
import { Box } from '@material-ui/core'
import { SHADOW_ON_HOVER } from 'utils/style-utils'
import { makeStyles } from '@material-ui/styles'

const useYouTubeStyles = makeStyles({
  wrapper: SHADOW_ON_HOVER
})

const shortcodeHandlers = {
  // youtube
  // -------

  youtube: function YouTubeMDX ({ children: content }: { children: string }) {
    const classes = useYouTubeStyles()
    const videoId = content.split(' ')[1]
    return (
      <Box
        className={classes.wrapper}
        position='relative'
        paddingBottom='56.25%' // 16:9
        height={0}
        overflow='hidden'
        borderRadius='4px'
      >
        <iframe
          title={`Youtube video with ID: ${videoId}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          frameBorder='0'
          allowFullScreen
        />
      </Box>
    )
  },
  // typewriter
  // ----------

  typewriter: function TypeWriterMDX ({
    children: content
  }: {
    children: string
  }) {
    const parts = content.split(' ')
    parts.shift()
    let position = 'center'
    if (parts[0].startsWith('-!')) {
      const option = parts.shift()
      switch (option?.substring(2)) {
        case 'left':
          position = 'left'
          break
      }
    }
    const text = parts.join(' ').trim()
    const typewriterTextProps: ComponentProps<typeof TypewriterText> = {
      text: text,
      delay: 1000,
      spaceWait: 30,
      delayCursorInterval: 400,
      charInterval: 20,
      cursorWidth: 9,
      cursorHeight: 2,
      cursorMargin: 2
    }
    return position === 'center' ? (
      <Centerer expand={false} marginY={2}>
        <TypewriterText {...typewriterTextProps} />
      </Centerer>
    ) : (
      <Box marginY={2}>
        <TypewriterText {...typewriterTextProps} />
      </Box>
    )
  }
}

const mdxComponents: Components = {
  // code
  // ----

  code: (props: React.HTMLProps<HTMLPreElement>) => <CodeBlock {...props} />,

  // links
  // -----

  a: ({ href, children, ...props }: React.HTMLProps<HTMLAnchorElement>) => {
    if (
      href?.startsWith('/project') ||
      href?.startsWith('/blog') ||
      href?.startsWith('/about')
    )
      return <Link to={href}>{children}</Link>
    return (
      <a href={href} target='_blank' rel='noopener noreferrer' {...props}>
        {children}
      </a>
    )
  },

  // paragraphs and shortcodes
  // -------------------------

  // @ts-ignore - wtf???
  p: ({ children, ...props }: React.HTMLProps<HTMLParagraphElement>) => {
    if (typeof children === 'string' && children.startsWith('!!')) {
      const shortcode = children.split(' ')[0].substring(2)
      const Handler: ElementType =
        // @ts-ignore - idk how to do this properly :/
        shortcodeHandlers[shortcode]
      if (Handler) return <Handler>{children}</Handler>
    }
    return <p {...props}>{children}</p>
  }
}

export default mdxComponents
