/**
 * /src/components/Pocket.jsx
 */

import React, { useContext } from 'react'
import { AudioContext } from './AudioContext'

import Card from './Card'

const Pocket = (props) => {
  const audio = useContext(AudioContext)
  const { phoneme, index, url, clip, played } = props

  const getCard = ( card, index ) => {
    return (
      <Card
        key={index}
        card={card}
      />
    )
  }

  const getCardList = () => {
    const listOfCards = played.map(getCard)
    return (
      <ul>
        {listOfCards}
      </ul>
    )
  }

  const cardList = getCardList()
  const className = `phoneme-${index + 1}`

  return (
    <div
      className={className}
      key={className}
    >
      {cardList}
      <div className="pocket"></div>
      <button
        className="play-phoneme"
        onClick={() => audio.playClip(url, clip)}
      >
        /{phoneme}/
      </button>
    </div>
  )
}

export default Pocket