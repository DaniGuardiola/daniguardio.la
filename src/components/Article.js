/* eslint-env browser */
import React, { Component } from 'react'
import marked from 'marked'
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
    console.log(article)
    const request = new Request(`/data-${article}.md`)
    const response = await fetch(request)
    const result = await response.text()
    cache[article] = result
    return result
  }

  async loadArticle (article) {
    console.log('loading article', article)
    this.setState({ article, loading: true })
    const content = await this.get(article)
    if (this.props.data === article) {
      this.setState({
        html: marked(content),
        loading: false
      })
    }
  }

  render () {
    console.log(this.state)
    if (this.props.data && this.props.data !== this.state.article) {
      this.loadArticle(this.props.data)
    }
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
}

export default Article
