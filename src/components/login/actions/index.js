import axios from 'axios'

import actionsType from './actions-type'
import store from '../../../store'


export const login = (email,password) => {
  return dispatch => {
        dispatch(request({ email }))
        axios.post('http://localhost:4000/user/create', {
        "email": email,
        "psw": password
      })
        .then((resp) => {
          dispatch(success(resp));
          history.push('/');
        }).catch((error) => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        })
    }

    function request(user) { return { type: actionsType.LOGIN_REQUEST, user } }
    function success(user) { return { type: actionsType.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: actionsType.LOGIN_FAILURE, error } }
}