/**
 * /src/components/Index.jsx
 */


import React, { Component } from 'react';
import { phonemePairs, setPhonemePair } from '../api/pairs'


class Index extends Component {
  constructor(props) {
    super(props)

    this.itemClicked = this.itemClicked.bind(this)
  }


  getList() {
    const items = phonemePairs.map( pair => {
      return (
        <li
          key={pair}
          onClick={() => this.itemClicked(pair)}
        >
          {pair}
        </li>
      )
    })

    return (
      <ul
        id="index"
      >
        {items}
      </ul>
    )
  }


  itemClicked(pair) {
    setPhonemePair(pair)
    this.props.startActivity()
  }


  render() {
    const List = this.getList()
    return List
  }
}


export default Index