/**
 * src/contexts/PairsContext.jsx
 *
 * description
 */


import React, {
  createContext,
  useState,
  useContext,
  useEffect
} from 'react'
import { PreferencesContext } from './PreferencesContext';
import storage from '../tools/storage';
import { shuffle, removeFrom } from '../tools/utilities'

const pairs = require('../json/pairs.json')
const phonemePairs = Object.keys(pairs.pairs)
// Ignore pairs like "ɪiX" which have not been fully treated yet
.filter( pairing => !pairing.match(/X$/))

const pairIndex = pairs.index

const AUDIO_DIR = "audio/"



export const PairsContext = createContext()


export const PairsProvider = ({ children }) => {
  const { pair: currentPair, choosePair } = useContext(PreferencesContext)
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
  const [ word1, setWord1 ] = useState("")
  const [ word2, setWord2 ] = useState("")


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

    // Fill the pockets
    setWord1()
    setWord2()

    choosePair(pair)
    storage.set({ pair })
  }


  /**
   * Export a function to return all the data required to display a
   * minimal pair of words and play their audio files
   *
   * @returns
   */
  function getCards(noTaboo) {
    const [ phoneme1, phoneme2 ] = phonemeSymbols

    if (word1) {
      const spellings = played[phoneme1].map(word => word.spelling)

      if (spellings.indexOf(word1.spelling) < 0) {
        played[phoneme1].push(word1)
        played[phoneme2].push(word2)
      }
    }

    // Grab the first card and (for now) move it to the end
    let word_1
    let word_2
    do {
      const cards = pairList.shift()
      pairList.push(cards)

      word_1 = getWordData(phoneme1, cards[0])
      word_2 = getWordData(phoneme2, cards[1])

      if (word_1.image && word_2.image) {
        // if noTaboo, then this pair is clean
        // if !noTaboo, while loop will exit anyway
        break
      }
    } while (noTaboo)

    removeFrom(played[phoneme1], word_1)
    removeFrom(played[phoneme2], word_2)



    const output = {
      phonemes
    , word1: word_1
    , word2: word_2
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
   */
  function _setPairListAndPhonemeSymbols(pair) {
    const phonemeSymbols = pairs.index[pair].phonemes
    setPhonemeSymbols(phonemeSymbols)
    setPlayed({ [phonemeSymbols[0]]:[], [phonemeSymbols[1]]:[] })

    // [<ɪ>, <æ>]

    const pairList = Object.entries(pairs.pairs[pair])
    // [[<this>, <that>], [<tit>, <tat>], ...]
    shuffle(pairList)
    // [[<tit>, <tat>], ..., [<this>, <that>], ...]

    setPairList(pairList)

    setPhonemes(phonemeSymbols.map(getPhonemeData))
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
    data.url = AUDIO_DIR + phonemeData.url

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
    data.url = AUDIO_DIR + phonemeData.url
    data.phoneme = phoneme

    return data
  }


  useEffect(() => setPhonemePair(currentPair, true), [])


  return (
    <PairsContext.Provider
      value ={{
        pairs
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