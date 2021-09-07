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
    // url: <string>
    // clip: [<startTime>, <endTime>]
    this.playing = false
    this.audio = new Audio(this.props.url)

    this.startAudioPlayback = this.startAudioPlayback.bind(this)
    this.stopAudioPlayback = this.stopAudioPlayback.bind(this)
    this.togglePlayback = this.togglePlayback.bind(this)
  }

  startAudioPlayback() {
    const [ startTime, endTime ] = this.props.clip
    const duration = (endTime - startTime) * 1000 // ms
    this.audio.currentTime = startTime            // s
    setTimeout(this.stopAudioPlayback, duration)

    try {
      this.audio.play()
                .then(result => {
                  console.log("Audio.play() result:", result)
                  this.playing = true
                }).catch(error => {
                  console.log("Audio.play() error:)", error)
                })
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
    const button = (
      <button
        onClick={this.togglePlayback}
        style={{position: "fixed", top: 0, left: 0}}
      >
        Play
      </button>
    );

    return button
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
