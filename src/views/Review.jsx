/**
 * src/views/Review.jsx
 */


import React, {
  useContext,
  useState,
  useRef,
  useEffect
} from "react";
import {
  PreferencesContext,
  PairsContext,
  AudioContext
} from "../contexts";
import "./Review.css";


const Review = () => {
  const { taboo, friendly } = useContext(PreferencesContext)
  const { playClip, loadPhoneme } = useContext(AudioContext);
  const {
    wordsData,      // { <phoneme>: { url,
    //                     <phoneme>: { clip },
    //                     <word>: { ... },
    //                     ...
    //                   },
    //                   ...
    //                 }
    phonemeKeys,    // [ "ɪ", "i", ... ] <<< no "ː" characters
    phonemeSymbols  // [ "ɪ", "iː" ] <<< current pair
  } = useContext(PairsContext);
  const ulRef = useRef()

  const [ phoneme, setPhoneme ] = useState(phonemeSymbols[0]);
  const [ phonemeWords, setPhonemeWords ] = useState([])
  const [ word, setWord ] = useState(""); // "and"
  
  // Prepare options for Phonemes select element
  const files = phonemeKeys.map( value => {
    const className = (value === phoneme) ? "selected" : null
    return (
      <button
        key={value}
        data-word={value}
        className={className}
      >
        {value}
      </button>
    );
  });


  function createPhonemeData() {
    // Create list of words and their timing data
    const phonemeWords = Object.values(wordsData[phoneme])
      .filter( data => data.spelling ) // not "url" or <phoneme>
      .map( data => {
        const { spelling, image, image$, image_ } = data
        const className = spelling === word ? "selected" : null
        const src = (taboo && image_)
                 || (!friendly && image$)
                 || image

        if (!src) {
          // eslint-disable-next-line
          return
        }

        return (
          <li
            key={spelling}
            className={className}
          >
            <img src={src} alt={spelling} />
            <span className="spelling">{spelling}</span>
          </li>
        )
      }).filter( item => !!item )

    setPhonemeWords(phonemeWords)
  }


  const selectPhoneme = ({ target }) => {
    setPhoneme(target.textContent)
    showSelected(target)
  }


  const selectWord = ({ target }, dontPlay) => {
    if (!target) { return }

    while (target && target.tagName !== "LI") {
      target = target.parentNode
    }

    if (!target) { return }

    showSelected(target)

    const spelling = target.textContent.toLowerCase()
    setWord(spelling)

    if (!dontPlay){
      // playWord(data)
      playWord(spelling)
    }
  }


  const showSelected = (target) => {
    const selected = target.parentNode.querySelector(".selected")
    if (selected && selected !== target) {
      selected.classList.remove("selected")
    }

    target.classList.add("selected")
  }


  const playWord = (spelling) => {
    const data = wordsData[phoneme][spelling]
    playClip(data)
  }


  // eslint-disable-next-line
  useEffect(
    () => loadPhoneme(phoneme, createPhonemeData),
    // eslint-disable-next-line
    [phoneme]
  )


  return (
    <div id="review">
      <div
        id="files"
        onClick={selectPhoneme}
      >
        {files}
      </div>

      <ul
        onClick={selectWord}
        ref={ulRef}
      >
        {phonemeWords}
      </ul>
    </div>
  );
};

export default Review;
