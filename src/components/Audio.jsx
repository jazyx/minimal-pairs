/**
 * /src/components/Audio.jsx
 * 
 * This script creates a React component for an Audio
 * element. 
 */

import React, {Component} from 'react'


class AudioElement extends Component {
  constructor(props) {
    super(props)
    this.playing = false
    this.audio = new Audio(this.props.url)

    this.startAudioPlayback = this.startAudioPlayback.bind(this)
    this.stopAudioPlayback = this.stopAudioPlayback.bind(this)
    this.togglePlayback = this.togglePlayback.bind(this)
  }

  startAudioPlayback() {
    this.audio.currentTime = this.props.startTime
    setTimeout(this.stopAudioPlayback, this.props.duration * 1000)

    try {
      this.audio.play()
      this.playing = true
    } catch(error) {
      // User needs to click before audio can be played
    }
  }
  
  stopAudioPlayback() {
    this.audio.pause()
    this.playing = false
  }

  togglePlayback() {
    if (this.playing) {
      this.stopAudioPlayback()
    } else {
      this.startAudioPlayback()
    }
  }

  render() {
    return (
      <button onClick={this.togglePlayback}>
        Play
      </button>
    );
  }

  componentDidMount() {
    this.audio.onended = this.stopAudioPlayback;
    this.startAudioPlayback()
  }

  componentDidUpdate() {
    this.startAudioPlayback()
  }
  
  componentWillUnmount() {
    this.audio.onended = null;
    this.stopAudioPlayback()
  }
}

export default AudioElement;
