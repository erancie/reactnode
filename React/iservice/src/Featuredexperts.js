import React, { Component } from 'react'
import {Row, Container, Col, Card, Button} from 'react-bootstrap'

import expertList from './expertList'

export default class Featuredexperts extends Component {
  constructor() {
    super(...arguments);
    
    this.experts = expertList;
  }


  LoopExpertCards = () => {
    let cards =[];
    for (const key in this.experts) {
      cards.push(
          <Col key={key.toString()} xs='12' md='6' lg='4' xl='3'>
            <Card  style={{ width: '18rem', margin: 'auto'}}>
              <Card.Img variant="top" src={this.experts[key].image} />
              <Card.Body>
                <Card.Title>{this.experts[key].name}</Card.Title>
                <Card.Text>{this.experts[key].text}</Card.Text>
                <Card.Text>Rating - {this.experts[key].rating}/5</Card.Text>
                <Button className='button' variant="primary">Contact {this.experts[key].name}</Button>
              </Card.Body>
            </Card>
          </Col>
      )
    }
    return cards;
  }

  MapExpertCards = () =>{
    const cards = this.experts.map((expert)=>{ //replace with () for implicit return
      return( // or explicit 'return' required for .map() 
        <Col key={expert.key.toString()} xs='12' md='6' lg='4' xl='3'>
          <Card  style={{ width: '18rem', margin: 'auto'}}>
            <Card.Img variant="top" src={expert.image} />
            <Card.Body>
              <Card.Title>{expert.name}</Card.Title>
              <Card.Text>{expert.text}</Card.Text>
              <Card.Text>Rating - {expert.rating}/5</Card.Text>
              <Button className='button' variant="primary">Contact {expert.name}</Button>
            </Card.Body>
          </Card>
        </Col>   
      ) 
    })
    return cards
  }

  render() {
    return (
      <div className='experts'>
        <Container fluid>
          <h1 style={{padding: '3rem'}}>Featured Experts</h1>
          <Row className="row">
            {this.LoopExpertCards()}
            {this.MapExpertCards()}
          </Row>
        </Container>
      </div>
    )
  }
}