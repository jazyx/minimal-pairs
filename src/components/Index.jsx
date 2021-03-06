/**
 * /src/components/Index.jsx
 */


 
import React, { useContext } from 'react';
import { AudioContext } from '../components/AudioContext'
import {
  pairIndex
, phonemePairs
, getCurrentPair
, setPhonemePair
, getWordData
, getPhonemeData
} from '../api/pairs'

import './Index.css';

// console.log("phonemePairs:", phonemePairs)
// Array [ "ɪi", "ɑʌ" ]


const Index = (props) =>  {
  console.log("props:", props)
  const audio = useContext(AudioContext)

  const current = getCurrentPair()

  const itemClicked = (pair) => {
    setPhonemePair(pair)
    props.startActivity()
  }

  const getPhonemeButton = ({ phoneme, url, clip }) => {
    return (
      <button
        key={phoneme}
        className="phoneme"
        onClick={() => audio.playClip(url, clip)}
      >
        /{phoneme}/
      </button>
    )
  }

  const getWordButton = (wordData, index) => {
    const { spelling: word, url, image, clip } = wordData

    const set = index
              ? <><img src={image} alt="{word}" /><span>{word}</span></>
              : <><span>{word}</span><img src={image} alt="{word}" /></>

    return (
      <button
        key={word}
        className="word"
        onClick={() => audio.playClip(url, clip)}
      >
        {set}
      </button>
    )
  }

  const getProgress = (pair) => {
    return (
      <div
        className="progress"
      >
        <div
          style={{width:"50%"}}
        />
      </div>
    )
  }

  const getSelectButton = (pair) => {
    return (
      <button
        key="select"
        className="select"
        onClick={() => itemClicked(pair)}
      >
        ➤
      </button>
    )
  }

  const pairsArray = phonemePairs.map( pair => {
    // pair = "ɪi"
    const pairData = pairIndex[pair]
    const className = (pair === current)
                    ? "current"
                    : ""

    // { phonemes: ["ɪ", "iː"]
    // , words: ["ship", "sheep"]
    // ... }
    const phonemes = pairData.phonemes
    const words = pairData.words
    const phonemeButtons = []
    const wordButtons = []
    let progress
      , select

    phonemes.forEach((phoneme, index) => {
      const phonemeData = getPhonemeData(phoneme)
      //                  wordSets[phoneme]
      // { "url": "i.mp3"
      // , "iː": {
      //     "clip": [0.0, 0.85]
      //   }
      // , ...
      // , "sheep": {...}
      // }
      // const url = phonemeData.url
      // const clip = phonemeData[phoneme].clip
      const word = words[index]
      const wordData = getWordData(phoneme, word)
      //                phonemeData[word]
      // { "spelling": "sheep"
      // , "phonetic": "/∫iːp/"
      // , "image": "img/i/sheep.jpg"
      // , "clip": [6.15, 7.30]
      // , "url": "audio/i/mp3"
      // }
      phonemeButtons.push(getPhonemeButton(phonemeData))
      wordButtons.push(getWordButton(wordData, index))
      progress = getProgress(pair)
      select = getSelectButton(pair)
    })

    const entry = [...phonemeButtons, ...wordButtons, progress, select]
    
    return (
      <li
        key={pair}
        className={className}
      >
        {entry}
      </li>
    )
  })
  

  return (
    <ul
      id="index"
    >
      {pairsArray}
    </ul>
  )
}


export default Index