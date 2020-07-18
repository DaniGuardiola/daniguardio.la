import React from 'react'
import { Box, useMediaQuery } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

import { IListItem } from 'content/data'

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: 'initial',
    whiteSpace: 'normal',
    '&:hover': { textDecoration: 'underline' }
  },
  tag: {
    color: 'initial',
    marginLeft: 6,
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' }
  }
})

export default function ListItem ({
  prefix = '',
  item: { key, strongTitle, title, tags }
}: {
  prefix?: string
  item: IListItem
}) {
  const mobile = useMediaQuery('(max-width: 832px)', { noSsr: true })
  const classes = useStyles()
  return (
    <Box key={key}>
      <Box
        display='flex'
        width='100%'
        minHeight={24}
        lineHeight='24px'
        whiteSpace='nowrap'
        fontFamily='"Roboto Mono", monospace'
        fontSize={16}
        margin='16px 0'
      >
        <Box flexShrink={mobile ? 1 : 0}>
          <Link className={classes.link} to={`${prefix}/${key}`}>
            <b>{strongTitle && `${strongTitle}: `}</b>
            {title}
          </Link>
        </Box>
        {!mobile && (
          <>
            <Box flex={1} />
            <Box
              component='span'
              maxWidth={340}
              marginLeft='48px'
              fontStyle='italic'
              fontWeight='bold'
              fontSize={14}
              textOverflow='ellipsis'
              overflow='hidden'
              textAlign='right'
            >
              {tags.slice(0, 3).map(tag => (
                <Link className={classes.tag} key={tag} to={`${prefix}#${tag}`}>
                  #{tag}
                </Link>
              ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}
