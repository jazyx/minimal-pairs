/**
 * /src/components/Select.jsx
 */


 
import React, {
  useContext,
  useEffect,
  useState
} from 'react';
import {
  PairsContext,
  AudioContext
} from '../contexts'

import './Select.css';


const Select = ({ startActivity }) =>  {
  const { playClip, loadPhoneme } = useContext(AudioContext)
  const {
    pairIndex
  , pair
  , phonemePairs
  , setPhonemePair
  , getWordData
  , getPhonemeData
  , phonemeKeys
  } = useContext(PairsContext)

  // Clone phonemeKeys, so loading can be updated separately
  const [ loading, setLoading ] = useState([ ...phonemeKeys ])


  const itemClicked = (pair) => {
    setPhonemePair(pair)
    startActivity("Loading")
  }


  const getPhonemeButton = (phonemeData) => {
    const { phoneme } = phonemeData
    const disabled = (loading.indexOf(phoneme) + 1)
    return (
      <button
        key={phoneme}
        className={`phoneme ${phoneme}`}
        onClick={() => playClip(phonemeData)}
        disabled={disabled}
      >
        /{phoneme}/
      </button>
    )
  }


  const getWordButton = (wordData, index, phoneme) => {
    const { spelling: word, image } = wordData
    const disabled = (loading.indexOf(phoneme) + 1)

    const set = index
              ? <><img src={image} alt="{word}" /><span>{word}</span></>
              : <><span>{word}</span><img src={image} alt="{word}" /></>

    return (
      <button
        key={word}
        className={`word ${phoneme}`}
        onClick={() => playClip(wordData)}
        disabled={disabled}
      >
        {set}
      </button>
    )
  }


  const getProgress = (pair) => {
    return (
      <div
        key="progress"
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


  const pairsArray = phonemePairs.map( item => {
    // item = "ɪi"
    const pairData = pairIndex[item]
    // { phonemes: ["ɪ", "iː"]
    // , words: ["ship", "sheep"]
    // ... }
    const phonemes = pairData.phonemes
    const words = pairData.words
    const className = (item === pair)
                    ? "current"
                    : ""
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
      wordButtons.push(getWordButton(wordData, index, phoneme))
      progress = getProgress(item)
      select = getSelectButton(item)
    })


    const entry = [
      ...phonemeButtons,
      ...wordButtons,
      progress,
      select
    ]
    

    return (
      <li
        key={item}
        className={className}
      >
        {entry}
      </li>
    )
  })


  const phonemeLoaded = phoneme => {
    const index = loading.indexOf(phoneme)
    loading.splice(index, 1)
    setLoading([ ...loading ])
  }


  const loadAllPhonemes = () => {
    phonemeKeys.forEach( key => loadPhoneme( key, phonemeLoaded))
  }


  // eslint-disable-next-line
  useEffect(loadAllPhonemes, [])
  

  return (
    <ul
      id="index"
    >
      {pairsArray}
    </ul>
  )
}


export default Select