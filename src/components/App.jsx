import React, { useState, useRef, useEffect } from "react";
import { AudioProvider } from "./AudioContext"

import Views from "../api/views";
// { About
// , Activity
// , Contact
// , Index
// , Preferences
// , Splash
// }
import Menu from "./Menu";


let mainElement


const App = (props) => {
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


  useEffect(() => {
    mainElement = mainRef.current
  }, [])


  const View = Views[view];

  return (
    <AudioProvider>
      <main
        className="split show-cue-image"
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
    </AudioProvider>
  );
}

export default App;
