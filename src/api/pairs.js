/**
 * /src/api/pairs.js
 */

import { shuffle, removeFrom } from '../tools/utilities'
const pairs = require('../json/pairs.json')
const AUDIO_DIR = "audio/"

/** Export an array of pairs of phonemes that can be contrasted with
 * each other. This will be imported by the Index component
 */
export const phonemePairs = Object.keys(pairs.pairs)
export const pairIndex = pairs.index

// let taboo = false

let currentPair    // "ɪi" <<< one of the entries in phonemePairs
let pairList       // [ [ "bitch", "beach" ],...[ "wheel", "will" ] ]
let phonemeSymbols // [ "ɪ", "iː" ]
let phonemes       // [ { symbol: "/ɪ/", audio: [0, 1] }, ...]
// let currentIndex   // 0
// let lastIndex      // index of list item in pairList
let played         // { "/x/": [ <card>, ... ]
                   // , "/y/": [ <card>, ... ]
                   // }
let word1, word2   // "bitch", "beach"


export function getCurrentPair() {
  return currentPair
}


/**
 * Export a function to set the array of pairs that will produce the
 * next minimal pair of cards
 *
 * @param {string} pair: one ef the items from phonemePairs
 */
export function setPhonemePair(pair) {
  if (currentPair === pair) {
    return
  }

  // Choose the given pair, or the first available
  const index = phonemePairs.indexOf(pair)
  if (index < 0) {
    pair = phonemePairs[0]
  }

  _setPairListAndPhonemeSymbols(pair)
  // lastIndex = pairList.length - 1
  // currentIndex = 0

  // Ensure that the pockets start empty
  word1 = word2 = undefined
  played = { [phonemeSymbols[0]]:[], [phonemeSymbols[1]]:[] }

  currentPair = pair
}


/**
 * Export a function to return all the data required to display a
 * minimal pair of words and play their audio files
 *
 * @returns
 */
export function getCards() {
  const [ phoneme1, phoneme2 ] = phonemeSymbols

  if (word1) {
    const spellings = played[phoneme1].map(word => word.spelling)
    if (spellings.indexOf(word1.spelling) < 0) {
      played[phoneme1].push(word1)
      played[phoneme2].push(word2)
    }
  }

  // Grab the first card and (for now) move it to the end
  const cards = pairList.shift()
  pairList.push(cards)

  word1 = getWordData(phoneme1, cards[0])
  word2 = getWordData(phoneme2, cards[1])

  removeFrom(played[phoneme1], word1)
  removeFrom(played[phoneme2], word2)

  const output = {
    phonemes
  , word1
  , word2
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
  phonemeSymbols = pairs.index[pair].phonemes
  // [<ɪ>, <æ>]

  pairList = Object.entries(pairs.pairs[pair])
  // [[<this>, <that>], [<tit>, <tat>], ...]

  phonemes = phonemeSymbols.map(getPhonemeData)
  shuffle(pairList)
  // [[<tit>, <tat>], ..., [<this>, <that>], ...]
}


/**
 *
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
export function getWordData(phoneme, word) {
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
export function getPhonemeData(phoneme) {
  const phonemeData = pairs.words[phoneme]
  const data = {...phonemeData[phoneme]}
  data.url = AUDIO_DIR + phonemeData.url
  data.phoneme = phoneme

  return data
}


setPhonemePair("ɑʌ")