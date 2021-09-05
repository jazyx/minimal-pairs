/**
 * /src/components/Pocket.jsx
 */


import { getCards } from '../api/pairs'
import Card from './Card'

const Pocket = (props) => {
  const { cards, index, phoneme, audio, playAudio } = props


  const getCard = ( card, index ) => {
    return (
      <Card 
        card={card}
      />
    )
  }


  const getCardList = () => {
    const listOfCards = cards.map(getCard)
    return (
      <ul>
        {listOfCards}
      </ul>
    )
  }


  const cardList = getCardList()
  const className = `phoneme-${index}`


  return (
    <div className={className}>
      {cardList}
      <div className="pocket"></div>
      <button 
        className="play-phoneme"
        onClick={() => playAudio(audio)}
      >
        {phoneme}
      </button>
    </div>
  )
}

export default Pocket