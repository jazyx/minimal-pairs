/**
 * /src/components/Card.jsx
 */


import React, { useContext, forwardRef } from 'react'
import { AudioContext } from './AudioContext'


const Card = forwardRef((props, cardRef) => {
  console.log("props", props);
  // {
  //   "card": {
  //     "spelling": "marsh",
  //     "phonetic": "/mɑː∫/",
  //     "image": "img/ɑ/marsh.jpg",
  //     "clip": [
  //       3.75,
  //       4.9
  //     ],
  //     "url": "audio/ɑ.mp3"
  //   },
  //   "role": "decoy" | "cue"          | missing for seen cards,
  //   "action": null  | checkForDrag() | pocketAction()
  // }
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
  const action = props.action // will be null for decoy
              || (() => audio.playClip(url, clip)) // only for decoy

  return (
    // 
    // div.space reserves an area for the card to 3D rotate in
    <div
      className={spaceName}
      ref={cardRef}
    >
      {/* div.board creates a space within which to 2D rotate
          cards in non-split landscape mode as they go in the
          pocket
       */}
      <div className="board">
        {/* div.card.(cue|decoy)[.flipped] contains the actual
            text, image and buttons (credit + meaning) that
            is rotated
        */}
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

            <div className="details">
              <img
                className="icon"
                src="img/icons/credits.svg"
                alt="Credit"
              />

              <p className="spelling">{spelling}</p>

              <img
                className="icon meaning"
                src="img/icons/wiktionary.svg"
                alt="Meaning"
              />
            </div>

            <p className="phonetic">{phonetic}</p>
          </div>
        </div>
        <div className="border"></div>
      </div>
    </div>
  )
})


export default Card