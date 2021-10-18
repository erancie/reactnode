import React, { Component } from 'react'
import { CgInstagram } from 'react-icons/cg'
import { AiOutlineFacebook } from 'react-icons/ai'
import { FiTwitter } from 'react-icons/fi'
import {Button} from 'react-bootstrap'


export default class Footer extends Component {
  render() {
    return (
      <div className='footer'>

        <div className='subscribe'>
          <form action="/" method="POST" >
            <label for='subemail'>Subscribe: </label>
            <input type='text' name='subemail' id='subemail' placeholder='Email'></input> 
            <button type='submit'> Hit it! </button>
          </form>
        </div>

        <div className='social'>
        
          <div>
            <span>Connect:</span> 
            <a href='/'><AiOutlineFacebook color={'#3b5998'} size={35}/></a> 
            <a href='/'><FiTwitter color={'00ACEE'} size={35}/></a>
            <a href='/'><CgInstagram color={'c32aac'} size={35}/></a>
          </div>

        </div>

      </div>
    )
  }
}
