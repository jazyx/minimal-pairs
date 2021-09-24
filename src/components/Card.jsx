/**
 * /src/components/Card.jsx
 */


import React, { useContext, useEffect, forwardRef } from 'react'
import { AudioContext } from './AudioContext'


const Card = forwardRef((props, cardRef) => {
  // console.log("card:", props.card)
  const {
    spelling
  , phonetic
  , clip
  , url
  , image
  , image_
  } = props.card

  const className = "card"
                  + ( props.role
                    ? " flipped"
                    : ""
                    )
  const spaceName = "card-holder"
                  + ( props.role
                    ? " space"
                    : ""
                    )
  const src = props.taboo ? (image_ || image) : image
  const audio = useContext(AudioContext)
  const action = props.action // will be undefined for decoy
              || (() => audio.playClip(url, clip)) // only for decoy

  return (
    <div
      className={spaceName}
      ref={cardRef}
    >
      <div
        className={className}
        key={spelling}
        onMouseDown={action}
        onTouchStart={props.action}
      >
        <img
          className="back unselectable"
          src="img/icons/sound.svg"
          alt="play audio icon"
        />
        <div className="front unselectable">
          <img src={src} alt={spelling}/>
          <p className="phonetic">{phonetic}</p>
          <p className="spelling">{spelling}</p>
        </div>
      </div>
    </div>
  )
})


export default Card