import React, { Component } from 'react'
import axios from 'axios'

class createRadio extends Component {
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

  handleSubmit(event) {
    const {
      nameRadio,
      url1,
      url2,
      image
    } = this.state
    event.preventDefault()
    const { history } = this.props

    axios.post('http://localhost:4000/radio/create', {
      nameRadio,
      image,
      url1,
      url2
    })
      .then((resp) => {
        console.log(resp)
      }).catch((error) => {
        console.log(error.response)
      })

    history.push('/')
  }

  render() {
    const {
      nameRadio,
      url1,
      url2,
      image
    } = this.state

    return (
      <div>
        <div className="container">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="header-add-rad">creer une radio</div>
            <input id="username" className="inc1 text" type="text" name="nameRadio" placeholder="nom de la radio" value={nameRadio} onChange={this.handleChange} />
            <input id="username" className="inc2 pass" type="text" name="image" placeholder="image de la radio (lien)" value={image} onChange={this.handleChange} />
            <input id="username" className="inc2 email-register" type="text" name="url1" placeholder="musique n°1 (lien youtube)" value={url1} onChange={this.handleChange} />
            <input id="username" className="inc2 pass-register" type="text" name="url2" placeholder="musique n°2 (lien youtube)" value={url2} onChange={this.handleChange} />
            <button className="button-sign" type="submit">Ajouter</button>
          </form>
        </div>
      </div>
    )
  }
}

export default createRadio
