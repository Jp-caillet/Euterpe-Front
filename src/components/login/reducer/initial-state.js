const initialState = () => {
  if (localStorage.getItem('Etherpe-token')) {
    return {
      loggedIn: true,
      token: localStorage.getItem('Etherpe-token'),
      login: localStorage.getItem('Etherpe-login')
    }
  }
  return {
    loggedIn: false,
    token: '',
    login: ''
  }
}

export default initialState()
