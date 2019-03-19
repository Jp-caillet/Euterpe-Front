import React from 'react'

const Results = ({ data }) => (
  <div className="radio-side">
    <div className="navbar-brand">
      Liste des Radio:
    </div>
    { data.map(item => (
      <div key={item.radioName}>
        <a href={`/Radio/${item.radioName}`}>
          {`${item.radioName}`}
        </a>
      </div>
    ))}
  </div>
)

export default Results
