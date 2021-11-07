import React, { useState } from "react";
import { AudioProvider } from "./AudioContext"

import Views from "../api/views";
import Menu from "./Menu";


const App = (props) => {
  const [ view, setView ] = useState("About")

  const selectFromMenu = (newView) => {
    if (typeof newView !== "string") {
      newView = "Activity"
    }

    setView(newView)
  }

  const View = Views[view];

  return (
    <AudioProvider>
      <main className="split left-handed show--phonetic show-cue-image">
        <View
          startActivity={selectFromMenu}
        />
        <Menu
          selectFromMenu={selectFromMenu}
        />
      </main>
    </AudioProvider>
  );
}

export default App;
