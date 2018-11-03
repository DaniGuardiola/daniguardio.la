import React, { Component } from 'react'
import './List.css'
import DATA from '../data/articles.json'

class List extends Component {
  createItem (data) {
    const { history, articlePrefix } = this.props
    return <div className='item' key={data.key}>
      <div className='headline'>
        <span
          className='text'
          onClick={() => history.push(`/${articlePrefix}/${data.key}`)}
        >{data.name}</span>
        <span className='tags'>
          {data.tags.map(tag => <span key={tag}>#{tag}</span>)}
        </span>
      </div>
    </div>
  }

  createItems (items) {
    return items
      .filter(item => !item.draft || window.DRAFTS_VISIBLE)
      .map(article => this.createItem(article))
  }

  render () {
    console.log(this.props.type)
    const type = this.props.type === 'blog'
      ? DATA.posts
      : DATA.projects
    console.log(type)
    return (
      <div className='list-content'>
        {this.createItems(type)}
      </div>
    )
  }
}

export default List
