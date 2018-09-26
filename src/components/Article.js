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
    if (cache[article]) {
      return {
        article,
        result: cache[article]
      }
    }
    const request = new Request(article)
    const result = await fetch(request)
    cache[article] = result
    return {
      article,
      result
    }
  }

  async loadArticle (article) {
    this.setState({ article, loading: true })
    const content = await this.get(article)
    if (this.props.article === article) {
      this.setState({
        html: marked(content),
        loading: false
      })
    }
  }

  render () {
    if (this.props.article && this.props.article !== this.state.article) {
      this.loadArticle(this.props.article)
    }
    return (
      <div className='article-wrapper' style={{
        display: this.props.visible ? 'initial' : 'none'
      }}>
        <div className='article-html'>{this.state.html}</div>
        <div className='article-loader' />
      </div>
    )
  }
}

export default Article
