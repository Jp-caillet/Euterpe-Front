import React, { Component } from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

class Horizontal extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: 100
    }
    this.handleChangeComplete = this.handleChangeComplete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeStart = this.handleChangeStart.bind(this)
  }

  handleChangeStart () {
    console.log('Change event started')
  }

  handleChange (value) {
    this.setState({
      value: value
    })
  }

  handleChangeComplete ()  {
    console.log('Change event completed')
  }

  render () {
    const { value } = this.state
    return (
      <div className='slider-horizontal'>
        <Slider
          min={0}
          max={100}
          value={value}
          onChangeStart={this.handleChangeStart}
          onChange={this.handleChange}
          onChangeComplete={this.handleChangeComplete}
        />
        <div className='value'>{value}</div>
      </div>
    )
  }
}

export default Horizontal