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
import storage from '../tools/storage';

// Read localStorage values or use default preferences on first use
const store = storage.get({
  leftHanded: false
, split: true
, showCue: true
, showPhonetic: false
})


const Preferences = ({ classNameIsSet, toggleClassName, startActivity }) => {
  // Preferences will be set from store only the first time. The
  // saved state will be used thereafter.
  const [ leftHanded, setLeftHanded ] = useState(store.leftHanded)
  const [ split, setSplit ] = useState(store.split)
  const [ showCue, setShowCue ] = useState(store.showCue)
  const [ showPhonetic, setShowPhonetic ] = useState(store.showPhonetic)


  const toggleLeftHanded = () => {
    const newValue = !leftHanded

    toggleClassName("left-handed", newValue)
    setLeftHanded(newValue)
    storage.setItem("leftHanded", newValue)
  }


  const toggleSplit = () => {
    const newValue = !split

    toggleClassName("split", newValue)
    setSplit(newValue)
    storage.setItem("split", newValue)
  }


  const toggleShowCue = () => {
    const newValue = !showCue

    toggleClassName("show-cue-image", newValue)
    setShowCue(newValue)

    storage.setItem("showCue", newValue)
  }


  const toggleShowPhonetic = () => {
    const newValue = !showPhonetic

    toggleClassName("show-phonetic", newValue)
    setShowPhonetic(newValue)

    storage.setItem("showPhonetic", newValue)
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