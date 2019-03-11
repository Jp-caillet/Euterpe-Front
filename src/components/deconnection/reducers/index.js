import { fromJS } from 'immutable'
import initialState from './initial-state'
import actionsType from '../actions/actions-type'

const Deconnection = (state, action) => (
  fromJS(state)
    .setIn(['loggedIn'], false)
    .setIn(['token'], "")
    .toJS()
)

const deconnect = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.SET_DECONNECTED:
      localStorage.removeItem('Etherpe-token')
      return Deconnection(state, action)
    default:
      return state
  }
}

export default deconnect
