import { fromJS } from 'immutable'
import actionsType from '../actions/actions-type'
import initialState from '../../login/reducer/initial-state'

const isDeconnected = (state, action) => (
  fromJS(state)
    .setIn(['loggedIn'], action.isDeconnected)
    .setIn(['token'], "")
    .toJS()
)

const deco = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.SET_DECONNECTION:
      localStorage.removeItem('Etherpe-token')
      return isDeconnected(state, action)
    default:
      return state
  }
}

export default deco
