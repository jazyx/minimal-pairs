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
    this.audio.play()
    this.playing = true
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
        {this.playing ? 'Pause' : 'Play'}
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
