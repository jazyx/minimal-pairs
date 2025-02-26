/**
 * src/views/Review.jsx
 */


import React, { useContext, useState, useEffect } from 'react'
import { PairsContext, AudioContext } from '../contexts/'
import './Review.css'


const Review = (props) => {
  const { pairs } = useContext(PairsContext)
  const { playClip } = useContext(AudioContext)

  const [ phoneme, setPhoneme ] = useState("") // "æ"
  const [ words, setWords ] = useState([])     // [ "and", ...]
  const [ url, setUrl ] = useState("")         // "æ.mp3"
  const [ word, setWord ] = useState("")       // "and"
  const [ wordsData, setWordsData ] = useState(pairs.words)
  const [ testClip, setTestClip ] = useState([0, 1.5])
  const [ cantPlay, setCantPlay ] = useState(false)

  
  
  
  const [ wordData, setWordData ] = useState({})
  

  const phonemes = Object.keys(wordsData)
  console.log("cantPlay:", cantPlay)


  // console.log("wordsData:", wordsData)


  const choosePhoneme = ({ target }) => {
    const phoneme = target.id
                 || target.closest("[for]").getAttribute("for")
    setPhoneme(phoneme)

    const words = Object.keys(wordsData[phoneme])

    let index = words.indexOf(phoneme)
    words.splice(index, 1)
    index = words.indexOf("url")
    words.splice(index, 1)
    index = words.indexOf("url_")
    words.splice(index, 1)

    const url = wordsData[phoneme].url || `URL MISSING FOR ${phoneme}`
    setUrl(url)

    setWords(words)

    if (words.indexOf(word) < 0) {
      // console.log("word:", word, words[0], phoneme)
      chooseWord({ target: { id: words[0] } }, phoneme, url)
    }
  }


  const chooseWord = ({ target }, sound, audioFile) => {
    const word = target.id
              || target.closest("[for]").getAttribute("for")

    // console.log("WORD:", word, sound)
    setWord(word)

    const wordData = wordsData[sound || phoneme][word]
    setWordData(wordData)
    // console.log("wordData:", wordData)

    playClip(audioFile || url, wordData.clip)
  }


  function updateClip({ target }) {
    const { value } = target

    try {
      const check = JSON.parse(target.value)
      const [ start, end ] = check
      console.log(" value:",  value)

      if (!isNaN(start) && !isNaN(end)) {
        setTestClip(check)
        return setCantPlay(false)
      }

    } catch {}

    setTestClip(value)
    setCantPlay(true)
  }


  useEffect(() => {
    choosePhoneme({ target: {id: phonemes[0]}})
  }, [])


  const phonemeList = phonemes.map( value => {
    return (
      <li
        key={value}
      >
        <label htmlFor={value}>
          <input
            type="radio"
            name="phoneme"
            id={value}
            checked={value === phoneme}
            onChange={choosePhoneme}
          />
          <span>{value}</span>
        </label>
      </li>
    )
  })

  const wordList = words.map( value => {

    return (
      <li
        key={value}
      >
        <label htmlFor={value}>
          <input
            type="radio"
            name="word"
            id={value}
            checked={value === word}
            onChange={chooseWord}
          />
          <span>{value}</span>
        </label>
      </li>
    )
  })

  const { spelling, image, clip } = wordData


  return (
    <div id="review">
      <p>{url}</p>
      <ul className="phonemes">
        {phonemeList}
      </ul>
      <ul className="words">
        {wordList}
      </ul>

      <div className="card">
        <img src={image} alt={word} />
        <p>{spelling}</p>
        <p
          onClick={() => document.getElementById("clip").value = `${JSON.stringify(clip)}`}
        >
          {JSON.stringify(clip)}
        </p>
        
        <input
          type="text"
          name="clip"
          id="clip"
          value={JSON.stringify(testClip)}
          onChange={updateClip}
        />
        <button
          type="button"
          disabled={cantPlay}
          onClick={() => playClip(url, testClip)}
        >
          Play Clip
        </button>
      </div>
    </div>
  )
}


export default Review