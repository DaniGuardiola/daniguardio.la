import './Article.css'
import React, { Suspense, Component } from 'react'
import DocumentTitle from 'react-document-title'
import 'highlight.js/styles/monokai-sublime.css'
import { html as html404 } from '../data/404.json'
import { unstable_createResource as createResource } from 'react-cache'

const getArticle = async path => {
  const request = new Request(`/articles/${path}.json`)
  const response = await fetch(request)
  if (response.status === 404) throw new Error(404)
  const data = await response.text()
  if (data.substring(0, 15).toLowerCase().startsWith('<!doctype html>')) throw new Error(404)
  return JSON.parse(data)
}

const ArticleResource = createResource(getArticle)

const ArticleContent = (props) => {
  const { id, html, name } = props
  const articleData = html ? {} : ArticleResource.read(id)
  const __html = html || articleData.html
  const title = name || articleData.name
  return __html ? (<>
    {title && <DocumentTitle title={`Dani Guardiola - ${title}`} />}
    <div
      className='article-html'
      dangerouslySetInnerHTML={{ __html }} />
  </>) : null
}

class ArticleErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError (error) {
    return {
      hasError: true,
      error404: error.message === '404'
    }
  }

  componentDidCatch () {}

  render () {
    if (this.state.hasError) {
      return this.state.error404
        ? <ArticleContent html={html404} name='404 not found' />
        : <h2>Error! :(</h2>
    }

    return this.props.children
  }
}

function Article ({ article }) {
  return (
    <div className='article-wrapper'>
      <ArticleErrorBoundary>
        <Suspense
          maxDuration={500}
          fallback={<div className='article-loader' />}>
          <ArticleContent id={article} />
        </Suspense>
      </ArticleErrorBoundary>
    </div>
  )
}

export default Article
