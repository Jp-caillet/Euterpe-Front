import initialState from './initial-state'
import actionsType from '../actions/actions-type'


const authentication = (state = initialState, action) => {
   switch (action.type) {
    case initialState.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case initialState.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case initialState.LOGIN_FAILURE:
      return {};
    case initialState.LOGOUT:
      return {};
    default:
      return state
  }
}

export default users
