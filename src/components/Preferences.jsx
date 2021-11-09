/**
 * /src/components/Preferences.jsx
 */


/**
 * Text:
 * - show word
 * - show phonetic
 * - hide
 * Landscape layout
 *   Left | Right-handed
 *   Split layout when the screen is wide enough
 * Show|Hide cue image
 * Interface language
 * Target language
 */


import React, { useState } from 'react';


const Preferences = ({ classNameIsSet, toggleClassName, startActivity }) => {
  const store = {
    leftHanded: classNameIsSet("left-handed")
  , split: classNameIsSet("split")
  , showCue: classNameIsSet("show-cue-image")
  , showPhonetic: classNameIsSet("show-phonetic")
  }
  const [ leftHanded, setLeftHanded ] = useState(store.leftHanded)
  const [ split, setSplit ] = useState(store.split)
  const [ showCue, setShowCue ] = useState(store.showCue)
  const [ showPhonetic, setShowPhonetic ] = useState(store.showPhonetic)


  const toggleLeftHanded = () => {
    toggleClassName("left-handed", !leftHanded)
    setLeftHanded(!leftHanded)
  }


  const toggleSplit = () => {
    toggleClassName("split", !split)
    setSplit(!split)
  }


  const toggleShowCue = () => {
    toggleClassName("show-cue-image", !showCue)
    setShowCue(!showCue)
  }


  const toggleShowPhonetic = () => {
    toggleClassName("show-phonetic", !showPhonetic)
    setShowPhonetic(!showPhonetic)
  }


  return (
    <div id="preferences">
      <h1>Preferences</h1>
      <fieldset>
        <legend>Display</legend>
        <label htmlFor="left-handed">
          Left-handed
          <input
            id="left-handed"
            type="checkbox"
            defaultChecked={leftHanded}
            onChange={toggleLeftHanded}
          />
          <span className="slot">
            <span className="slider" />
          </span>
          Right-handed
        </label>


        <label htmlFor="split">
          <input
            id="split"
            type="checkbox"
            defaultChecked={split}
            onChange={toggleSplit}
          />
          <span className="slot">
            <span className="slider" />
          </span>
          Use split layout in landscape mode
        </label>

        <label htmlFor="showCue">
          <input
            id="showCue"
            type="checkbox"
            defaultChecked={showCue}
            onChange={toggleShowCue}
          />
          <span className="slot">
            <span className="slider" />
          </span>
          Show cue image
        </label>


        <label htmlFor="showPhonetic">
          <input
            id="showPhonetic"
            type="checkbox"
            defaultChecked={showPhonetic}
            onChange={toggleShowPhonetic}
          />
          <span className="slot">
            <span className="slider" />
          </span>
          Always show phonetic spelling
        </label>
      </fieldset>

      <button
        className="continue"
        onClick={startActivity}
      >
        Continue
      </button>
    </div>
 )
}


export default Preferences