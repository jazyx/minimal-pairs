import React, { useState } from "react";
import { AudioProvider } from "./AudioContext"

import Views from "../api/views";
import Menu from "./Menu";


const App = (props) => {
  const [ view, setView ] = useState("Activity")

  const selectFromMenu = (newView) => {
    if (!newView) {
      newView = "Activity"
    }

    setView(newView)
  }

  const View = Views[view];

  return (
    <AudioProvider>
      <main className="split left--handed show--phonetic">
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
