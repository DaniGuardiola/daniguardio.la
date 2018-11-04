import React from 'react'
import './List.css'
import DATA from '../data/articles.json'

const Item = props => {
  return (
    <div className='item' id={props.id}>
      <div className='headline'>
        <span
          className='text'
          onClick={props.onClick}
        >{props.name}</span>
        <span className='tags'>
          {props.tags.map(tag => <span key={tag}>#{tag}</span>)}
        </span>
      </div>
    </div>
  )
}

function List (props) {
  const { history, articlePrefix, type } = props
  const itemsData = type === 'blog'
    ? DATA.posts
    : DATA.projects
  const itemOnClick = id => history.push(`/${articlePrefix}/${id}`)
  const items = itemsData
    .filter(item => !item.draft || window.DRAFTS_VISIBLE)
    .map(article => <Item key={article.id} {...{ ...article, onClick: () => itemOnClick(article.id) }} />)
  return (
    <div className='list-content'>
      {items}
    </div>
  )
}

export default List
