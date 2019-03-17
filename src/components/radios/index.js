import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getEventsData } from './actions'

import Results from './components/results/index.js'

class News extends Component {
  constructor(props) {
    super(props)
    getEventsData()
  }

  render() {
    const { radios } = this.props

    return (
      <div>
        <Results data={radios.data} />
      </div>
    )
  }
}

export default connect(state => state)(News)
