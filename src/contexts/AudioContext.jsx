/**
 * src/components/AudioContext
 *
 * An audio clip is defined as a file path and a begin and end point in
 * that file. measured in seconds. For example:
 *
 * { url: "audio/ɑ.mp3"
 * , "clip": [2.450, 3.550]
 * }
 *
 * For any minimal pair, there will be two audio clips, for example: for
 * "staff" and for "stuff". Each of these will be stored in a separate
 * file, with a separate url. Switching from one recording to the other
 * will mean loading a different audio file.
 */

import React, { createContext, useContext, useEffect } from 'react'
import { PairsContext } from './PairsContext'


// Create an AudioContext _object_ to analyse and play audio
const audioContext = new (
  window.AudioContext || window.webkitAudioContext
)();


export const AudioContext = createContext()


export const AudioProvider = ({ children }) => {
  const {
    dataMap,
    phonemeKeys,
    pair,
    audioFileMap,
    audioLoaded,
    splitPair
  } = useContext(PairsContext)

  const playClip = (wordData) => {
    // Create a source to play the audio in the buffer
    const source = audioContext.createBufferSource()
    source.buffer = wordData.buffer
    source.connect(audioContext.destination)
    source.start()
  }


  const loadAudioFile = (url, phoneme, callback) => {
    // phoneme is derived from the audio file name. For long vowels
    // the "ː" character will be missing. Update the phoneme to use
    // this character if appropriate.
    const wordsData = dataMap.words[phoneme]
                   || dataMap.words[phoneme = phoneme + "ː"]

    // Create an array of word data with the structure...
    // [ { spelling, clip }, ... ]
    // ... so clip[0] can be used to sort the array and determine
    // the order of the spellings

    const entries = Object.entries(wordsData)
    // eslint-disable-next-line
    const wordsArray = entries.map(([ key, value ]) => {
      // "url" returns undefined...
      if (key !== "url") {
        const { spelling, clip } = value
        const [ start ] = clip
        return { spelling, start }
      }
    }).filter( value => !!value ) // ... and is filtered out
    .sort(( a, b ) => a.start - b.start )


    fetch(url)
      .then(response => response.arrayBuffer())
      .then(
        arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(createSegmentBuffers)
      .catch(error => console.log("error:", error))

    function createSegmentBuffers(audioBuffer) {
      const channel = 0
      const channelData = audioBuffer.getChannelData(channel)
      const { sampleRate } = audioBuffer
      const gap = sampleRate / 100 // samples for 10 ms

      // Find all non-zero chunks with 10 ms of silence around them
      const nonZero = []
      let begin = 0
      let zeroes = 0
      let lastValue = 0

      channelData.forEach(( value, index ) => {
        // HACK to prevent the ʌ audio file from treating
        // ___brunch_buck as a single word, because the MP3 file
        // has a value of 1/32768, not zero, in the silence there.
        if ( phoneme === "ʌ" && (
              (index > 25580 && index < 66150)
          || (index > 110250 && index < 135000)
          )
        ) {
          if (Math.abs(value < 0.00006)) {
            // Consider this to still be silence
            value = 0
          }
        }

        if (begin) {
          if (value) {
            // Reset the number of non-zero values
            zeroes = 0

          } else if (++zeroes > gap) {
            // A silent section of 0.1 seconds has been detected
            if (index - begin) {
              nonZero.push({
                begin,
                end: index
              })
            }

            // Prepare for next nonZero block
            begin = 0
            zeroes = 0
            lastValue = 0
          }

        } else if (!lastValue && value) {
          begin = index
          zeroes = 0
        }

        lastValue = value
      })

      function getSegmentBuffer({ begin, end }) {
        const length = end - begin

        // HACK: Ignore short blips of non-silent audio
        if (length < 4410) { // < 100 ms
          return
        }

        // Create an (empty) buffer of the right length
        const buffer = audioContext.createBuffer(
          1, // just channel zero
          length,
          sampleRate
        )

        const segment = channelData.subarray(begin, end)
        buffer.copyToChannel(segment, channel)

        return buffer
      }


      // Create an array of segments ordered by their position in
      // the audio file
      const bufferArray = nonZero
        .map(getSegmentBuffer)
        .filter( buffer => !!buffer )

      // wordsArray is ordered by the start time given in dataMap
      // The phoneme sound which (usually) appears first is skipped.
      wordsArray.forEach(( { spelling }, index ) => {
        if (!spelling) {
          spelling = phoneme
        }

        // HACK: Use first sound (which should be the phoneme
        // itself) for any words without specific buffer data
        // (like "e").
        const buffer = bufferArray[index] || bufferArray[0]

        const wordData = wordsData[spelling] // Surrey
                      || wordsData[spelling.toLowerCase()] //Gallic
        wordData.buffer = buffer
      })

      callback(phoneme)
    }
  }


  const loadPhoneme = (phoneme, callback) => {
    // Get the link to the audio file without any "ː" in the key
    const audioFile = audioFileMap[phoneme]
                   || audioFileMap[phoneme.replace("ː", "")]

    if (audioFile) {
      // Load the file, split it into buffers and add these to
      // the entries in dataMap.words[phoneme]...
      loadAudioFile(audioFile, phoneme, callback)
      // ... but don't do it again
      delete audioFileMap[phoneme]

    } else {
      // Add an "ː", if needed, for the callback
      if (!(phonemeKeys.indexOf(phoneme) + 1)) {
        phoneme = phoneme + "ː"
      }

      callback(phoneme)
    }
  }


  const loadPhonemes = () => {
    if (!pair) { return }

    const phonemesToLoad = splitPair(pair)

    phonemesToLoad.forEach( phoneme => {
      loadPhoneme(phoneme, audioLoaded)
    })
  }

  // eslint-disable-next-line
  useEffect(loadPhonemes, [audioFileMap, pair])


  return (
    <AudioContext.Provider
      value = {{
        playClip,
        loadPhoneme
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}