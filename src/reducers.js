import { combineReducers } from 'redux'

import news from './components/news/reducer'
import auth from './components/login/reducer'

export default combineReducers({
  news,
  auth
})
