import React, { Component } from 'react'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='portfolio'>
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
            <span className='comment'>// </span>
            <span className='projects on'> <span className='arrow'>> </span>projects</span>
            <span className='blog'> <span className='arrow'>> </span>blog</span>
            <span className='other'> <span className='arrow'>> </span>other stuff</span>
          </div>
        </div>
      </div>
    )
  }
}

export default App
