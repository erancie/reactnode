import React, { Component } from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import Topnav from './Topnav'

export default class Newtask extends Component {
  constructor(props) {
    super(props)
    this.state = {
       isOnlineTask: null
    }
  }
  handleChange = (e) => {
    let value = e.target.value;
    if (value === 'inperson') {
      this.setState({ isOnlineTask: false })
    } else if (value === 'online'){
      this.setState({isOnlineTask: true})
    }
  }
  suburbInput = () => {
      return(
        <Form.Group as={Row} className="mb-3" controlId="suburb">
        <Form.Label className="my-3" column sm="2">Suburb</Form.Label>
        <Col sm='6'>
          <Form.Control type='text' name='suburb' placeholder="Enter suburb" className="my-3"/>
        </Col>
        </Form.Group>
      ) 
  }
  title =()=>{
    if(this.state.isOnlineTask === true){
      return ' - Online'
    }else if (this.state.isOnlineTask === false) {
      return ' - In Person'
    }
  }
  render() {
    const buttonStyle = {
      position: 'relative', 
      left: '25%', 
      width: '50%', 
      margin: '30px', 
      marginBottom: '60px',
      fontWeight: '500',
      fontSize: '1.5em',
      borderRadius: '25px'
    }
    const before = {
      height: '3rem',
      lineHeight: '10rem',
    }
    const dollar = {
      fontSize: '1.8em',
      paddingRight: '10px'
    }
    
    return (
      <div>
        <Topnav />
        <Container style={{marginTop: '150px'}}>
          <h1>New Task <span style={{color: 'grey'}}>{this.title()}</span></h1>

          <Form action="/" method="POST" style={{textAlign: 'left'}}>

            <h3 className="mt-5 mb-3">Select task type</h3>
            <Form.Group as={Row} className="mb-3" controlId="tasktype" required>
              <Col sm='4'><Form.Check name="type" label="Online" value='online' onChange={this.handleChange} className="mt-3 mb-3" type="radio" id="online" required /></Col>
              <Col sm='8'><Form.Check name="type" label="In Person" value='inperson' onChange={this.handleChange} className="mt-3 mb-3" type="radio" id="inperson" /></Col>
            </Form.Group>

            <h3 className="mt-5 mb-3">Describe your task</h3>
            <Form.Group as={Row} className="mb-3" controlId="title">
              <Form.Label column sm="2" className="my-3">Task title: </Form.Label>
              <Col sm='6'>
                <Form.Control type='text' name='name' placeholder="Enter a task title" className="my-3"/>
              </Col>

            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="description">
              <Form.Label className="my-3" column sm="2">Description: </Form.Label>
              <Col sm='10'>
                <Form.Control as="textarea" name='description' placeholder="Enter description" style={{ height: '100px' }} className="my-3"/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="image" className="mb-3">
              <Col sm='3'><Form.Label>Add a task image:</Form.Label></Col>
              <Col sm='5'><Form.Control name='image' type="file" className="pb-3" style={{height: '2.8em'}}  /></Col>
            </Form.Group>

            <h3 className="mt-5 mb-3">Setting up your task </h3>

            {this.state.isOnlineTask === false ? this.suburbInput() : null }

            <Form.Group as={Row} className="mb-3" controlId="date">
              <Form.Label className="my-3" column sm="2">Date: </Form.Label>
              <Col sm='6' >
                <Form.Control type='date' name='date' placeholder="Enter date" className="my-3" />
              </Col>
            </Form.Group>

            <h3 className="mt-5 mb-3">Suggest your estimated budget amount</h3>
            <Form.Group as={Row} className="mb-3" controlId="budgetamount">
              <Col sm='3'><Form.Check className="mt-3 mb-5" inline label="Total" value='total' name="budget" type="radio" id="total" /></Col>
              <Col sm='9'><Form.Check className="mt-3 mb-5" inline label="Hourly Rate" value='hourly' name="budget" type="radio" id="hourly" /></Col>
              <Form.Label column sm="3">Budget amount: </Form.Label>
              <Col sm='4' className='d-flex' >
                <span style={dollar}>$</span>
                <Form.Control type='number' style={before} name='amount' placeholder="Enter amount" />
              </Col>
            </Form.Group>

            <Button variant="primary" 
                    style={buttonStyle} 
                    type="submit"> POST TASK </Button>
          </Form>
        </Container >
      </div>
    )
  }
}

    // TO FIX - how to include pseudo selector in JSX style object?

    // 'input::webkit-outer-spin-button, input::webkit-inner-spin-button' : { //TO FIX
    //   appearance: 'none',
    //   margin: '0'
    // }

    // const before = { 
    //   position: 'relative',
    //   paddingLeft: '15px',
    //   "&::before": {
    //     position: 'absolute',
    //     content:`$`,
    //     padding: '0 5px',
    //     textAlign: 'center'
    //   }
    // }