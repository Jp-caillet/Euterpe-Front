import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Search from './components/search'
import Radios from './components/radios'
import Radio from './components/radio'
import Deconnect from './components/deconnection'
import Connected from './components/header/connected.js'
import Unconnected from './components/header/unconnected.js'
import Register from './components/register'
import CreateRadio from './components/CreateRadio'
import Login from './components/login'

class Routes extends Component {
  render() {
    const { auth: { loggedIn } } = this.props

    if (loggedIn) {
      return (
        <div>
          <BrowserRouter>
            <div>
              <Unconnected />
              <Switch>
                <Route path="/" component={Radios} exact />
                <Route path="/register" component={Register} exact />
                <Route path="/newRadio" component={CreateRadio} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/deconnection" component={Deconnect} exact />
                <Route path="/search" component={Search} exact />
                <Route path="/radio/:id" component={Radio} exact />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      )
    }
    return (
      <div>
        <BrowserRouter>
          <div>
            <Connected />
            <Switch>
              <Route path="/" component={Radios} exact />
              <Route path="/register" component={Register} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/search" component={Search} exact />
              <Route path="/radio/:id" component={Radio} exact />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(state => state)(Routes)
