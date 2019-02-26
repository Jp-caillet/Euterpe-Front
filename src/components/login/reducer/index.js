import { fromJS } from 'immutable'
import actionsType from '../actions/actions-type'
import initialState from './initial-state'


const isLogged = (state, action) => (
  fromJS(state)
    .setIn(['loggedIn'], action.isLoginSuccess)
    .setIn(['token'], action.token)
    .toJS()
) 
const isNotLogged = (state, action) => (
	fromJS(state)
    .setIn(['loggedIn'], false)
    .setIn(['token'], '')
    .toJS()
) 

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.SET_LOGIN_SUCCESS:
      console.log("action")
      console.log(action)
      return isLogged(state, action)
    case  actionsType.SET_LOGIN_ERROR:
      return isNotLogged(state, action)
    default:
      return state
  }
}

export default auth
