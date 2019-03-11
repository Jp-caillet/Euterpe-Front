import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import * as actions from './actions'

class Deconnect extends Component {
  constructor(props) {
    super(props)
    const { deco } = this.props
    deco()
  }

  render() {
    return (
      <Redirect to="/target" />
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, actions)(Deconnect)
