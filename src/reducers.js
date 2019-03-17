import { combineReducers } from 'redux'

import radios from './components/radios/reducer'
import auth from './components/login/reducer'

export default combineReducers({
  radios,
  auth
})
