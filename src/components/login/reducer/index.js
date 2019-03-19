import { fromJS } from 'immutable'
import actionsType from '../actions/actions-type'
import initialState from './initial-state'

const isLogged = (state, action) => (
  fromJS(state)
    .setIn(['loggedIn'], action.isLoginSuccess)
    .setIn(['token'], action.token)
    .setIn(['login'], action.log)
    .toJS()
)
const isNotLogged = state => (
  fromJS(state)
    .setIn(['loggedIn'], false)
    .setIn(['token'], '')
    .setIn(['login'], '')
    .toJS()
)
const alreadyLogged = state => (
  fromJS(state)
    .setIn(['loggedIn'], true)
    .setIn(['token'], localStorage.getItem('Etherpe-token'))
    .setIn(['login'], localStorage.getItem('Etherpe-login'))
    .toJS()
)
const isDeconnected = (state, action) => (
  fromJS(state)
    .setIn(['loggedIn'], action.isDeconnect)
    .setIn(['token'], '')
    .setIn(['login'], '')
    .toJS()
)
const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.SET_LOGIN_SUCCESS:
      localStorage.setItem('Etherpe-token', action.token)
      localStorage.setItem('Etherpe-login', action.log)
      return isLogged(state, action)
    case actionsType.SET_LOGIN_ERROR:
      localStorage.removeItem('Etherpe-token')
      localStorage.removeItem('Etherpe-login')
      return isNotLogged(state)
    case actionsType.SET_LOGIN_ALREADY_LOGGED:
      return alreadyLogged(state)
    case actionsType.SET_DECONNECTION:
      localStorage.removeItem('Etherpe-token')
      localStorage.removeItem('Etherpe-login')
      return isDeconnected(state, action)
    default:
      return state
  }
}

export default auth
