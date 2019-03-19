import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getEventsData } from '../radios/actions'
import Results from './components/index.js'

class unConnected extends Component {
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
              <Link to="/newRadio">créer une radio</Link>
            </div>
            <div className="nav-link-jp">
              <Link to="/deconnection">Déconnection</Link>
            </div>
          </div>
        </div>
        <Results data={radios.data} />
      </div>
    )
  }
}

export default connect(state => state)(unConnected)
