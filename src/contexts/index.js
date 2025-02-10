/**
 * src/contexts/index.js
 *
 * description
 */


import React, { createContext } from 'react'
import { AudioContext, AudioProvider } from './AudioContext'
import { PairsContext, PairsProvider } from './PairsContext'
import {
  PreferencesContext,
  PreferencesProvider
} from './PreferencesContext'


const Context = createContext()


export const Provider = ({ children }) => {

  return (
    <Context.Provider
      value={{}} // required to prevent React warnings
    >
      <PreferencesProvider>
        <PairsProvider>
          <AudioProvider>
            {children}
          </AudioProvider>
        </PairsProvider>
      </PreferencesProvider>
    </Context.Provider>
  )
}

export {
  AudioContext,
  PairsContext,
  PreferencesContext
}