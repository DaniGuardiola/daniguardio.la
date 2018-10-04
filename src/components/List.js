import React, { Component } from 'react'
import './List.css'
import PROJECTS_DATA from '../data/projects'
import BLOG_DATA from '../data/blog'

class List extends Component {
  createItem (data) {
    return <div className='item' key={data.key}>
      <div className='headline'>
        <span
          className='text'
          onClick={() => this.props['article-handler'](data.key)}
        >{data.title}</span>
        <span className='tags'>
          {data.tags.map(tag => <span key={tag}>#{tag}</span>)}
        </span>
      </div>
    </div>
  }

  createItems (data) {
    const articles = []
    data
      .filter(item => !item.draft || window.DRAFTS_VISIBLE)
      .map(article => articles.push(this.createItem(article)))
    return articles
  }

  render () {
    const data = this.props.data === 'blog'
      ? BLOG_DATA
      : PROJECTS_DATA
    return (
      <div className='list-content' style={{
        display: this.props.visible ? 'block' : 'none'
      }}>
        {this.createItems(data)}
      </div>
    )
  }
}

export default List
