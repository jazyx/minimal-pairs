import React, { useContext, useRef, useState } from 'react'
import { AudioContext } from './AudioContext'

import './Activity.css';
import Card from './Card'
import Pocket from './Pocket'

import { getCards } from '../api/pairs'

const REVIEW_DELAY = 2000;

const Activity = (props) => {
  const audio = useContext(AudioContext)
  const cueRef = useRef()
  const decoyRef = useRef()
  const [counter, setCounter] = useState(0)
  let useFirstCard

  const {
    phonemes
  , word1
  , word2
  , played: playedCards
  } = getCards() // imported from pairs.js

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
    useFirstCard = !!Math.floor(Math.random() * 2 )

    let cards
    if (useFirstCard) {
      cards = [ word2, word1 ]
    } else {
      cards = [ word1, word2 ]
    }

    let roles = ["decoy", "cue"].map((role, index) => {
      const card = cards[index]
      const ref = (role === "cue") ? cueRef : decoyRef

      return (
        <Card
          card={card}
          role={role}
          taboo={false}
          refer={ref}
        />
      )
    })

    return roles
  }


  const createPockets = () => {
    // cards, index, phoneme, audio, playAudio
    const pockets = phonemes.map((phonemeData, index) => {
      const { phoneme, url, clip } = phonemeData
      const played = playedCards[phoneme]

      return <Pocket
        phoneme={phoneme}
        index={index}
        url={url}
        clip={clip}
        played={played}
      />
    })

    return pockets
  }


  const showNextCard = () => {
    const cueSpace = cueRef.current
    cueSpace.className = "space"
    setCounter(counter + 1)
  }


  const playRightSequence = (phoneme) => {
    const cueSpace = cueRef.current
    cueSpace.classList.add("correct", phoneme)

    setTimeout(showNextCard, REVIEW_DELAY)
  }


  const showWrong = () => {
    console.log("wrong")
  }


  const checkAnswer = event => {
    const target = event.target
    if (target.className !== "pocket") {
      return
    }

    const phoneme = target.closest("[class|=phoneme").className
    const correct = useFirstCard === (phoneme ==="phoneme-1")
    if (correct) {
      playRightSequence(phoneme)
    } else {
      showWrong()
    }
  }


  const [ decoy, cue ] = createCards()
  const [ pocket1, pocket2 ] = createPockets()
  const { url, clip } = cue.props.card // HACK
  audio.playClip(url, clip) // audio needs document interaction to play


  return (
    <>
      <div
        className="phonemes"
        onClick={checkAnswer}
      >
        {pocket1}
        {pocket2}
        <p className="rule">Tap or drag to here</p>
      </div>

      <div className="pairs">
        {decoy}
        {cue}
      </div>
    </>
  )
}

export default Activity;
