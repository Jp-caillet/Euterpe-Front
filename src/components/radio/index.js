import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { CircleSlider } from 'react-circle-slider'
import { PlayerIcon } from 'react-player-controls'
import { connect } from 'react-redux'
import { Timer } from 'react-soundplayer/components'
import Modal from 'react-modal'
import axios from 'axios'

class Radio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      duration: null,
      secondsElapsed: null,
      pourcent: 0,
      value: 20,
      prevValue: 20,
      volumesong: 0.2,
      url: '',
      thumbnailUrl: '',
      timerCurrent: 0,
      modalIsOpen: false,
      urlSend: ''
    }

    this.onDuration = this.onDuration.bind(this)
    this.onProgress = this.onProgress.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onEnded = this.onEnded.bind(this)
    this.onLoad = this.onLoad.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.onLoad()
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

  onLoad() {
    const { match } = this.props
    axios.post('http://localhost:4000/music/show', { radio: match.params.id })
      .then((resp) => {
        console.log(resp)
        const { duration } = resp.data
        const { url } = resp.data
        const { thumbnailUrl } = resp.data
        const { started } = resp.data
        const toto = new Date(started)
        const date = new Date()
        const seconds = (date.getTime() / 1000) - (toto.getTime() / 1000)
        const timerCurrent = seconds - 10
        this.setState({ duration })
        this.setState({ url })
        this.setState({ thumbnailUrl })
        this.setState({ timerCurrent })
      }).catch((error) => {
        console.log(error)
      })
  }

  onEnded() {
    const { match } = this.props
    axios.post('http://localhost:4000/music/show', { radio: match.params.id })
      .then((resp) => {
        console.log(resp)
        const { duration } = resp.data
        const { url } = resp.data
        const { thumbnailUrl } = resp.data
        const { started } = resp.data
        const toto = new Date(started)
        const date = new Date()
        const seconds = (date.getTime() / 1000) - (toto.getTime() / 1000)
        const timerCurrent = seconds - 10
        this.setState({ duration })
        this.setState({ url })
        this.setState({ thumbnailUrl })
        this.setState({ timerCurrent })
      }).catch((error) => {
        console.log(error)
      })
  }

  onChange() {
    let { value } = this.state
    const { prevValue } = this.state
    if (value === 0) {
      value = prevValue
      this.setState({ value })
    } else {
      value = 0
      this.setState({ value })
    }
    const volumesong = value / 100
    this.setState({ volumesong })
  }

  handleChange(value) {
    this.setState({ value })
    const prevValue = value
    const volumesong = value / 100
    this.setState({ volumesong })
    this.setState({ prevValue })
  }

  openModal() {
    this.setState({ modalIsOpen: true })
  }

  closeModal() {
    const { urlSend } = this.state
    const { match } = this.props

    axios.post('http://localhost:4000/music/create', { nameRadio: match.params.id, url: urlSend })
      .then((resp) => {
        console.log(resp.data)
      })
    this.setState({ modalIsOpen: false })
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const {
      secondsElapsed,
      pourcent,
      duration,
      value,
      volumesong,
      url,
      thumbnailUrl,
      timerCurrent,
      modalIsOpen,
      urlSend
    } = this.state
    const divStyle = {
      width: `${pourcent}%`
    }
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '600px',
        transform: 'translate(-50%, -50%)'
      }
    }
    const { auth: { loggedIn } } = this.props
    let addSongPermiss
    if (loggedIn) {
      addSongPermiss = (
        <button style={{ outline: 'none' }} className="buttonAddImg" type="button" onClick={this.openModal}>
          <img className="addImg" src="../src/img/add.png" alt="test" />
        </button>
      )
    } else {
      addSongPermiss = (
        <button style={{ outline: 'none' }} className="buttonAddImg" type="button">
          <div className="tooltip">
            <img className="addImg" src="../src/img/add.png" alt="test" />
            <span className="tooltiptext">veuillez vous connecter</span>
          </div>
        </button>
      )
    }
    let iconVolume
    if (value !== 0) {
      iconVolume = <PlayerIcon.SoundOn width={32} height={32} style={{ marginRight: 15 }} />
    } else {
      iconVolume = <PlayerIcon.SoundOff width={32} height={32} style={{ marginRight: 15 }} />
    }
    const createUrl = `${url}&t=${timerCurrent}s`
    return (
      <div>
        <div style={{ width: '100%' }}>
          <img className="imgStyle" src={thumbnailUrl} alt="Logo" />
        </div>
        <br />
        <ReactPlayer
          className="react-player"
          url={createUrl}
          volume={volumesong}
          onDuration={this.onDuration}
          onProgress={this.onProgress}
          onEnded={this.onEnded}
          playing
          hidden
        />
        <div className="timerblock">
          <button type="button" className="viewMore" style={{ outline: 'none' }} onClick={this.onChange}>{iconVolume}</button>
          <div className="CircleSlider">
            <CircleSlider
              className="CircleSlider"
              circleWidth={5}
              knobRadius={10}
              size={80}
              value={value}
              progressWidth={5}
              showPercentage={true}
              showTooltip={true}
              tooltipSize={14}
              onChange={this.handleChange}
            />
          </div>
          <div id="progressbar">
            <div style={divStyle} />
          </div>
          <Timer className="timer" duration={duration} currentTime={secondsElapsed} />
          {addSongPermiss}
        </div>
        <br />
        <div>

          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            ariaHideApp={false}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <form onSubmit={this.closeModal}>
              <input
                className="inputUrl"
                type="text"
                name="urlSend"
                placeholder="ajouter un lien youtube"
                value={urlSend}
                onChange={this.handleInputChange}
              />
              <button type="button">send</button>
            </form>
          </Modal>
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Radio)

