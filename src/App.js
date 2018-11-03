/* eslint-env browser */
import React from 'react'
import List from './components/List'
import Article from './components/Article'
import './App.css'
import { Router, Route, NavLink } from 'react-router-dom'

function Projects () {
  return <List
    article-handler={article => this.loadArticle(article)}
    data={this.state.list}
    visible={this.state.view === 'list'} />
}

function App () {
  return (
    <Router>
      <div className={`portfolio view-about`}>
        <div className='main-wrapper'>
          <div className='header-wrapper'>
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
              <NavLink
                className='projects'
                to='/'
              ><span className='arrow'>> </span>projects</NavLink>
              <NavLink
                className='blog'
                to='/blog'
              ><span className='arrow'>> </span>blog</NavLink>
              <NavLink
                className='about'
                to='/about'
              ><span className='arrow'>> </span>about me</NavLink>
            </div>
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
    </Router>
  )
}

export default App
