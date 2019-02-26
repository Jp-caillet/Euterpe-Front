import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getEventsData } from './actions'

import Results from './components/results/index.js'

class News extends Component {
  componentDidMount() {
    getEventsData()
  }

  render() {
    const { news, auth: { token } } = this.props

    return (
      <div>
       <p className="nav-link posts">{`${token}`}</p>
        <Results data={news.data} />
      </div>
    )
  }
}

export default connect(state => state)(News)
