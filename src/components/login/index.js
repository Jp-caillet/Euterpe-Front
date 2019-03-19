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
    const { history } = this.props
    history.push('/')
  }

  render() {
    const {
      email,
      mdp
    } = this.state

    return (
      <div>
        <div className="container">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="header">Login</div>
            <div className="info">*Click on the input boxes</div>
            <input id="username" className="inc1 text" type="text" name="email" placeholder="Email" value={email} onChange={this.handleChange} />
            <input id="password" className="inc1 pass" type="pass" name="mdp" placeholder="Password" value={mdp} onChange={this.handleChange} />
            <button className="button-sign" type="submit">Login</button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, actions)(Login)
