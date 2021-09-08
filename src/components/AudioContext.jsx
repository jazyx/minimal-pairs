/**
 * src/components/AudioContext
 */

import React, { createContext } from 'react'

export const AudioContext = createContext()

export const AudioProvider = ({ children }) => {
  // eslint-disable-next-line
  const audio = new Audio()
  let playing = false

  const Provider = AudioContext.Provider

  const _stopAudioPlayback = () => {
    audio.pause()
    playing = false
  }

  const _startAudioPlayback = (url, clip) => {
    if (audio.src !== url) {
      audio.src = url
    }

    const [ startTime, endTime ] = clip
    const duration = (endTime - startTime) * 1000 // ms

    audio.currentTime = startTime                  // s
    setTimeout(_stopAudioPlayback, duration)

    audio.play()
         .then(result => {
           playing = true
         }).catch(error => {
           console.log("Audio.play() error:)", error)
         })
  }

  const playClip = (url, clip) => {
    // TODO: Fade out current audio playback before
    // starting to play new clip.
    _startAudioPlayback(url, clip)
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