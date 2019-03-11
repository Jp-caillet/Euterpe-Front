import axios from 'axios'
import actionsType from './actions-type'

function setDeconnected(isDeconnected) {
  return {
    type: actionsType.SET_DECONNECTED,
    isDeconnected
  }
}

export function deconnection() {
  return (dispatch) => {
    dispatch(setDeconnected(true))
  }
}
