/**
 * src/contexts/PairsContext.jsx
 *
 * description
 */


import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef
} from 'react'
import { PreferencesContext } from './PreferencesContext';
import { shuffle, removeFrom } from '../tools/utilities'


// Create static constants for data read in from JSON or database
const dataMap = require('../json/pairs.json')
const pairs = dataMap.pairs
// { "ɪi": { "bid": "bead", "bins": "beans", ... }
// , ...
// }
const phonemePairs = Object.keys(pairs)
// [ "ɪi", "ɑʌ", "æɛ", "æɑ", "ɪə-eə", "i-ɪə", "æʌ" ]
const wordsData = dataMap.words
// { <phoneme>: {
//     "url": <audio file name>,
//     <phoneme (again)>: { "clip": [ <start>, <finish> ] },
//     <word>: {
//       "spelling": <case-sensitive word>,
//       "phonetic": "/.../",
//       "image": "img/<phoneme>/<image file name>",
//       "clip": [ <start>, <finish> ]
//       "wiki": <url>
//     },
//   ...,
// }
const phonemeKeys = Object.keys(wordsData)
// [ "ɪ", "i", ... ] <<< no "ː" characters
const pairIndex = dataMap.index
// { <phonemePair>: {
//     "phonemes": [
//       <IPA symbol 1>,
//       <IPA symbol 2>
//     ],
//     "words": [
//       <illustrative word for phoneme 1>,
//       <illustrative word for phoneme 1>
//     ]
//   },
//   ...
// }

const AUDIO_DIR = "./audio/"


export const PairsContext = createContext()


