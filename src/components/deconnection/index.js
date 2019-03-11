import { Component } from 'react'
import { connect } from 'react-redux'

class Deconnect extends Component {
  constructor(props) {
    super(props)
    this.Deconnection()
  }

  Deconnection() {
    const { deconnection } = this.props
    deconnection()
  }
}

export default connect(state => state)(Deconnect)
