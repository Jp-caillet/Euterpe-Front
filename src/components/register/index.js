import React, { Component } from 'react'
import axios from 'axios'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      age: 23,
      gender: 'male',
      email: '',
      login: '',
      mdp: '',
      terms: false
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
      name,
      age,
      gender,
      email,
      login,
      mdp
    } = this.state
    const { history } = this.props
    event.preventDefault()

    axios.post('http://localhost:4000/user/create', {
      name,
      age,
      gender,
      email,
      login,
      mdp
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
      name,
      login,
      email,
      mdp
    } = this.state

    return (
      <div>
        <div className="container">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="header">Register</div>
            <div className="info">*Click on the input boxes</div>
            <input id="username" className="inc1 text" type="text" name="name" placeholder="name" value={name} onChange={this.handleChange} />
            <input id="username" className="inc2 pass" type="text" name="login" placeholder="login" value={login} onChange={this.handleChange} />
            <input id="username" className="inc2 email-register" type="text" name="email" placeholder="email" value={email} onChange={this.handleChange} />
            <input id="username" className="inc2 pass-register" type="text" name="mdp" placeholder="Password" value={mdp} onChange={this.handleChange} />
            <button className="button-sign" type="submit">Register</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Register
