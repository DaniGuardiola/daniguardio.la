import React, { ReactNode } from 'react'
import { Box, BoxProps } from '@material-ui/core'

const CONTENT_WIDTH = 1058

export default function Centerer ({
  children,
  expand = true,
  contentWidth = CONTENT_WIDTH,
  ...props
}: {
  children: ReactNode
  expand?: boolean
  contentWidth?: number
} & BoxProps) {
  return (
    <Box display='flex' flexGrow={1}>
      <Box flexGrow={1} />
      <Box flexGrow={999} maxWidth='100%' overflow='hidden' display='flex'>
        <Box flexGrow={1} />
        <Box
          flexGrow={expand ? 999 : 0}
          flexShrink={1}
          height='100%'
          maxWidth={contentWidth}
          overflow='hidden'
          {...props}
        >
          {children}
        </Box>
        <Box flexGrow={1} />
      </Box>
      <Box flexGrow={1} />
    </Box>
  )
}
