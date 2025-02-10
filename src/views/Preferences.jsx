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


import React, { useContext } from 'react';
import { PreferencesContext } from '../contexts';
import './Preferences.css'


const Preferences = ({ startActivity }) => {
  const {
    leftHanded,
    split,
    showCue,
    phonetic,
    taboo,
    toggleleftHanded,
    toggleSplit,
    toggleCue,
    togglePhonetic,
    toggleTaboo
  } = useContext(PreferencesContext)

  return (
    <div id="preferences">
      <fieldset>
        <legend>Preferences</legend>

        <label htmlFor="left-handed">
          Left-handed
          <input
            id="left-handed"
            type="checkbox"
            defaultChecked={leftHanded}
            onChange={toggleleftHanded}
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
            onChange={toggleCue}
          />
          <span className="slot">
            <span className="slider" />
          </span>
          Show cue image
        </label>

        <label htmlFor="phonetic">
          <input
            id="phonetic"
            type="checkbox"
            defaultChecked={phonetic}
            onChange={togglePhonetic}
          />
          <span className="slot">
            <span className="slider" />
          </span>
          Always show phonetic spelling
        </label>

        <label htmlFor="taboo">
          <input
            id="taboo"
            type="checkbox"
            defaultChecked={taboo}
            onChange={toggleTaboo}
          />
          <span className="slot">
            <span className="slider" />
          </span>
          Allow taboo 🤬 words
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