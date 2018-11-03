/* eslint-env browser */
import React from 'react'
import './App.css'
import { BrowserRouter as Router, NavLink } from 'react-router-dom'
import Content from './components/Content'

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
                activeClassName='on'
                isActive={(match, { pathname }) => {
                  return pathname === '/' || pathname.startsWith('/projects')
                }}
                exact
              ><span className='arrow'>> </span>projects</NavLink>
              <NavLink
                className='blog'
                to='/blog'
                activeClassName='on'
              ><span className='arrow'>> </span>blog</NavLink>
              <NavLink
                className='about'
                to='/about'
                activeClassName='on'
                exact
              ><span className='arrow'>> </span>about me</NavLink>
            </div>
          </div>
          <Content />
        </div>
      </div>
    </Router>
  )
}

export default App
