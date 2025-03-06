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

const json = require('../json/pairs.json')
const phonemePairs = Object.keys(json.pairs)

const pairIndex = json.index
const AUDIO_DIR = "./audio/"


export const PairsContext = createContext()


export const PairsProvider = ({ children }) => {
  const {
    pair: currentPair,
    choosePair,
    friendly
  } = useContext(PreferencesContext)

  const [ pairs, setPairs ] = useState(json)
  const [ audioLoading, setAudioLoading ] = useState([])

  const [ audioFileMap, setAudioFileMap ] = useState([])
  // { <phoneme>: "./audio/<phoneme>.mp3", ... }

  // "ɪi" <<< one of the entries in phonemePairs
  const [ phonemeSymbols, setPhonemeSymbols ] = useState([])
  // [ "ɪ", "iː" ]

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
   * @param {string} pair: one ef the items from phonemePairs
   */
  function setPhonemePair(pair, force) {
    if (!force && pair && currentPair === pair) {
      return
    }

    // Choose the given pair, or the first available
    const index = phonemePairs.indexOf(pair)
    if (index < 0) {
      pair = phonemePairs[0]
    }

    _setPairListAndPhonemeSymbols(pair)

    // Empty the pockets
    lastWords.length = 0

    // Tell Preferences to set and store the new pair
    choosePair(pair)
  }


  /**
   * Export a function to return all the data required to display a
   * minimal pair of words and play their audio files
   *
   * @returns
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
    const phonemeSymbols = pairs.index[pair].phonemes
    setPhonemeSymbols(phonemeSymbols)
    // [<ɪ>, <æ>]

    setPlayed({ [phonemeSymbols[0]]:[], [phonemeSymbols[1]]:[] })
    setAudioLoading([ ...phonemeSymbols ])

    const pairList = Object.entries(pairs.pairs[pair])
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
    const phonemeData = pairs.words[phoneme]
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
    const phonemeData = pairs.words[phoneme]
    const data = {...phonemeData[phoneme]}
    data.url = phonemeData.url
    data.phoneme = phoneme

    return data
  }


  function getAudioFileMap(param) {
    const wordsData = Object.values(json.words)
    const urls = wordsData.map( phonemeData => phonemeData.url)

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
    setPhonemePair(currentPair, true)
    // eslint-disable-next-line
  }, [])


  return (
    <PairsContext.Provider
      value ={{
        pairs
      , setPairs
      , audioFileMap
      , audioLoaded
      , audioLoading
      , pairIndex
      , phonemePairs
      , currentPair
      , setPhonemePair
      , getWordData
      , getPhonemeData
      , getCards
      }}
    >
      {children}
    </PairsContext.Provider>
  )
}