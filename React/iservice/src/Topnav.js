import React, { Component } from 'react'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import { BiGlobeAlt } from 'react-icons/bi'

export default class Topnav extends Component {  //Child Class
  constructor(props) {          // Child Constructor
    super(props)    // call props from Parent
    this.state = {
      
    }
  }
  render() {
    return (
      <div>
        <Navbar fixed="top" bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">
              <BiGlobeAlt className='logo' color={'f46f30'} size={40} className='logo'/>
              <Navbar.Text class='brand'> iService</Navbar.Text>
              {/* <span class='brand'> iService</span> */}
              </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" >
              <Nav className="me-auto ">
                <Nav.Link className='link' href="/newtask">New Task</Nav.Link>
                <Nav.Link className='link' href="#">Find Task</Nav.Link>
                <Nav.Link className='link' href="#">Experts</Nav.Link>
                <Nav.Link className='link' href="#">How it Works</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                  <Nav.Link href="#">Sign In</Nav.Link>
                </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}