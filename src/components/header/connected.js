import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getEventsData } from '../radios/actions'
import Results from './components/index.js'

class Connected extends Component {
  constructor(props) {
    super(props)
    getEventsData()
  }

  render() {
    const { radios } = this.props
    return (
      <div className="sidenav">
        <div className="menu">
          <Link className="navbar-brand" to="/">Euterpe</Link>
          <div>
            <div>
              <Link to="/">Radio</Link>
            </div>
            <div>
              <Link to="/register">register</Link>
            </div>
            <div>
              <Link to="/login">login</Link>
            </div>
          </div>
        </div>
        <Results data={radios.data} />
      </div>
    )
  }
}

export default connect(state => state)(Connected)
