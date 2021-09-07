import React, { Component } from 'react'

import './Activity.css';
import AudioElement from './Audio'
import Card from './Card'
import Pocket from './Pocket'

import { getCards } from '../api/pairs'
const AUDIO_URL = "/pairs.mp3"

class App extends Component{
  useFirstCard = true

  constructor(props) {
    super(props)

    this.playAudio = this.playAudio.bind(this)
    this.state = getCards() // imported from pairs.js

    // console.log("this.state:", this.state)
    // { "phonemes": [
    //     { phoneme: "ɪ", audio: [0, 1]
    //   , { phoneme: "iː", audio: [10, 11]
    //   ],
    //   "word1": {
    //     "spelling": "ship",
    //     "phonetic": "/∫ɪp/",
    //     "image": "img/ship.jpg",
    //     "audio": [
    //       0,
    //       1
    //     ]
    //   },
    //   "word2": {
    //     "spelling": "sheep",
    //     "phonetic": "/∫iːp/",
    //     "image": "img/sheep.jpg",
    //     "audio": [
    //       0,
    //       1
    //     ]
    //   },
    //   "played" {
    //     "ɪ": [<card>, ...],
    //     "iː": [<card>, ...]
    //   }
    // }
  }

  playAudio(audio) {
    console.log("playAudio:", audio)
  }

  getCards() {
    const useFirstCard = Math.floor(Math.random() * 2 )

    let cards
    if (useFirstCard) {
      cards = [ this.state.word1, this.state.word2 ]
    } else {
      cards = [ this.state.word2, this.state.word1 ]
    }

    let roles = ["decoy", "cue"].map((role, index) => {
      const card = cards[index]

      return (
        <Card 
          card={card}
          role={role}
          taboo={false}
        />
      )
    })

    return roles
  }


  getPockets() {
    // cards, index, phoneme, audio, playAudio
    const pockets = this.state.phonemes.map((phonemeData, index) => {
      const { phoneme, audio } = phonemeData
      const played = this.state.played[phoneme]
      const playAudio = this.playAudio

      return <Pocket
        phoneme={phoneme}
        index={index}
        audio={audio}
        playAudio={this.playAudio}
        played={played}
      />
    })

    return pockets
  }


  render() {
    const [ card1, card2 ]  = this.getCards()
    const [ pocket1, pocket2 ] = this.getPockets()

    return (
      <>
        <div className="phonemes">
          {pocket1}
          {pocket2}
          <p className="rule">Tap or drag to here</p>
        </div>

        <div className="pairs">
          {card1}
          {card2}
        </div>
      </>
    )
  }
}

export default App;
