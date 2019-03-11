import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Search from './components/search'
import News from './components/news'
import Details from './components/details'
import Deconnect from './components/deconnection'
import Connected from './components/header/connected.js'
import Unconnected from './components/header/unconnected.js'
import Footer from './components/footer'

import Upload from './components/upload_song'
import Register from './components/register'
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
                <Route path="/" component={News} exact />
                <Route path="/register" component={Register} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/deconnection" component={Deconnect} exact />
                <Route path="/search" component={Search} exact />
                <Route path="/upload" component={Upload} exact />
                <Route path="/details/:id" component={Details} exact />
              </Switch>
              <Footer />
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
              <Route path="/" component={News} exact />
              <Route path="/register" component={Register} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/search" component={Search} exact />
              <Route path="/upload" component={Upload} exact />
              <Route path="/details/:id" component={Details} exact />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(state => state)(Routes)
