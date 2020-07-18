import React, { Suspense, useState, useEffect } from 'react'
import { Box, useMediaQuery } from '@material-ui/core'
import {
  Switch,
  Route,
  useParams,
  Redirect,
  useLocation
} from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { makeStyles } from '@material-ui/styles'
import DocumentTitle from 'react-document-title'

import Centerer from 'utils/Centerer'
import Article from 'components/Article'
import { AboutMe, PROJECTS, BLOG, IListItem } from 'content/data'
import { FANCY_SCROLLBAR } from 'utils/style-utils'
import List from 'components/List'
import getTitle from 'utils/get-title'
import Trouble from 'components/Trouble'
import ErrorFallback from 'components/ErrorFallback'
import { useScroll, TLastScrollDirection } from 'utils/scroll'
import NotFound from 'components/NotFound'

const EXISTING_PAD = 50
const PAD_HEIGHT = 119 - EXISTING_PAD
const MOBILE_PAD_HEIGHT = 106 - EXISTING_PAD

function ContentLoader ({
  titlePrefix,
  items,
  article = false
}: {
  titlePrefix: string
  items: IListItem[]
  article?: boolean
}) {
  const { key }: { key: string } = useParams()
  const item = items.find(item => item.key === key)
  if (!item) return <NotFound />
  const { strongTitle, title, Content } = item
  return article ? (
    <>
      <DocumentTitle
        title={getTitle(
          `${titlePrefix} - ${strongTitle ? strongTitle + ': ' : ''}${title}`
        )}
      />
      <Article data={item} MDXDocument={Content} />
    </>
  ) : (
    <Content />
  )
}

const useStyles = makeStyles({
  section: { ...FANCY_SCROLLBAR, userSelect: 'text' }
})

export default function Content ({
  onLastScrollDirectionChange,
  onScrolledChange
}: {
  onLastScrollDirectionChange: (
    lastScrollDirection: TLastScrollDirection
  ) => void
  onScrolledChange: (scrolled: boolean) => void
}) {
  const [refreshWorkaround, setRefreshWorkaround] = useState(false)
  const [element, setElement] = useState<HTMLElement>()
  const { pathname } = useLocation()
  const [lastScrollDirection, scrolled] = useScroll(element)
  const classes = useStyles()
  const mobile = useMediaQuery('(max-width: 550px)', { noSsr: true })

  useEffect(() => {
    onLastScrollDirectionChange(lastScrollDirection)
  }, [lastScrollDirection, onLastScrollDirectionChange])

  useEffect(() => {
    onScrolledChange(scrolled)
  }, [onScrolledChange, scrolled])

  useEffect(() => {
    element?.scrollTo(0, 0)
  }, [element, pathname])

  return (
    <Box
      // @ts-ignore https://github.com/mui-org/material-ui/issues/17010
      ref={el => setElement(el)}
      component='section'
      className={classes.section}
      flexGrow={1}
      display='flex'
      flexDirection='column'
      overflow='auto'
    >
      <Centerer maxWidth='100%'>
        <Box height='100%'>
          <Box height={mobile ? MOBILE_PAD_HEIGHT : PAD_HEIGHT} width={0} />
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => setRefreshWorkaround(!refreshWorkaround)}
            resetKeys={[refreshWorkaround, pathname]}
          >
            <Suspense
              fallback={
                <Trouble image='dino' fadeIn={true}>
                  Loading...
                  <br />
                  Is your internet working?
                </Trouble>
              }
            >
              <Switch>
                // blog
                <Route exact path='/blog'>
                  <Redirect to='/' />
                </Route>
                <Route
                  path='/blog/:key'
                  children={
                    <ContentLoader
                      titlePrefix="'s blog"
                      items={BLOG}
                      article={true}
                    />
                  }
                />
                <Route exact path='/'>
                  <Centerer>
                    <DocumentTitle title={getTitle("'s blog")} />
                    <List prefix='/blog' items={BLOG} />
                  </Centerer>
                </Route>
                // projects
                <Route path='/projects/:key'>
                  <Redirect to='/project/:key' />
                </Route>
                <Route
                  path='/project/:key'
                  children={
                    <ContentLoader
                      titlePrefix="'s projects"
                      items={PROJECTS}
                      article={true}
                    />
                  }
                />
                <Route exact path='/projects'>
                  <Centerer>
                    <DocumentTitle title={getTitle("'s projects")} />
                    <List prefix='/project' items={PROJECTS} />
                  </Centerer>
                </Route>
                // about me
                <Route exact path='/about'>
                  <DocumentTitle title={getTitle(': about me')} />
                  <Article MDXDocument={AboutMe} />
                </Route>
                // 404
                <Route component={NotFound} />
              </Switch>
              {/* <Loading /> */}
            </Suspense>
          </ErrorBoundary>
        </Box>
      </Centerer>
    </Box>
  )
}
