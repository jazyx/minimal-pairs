/**
 * /src/components/Card.jsx
 */


import React, { Component } from 'react';
import styled from 'styled-components'


const StyledCard = styled.div`
  background-color: #fee;
  width: 90vmin;
  height: 90vmin;
  margin: 0 auto;
  border: 1px solid outset;
`


class Card extends Component {
  constructor(props) {
    super(props)

    this.method = this.method.bind(this)
  }


  method() {

  }


  render() {
    return (
      <StyledCard
        
      />
    )
  }
}


export default Card