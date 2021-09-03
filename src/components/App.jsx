import React, { Component } from 'react'

import './App.css';
import AudioElement from './Audio'
import Card from './Card'

const pairs = require('../json/pairs.json')
const AUDIO_URL = "/pairs.mp3"

class App extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    return <main className="split">
      <div className="phonemes">
        <div className="phoneme-1">
          <div className="card-small">
            <img src="/img/ɪ/bitch.jpg" alt="bitch" />
            <p className="phonetic">/bɪʧ/</p>
            <p className="spelling">bitch</p>
          </div>
          <div className="pocket"></div>
          <button className="play-phoneme">ɪ</button>
        </div>
        <div className="phoneme-2">
          <div className="card-small">
            <img src="/img/i/beach.jpg" alt="beach" />
            <p className="phonetic">/biːʧ/</p>
            <p className="spelling">beach</p>
          </div>
          <div className="pocket"></div>
          <button className="play-phoneme">iː</button>
        </div>
        <p className="rule">Tap or drag to here</p>
      </div>

      <div className="pairs">
        <div className="card-decoy">
            <img className="icon" src="/img/icons/sound.svg" alt="icon" />
            <img className="illustration" src="/img/i/cheek.jpg" alt="cheek" />
          <p className="phonetic">/ʧɪk/</p>
          <p className="spelling">cheek</p>
        </div>   
        <div className="card-cue">
            <img className="icon" src="/img/icons/sound.svg" alt="icon" />
            <img className="illustration" src="/img/ɪ/chick.jpg" alt="chick" />
          <p className="phonetic">/ʧɪk/</p>
          <p className="spelling">chick</p>
        </div> 
      </div>
    </main>
  }
}

export default App;
