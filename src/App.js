/* eslint-env browser */
import './App.css'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Content from './components/Content'
import Header from './components/Header'

const App = () => (
  <Router>
    <div className={`portfolio`}>
      <div className='main-wrapper'>
        <Header />
        <Content />
      </div>
    </div>
  </Router>
)

export default App
