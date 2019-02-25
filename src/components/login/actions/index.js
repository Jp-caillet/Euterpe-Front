import axios from 'axios'

const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING'
const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS'
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR'

function setLoginPending(isLoginPending) {
  return {
    type: SET_LOGIN_PENDING,
    isLoginPending
  }
}

function setLoginSuccess(isLoginSuccess) {
  return {
    type: SET_LOGIN_SUCCESS,
    isLoginSuccess
  }
}

function setLoginError(loginError) {
  return {
    type: SET_LOGIN_ERROR,
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
        console.log(resp)
        dispatch(setLoginPending(false))
        dispatch(setLoginSuccess(true))
      }).catch((error) => {
        console.log(error)
        dispatch(setLoginPending(false))
        dispatch(setLoginError(error))
      })
  }
}
