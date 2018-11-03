import React, { Suspense, Component } from 'react'
import 'highlight.js/styles/monokai-sublime.css'
import './Article.css'
import { html as html404 } from '../data/404.json'
import { unstable_createResource as createResource } from 'react-cache'

const getArticle = async path => {
  const request = new Request(`/articles/${path}.html`)
  const response = await fetch(request)
  if (response.status === 404) throw new Error(404)
  const text = await response.text()
  if (text.substring(0, 15).toLowerCase().startsWith('<!doctype html>')) throw new Error(404)
  return text
}

const ArticleResource = createResource(getArticle)

function ArticleContent ({ id, html }) {
  const __html = html || ArticleResource.read(id)
  return (
    <div
      className='article-html'
      dangerouslySetInnerHTML={{ __html }} />
  )
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

  render () {
    if (this.state.hasError) {
      return this.state.error404
        ? <ArticleContent html={html404} />
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
          fallback={<div className='article-loader' />}>
          <ArticleContent id={article} />
        </Suspense>
      </ArticleErrorBoundary>
    </div>
  )
}

export default Article
