import React, { Component } from "react";

import "./App.css";
import Views from "../api/views";
import Menu from "./Menu";
import Audio from "./Audio";

const AUDIO_URL = "audio/pairs.mp3"

class App extends Component {
  constructor(props) {
    super(props);
    this.selectFromMenu = this.selectFromMenu.bind(this);
    this.playAudio = this.playAudio.bind(this)

    this.state = { 
      view: "Activity"
    , url: AUDIO_URL
    , clip: [0, 1]
    };
  }

  selectFromMenu(view) {
    if (!view) {
      view = "Activity"
    }

    this.setState({ view })
  }

  playAudio(clip) {
    this.setState({ clip })
  }

  render() {
    const View = Views[this.state.view];

    return (
      <main className="split left--handed">
        <View
          startActivity={this.selectFromMenu}
        />
        <Menu
          selectFromMenu={this.selectFromMenu}
        />
        <Audio
          url={this.state.url}
          clip={this.state.clip}
        />
      </main>
    );
  }
}

export default App;
