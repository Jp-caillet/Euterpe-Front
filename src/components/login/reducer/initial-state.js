const initialState = () => {
  if (localStorage.getItem('Etherpe-token')) {
    return {
      loggedIn: true,
      token: localStorage.getItem('Etherpe-token')
    }
  }
  return {
    loggedIn: false,
    token: ''
  }
}

export default initialState()
