import React, { Component } from 'react'

class Details extends Component {
  render() {
    return (
      <div>
        <div className="al" />
        <div className="container">
          <div className="header">Sign In</div>
          <div className="info">*Click on the input boxes</div>
          <input id="username" className="inc2 text" type="text" name="Username" placeholder="Username" value="" />
          <input id="password" className="inc1 pass" type="pass" name="Password" placeholder="Password" value="" />
          <button className="button-sign" type="submit">Sign In</button>
          <svg width="390" height="549" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
            <rect
              id="rect"
              className="rect1"
              x="45px"
              y="300px"
              rx="27"
              ry="27"
              width="300px"
              height="50px"
              style={{ stroke: '#fff', 'stroke-width': '1px', fill: '#000' }}
            />
          </svg>
        </div>
      </div>
    )
  }
}

export default Details
