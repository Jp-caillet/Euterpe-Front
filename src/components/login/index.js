import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      mdp: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { email, mdp } = this.state
    const { login } = this.props
    login({ email, mdp })
  }

  render() {
    const {
      email,
      mdp
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

export default connect(null, actions)(Login)
