import React, { useContext, useRef, useState, useEffect } from 'react'
import { AudioContext } from './AudioContext'

import './Activity.css';
import CardAndPocket from './CardAndPocket'

import { getCards } from '../api/pairs'

import { getBooleanGenerator
       , detectMovement
       , startTracking
       , pointWithin
} from '../tools/utilities'
const getBoolean = getBooleanGenerator()


// <<< HARD-CODED
const REVIEW_DELAY = 2000;
const POCKET_DELAY = 200; // just a little more than transition-duration
const PLAY_DELAY = 1000
const NEXT_DELAY = 1000
const DEAL_DELAY = 300
// HARD-CODED >>>


const Activity = (props) => {
  // Shared with all cards and the Play Phoneme buttons
  const audio = useContext(AudioContext)
  // Used for animating cue and decoy cards
  const cueRef = useRef()
  const decoyRef = useRef()
  // Used for presenting cards in pocket
  const phoneme0Ref = useRef()
  const phoneme1Ref = useRef()
  const maskRef = useRef()
  // Used to trigger a re-render with a new card
  const [counter, setCounter] = useState(0)

  const {
    phonemes
  , word1
  , word2
  , played: playedCards
  } = getCards() // imported from pairs.js

  // { "phonemes": [
  //     { phoneme: "ɪ", audio: [0, 1], url: "audio/ɪ.mp3" }
  //   , { phoneme: "iː", audio: [0, 11], url: "audio/i.mp3" }
  //   ],
  //   "word1": {
  //     "spelling": "ship",
  //     "phonetic": "/∫ɪp/",
  //     "image": "img/ship.jpg",
  //     "url": "audio/ɪ.mp3"
  //     "audio": [
  //       12.34,
  //       13.24
  //     ]
  //   },
  //   "word2": {
  //     "spelling": "sheep",
  //     "phonetic": "/∫iːp/",
  //     "image": "img/sheep.jpg",
  //     "url": "audio/i.mp3",
  //     "audio": [
  //       6.78,
  //       7.68
  //     ]
  //   },
  //   "played" {
  //     "ɪ": [<card>, ...],
  //     "iː": [<card>, ...]
  //   }
  // }

  let wrong = false
  let inProgress = false
  let cueURL      // source of audio for cue card
    , cueClip     // [<start>, <end>] of audio for cue card
    , cueSpace    // cueRef.current: ".cue .card-holder.space"
    , cueCard     // div holding .back and .front inside cueSpace
    , decoyURL
    , decoyClip
    , decoySpace  // decoyRef.current: ".decoy .card-holder.space"
    , decoyCard   // div holding .back and .front inside decoySpace
    , phoneme0    // phoneme0Ref.current: <div class="phoneme-0 <role>">
    , phoneme1    // phoneme1Ref.current: <div class="phoneme-1 <role>">
    , mask        // maskRef.current
    , pockets     // [<decoy pocket>, <cue pocket>]

  // drag and drop
  let cueRect
    , decoyRect

  // pocket action
  let cardsAreSpread
    , visibleCard


  const playCue = () => {
    audio.playClip(cueURL, cueClip)
  }


  // CHECKING THE ANSWER / CHECKING THE ANSWER / CHECKING THE ANSWER //

  const showWrong = () => {
    if (wrong) {
      return
    }

    wrong = true
    cueCard.classList.remove("flipped")
    phoneme0.classList.add("wrong")
    phoneme1.classList.add("wrong")

    cueSpace.classList.add("active", "outside-pocket")
    setTimeout(() => {
      decoyCard.classList.remove("flipped")
      decoySpace.classList.add("active", "reveal", "outside-pocket")
    }, PLAY_DELAY )
  }


  /**
   * Move cue card to the appropriate pocket
   */
  const showNextCard = () => {
    cueSpace.classList.remove("active", "inside-pocket")
    decoySpace.classList.remove("reveal", "active", "inside-pocket")

    cueSpace.classList.add("deal")
    decoySpace.classList.add("deal")

    setCounter(counter + 1)
    inProgress = false
  }


  const hideOtherCard = () => {
    decoySpace.classList.add("active", "inside-pocket")
    setTimeout(showNextCard, NEXT_DELAY)
  }


  const playOtherCard = () => {
    audio.playClip(decoyURL, decoyClip)
    setTimeout(hideOtherCard, PLAY_DELAY)
  }


  const showOtherCard = () => {
    decoyCard.classList.remove("flipped")
    decoySpace.classList.add("reveal")
    setTimeout(playOtherCard, POCKET_DELAY)
  }


  const moveIntoPocket = () => {
    cueSpace.classList.remove("outside-pocket")
    cueSpace.classList.add("inside-pocket")

    setTimeout(showOtherCard, POCKET_DELAY)
  }


  const moveNearToPocket = () => {
    cueSpace.classList.add("outside-pocket")
    setTimeout(moveIntoPocket, POCKET_DELAY)
  }


  const playRightSequence = () => {
    if (wrong) {
      return
    }

    cueSpace.classList.add("active")
    audio.playClip(cueURL, cueClip)
    setTimeout(moveNearToPocket, REVIEW_DELAY)
  }


  // Input from pockets and (>) button

  const checkAnswer = event => {
    const target = event.target
    if (inProgress ||!target.classList.contains("pocket")) {
      return
    } else if (!isNaN(visibleCard)) {
      return
    }

    inProgress = true
    const phoneme = target.closest("[class|=phoneme")
    // <div class="phoneme-X cue|decoy">

    cueCard.classList.remove("flipped")

    const correct = (phoneme.classList.contains("cue"))
    if (correct) {
      playRightSequence()
    } else {
      showWrong()
    }
  }


  const proceed = () => {
    if (!isNaN(visibleCard)) {
      unspreadCards()
    } else {
      proceedToNextCard()
    }
  }


  const proceedToNextCard = () => {
    phoneme0.classList.remove("wrong")
    phoneme1.classList.remove("wrong")

    cueSpace.classList.remove("outside-pocket")
    decoySpace.classList.remove("outside-pocket")

    cueSpace.classList.add("inside-pocket")
    decoySpace.classList.add("inside-pocket")

    // Only after a mistake, not after checking a played card
    setTimeout(showNextCard, NEXT_DELAY)
  }


  const unspreadCards = () => {
    phoneme0.classList.remove("review")
    phoneme1.classList.remove("review")

    const cards = Array.from(document.querySelectorAll(".pocket-play"))
    cards.forEach( card => card.classList.remove("pocket-play"))
    visibleCard = undefined
  }


  // CUE DRAG AND DROP // CUE DRAG AND DROP // CUE DRAG AND DROP //

  const rider = (pageLoc) => {
    [cueRect, decoyRect].forEach((rect, index) => {
      const pocket = pockets[index]

      if (pointWithin(pageLoc, rect)) {
        pocket.classList.add("hover")
      } else {
        pocket.classList.remove("hover")
      }
    })
  }


  const drop = (pageLoc) => {
    cueSpace.style = {}

    pockets.forEach(pocket => pocket.classList.remove("hover"))

    if (pointWithin( pageLoc, cueRect)) {
      playRightSequence()

    } else if (pointWithin( pageLoc, decoyRect)) {
      showWrong()

    } else {
      return // don't flip the card
    }

    cueCard.classList.remove("flipped")

  }


  const startDrag = (event) => {
    cueSpace.style.transitionDuration = "0s"

    const cuePocket = document.querySelector(".cue .pocket")
    const decoyPocket = document.querySelector(".decoy .pocket")
    cueRect = cuePocket.getBoundingClientRect()
    decoyRect = decoyPocket.getBoundingClientRect()

    const options = {
      event
    , target: cueSpace
    , drag: ".space"
    , rider
    , drop
    }

    startTracking(options)
  }


  const checkForDrag = (event) => {
    // console.log("event.type:", event.type)
    const target = event.target.closest(".space")

    if (target) {
      const classList = target.classList

      if (classList.contains("active") || classList.contains("reveal")) {
        return playCue()
      }
    }

    detectMovement(event, 16, 0)
    .then(
      () => startDrag(event)
     )
    .catch(playCue)
  }


  // POCKET CLICK OR DRAG, AND PLAY // POCKET CLICK OR DRAG, AND PLAY //

  const pocketCard = (event) => {
    // Determine which card from the pocket was clicked. (This means
    // that the cards can be spread, so that the clicked card is not
    // necessarilly the top one.)
    const card = event.target.closest(".card-holder")
    const item = card.closest("li")
    const list = card.closest("ul")
    const index = Array.from(list.children).indexOf(item)

    // Determine which phoneme the clicked card uses: 0 or 1
    const className = list.parentNode.className
    const phoneme = parseInt(/phoneme-(\d)/.exec(className)[1], 10)

    // Get the text and audio data for the clicked card
    const phonemeData = playedCards[phonemes[phoneme].phoneme][index]
    const { url, clip, spelling } = phonemeData

    return {
      card
    , index
    , phoneme
    , url
    , clip
    , spelling // not yet used
    }
  }


  const pocketAction = (event) => { //}, url, clip, word) => {
    const { card, index, phoneme, url, clip } = pocketCard(event)

    // <<< NOT YET IMPLEMENTED
    if (cardsAreSpread) {
      if (visibleCard === index) {
        return audio.play(url, clip)
      }

      return makeCardVisible(index)
    }
    // NOT YET IMPLEMENTED >>>

    detectMovement(event, 16, 500)
      .then(
        // The user dragged the card within 500 ms
        () => prepareToSpreadCards(index, phoneme)
      )
      .catch(
        (reason) => {
          switch (reason) {
            default: return
            case "release":
              // Simple click: show card, play audio, then hide it
              return playFromPocket(card, url, clip)
            case "timeOut":
              // Long click
              return spreadCards(index, phoneme)
          }
        }
      )
  }


  const showCardOutsidePocket = (card) => {
    mask.classList.add("pocket-play")
    card.classList.add("pocket-play")
  }


  const showCardsOutsidePocket = (cards) => {
    mask.classList.add("pocket-play")
    cards.forEach(card => card.classList.add("pocket-play"))
    phoneme0.classList.add("review")
    phoneme1.classList.add("review")
  }


  const playFromPocket = (card, url, clip) => {
    showCardOutsidePocket(card)

    audio.playClip(url, clip)

    if (isNaN(visibleCard)) {
      // The cards are not spread
      setTimeout(() => {
        mask.classList.remove("pocket-play")
        card.classList.remove("pocket-play")
        }
      , PLAY_DELAY
      )
    }
  }


  const prepareToSpreadCards = (index, phoneme) => {
    // LEAVE FULL CARD SPREAD UNTIL LATER
    spreadCards(index, phoneme)

    // TODO
    // start dragging card
    // limit movement to one axis


    // finally(spreadCards)
  }

  const makeCardVisible = (word) => {
    // Adjust other cards in this list
    // Adjust all cards in matching list
    // Set this card to visibleCard
  }


  const spreadCards = (cardIndex, phonemeIndex) => {
    visibleCard = cardIndex

    const cards = [phoneme0, phoneme1].map(( phoneme, index ) => {
      const list = phoneme.querySelector("ul")
      const item = list.children[cardIndex]
      const card = item.children[0]

      if (index === phonemeIndex) {
        const phoneme = phonemes[phonemeIndex].phoneme // e.g. "ɪ"
        const cardData = playedCards[phoneme][cardIndex]
        const { url, clip } = cardData
        audio.playClip(url, clip)
      }

      return card
    })

    showCardsOutsidePocket(cards)
  }


  // GENERATING THE ACTIVITY LAYOUT // GENERATING THE ACTIVITY LAYOUT //

  const createPockets = () => {
    const useSecondCard = getBoolean()
    let cueAction

    const pockets = phonemes.map((phonemeData, index) => {
      // phonemeData = { phoneme, url, clip }

      // Determine if this card is cue or decoy
      const [ role, cardRef ]     = (index === useSecondCard)
                                  ? [ "decoy", decoyRef ]
                                  : [ "cue", cueRef]

      // All the other properties depend on the phoneme
      const [ cardData, pocketRef ] = index
                                  ? [ word2, phoneme1Ref ]
                                  : [ word1, phoneme0Ref ]
      const played = playedCards[phonemeData.phoneme]

      if (index !== useSecondCard) {
        cueURL = cardData.url
        cueClip = cardData.clip
        cueAction = checkForDrag

      } else {
        decoyURL = cardData.url
        decoyClip = cardData.clip
        cueAction = null
      }

      return <CardAndPocket
        index={index}
        cardData={cardData}
        phonemeData={phonemeData}
        role={role}
        cardRef={cardRef}
        ref={pocketRef}
        played={played}
        cueAction={cueAction}
        pocketAction={pocketAction}
      />
    })

    if (useSecondCard) {
      // Show the cue card on top, by rendering it last
      pockets.push(pockets.shift())
    }

    return pockets
  }


  const [ pocket1, pocket2 ] = createPockets()


  useEffect(() => {
    // eslint-disable-next-line
    cueSpace = cueRef.current
    // eslint-disable-next-line
    decoySpace = decoyRef.current
    // eslint-disable-next-line
    phoneme0 = phoneme0Ref.current
    // eslint-disable-next-line
    phoneme1 = phoneme1Ref.current
    // eslint-disable-next-line
    mask = maskRef.current

    // Pointers to DOM elements
    if (phoneme0.classList.contains("cue")) {
      // eslint-disable-next-line
      pockets = [
        phoneme0.querySelector(".pocket")
      , phoneme1.querySelector(".pocket")
      ]
    } else {
      pockets = [
        phoneme1.querySelector(".pocket")
      , phoneme0.querySelector(".pocket")
      ]
    }

    // eslint-disable-next-line
    cueCard = cueSpace.querySelector(".card")
    // eslint-disable-next-line
    decoyCard = decoySpace.querySelector(".card")

    decoySpace.classList.remove("deal")
    setTimeout(() => {
      cueSpace.classList.remove("deal")
      playCue()
    }, DEAL_DELAY )
  })


  return (
    <div
      className="activity"
      onClick={checkAnswer}
    >
      {pocket1}
      {pocket2}
      <div
        id="mask"
        ref={maskRef}
      />
      <p className="rule">Tap or drag to here</p>
      <button
        className="done"
        onClick={proceed}
      >
        ➤
      </button>
    </div>
  )
}

export default Activity;
