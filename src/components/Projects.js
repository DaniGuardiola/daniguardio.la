import React, { Component } from 'react'
import './Projects.css'

const MOCK_ARTICLES = [{
  key: 'bitcoin-lightweight',
  title: 'bitcoin-lightweight: an electrum websocket implementation',
  tags: ['js', 'crypto', 'bitcoin']
}, {
  key: 'lorem-ipsum',
  title: 'lorem ipsum: some example of something blablabla and stuff',
  tags: ['quantum-mechanics', 'somebody']
}, {
  key: 'portal-gun',
  title: 'portal gun: an Arduino™ powered interdimensional transport device',
  tags: ['once', 'told', 'me']
}, {
  key: 'not-a-flamethrower',
  title: 'not-a-flamethrower: definitely not a flamethrower',
  tags: ['fire', 'flames']
}, {
  key: 'electrumjs',
  title: 'electrumjs: electrum websocket and tcp socket client',
  tags: ['js', 'typescript', 'crypto']
}]

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
        {this.createArticles(MOCK_ARTICLES)}
      </div>
    )
  }
}

export default Projects
