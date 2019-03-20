import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { CircleSlider } from 'react-circle-slider'
import { connect } from 'react-redux'
import { Timer } from 'react-soundplayer/components'
import Modal from 'react-modal'
import axios from 'axios'
import openSocket from 'socket.io-client'

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
      urlSend: '',
      musiqueName: '',
      like: false,
      dislike: false,
      id: '',
      messages: [],
      messageInput: ''
    }
    this.socket = openSocket('http://localhost:4000')

    this.onDuration = this.onDuration.bind(this)
    this.onProgress = this.onProgress.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onEnded = this.onEnded.bind(this)
    this.onLoad = this.onLoad.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.like = this.like.bind(this)
    this.dislike = this.dislike.bind(this)
    this.chatAdd = this.chatAdd.bind(this)
    this.onLoad()
  }

  componentDidUpdate() {
    const { messages } = this.state
    const { match } = this.props
    this.socket.on(match.params.id, (message) => {
      const returnValue = messages
      returnValue.push(
        <div className="chat dark">
          <p>
            {message.user}
            {' '}
:
            {' '}
            {message.mess}
          </p>
          <span className="time-left">
            {message.heure}
:
            {message.minute}
          </span>
        </div>
      )
      this.setState({ messages: returnValue })
    })
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
    const { match, auth } = this.props
    axios.post('http://localhost:4000/music/show', { radio: match.params.id, token: auth.token })
      .then((resp) => {
        const { duration } = resp.data
        const { url } = resp.data
        const { thumbnailUrl } = resp.data
        const { started } = resp.data
        const { like } = resp.data
        const { dislike } = resp.data
        const { id } = resp.data
        const toto = new Date(started)
        const date = new Date()
        const seconds = (date.getTime() / 1000) - (toto.getTime() / 1000)
        const timerCurrent = seconds - 10
        this.setState({ duration })
        this.setState({ url })
        this.setState({ thumbnailUrl })
        this.setState({ timerCurrent })
        this.setState({ like })
        this.setState({ dislike })
        this.setState({ id })
        this.setState({ musiqueName: resp.data.title })
      }).catch((error) => {
        console.log(error)
      })
  }

  onEnded() {
    const { match, auth } = this.props
    axios.post('http://localhost:4000/music/show', { radio: match.params.id, token: auth.token })
      .then((resp) => {
        const { duration } = resp.data
        const { url } = resp.data
        const { thumbnailUrl } = resp.data
        const { started } = resp.data
        const { like } = resp.data
        const { dislike } = resp.data
        const { id } = resp.data
        const toto = new Date(started)
        const date = new Date()
        const seconds = (date.getTime() / 1000) - (toto.getTime() / 1000)
        const timerCurrent = seconds - 10
        this.setState({ duration })
        this.setState({ url })
        this.setState({ thumbnailUrl })
        this.setState({ timerCurrent })
        this.setState({ like })
        this.setState({ dislike })
        this.setState({ id })
        this.setState({ musiqueName: resp.data.title })
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

  like() {
    const { like, id, dislike } = this.state
    const { auth: { loggedIn, token } } = this.props
    if (loggedIn) {
      if (like) {
        this.setState({ like: false })
      } else {
        this.setState({ like: true })
      }
      this.setState({ dislike: false })
      axios.post('http://localhost:4000/music/like', { musicId: id, token })
      if (dislike) {
        axios.post('http://localhost:4000/music/dislike', { musicId: id, token })
      }
    }
  }

  dislike() {
    const { like, id, dislike } = this.state
    const { auth: { loggedIn, token } } = this.props
    if (loggedIn) {
      if (dislike) {
        this.setState({ dislike: false })
      } else {
        this.setState({ dislike: true })
      }
      this.setState({ like: false })
      axios.post('http://localhost:4000/music/dislike', { musicId: id, token })
      if (like) {
        axios.post('http://localhost:4000/music/like', { musicId: id, token })
      }
    }
  }

  chatAdd() {
    const { messageInput } = this.state
    const { auth, match } = this.props
    const messagetosend = `${match.params.id}&/${auth.login}&/${messageInput}`
    this.socket.emit('message', messagetosend)
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
      urlSend,
      musiqueName,
      like,
      dislike,
      messages,
      messageInput
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
    let buttonLike

    if (like) {
      buttonLike = <img className="addImg" src="../src/img/like-done.png" alt="Logo" />
    } else {
      buttonLike = <img className="addImg" src="../src/img/like.png" alt="Logo" />
    }
    let buttonDislike
    if (dislike) {
      buttonDislike = <img className="addImg" src="../src/img/dislike-done.png" alt="Logo" />
    } else {
      buttonDislike = <img className="addImg" src="../src/img/dislike.png" alt="Logo" />
    }
    const { auth: { loggedIn }, match } = this.props
    let addSongPermiss
    if (loggedIn) {
      addSongPermiss = (
        <button style={{ outline: 'none', backgroundColor: 'Transparent' }} className="buttonAddImg" type="button" onClick={this.openModal}>
          <img className="addImg" src="../src/img/cross-white.png" alt="test" />
        </button>
      )
    } else {
      addSongPermiss = (
        <button style={{ outline: 'none', backgroundColor: 'Transparent' }} className="buttonAddImg" type="button">
          <div className="tooltip">
            <img className="addImg" src="../src/img/cross-white.png" alt="test" />
            <span className="tooltiptext">veuillez vous connecter</span>
          </div>
        </button>
      )
    }
    let iconVolume
    if (value !== 0) {
      iconVolume = <img src="../src/img/unmute.png" alt="Logo" />
    } else {
      iconVolume = <img src="../src/img/mute.png" alt="Logo" />
    }
    const createUrl = `${url}&t=${timerCurrent}s`
    return (
      <div style={{
        backgroundImage: 'radial-gradient(circle at top left,#524333, black)',
        marginLeft: '150px', /* Same as the width of the sidenav */
        fontSize: '28px', /* Increased text to enable scrolling */
        padding: '0px 10px',
        height: '91%',
        position: 'fixed',
        width: '100%'
      }}
      >
        <div id="gauche">
          <img className="imageEvent" src={thumbnailUrl} alt="Logo" />
          <div className="title">{musiqueName}</div>
          <div className="radioName">
            { `( ${match.params.id} )` }
          </div>
          <div className="radioName">
            <button
              style={{ outline: 'none', backgroundColor: 'Transparent', marginRight: '10px' }}
              className="buttonAddImg"
              type="button"
              onClick={this.like}
            >
              { buttonLike }
            </button>
            <button
              style={{ outline: 'none', backgroundColor: 'Transparent' }}
              className="buttonAddImg"
              type="button"
              onClick={this.dislike}
            >
              { buttonDislike }
            </button>
          </div>
        </div>

        <div id="droite">
          <div className="chatBox">
            <div className="chatscrool">
              { messages.map(item => (
                <div key={item}>
                  { item }
                </div>

              ))}
            </div>
            <div>
              <input
                className="inputChat"
                type="text"
                placeholder="Your message.."
                name="messageInput"
                value={messageInput}
                onChange={this.handleInputChange}
              />
              <button
                style={{ outline: 'none', backgroundColor: 'Transparent', marginLeft: '75%' }}
                className="buttonAddImg"
                type="submit"
              >
                <img className="buttonSend" src="../src/img/send.png" alt="Logo" onClick={this.chatAdd} />
              </button>
            </div>
          </div>

        </div>

        <div className="footer">
          <div className="center-footer">
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
              <button type="button" className="viewMore" style={{ outline: 'none', marginLeft: '7%' }} onClick={this.onChange}>{iconVolume}</button>
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
          </div>
        </div>

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

