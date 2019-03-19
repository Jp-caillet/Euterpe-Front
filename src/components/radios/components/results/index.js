import React from 'react'
import { Link } from 'react-router-dom'

const Results = ({ data }) => (
  <div className="row">
    { data.map(item => (
      <div className="column">
        <Link className="nav-link posts font-weight-bold" to={`/Radio/${item.radioName}`}>
          <div className="blog-card spring-fever" style={{ 'background-image': `url(${item.image})` }}>
            <div className="utility-info">
              <ul className="utility-list">
                <li className="comments">{`${item.radioName}`}</li>
              </ul>
            </div>
            <div className="gradient-overlay" />
            <div className="color-overlay" />
          </div>
        </Link>
      </div>

    ))}
  </div>
)

export default Results
