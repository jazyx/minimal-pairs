import React, { Component } from "react";

import "./App.css";
import Views from "../api/views";
import Menu from "./Menu";

class App extends Component {
  constructor(props) {
    super(props);
    this.selectFromMenu = this.selectFromMenu.bind(this);

    this.state = { view: "Activity" };
  }

  selectFromMenu(view) {
    this.setState({ view })
  }

  render() {
    const View = Views[this.state.view];

    return (
      <main className="split left--handed">
        <View />
        <Menu selectFromMenu={this.selectFromMenu} />
      </main>
    );
  }
}

export default App;
