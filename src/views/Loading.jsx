/**
 * src/views/Loading.jsx
 * 
 * The Loading view shows immediately after a change of phoneme
 * pair. It remains visible until the audio files for both phonemes
 * have been loaded and buffers have been created for all the word
 * segments.
 * 
 * At this point, it calls `startActivity()`.
 */


import React, { useContext, useEffect } from 'react'
import { PairsContext } from '../contexts'
import './Loading.css'


const Loading = ({ startActivity }) => {
  const { audioLoading } = useContext(PairsContext)
  // array || false


  useEffect(() => {
    if (!audioLoading) {
      startActivity()
    }
  // eslint-disable-next-line
  }, [audioLoading])


  return (
    <div id="loading">
      <h1>Loading...</h1>
      <div className="progress"></div>
    </div>
  )
}


export default Loading