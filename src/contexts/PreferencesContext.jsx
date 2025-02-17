/**
 * src/contexts/PreferencesContext.jsx
 *
 * description
 */


import React, { createContext, useState, useEffect } from 'react'
import storage from '../tools/storage';

// Read localStorage values or use default preferences on first use
const store = storage.get({
  leftHanded: false
, split: true
, showCue: true
, phonetic: false
, taboo: false
, pair: undefined // will be set by default if missing
})


export const PreferencesContext = createContext()


export const PreferencesProvider = ({ children }) => {
  // Preferences will be set from store only the first time. The
  // saved state will be used thereafter.
  const [leftHanded, setleftHanded  ] = useState(store.leftHanded)
  const [split,      setSplit       ] = useState(store.split)
  const [showCue,    setShowCue     ] = useState(store.showCue)
  const [phonetic,   setShowPhonetic] = useState(store.phonetic)
  const [taboo,      setTaboo       ] = useState(store.taboo)
  
  const [pair,       setPair        ] = useState(store.pair)

  const [classes, setClasses ] = useState("")



  const toggleleftHanded = () => {
    const newValue = !leftHanded
    setleftHanded(newValue)
    storage.setItem("leftHanded", newValue)
  }


  const toggleSplit = () => {
    const newValue = !split
    setSplit(newValue)
    storage.setItem("split", newValue)
  }


  const toggleCue = () => {
    const newValue = !showCue
    setShowCue(newValue)
    storage.setItem("showCue", newValue)
  }


  const togglePhonetic = () => {
    const newValue = !phonetic
    setShowPhonetic(newValue)
    storage.setItem("phonetic", newValue)
  }


  const toggleTaboo = () => {
    const newValue = !taboo
    setTaboo(newValue)
    storage.setItem("taboo", newValue)
  }


  const choosePair = (pair) => {
    setPair(pair)
    storage.set({ pair })
  }


  const updateClasses = () => {
    const classes = ""
    + (leftHanded ? " left-handed"    : "")
    + (split      ? " split"          : "")
    + (showCue    ? " show-cue-image" : "")
    + (phonetic   ? " show-phonetic"  : "")
    setClasses(classes.trim())
  }


  useEffect(updateClasses)


  return (
    <PreferencesContext.Provider
      value ={{
        leftHanded,
        split,
        showCue,
        phonetic,
        taboo,
        pair,
        toggleleftHanded,
        toggleSplit,
        toggleCue,
        togglePhonetic,
        toggleTaboo,
        choosePair,
        classes
      }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}