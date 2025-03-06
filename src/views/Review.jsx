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
  const { pairs } = useContext(PairsContext);
  const ulRef = useRef()

  const phonemes = Object.keys(pairs.words);
  const [ phoneme, setPhoneme ] = useState(phonemes[0]); // "æ"
  const [ phonemeData, setPhonemeData ] = useState([])
  const [ word, setWord ] = useState(""); // "and"
  
  // Prepare options for Phonemes select element
  const files = phonemes.map( value => {
    return (
      <button
        key={value}
        data-word={value}
      >
        {value}
      </button>
    );
  });


  function createPhonemeData() {
    console.log("createPhonemeData:", phoneme)
    // Create list of words and their timing data
    const phonemeData = Object.values(pairs.words[phoneme])
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

    setPhonemeData(phonemeData)
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
    console.log("pairs:", pairs)
    const data = pairs.words[phoneme][spelling]
    console.log("data:", data)

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
        {phonemeData}
      </ul>
    </div>
  );
};

export default Review;
