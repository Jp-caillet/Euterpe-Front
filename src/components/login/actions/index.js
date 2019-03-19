import axios from 'axios'
import actionsType from './actions-type'

function setLoginPending(isLoginPending) {
  return {
    type: actionsType.SET_LOGIN_PENDING,
    isLoginPending
  }
}

function setLoginSuccess(isLoginSuccess, token, log) {
  return {
    type: actionsType.SET_LOGIN_SUCCESS,
    isLoginSuccess,
    token,
    log
  }
}

function setLoginError(loginError) {
  return {
    type: actionsType.SET_LOGIN_ERROR,
    loginError
  }
}

export function login(email, password) {
  console.log('pwd')
  console.log(password)
  return (dispatch) => {
    dispatch(setLoginPending(true))
    axios.post('http://localhost:4000/user/login', email)
      .then((resp) => {
        console.log(resp.data)
        dispatch(setLoginPending(false))
        dispatch(setLoginSuccess(true, resp.data.token, resp.data.login))
      }).catch((error) => {
        console.log(error)
        dispatch(setLoginPending(false))
        dispatch(setLoginError(error))
      })
  }
}
