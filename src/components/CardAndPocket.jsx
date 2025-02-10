/**
 * /src/components/CardAndPocket.jsx
 *
 * This script creates a component which contains:
 *
 * - An unordered list of previously seen cards
 * - A two-sided card, whose z-index may change
 * - A "pocket" for the card and lists to be placed behind
 *
 * Stacking
 * --------
 * Each of these components will be absolutely placed, so that their
 * internal elements will belong to the same stacking context. The
 * container <div> will not be positioned, so co-ordinates will be
 * determined with respect to the <main> parent element. There will be
 * two CardAndPocket components, one for the decoy card and one for the
 * cue card. The stacking will be as follows:
 *
 * <main (positioned by flex)>
 *   <div (not positioned)>
 *     <decoy list />
 *     <decoy card />
 *     <decoy pocket />
 *   </div>
 *   <div (not positioned>
 *     <cue list />
 *     <cue card />
 *     <cue pocket />
 *       (cue card when z-index is 1)
 *   </div>
 * </main>
 *
 *
 * Pocket
 * ------
 * The pocket will have a phonetic symbol on it, and a button with a
 * Play Audio icon. If you press this button, you will hear a recording
 * of the phonetic sound.
 *
 * Card
 * ----
 * The card will initially be displayed facing down. The Play Audio
 * symbol will appear on its back. On the front of the card will be
 * shown:
 * - A word
 * - A phonetic transcription of the word
 * - An image illustrating the word
 *
 * Pressing on the card (on either side) will play a recording of the
 * word.
 *
 * Previous Cards
 * --------------
 * The most recent card will be partly visible in the pocket. The
 * earlier cards will be hidden behind it.
 *
 * Clicking on the visible part of the top card will:
 * • Block any other mouse interactions
 * • Slide the card out of the pocket
 * • Play the audio associated with the card
 * • Slide the card back in
 * • Restore other mouse interactions.
 *
 * Clicking-and-holding on the visible part of the top card, or
 * dragging the card in any direction, will:
 * • Block default other mouse interactions
 * • Slide both lists of cards out of the pocket in two ribbon spreads
 * • Show a > button, which will return the cards to their pockets and *   restore other mouse interactions
 * • Wait for the user to click on a card
 *
 *
 *
 * INTERACTIONS
 * ============
 * Interactions are controlled by the Activity.jsx script.
 *
 * Card Interactions
 * -----------------
 * The card may represent either a cue or a decoy. Another instance of
 * this component will create a matching decoy/cue Card and Pocket pair.
 *
 * If it is a cue, its audio recording will be played automatically.
 * If the user then either presses the matching pocket or drags the
 * card to the pocket, a Success Sequence will play:
 *
 * 1. The card will be placed over the pocket (z-index > 0)
 * 2. Its audio recording will play
 * 3. It will slide to the edge of the pocket...
 * 4. ... lose its z-index ...
 * 5. ... and slide in behind the pocket
 *
 * There are 3 preference settings to determine what happens next.
 * 1. By default, the associated decoy card will flip over, play its
 *    audio, then slide behind the other pocket
 * 2. If Play Similar Word is not checked, the associated decoy card
 *    will simply turn over and slide behind the other pocket
 * 3. If Compare With Similar Word is not checked, the associated decoy
 *    card will not even be shown.
 *
 * Interactions with Previous Cards
 * --------------------------------
 * A simple press on the visible part of a previous card will play its
 * word, so you can compare the words from the top card in each pocket.
 *
 * A prolonged press or a drag on a previous card will spread the cards
 * over the window:
 *
 * 1. All cards will be moved together to the far end,
 * 2. All cards from both pockets will be spread back towards the
 *    pocket, so that the top card in each set is over the pocket (just
 *    where it was when it was correctly played). It will not overlap
 *    any other card. The other cards will overlap equally, if there is
 *    not enough space for them to appear separately.
 * 3. Clicking on a wholly visible card will play its audio, and then
 *    the audio of the matching card in the other set
 * 4. Clicking on the visible part of a card which is overlapped will
 *    adjust the position of the other cards so that the clicked card
 *    is fully visible, and the cards either side are partly visible
 *    where other cards do not overlap them.
 *
 * At the place where the text "Tap or drag to here" is shown, a button
 * labelled "Done" will appear. Clicking on this will move all the
 * previously viewed cards into two piles at the edge of their
 * respective pockets, and then slide them in.
 */

import React, { useContext, forwardRef } from 'react'
import { AudioContext } from '../contexts/AudioContext'

import Card from './Card'

const CardAndPocket = forwardRef((props, pocketRef) => {
  const { playClip } = useContext(AudioContext)
  const {
    index        // 0 | 1
  , cardData     // { spelling, phonetic, image, url, clip }
  , phonemeData  // { phoneme, url, clip }
  , role         // cue    | decoy
  , cardRef      // cueRef | decoyRef
  , played       // [ <card object>, ... ]
  , cueAction    // Activity.checkForDrag, for cue card
  , pocketAction //
  } = props

  const {
    phoneme
  , url
  , clip
  } = phonemeData

  const card = (
    <Card
      card={cardData}
      role={role}
      ref={cardRef}
      action={cueAction}
    />
  );

  const getCard = ( card ) => {
    const key = card.spelling
    return (
      <li
        key={key}
      >
        <Card
          card={card}
          action={pocketAction}
        />
      </li>
    )
  }

  const listOfCards = played.map(getCard)

  const className = `phoneme-${index} ${role}`

  return (
    <div
      className={className}
      ref={pocketRef}
    >
      <ul>
        {listOfCards}
      </ul>

      {card} {/* initially with z-index > 0 to appear above pocket */}

      <div
        className="pocket unselectable"
      >
        /{phoneme}/

        <button
          className="play-phoneme"
          onClick={() => playClip(url, clip)}
        />
      </div>
    </div>
   )
})

export default CardAndPocket