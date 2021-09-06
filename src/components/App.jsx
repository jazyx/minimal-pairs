import React, { Component } from 'react'

import './App.css';
import Activity from './Activity'
import Menu from './Menu'

class App extends Component{

  render() {
    return (
      <main className="split left--handed">
        <Activity />
        <Menu />
      </main>
    )    
  }
}

export default App;
