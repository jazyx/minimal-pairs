/**
 * /src/components/Card.jsx
 */


import React, { useContext } from 'react'
import { AudioContext } from './AudioContext'


const Card = (props) => {
  const {
    spelling
  , phonetic
  , clip
  , image
  , image_
  } = props.card
  const className = "card"
                  + ( props.role
                    ? ` ${props.role}`
                    : ""
                    )
  const src = props.taboo ? (image_ || image) : image
  const audio = useContext(AudioContext)

  return (
    <div
      className={className}
      key={spelling}
      onMouseDown={() => audio.playClip(clip)}
    >
      <img className="icon" src="img/icons/sound.svg" alt="play icon" />
      <img className="illustration" src={src} alt={spelling}/>
      <p className="phonetic">{phonetic}</p>
      <p className="spelling">{spelling}</p>
    </div>
  )
}


export default Card