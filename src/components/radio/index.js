import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { PlayerIcon, FormattedTime  } from 'react-player-controls'
import { Timer } from 'react-soundplayer/components'

export default class Radio extends Component {

  constructor(props) {
    super(props)
    this.state = { duration: null,
    secondsElapsed: null,
    pourcent: 0 }
    
  }

   onDuration (duration)  {
    this.setState({ duration })
  }

  onProgress (progress)  {
    if (!this.state.duration) {
      // Sadly we don't have the duration yet so we can't do anything
      return
    }
    // progress.played is the fraction of the video that has been played
    // so multiply with duration to get number of seconds elapsed
    const secondsElapsed = progress.played * this.state.duration
    const pourcent = secondsElapsed/this.state.duration*100
      this.setState({ pourcent })
    
    if (secondsElapsed !== this.state.secondsElapsed) {
      this.setState({ secondsElapsed })
    }
  }

   render() {
    
    const {secondsElapsed, pourcent, duration} = this.state
    const divStyle = {
      width: pourcent+'%'
    }
     return (
      <div className='player-wrapper'>
        <ReactPlayer
          className='react-player'
          url='https://www.youtube.com/watch?v=SYM-RJwSGQ8'
          width='10%'
          height='10%'
          volume = '0'
          onDuration={this.onDuration.bind(this)}
          onProgress={this.onProgress.bind(this)}
          playing 
        />
        
        <div id="progressbar" >
          <div style={divStyle}></div>
        </div>
        <Timer duration={duration} currentTime={secondsElapsed} />
        
       
      </div>


    )
  }
}