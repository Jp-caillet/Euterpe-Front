import axios from 'axios'
import actionsType from '../../login/actions/actions-type'

function setDeconnect(isDeconnected) {
  return {
    type: actionsType.SET_DECONNECTION,
    isDeconnected
  }
}


export function deco() {
  return (dispatch) => {
    dispatch(setDeconnect(false))
    
  }
}
