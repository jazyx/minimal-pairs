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
  const startUp = {
    leftHanded: classNameIsSet("left-handed")
    , split: classNameIsSet("split")
    , showCue: classNameIsSet("show-cue-image")
  }
  const [ leftHanded, setLeftHanded ] = useState(startUp.leftHanded)
  const [ split, setSplit ] = useState(startUp.split)
  const [ showCue, setShowCue ] = useState(startUp.showCue)


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
    setSplit(!showCue)
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