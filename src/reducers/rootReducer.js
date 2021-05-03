/*
  The root reducer to rule them all, combines all reducers in the app into a single index reducer.
  example from https://medium.com/backticks-tildes/setting-up-a-redux-project-with-create-react-app-e363ab2329b8
*/

import { combineReducers } from 'redux'
import simpleReducer from './simpleReducer'
import loginReducer from './loginReducer'
import videoPlayerReducer from './videoPlayerReducer'
import ratingBoxReducer from './ratingBoxReducer'
import pollReducer from './pollReducer'
import groupsReducer from './groupsReducer'

export default combineReducers({
  tutorial: simpleReducer,
  login: loginReducer,
  videoPlayer: videoPlayerReducer,
  ratingBox: ratingBoxReducer,
  poll: pollReducer,
  group: groupsReducer
})
