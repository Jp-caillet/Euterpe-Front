import React, { Component } from 'react'
import axios from 'axios'

class create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nameRadio: '',
      url1: '',
      url2: '',
      image: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
    /* const { target } = event.target
    const { value } = target.value
    const { name } = target.name

    this.setState({
      [name]: value
    }) */
  }

  async handleSubmit(event) {
    const {
      nameRadio,
      url1,
      url2,
      image
    } = this.state
    event.preventDefault()
    const {history} = this.props
    console.log(history)
    
     await axios.post('http://localhost:4000/radio/create', {
        nameRadio,
        image
      })
        .then((resp) => {
          console.log(resp)
        }).catch((error) => {
          console.log(error.response)
        })
      await axios.post('http://localhost:4000/music/create', { nameRadio: nameRadio, url: url1 })
      .then((resp) => {
        console.log(resp.data)
      })
      await axios.post('http://localhost:4000/music/create', { nameRadio: nameRadio, url: url2 })
      .then((resp) => {
        console.log(resp.data)
      })
    history.push('/Radio')
  }

  render() {
    const {
      nameRadio,
      url1,
      url2,
      image
    } = this.state

    return (
      <div className="Register">
        <header>
          <div className="container">
            <nav className="navbar">
              <div className="navbar-brand">
                <span className="navbar-item">Forms in React</span>
              </div>
            </nav>
          </div>
        </header>
        <div className="container">
          <div className="columns">
            <div className="column is-9">
              <form className="form" onSubmit={this.handleSubmit}>
                <div className="field">
                  <label htmlFor="nameRadio" className="label">
                  Nom de la radio :
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="nameRadio"
                        value={nameRadio}
                        onChange={this.handleChange}
                      />
                    </div>
                  </label>
                </div>

                <div className="field">
                  <label htmlFor="image" className="label">
                  image de la radio :
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="image"
                        value={image}
                        onChange={this.handleChange}
                      />
                    </div>
                  </label>
                </div>
                <p> la radio pour etre crée doit contenir 2 vidéo youtube </p>
                <div className="field">
                  <label htmlFor="url1" className="label">
                    musique n°1 (lien youtube) :
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="url1"
                        value={url1}
                        onChange={this.handleChange}
                      />
                    </div>
                  </label>
                </div>

                <div className="field">
                  <label htmlFor="url2" className="label">
                    musique n°2 (lien youtube) :
                    <div className="control">
                      <input
                        className="input"
                        type="password"
                        name="url2"
                        value={url2}
                        onChange={this.handleChange}
                      />
                    </div>
                  </label>
                </div>

                <div className="field">
                  <div className="control">
                    <input
                      type="submit"
                      value="Submit"
                      className="button is-primary"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default create
