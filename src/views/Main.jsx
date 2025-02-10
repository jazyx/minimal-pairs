/**
 * src/components/Main.jsx
 */


import React, {
  useState,
  useRef,
  useEffect,
  useContext
} from "react";
import { PreferencesContext } from "../contexts"

import Views from ".";
import Menu from "../components/Menu";

let mainElement


export const Main = (prop) => {
  const { classes } = useContext(PreferencesContext)
  const [ view, setView ] = useState("About")
  const mainRef = useRef()


  const selectFromMenu = (newView) => {
    if (typeof newView !== "string") {
      newView = "Activity"
    }

    setView(newView)
  }


  const classNameIsSet = (className) => {
    if (!mainElement) {
      console.log("Can't get className until mainElement is initialized")
      return
    }

    return mainElement.classList.contains(className)
  }


  const toggleClassName = (className, on) => {
    if (!mainElement) {
      console.log("Can't set className until mainElement is initialized")
      return
    }

    if (on === false) {
      mainElement.classList.remove(className)
    } else {
      mainElement.classList.add(className)
    }
  }


  useEffect(() => {
    mainElement = mainRef.current
  }, [])


  const View = Views[view];

  return (
    <main
      className={classes}
      ref={mainRef}
    >
      <View
        startActivity={selectFromMenu}
        toggleClassName={toggleClassName}
        classNameIsSet={classNameIsSet}
      />
      <Menu
        selectFromMenu={selectFromMenu}
      />
    </main>
  )
}