import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Box } from '@material-ui/core'
import DocumentTitle from 'react-document-title'
import { makeStyles } from '@material-ui/styles'

import Header from 'Header'
import Content from 'Content'
import { BASE_TITLE } from 'content/data'
import { TLastScrollDirection } from 'utils/scroll'

const useStyles = makeStyles({
  disableSelect: {
    userSelect: 'none'
  }
})

export default function App () {
  const [lastScrollDirection, setLastScrollDirection] = useState<
    TLastScrollDirection
  >('up')
  const [scrolled, setScrolled] = useState(false)
  const classes = useStyles()
  return (
    <DocumentTitle title={BASE_TITLE}>
      <Router>
        <Box
          id='main-wrapper'
          width='100%'
          height='100%'
          fontFamily='"Roboto Slab", serif'
          bgcolor='#fff'
          display='flex'
          flexDirection='column'
          overflow='hidden'
          className={classes.disableSelect}
        >
          <Header
            collapsed={lastScrollDirection === 'down'}
            shadow={scrolled}
          />
          <Box height={50} flexShrink={0} />
          <Content
            onLastScrollDirectionChange={setLastScrollDirection}
            onScrolledChange={setScrolled}
          />
        </Box>
      </Router>
    </DocumentTitle>
  )
}
