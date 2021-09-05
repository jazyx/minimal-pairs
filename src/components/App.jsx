import React, { Component } from 'react'

import './App.css';
import AudioElement from './Audio'
import Card from './Card'
import Pocket from './Pocket'

import { getCards } from '../api/pairs.js'
const AUDIO_URL = "/pairs.mp3"

class App extends Component{
  useFirstCard = true

  constructor(props) {
    super(props)
    this.state = getCards()
    // { "phonemes": [
    //     "ɪ",
    //     "iː"
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
    //   }
    // }
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
          taboo={true}
        />
      )
    })

    return roles
  }


  getPockets() {
    // cards, index, phoneme, audio, playAudio
    return [0, 1]
  }


  render() {
    const [ card1, card2 ]  = this.getCards()
    const [ pocket1, pocket2 ] = this.getPockets()

    return <main className="split">
      <div className="phonemes">
        <div className="phoneme-1">
          <ul>
            {/* OLDER CARDS CAN GO HERE */}
            <li>
              <div className="card">
                <img src="img/ɪ/bitch.jpg" alt="bitch" />
                <p className="phonetic">/bɪʧ/</p>
                <p className="spelling">bitch</p>
              </div>
            </li>
          </ul>
          {/* POCKET */}
          <div className="pocket"></div>
          <button className="play-phoneme">ɪ</button>
        </div>
        <div className="phoneme-2">
          <ul>
            {/* OLDER CARDS CAN GO HERE */}
            <li>
              <div className="card">
                <img src="img/i/beach.jpg" alt="beach" />
                <p className="phonetic">/biːʧ/</p>
                <p className="spelling">beach</p>
              </div>
            </li>
          </ul>
          {/* POCKET */}
          <div className="pocket"></div>
          <button className="play-phoneme">iː</button>
        </div>
        <p className="rule">Tap or drag to here</p>
      </div>

      <div className="pairs">
        {card1}
        {card2}
      </div>
    </main>
  }
}

export default App;
