import { fromJS } from 'immutable'
import actionsType from '../actions/actions-type'
import initialState from './initial-state'

const isLogged = (state, action) => (
  fromJS(state)
    .setIn(['loggedIn'], action.isLoginSuccess)
    .setIn(['token'], action.token)
    .toJS()
)
const isNotLogged = state => (
  fromJS(state)
    .setIn(['loggedIn'], false)
    .setIn(['token'], '')
    .toJS()
)
const alreadyLogged = state => (
  fromJS(state)
    .setIn(['loggedIn'], true)
    .setIn(['token'], localStorage.getItem('Etherpe-token'))
    .toJS()
)
const isDeconnected = (state, action) => (
  fromJS(state)
    .setIn(['loggedIn'], action.isDeconnected)
    .setIn(['token'], "")
    .toJS()
)
const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.SET_LOGIN_SUCCESS:
      localStorage.setItem('Etherpe-token', action.token)
      return isLogged(state, action)
    case actionsType.SET_LOGIN_ERROR:
      localStorage.removeItem('Etherpe-token')
      return isNotLogged(state)
    case actionsType.SET_LOGIN_ALREADY_LOGGED:
      return alreadyLogged(state)
    case actionsType.SET_DECONNECTION:
      localStorage.removeItem('Etherpe-token')
      return isDeconnected(state)
    default:
      return state
  }
}

export default auth
