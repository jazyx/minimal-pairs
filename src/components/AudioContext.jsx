/**
 * src/components/AudioContext
 */

import React, { createContext, useState } from 'react'
const AUDIO_URL = "audio/pairs.mp3"

export const AudioContext = createContext()

export const AudioProvider = ({ children }) => {
  const [ url, setURL ] = useState(AUDIO_URL )
  // eslint-disable-next-line
  const audio = new Audio(url)
  let playing = false

  const Provider = AudioContext.Provider

  const _stopAudioPlayback = () => {
    audio.pause()
    playing = false
  }

  const _startAudioPlayback = (clip) => {
    const [ startTime, endTime ] = clip
    const duration = (endTime - startTime) * 1000 // ms
    audio.currentTime = startTime            // s
    setTimeout(_stopAudioPlayback, duration)

    audio.play()
         .then(result => {
           playing = true
         }).catch(error => {
           console.log("Audio.play() error:)", error)
         })
  }

  const playClip = (clip) => {
    // TODO: Fade out current audio playback before 
    // starting to play new clip.
    _startAudioPlayback(clip)
  }

  return (
    <Provider
      value = {{
        url,
        playClip,
        setURL
      }}
    >
      {children}
    </Provider>
  )
}