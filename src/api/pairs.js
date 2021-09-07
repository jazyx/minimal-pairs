/**
 * /src/api/pairs.js
 */

import { shuffle } from '../tools/utilities'
const pairs = require('../json/pairs.json')

// console.log("initializing pairs.js:")
// console.log("pairs:", pairs)
 
export const phonemePairs = Object.keys(pairs.pairs)
let taboo = false

let currentPair    // "ɪi" <<< one of the entries in phonemePairs
let pairList       // [ [ "bitch", "beach" ],...[ "wheel", "will" ] ]
let phonemeSymbols // [ "ɪ", "iː" ]
let phonemes       // [ { symbol: "/ɪ/", audio: [0, 1] }, ...]
let currentIndex   // 0
let lastIndex      // index of list item in pairList
let played         // { "/x/": [ <card>, ... ]
                   // , "/y/": [ <card>, ... ]
                   // }
let word1, word2   // "bitch", "beach"



export function setPhonemePair(pair) {
  if (currentPair === pair) {
    return
  }

  // Choose the given pair, or the first available
  const index = phonemePairs.indexOf(pair)
  if (index < 0) {
    pair = phonemePairs[0]
  }
 
  _setPairListAndPhonemeSymbols(pairs.pairs[pair])
  lastIndex = pairList.length - 1
  currentIndex = 0
  played = { [phonemeSymbols[0]]:[], [phonemeSymbols[1]]:[] }

  currentPair = pair
}


export function getCards() {
  const [ phoneme1, phoneme2 ] = phonemeSymbols
  
  if (word1) {
    played[phoneme1].unshift(word1)
    played[phoneme2].unshift(word2)
  }

  // Grab the first card and (for now) move it to the end
  const cards = pairList.shift()
  pairList.push(cards)

  word1 = _getWordData(phoneme1, cards[0])
  word2 = _getWordData(phoneme2, cards[1]) 
  
  const output = {
    phonemes
  , word1
  , word2
  , played
  }

  return output
}


function _setPairListAndPhonemeSymbols(pairMap) {
  pairList = Object.entries(pairMap)
  // [[<ɪ>, <æ>], [<this>, <that>], [<tit>, <tat>], ...]
  phonemeSymbols = pairList.shift()
  phonemes = phonemeSymbols.map(_getPhonemeData)
  shuffle(pairList)

  // console.log("pairList:", pairList)
  // console.log("phonemeSymbols:", phonemeSymbols)
}


function _getWordData(phoneme, word) {
  const data = pairs.words[phoneme][word]

  return data
}


function _getPhonemeData(phoneme) {
  const data = {...pairs.words[phoneme][phoneme]}
  data.phoneme = phoneme
  // { audio: [ <startTime>, <endTime> ]
  // , phoneme: <x>
  // }
  return data
}


setPhonemePair("ɑʌ")