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
  , url
  , image
  , image_
  } = props.card
  const className = "card "
                  + ( props.role
                    ? `${props.role} flipped`
                    : ""
                    )
  const src = props.taboo ? (image_ || image) : image
  const audio = useContext(AudioContext)

  return (
    <div
      className="space"
      ref={props.refer}
    >
      <div
        className={className}
        key={spelling}
        onMouseDown={() => audio.playClip(url, clip)}
      >
        <img className="back" src="img/icons/sound.svg" alt="play icon" />
        <div className="front">
          <img src={src} alt={spelling}/>
          <p className="phonetic">{phonetic}</p>
          <p className="spelling">{spelling}</p>
        </div>
      </div>
    </div>
  )
}


export default Card