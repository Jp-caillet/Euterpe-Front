import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class unConnected extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">Euterpe</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/Radio">Radio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Déconnection</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default unConnected
