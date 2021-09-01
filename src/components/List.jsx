import React, { Component } from 'react'

import './App.css';
import AudioElement from './Audio'

const pairs = require('../json/pairs.json')
const AUDIO_URL = "/pairs.mp3"

class App extends Component{
  constructor(props) {
    super(props)

    const word = ""
    const startTime = 0
    const duration = 1

    this.state = {
      word
    , startTime
    , duration
    }

    this.play = this.play.bind(this)
  }

  play(word) {
    const startTime = pairs[word].timing
    const duration = 1
    // Update the word, just in case its a homophone with a
    // different spelling
    this.setState({ word, startTime, duration })

    // console.log("word:", word, "timing:", startTime)
  }

  getWordList() {
    const words = Object.keys(pairs)
    const items = words.map(word => {
      return (
        <li
          key={word}
          onClick={() => this.play(word)}
        >
          {word}
        </li>
      )
    })

    return (
      <ol className="word-list">{items}</ol>
    )
  }

  getComponent() {
    const wordList = this.getWordList()

    return (
      <div>
        <AudioElement
          {...this.state}
          url={AUDIO_URL}
        />
        {wordList}
      </div>
    )
  }

  render() {
    console.log("rendering")
    return this.getComponent()
  }
}

export default App;


// .App {
//   text-align: center;
// }

// .word-list {
//   font-size: 1.5rem;
// }

// .word-list li:hover {
//   background-color: salmon;;
// }