import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { Timer } from 'react-soundplayer/components'
import Slider from './components/slider.js'
import CircularSlider from 'react-circular-slider-bar'

export default class Radio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      duration: null,
      secondsElapsed: null,
      pourcent: 0
    }

    this.onDuration = this.onDuration.bind(this)
    this.onProgress = this.onProgress.bind(this)
  }

  onDuration(duration) {
    this.setState({ duration })
  }

  onProgress(progress) {
    const { duration } = this.state
    if (!duration) {
      // Sadly we don't have the duration yet so we can't do anything
      return
    }
    // progress.played is the fraction of the video that has been played
    // so multiply with duration to get number of seconds elapsed
    const secondsElapsed = progress.played * duration
    const pourcent = secondsElapsed / duration * 100
    this.setState({ pourcent })
    this.setState({ secondsElapsed })
  }

  render() {
    const {
      secondsElapsed, pourcent, duration
    } = this.state
    const divStyle = {
      width: `${pourcent}%`
    }
    
    return (
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          url="https://www.youtube.com/watch?v=SYM-RJwSGQ8"
          width="10%"
          height="10%"
          volume={0.1}
          onDuration={ this.onDuration }
          onProgress={ this.onProgress }
          playing
        />

        <div id="progressbar">
          <div style={divStyle} />
        </div>
        <Timer duration={duration} currentTime={secondsElapsed} />
        <Slider />
        <div id="volumcontroller">
</div>
    <CircularSlider
      r={50}
      trackWidth={10}
      thumbWidth={10}
      onChange={value => console.log(value)}
    />
      </div>

    )
  }
}
