import React from 'react'
import './Loader.css'

// Shamelessly copied and modified from: https://codepen.io/jczimm/pen/vEBpoL
// Thanks user jczimm from codepen!

export default () => (
  <div className='loader-root showbox'>
    <div className='loader'>
      <svg className='circular' viewBox='25 25 50 50'>
        <circle className='path' cx='50' cy='50' r='20' fill='none' strokeWidth='2' strokeMiterlimit='10' />
      </svg>
    </div>
  </div>
)
