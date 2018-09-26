/* eslint-env browser */
import React, { Component } from 'react'
import List from './components/List'
import Article from './components/Article'
import './App.css'

class App extends Component {
  constructor () {
    super()

    const routeData = this.getRouteData()

    this.state = routeData.state

    window.addEventListener('popstate', () => this.handleHistoryChange())
    document.title = routeData.title
  }

  getRouteData (pathname = window.location.pathname) {
    let state
    let title
    let sanePath
    const path = pathname.startsWith('/')
      ? pathname.substring(1)
      : pathname
    switch (path) {
      case '':
      case 'projects':
      case 'projects/':
        state = {
          view: 'list',
          list: 'projects',
          section: 'projects',
          article: ''
        }
        title = 'Dani Guardiola - projects'
        sanePath = '/projects'
        break
      case 'blog':
      case 'blog/':
        state = {
          view: 'list',
          list: 'blog',
          section: 'blog',
          article: ''
        }
        title = 'Dani Guardiola - blog'
        sanePath = '/blog'
        break
      case 'about':
      case 'about/':
        state = {
          view: 'article',
          list: 'projects',
          section: 'about',
          article: 'about-me'
        }
        title = 'Dani Guardiola - about me'
        sanePath = '/about'
        break
      default:
        const parts = path.split('/')
        const first = parts[0]
        if (first === 'project' || first === 'b') {
          const second = parts[1]
          const section = first === 'project' ? 'projects' : 'blog'
          state = {
            view: 'article',
            list: section,
            section,
            article: path
          }
          title = `Dani Guardiola - ${second}`
          sanePath = `/${first}/${second}`
        } else {
          state = {
            view: 'article',
            list: 'projects',
            section: 'none',
            article: '404'
          }
          title = 'Dani Guardiola - 404'
          sanePath = '/404'
        }
    }
    return { state, title, sanePath }
  }

  loadRoute (path, noPushState) {
    const { state, title, sanePath } = this.getRouteData(path)
    this.setState(state)
    if (!noPushState) window.history.pushState(state, title, sanePath)
    document.title = title
  }

  handleHistoryChange (event) {
    this.loadRoute(undefined, true)
  }

  loadArticle (article) {
    this.loadRoute(article)
  }

  loadSection (section) {
    if (this.state.section === section && this.state.view !== 'article') return
    this.loadRoute(section)
  }

  render () {
    const viewClass = this.state.section === 'about'
      ? 'about'
      : this.state.view
    return (
      <div className={`portfolio view-${viewClass}`}>
        <div className='main-wrapper'>
          <header className='main-header'>
            <span>Dani Guardiola</span>
            <div className='options'>
              <a className='github' href='https://github.com/DaniGuardiola'>github</a>
              <a className='twitter' href='https://twitter.com/DaniMGuardiola'>twitter</a>
              <a className='email' href='mailto:contact@daniguardiola.me'>email</a>
            </div>
          </header>
          <div className='subheader'>
            <span className='comment'>{'// '}</span>
            <span
              className={`projects${this.state.section === 'projects' ? ' on' : ''}`}
              onClick={() => this.loadSection('projects')}
            ><span className='arrow'>> </span>projects</span>
            <span
              className={`blog${this.state.section === 'blog' ? ' on' : ''}`}
              onClick={() => this.loadSection('blog')}
            ><span className='arrow'>> </span>blog</span>
            <span
              className={`about${this.state.section === 'about' ? ' on' : ''}`}
              onClick={() => this.loadSection('about')}
            ><span className='arrow'>> </span>about me</span>
          </div>
          <div className='content'>
            <List
              article-handler={article => this.loadArticle(article)}
              data={this.state.list}
              visible={this.state.view === 'list'} />
            <Article
              data={this.state.article}
              visible={this.state.view === 'article'} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
