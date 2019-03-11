import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

class Deconnect extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
      test
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, actions)(Deconnect)
