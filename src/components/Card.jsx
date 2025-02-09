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
  //     "url": "audio/ɑ.mp3",
  //     "wiki": "https://en.wiktionary.org/wiki/<word>#English" ||
  //             "https://en.wikipedia.org/wiki/<word>"
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
  , wiki
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
  const icon = wiki.match(/wikipedia/i)
    ? "img/icons/wikipedia.webp"
    : "img/icons/wiktionary.svg"

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
      <div className="board"
        onMouseDown={action}
        onTouchStart={props.action}
      >
        {/* div.card.(cue|decoy)[.flipped] contains the actual
            text, image and buttons (credit + meaning) that
            is rotated
        */}
        <div
          className={className}
          key={spelling}
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
                className="icon credits"
                src="img/icons/credits.svg"
                alt="Credit"
              />

              <p className="spelling">{spelling}</p>

              <a href={wiki} target="meaning">
                <img
                  className="icon meaning"
                  src={icon}
                  alt="Meaning"
                />
              </a>
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