import React, { Component } from 'react'
import './Projects.css'
import ARTICLES_DATA from '../data/projects'

class Projects extends Component {
  createArticle (data) {
    return <article key={data.key}>
      <div className='headline'>
        <span className='text'>{data.title}</span>
        <span className='tags'>
          {data.tags.map(tag => <span key={tag}>#{tag}</span>)}
        </span>
      </div>
    </article>
  }

  createArticles (data) {
    const articles = []
    data.map(article => articles.push(this.createArticle(article)))
    return articles
  }

  render () {
    return (
      <div className='projects-content'>
        {this.createArticles(ARTICLES_DATA)}
      </div>
    )
  }
}

export default Projects
