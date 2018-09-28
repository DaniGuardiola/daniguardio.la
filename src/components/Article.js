/* eslint-env browser */
import React, { Component } from 'react'
import 'highlight.js/styles/monokai-sublime.css'
import './Article.css'

const cache = {}

class Article extends Component {
  constructor () {
    super()
    this.state = {
      article: '',
      loading: true,
      html: ''
    }
  }

  async get (article) {
    if (cache[article]) return cache[article]
    const request = new Request(`/data-${article}.md`)
    const response = await fetch(request)
    if (response.status === 404) return this.get('404')
    const text = await response.text()
    if (text.substring(0, 15).toLowerCase().startsWith('<!doctype html>')) return this.get('404')
    const marked = await import('marked')
    const highlightjs = await import('../lib/highlight.pack')
    marked.setOptions({
      highlight: (code, lang) =>
        highlightjs.highlight(lang, code).value
    })
    const result = marked(text)
    cache[article] = result
    return result
  }

  async loadArticle (article) {
    this.setState({ article, loading: true })
    const html = await this.get(article)
    if (this.state.article === article) {
      this.setState({
        html,
        loading: false
      })
    }
  }

  render () {
    return (
      <div className='article-wrapper' style={{
        display: this.props.visible ? 'block' : 'none'
      }}>
        <div
          style={{
            display: this.state.loading ? 'none' : 'block'
          }}
          className='article-html'
          dangerouslySetInnerHTML={{ __html: this.state.html }} />
        <div className='article-loader' style={{
          display: this.state.loading ? 'block' : 'none'
        }} />
      </div>
    )
  }

  load () {
    if (this.props.data && this.props.data !== this.state.article) {
      this.loadArticle(this.props.data)
    }
  }

  componentDidMount () {
    this.load()
  }

  componentDidUpdate () {
    this.load()
  }
}

export default Article
