/**
 * src/views/Tweak.jsx
 */


import React, {
  useContext,
  useState,
  useRef,
  useEffect
} from "react";
import { PairsContext, AudioContext } from "../contexts";
import "./Tweak.css";


const Tweak = () => {
  const { playClip } = useContext(AudioContext);
  const { pairs, setPairs } = useContext(PairsContext);
  // { words: { <phoneme>: { url, <word>: { <data> }, ...}},
  //   index: { ... }
  //   pairs: { ... }
  // }
  const wordsDataRef = useRef(pairs.words)
  const wordsData = wordsDataRef.current
  const ulRef = useRef()

  const phonemes = Object.keys(wordsData);
  const [ phoneme, setPhoneme ] = useState(phonemes[0]); // "æ"
  const [ wordData, setWordData ] = useState({});
  // { spelling, start, finish }
  const [ word, setWord ] = useState(""); // "and"
  const [ index, setIndex ] = useState(0)

  const lastIndex = Object.keys(wordsData[phoneme]).length - 3
  
  // Prepare options for Phonemes select element
  const files = phonemes.map((value, index) => {
    return (
      <option
        key={value}
        value={value}
      >
        {value}
      </option>
    );
  });


  // Create list of words and their timing data
  const phonemeData = Object.values(wordsData[phoneme])
    .filter( data => data.spelling ) // not "url" or <phoneme>
    .map( data => {
      const { spelling, clip } = data
      const [ start, finish ] = clip
      const className = spelling === word ? "selected" : null

      return (
        <li
          key={spelling}
          className={className}
        >
          <span className="spelling">{spelling}</span>
          <span className="start">{start.toFixed(2)}</span>
          &nbsp;-&nbsp;
          <span className="finish">{finish.toFixed(2)}</span>
        </li>
      )
    })


  const selectPhoneme = ({ target }) => {
    setPhoneme(target.value)
  }


  const selectWord = ({ target }, dontPlay) => {
    if (!target) { return }

    while (target.tagName !== "LI") {
      target = target.parentNode
    }

    const data = ["spelling", "start", "finish"].reduce(( output, className ) => {
      let value = target.querySelector(`.${className}`).innerText
      if (!isNaN(value)) {
        value = parseFloat(value)
      }
      output[className] = value
      return output
    }, {})

    const index = Array.from(target.parentNode.children).indexOf(target)
    setIndex(index)
    setWordData(data)
    setWord(data.spelling)

    if (!dontPlay){
      playWord(data)
    }
  }


  const setSpelling = ({ target }) => {
    const spelling = target.value
    setWordData({ ...wordData, spelling })
  }


  const setTiming = ({ target }) => {
    const { id, value } = target
    setWordData({ ...wordData, [id]: parseFloat(value) })
  }


  const playWord = (data) => {
    data = data.spelling ? data : wordData
    const clip = [ data.start, data.finish ]
    const url = phoneme + ".mp3"
    playClip(url, clip)
  }


  const selectNext = ({ target }) => {
    const direction = ((target.id === "down") * 2) - 1
    const next = index + direction

    if (index < 0 || index > lastIndex) { return }

    chooseWord(next)
  }


  const chooseWord = (index, dontPlay) => {
    const target = ulRef.current.children[index]
    selectWord({ target }, dontPlay)
  }


  const updateWordData = () => {
    const phonemeData = wordsData[phoneme]
    let data = phonemeData[word]
    const { spelling, start, finish } = wordData
    const clip = [ start, finish ]
    data = { ...data, spelling, clip }

    phonemeData[word] = data
    console.log(" wordsData[phoneme][word]", JSON.stringify( wordsData[phoneme][word], null, '  '));

    pairs.words = wordsData
    setPairs(pairs)
  }


  const savePairsJSON = () => {
    // pairs.words = wordsData
    console.log(JSON.stringify(pairs, null, '  '));
  }


  useEffect(() => {chooseWord(0, true)}, [])


  return (
    <div id="review">
      <div id="files">
        <label>
          <span>Phoneme: </span>
          <select
            name="files"
            id="select-file"
            value={phoneme}
            onChange={selectPhoneme}
          >
            {files}
          </select>
        </label>
      </div>

      <ul
        onClick={selectWord}
        ref={ulRef}
      >
        {phonemeData}
      </ul>

      <div id="selected">
        <div className="buttons scroll"
          onClick={selectNext}
        >
          <button
            type="button"
            id="up"
            disabled={!index}
          >
            <img src="./img/icons/up.svg" alt="up" />
          </button>
          <button
            type="button"
            id="down"
            disabled={index === lastIndex}
          >
            <img src="./img/icons/down.svg" alt="down" />
          </button>
        </div>
        <input
          type="text"
          id="spelling"
          value = {wordData.spelling || ""}
          onChange={setSpelling}
        />
        <input
          type="number"
          step=".05"
          id="start"
          value={wordData.start || ""}
          onChange={setTiming}
        />
        &nbsp;-&nbsp;
        <input
          type="number"
          step=".05"
          id="finish"
          value={wordData.finish || ""}
          onChange={setTiming}
        />
        <div className="buttons">
          <button
            type="button"
            id="play-one"
            disabled={!word}
            onClick={playWord}
          >
            Play
          </button>
          <button
            type="button"
            id="set"
            disabled={!word}
            onClick={updateWordData}
          >
            Set
          </button>
          <button
            type="button"
            id="Save"
            disabled={!word}
            onClick={savePairsJSON}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tweak;
