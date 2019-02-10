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
      mdp,
      terms
    } = this.state
    event.preventDefault()

    if (terms !== false) {
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
    }
  }

  render() {
    const {
      name,
      login,
      email,
      mdp,
      terms
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
                  <label htmlFor="name" className="label">
                  Name :
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                      />
                    </div>
                  </label>
                </div>

                <div className="field">
                  <label htmlFor="login" className="label">
                  login :
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="login"
                        value={login}
                        onChange={this.handleChange}
                      />
                    </div>
                  </label>
                </div>

                <div className="field">
                  <label htmlFor="email" className="label">
                    Email Address :
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                      />
                    </div>
                  </label>
                </div>

                <div className="field">
                  <label htmlFor="password" className="label">
                    Password :
                    <div className="control">
                      <input
                        className="input"
                        type="password"
                        name="mdp"
                        value={mdp}
                        onChange={this.handleChange}
                      />
                    </div>
                  </label>
                </div>

                <div className="field">
                  <div className="control">
                    <label htmlFor="checkbox" className="checkbox">
                      <input
                        name="terms"
                        type="checkbox"
                        checked={terms}
                        onChange={this.handleChange}
                      />
                      I agree to the
                      {' '}
                      <a href="https://google.com">terms and conditions</a>
                    </label>
                  </div>
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

export default Register
