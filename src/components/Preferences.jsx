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


const Preferences = ({ classNameIsSet, toggleClassName }) => {

  const [ leftHanded, setLeftHanded ] = useState(classNameIsSet("left-handed"))

  const toggleLeftHanded = () => {
    setLeftHanded(!leftHanded)
    toggleClassName("left-handed", !leftHanded)
  }


  return (
    <div id="preferences">
      <h1>Preferences</h1>
      <fieldset>
        <legend>Layout</legend>
        <label htmlFor="left-handed">
          <input
            id="left-handed"
            type="checkbox"
            defaultChecked={leftHanded}
            onChange={toggleLeftHanded}
          />
          Use left-handed layout
        </label>
      </fieldset>
    </div>
 )
}


export default Preferences