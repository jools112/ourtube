/*
  The root reducer to rule them all, combines all reducers in the app into a single index reducer.
  example from https://medium.com/backticks-tildes/setting-up-a-redux-project-with-create-react-app-e363ab2329b8
*/

import { combineReducers } from 'redux'
import simpleReducer from './simpleReducer'
import loginReducer from './loginReducer'
import joinRoomReducer from './joinRoomReducer'

export default combineReducers({
  tutorial: simpleReducer,
  login: loginReducer,
  joinRoom: joinRoomReducer
})
