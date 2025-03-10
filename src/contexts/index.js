/**
 * src/contexts/index.js
 *
 *
 * */

import React, { createContext } from "react";
import { AudioContext, AudioProvider } from "./AudioContext";
import { UserContext, UserProvider } from "./UserContext";
import { PairsContext, PairsProvider } from "./PairsContext";
import {
  PreferencesContext,
  PreferencesProvider
} from "./PreferencesContext";

const Context = createContext();

export const Provider = ({ children }) => {
  return (
    <Context.Provider
      value={{}} // required to prevent React warnings
    >
      <PreferencesProvider>
        <PairsProvider>
          <UserProvider>
            <AudioProvider>
              {children}
            </AudioProvider>
          </UserProvider>
        </PairsProvider>
      </PreferencesProvider>
    </Context.Provider>
  );
};

export {
  AudioContext,
  PairsContext,
  UserContext,
  PreferencesContext
};
