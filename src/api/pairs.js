/**
 * /src/api/pairs.js
 */

import { shuffle } from '../tools/utilities'
const pairs = require('../json/pairs.json')

console.log("initializing pairs.js:")
console.log("pairs:", pairs)
 
const phonemePairs = Object.keys(pairs.pairs)
let taboo = false

let currentPair  // "ɪi" <<< one of the entries in phonemePairs
let pairList     // [ [ "bitch", "beach" ], ..., [ "wheel", "will" ] ]
let phonemes     // [ "ɪ", "iː" ]
let currentIndex // 0
let lastIndex    // index of list item in pairList



export function getPhonemePairs() {
  return phonemePairs
}

export function setPhonemePair(pair) {
  if (currentPair === pair) {
    return
  }

  const index = phonemePairs.indexOf(pair)
  if (index < 0) {
    pair = phonemePairs[0]
  }
 
  _setPairList(pairs.pairs[pair])
  lastIndex = pairList.length - 1
  currentIndex = 0

  currentPair = pair
}

export function getCards() {
  const cards = pairList.shift()
  pairList.push(cards)

  const word1 = _getWordData(phonemes[0], cards[0])
  const word2 = _getWordData(phonemes[1], cards[1])
  
  const output = {
    phonemes
  , word1
  , word2
  }

  return output
}

function _setPairList(pairMap) {
  pairList = Object.entries(pairMap)
  // [[<ɪ>, <æ>], [<this>, <that>], [<tit>, <tat>], ...]
  phonemes = pairList.shift()
  shuffle(pairList)

  console.log("pairList:", pairList)
  console.log("phonemes:", phonemes)
}

function _getWordData(phoneme, word) {
  const data = pairs.words[phoneme][word]

  return data
}

setPhonemePair("random")