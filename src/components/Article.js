/* eslint-env browser */
import React, { Component } from 'react'
import marked from 'marked'
import highlightjs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import './Article.css'

marked.setOptions({
  highlight: (code, lang) =>
    highlightjs.highlight(lang, code).value
})

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
    if (cache[article]) console.log('Cache:', article)
    if (cache[article]) return cache[article]
    const request = new Request(`/data-${article}.md`)
    console.log('Requesting:', `/data-${article}.md`)
    const response = await fetch(request)
    const result = marked(await response.text())
    cache[article] = result
    return result
  }

  async loadArticle (article) {
    this.setState({ article, loading: true })
    const html = await this.get(article)
    if (this.props.data === article) {
      this.setState({
        html,
        loading: false
      })
    }
  }

  render () {
    return (
      <div className='article-wrapper' style={{
        display: this.props.visible ? 'initial' : 'none'
      }}>
        <div
          className='article-html'
          dangerouslySetInnerHTML={{ __html: this.state.html }} />
        <div className='article-loader' />
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
