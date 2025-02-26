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

import React, { createContext } from 'react'
const AUDIO_DIR = "audio/"



export const AudioContext = createContext()

export const AudioProvider = ({ children }) => {
  // eslint-disable-next-line
  const audio = new Audio()
  let playing = false // will temporarily become truthy relative path
  let timeOut

  const Provider = AudioContext.Provider

  const _stopAudioPlayback = () => {
    audio.pause()
    playing = false
  }

  const _startAudioPlayback = (url, clip) => {
    if (url === playing) {
      return // Let this sound play to the end
    }

    // console.log("url:", url, ", clip:", clip)

    const [ startTime, endTime ] = clip
    const duration = (endTime - startTime) * 1000 // ms

    audio.src = url
    audio.currentTime = startTime                 // s
    // console.log("audio.duration:", audio.duration, ", url:", url)
    clearTimeout(timeOut)
    timeOut = setTimeout(_stopAudioPlayback, duration)

    audio.play()
         .then(result => {
           playing = url
         }).catch(error => {
           console.log("Audio.play() error:)", error, url)
         })
  }

  const playClip = (url, clip) => {
    // TODO: Fade out current audio playback before
    // starting to play new clip.
    _startAudioPlayback(AUDIO_DIR + url, clip)
  }

  return (
    <Provider
      value = {{
        playClip
      }}
    >
      {children}
    </Provider>
  )
}