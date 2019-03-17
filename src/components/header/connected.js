import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Connected extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">Euterpe</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item ">
              <Link className="nav-link" to="/">Radio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">login</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Connected