export const PairsProvider = ({ children }) => {
  const {
    pair,
    choosePair,
    friendly
  } = useContext(PreferencesContext)

  const [ audioLoading, setAudioLoading ] = useState([])
  // Altered clone of phonemePairs, or false
  const [ audioFileMap, setAudioFileMap ] = useState([])
  // { <phoneme>: "./audio/<phoneme>.mp3", ... }
  const [ phonemeSymbols, setPhonemeSymbols ] = useState([])
  // "ɪi"<<< one of the entries in phonemePairs >>>[ "ɪ", "iː" ]
  const [ pairList, setPairList ] = useState([])
  // [ [ "bitch", "beach" ],...[ "wheel", "will" ] ]
  const [ phonemes, setPhonemes ] = useState([])
  // [ { symbol: "/ɪ/", audio: [0, 1] }, ...]
  const [ played, setPlayed ] = useState({})
  // { "/x/": [ <card>, ... ]
  // , "/y/": [ <card>, ... ]
  // }  

  const wordsRef = useRef([])
  const lastWords = wordsRef.current


  /** Set the array of pairs that will produce the
   *  next minimal pair of cards
   *
   * @param {string} newPair: one ef the items from phonemePairs
   */
  function setPhonemePair(newPair, force) {
    if (!force && newPair && newPair === pair) {
      return
    }

    // Choose the given pair, or the first available
    const index = phonemePairs.indexOf(newPair)
    if (index < 0) {
      newPair = phonemePairs[0]
    }

    _setPairListAndPhonemeSymbols(newPair)

    // Empty the pockets
    lastWords.length = 0

    // Tell Preferences to set and store the new pair
    choosePair(newPair)
  }


  const getWordPair = () => {
    return lastWords.reduce(( pair, {spelling}, index ) => {
      pair += (index ? ":" : "") + spelling.toLowerCase()

      return pair
    }, "")
  }


  /**
   * Export a function to return all the data required to display a
   * minimal pair of words and play their audio files. Calling this
   * function does not update state or cause a re-render
   *
   * @returns object 
   */
  function getCards(noTaboo) {
    const [ phoneme1, phoneme2 ] = phonemeSymbols
    const [ word1, word2 ] = lastWords

    if (word1) {
      const spellings = played[phoneme1].map(word => word.spelling)

      if (spellings.indexOf(word1.spelling) < 0) {
        played[phoneme1].push(word1)
        played[phoneme2].push(word2)
      }
    }

    // Grab the first card and (for now) move it to the end
    do {
      const cards = pairList.shift()
      pairList.push(cards)

      lastWords[0] = getWordData(phoneme1, cards[0])
      lastWords[1] = getWordData(phoneme2, cards[1])

      if (lastWords[0].image && lastWords[1].image) {
        // if noTaboo, then this pair is clean
        // if !noTaboo, while loop will exit anyway
        break
      } else if (!friendly) {
         if (( lastWords[0].image || lastWords[0].image$)
          && (lastWords[1].image || lastWords[1].image$)
            ) {
          break
        }
      }
    } while (noTaboo)

      removeFrom(played[phoneme1], item => (
        JSON.stringify(item) === JSON.stringify(lastWords[0])
      ))
      removeFrom(played[phoneme2], item => (
        JSON.stringify(item) === JSON.stringify(lastWords[1])
      ))

    const output = {
      phonemes
    , word1: lastWords[0]
    , word2: lastWords[1]
    , played
    , wordPair: getWordPair()
    }

    return output
  }


  /**
   * @param {object} pairMap e.g. {
   *   "ɑː": "ʌ"       <<< phoneme pair
   * , "heart": "hut"  <<< minimal pairs
   * , "barn": "bun"
   * , ...
   * }
   *
   * * Reads the array of phoneme symbols from the pairs object
   * * Resets `played` to empty arrays
   * * Set audioLoading to the array of phoneme symbols. When
   *   audioLoaded has been called twice and this array is empty
   *   again, then setPhonemes() will be called to poplulate
   *   phonemes with objects which contain a buffer object.
   * * In the meantime, creates a shuffled list of minimal pairs
   */
  function _setPairListAndPhonemeSymbols(pair) {
    const phonemeSymbols = pairIndex[pair].phonemes
    setPhonemeSymbols(phonemeSymbols)
    // [<ɪ>, <æ>]

    setPlayed({ [phonemeSymbols[0]]:[], [phonemeSymbols[1]]:[] })
    setAudioLoading([ ...phonemeSymbols ])

    const pairList = Object.entries(pairs[pair])
    // [[<this>, <that>], [<tit>, <tat>], ...]
    shuffle(pairList)
    // [[<tit>, <tat>], ..., [<this>, <that>], ...]

    setPairList(pairList)
  }


  /**
   * @param {string} phoneme (e.g.: "ɑː")
   * @param {string} word    (e.g.: "heart")
   *
   * @returns an object with a format like:
   * { "spelling": "heart"
   * , "phonetic": "/hɑːt/"
   * , "image": "img/ɑ/heart.jpg"
   * , "clip": [2.450, 3.550]
   * , url: "audio/ɑ.mp3"
   * }
   */
  function getWordData(phoneme, word) {
    const phonemeData = wordsData[phoneme]
    const data = {...phonemeData[word]}
    data.url = phonemeData.url

    return data
  }


  /**
   * Creates an object that allows the app to display the phoneme and
   * play its audio clip
   *
   * @param {string} phoneme (e.g. : "ɑː")
   * @returns an object with a format like:
   * { "clip": [ <startTime>, <endTime> ]
   * , url: <x.mp3>
   * , phoneme: <x>
   * }
   */
  function getPhonemeData(phoneme) {
    const phonemeData = wordsData[phoneme]
    const data = {...phonemeData[phoneme]}
    data.url = phonemeData.url
    data.phoneme = phoneme

    return data
  }


  function getAudioFileMap(param) {
    const wordValues = Object.values(wordsData)
    const urls = wordValues.map( value => value.url)

    const audioFileMap = urls.reduce(( names, name ) => {
      const phoneme = name.replace(/\.mp3$/i, "")
      names[phoneme] = AUDIO_DIR + name
      return names
    }, {})

    setAudioFileMap(audioFileMap)
  }


  const audioLoaded = (phoneme) => {
    if (audioLoading) {
      // audioLoading is an array which contains phoneme.
      const index = audioLoading.indexOf(phoneme)
      audioLoading.splice(index, 1)

      if (audioLoading.length) {
        setAudioLoading([ ...audioLoading ])
      } else {
        setAudioLoading(false)
        setPhonemes(phonemeSymbols.map(getPhonemeData))
      }

    } else {
      // audioLoading is already false. This shouldn't happen.
      console.log(`audioLoaded(${phoneme}) called when audioLoading is false`)
    }
  }


  useEffect(() => {
    getAudioFileMap()
    setPhonemePair(pair, true)
    // eslint-disable-next-line
  }, [])


  return (
    <PairsContext.Provider
      value ={{
        dataMap        // read from pairs.json, with buffers added
      , wordsData      // map of words used with each phoneme pair
      , pairs          // { "ɪi": { "bid": "bead", ... }
      , phonemePairs   // [ "ɪi", "ɑʌ", ..., "i-ɪə" ]
      , pair           // current phonemePair: "ɪi"
      , phonemeSymbols // pair as [ "ɪ", "iː" ]
      , phonemeKeys    // [ "ɪ", "i", ... ] <<< no "ː" characters
      , audioFileMap   // { "i": "./audio/i.mp3"}
      , audioLoaded    // function(phoneme), used by AudioContext
      , audioLoading   // [ "ɪ", "i", ... ] or false
      , pairIndex      // used by Select to show phoneme pairs
      , setPhonemePair // function called by Select and UserContext
      , getWordData    // used by Select
      , getPhonemeData // used by Select
      , getCards       // used by Activity (does not update state)
      }}
    >
      {children}
    </PairsContext.Provider>
  )
}