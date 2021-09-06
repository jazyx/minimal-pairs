/**
 * /src/components/Index.jsx
 */


import React, { Component } from 'react';


class Index extends Component {
  constructor(props) {
    super(props)

    this.method = this.method.bind(this)
  }


  method() {

  }


  render() {
    return (
      <h1>Index page goes here</h1>
    )
  }
}


export default Index