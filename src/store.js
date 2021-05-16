/*
  Redux store
*/

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

let store

function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk))
}

export const getStore = () => {
  if (!store) {
    store = configureStore()
  }
  return store
}
