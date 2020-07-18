import React from 'react'
import { Box } from '@material-ui/core'

import ListItem from 'components/ListItem'
import { IListItem } from 'content/data'

const DRAFTS_VISIBLE = false

export default function List ({
  prefix = '',
  items
}: {
  prefix?: string
  items: IListItem[]
}) {
  return (
    <Box padding='0 16px'>
      {items
        .filter(({ draft }) => !draft || DRAFTS_VISIBLE)
        .map(item => (
          <ListItem key={item.key} prefix={prefix} item={item} />
        ))}
    </Box>
  )
}
