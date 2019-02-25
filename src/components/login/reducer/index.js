import * as constants from '../actions/actions-type.js'
// import { LOGIN_SUCCESS, LOGIN_ERROR } from "../actions/index";
export const initialState = {
  isLoggedIn: false,
  error: 'none'
}

export const myAppReducer = (state = initialState, action) => {
  console.log(`THE ACTION ${action.type} DISPATCHED!`)
  console.log(`WITH THE PAYLOAD OF ${action.type}`)
  switch (action.type) {
    case constants.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoggedIn: action.isLoggedIn
      })
    case constants.LOGIN_ERROR:
      return Object.assign({}, state, {
        error: action.error
      })
    default:
      return state
  }
}
