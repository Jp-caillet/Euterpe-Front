import React from 'react'
import { Link } from 'react-router-dom'

const Results = ({ data }) => (
  <div className="row">
    { data.map(item => (
      <div className="column">
        <div className="card">
          <Link className="nav-link posts font-weight-bold" to={`/Radio/${item.radioName}`}>
            <img className="radios-img" src={`${item.image}`} alt="test" />
            <h3>{`${item.radioName}`}</h3>
          </Link>
        </div>
      </div>
    ))}
  </div>
)

export default Results
