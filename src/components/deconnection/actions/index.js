import actionsType from '../../login/actions/actions-type'

function setDeconnect(isDeconnect) {
  return {
    type: actionsType.SET_DECONNECTION,
    isDeconnect
  }
}
export function deco() {
  return (dispatch) => {
    dispatch(setDeconnect(false))
  }
}
