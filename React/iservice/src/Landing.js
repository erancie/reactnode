import React, { Component } from 'react'
import './landing.css'
import Topnav from './Topnav'
import Featuredexperts from './Featuredexperts'
import Footer from './Footer'


class Landing extends Component {
  render() {
    return (
      <div style={{position: 'relative'}}>
        <Topnav />

        <div className='hero'>
          <h1>iService</h1>
        </div>

        <Featuredexperts />

        <Footer />
      </div>
    )
  }
}

export default Landing
