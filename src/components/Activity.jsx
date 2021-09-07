import React, { useContext } from 'react'
import { AudioContext } from './AudioContext'

import './Activity.css';
import Card from './Card'
import Pocket from './Pocket'

import { getCards } from '../api/pairs'

const Activity = (props) => {  
  const audio = useContext(AudioContext)

  const {
    phonemes
  , word1
  , word2
  , played: playedCards
  } = getCards() // imported from pairs.js

    // console.log("state:", state)
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

  const createCards = () => {
    const useFirstCard = Math.floor(Math.random() * 2 )

    let cards
    if (useFirstCard) {
      cards = [ word1, word2 ]
    } else {
      cards = [ word2, word1 ]
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

  const createPockets = () => {
    // cards, index, phoneme, audio, playAudio
    const pockets = phonemes.map((phonemeData, index) => {
      const { phoneme, clip } = phonemeData
      const played = playedCards[phoneme]

      return <Pocket
        phoneme={phoneme}
        index={index}
        clip={clip}
        played={played}
      />
    })

    return pockets
  }

  const [ card1, card2 ] = createCards()
  const [ pocket1, pocket2 ] = createPockets()
  const clip = card1.props.card.clip // HACK
  audio.playClip(clip) // audio won't play if no click

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

export default Activity;
