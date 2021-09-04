/**
 * /src/components/Card.jsx
 */


import React from 'react';


const Card = (props) => {
  const { spelling, phonetic, image } = props.card
  const className = "card"
                  + ( props.role
                    ? ` ${props.role}`
                    : ""
                    )
  return (
    <div
      className={className}
      onMouseDown={props.onMouseDown}
    >
      <img className="icon" src="img/icons/sound.svg" alt="play icon" />
      <img className="illustration" src={image} alt={spelling}/>
      <p className="phonetic">{phonetic}</p>
      <p className="spelling">{spelling}</p>
    </div>
  )
}


export default Card