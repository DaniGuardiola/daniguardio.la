import './Header.css'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => (
  <div className='header-wrapper'>
    <header className='main-header'>
      <span>Dani Guardiola</span>
      <div className='contact-links'>
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
)

export default Header
