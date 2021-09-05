/**
 * /src/components/Card.jsx
 */


import React from 'react';


const Card = (props) => {
  const { spelling, phonetic, image, image_ } = props.card
  const className = "card"
                  + ( props.role
                    ? ` ${props.role}`
                    : ""
                    )
  const src = props.taboo ? (image_ || image) : image

  return (
    <div
      className={className}
      key={spelling}
      onMouseDown={props.onMouseDown}
    >
      <img className="icon" src="img/icons/sound.svg" alt="play icon" />
      <img className="illustration" src={src} alt={spelling}/>
      <p className="phonetic">{phonetic}</p>
      <p className="spelling">{spelling}</p>
    </div>
  )
}


export default Card