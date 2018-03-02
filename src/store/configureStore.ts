import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from 'reducers'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'

let composeEnhancers = compose
const middleware = [thunk, promiseMiddleware()]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(reduxImmutableStateInvariant())

  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  }
}

const enhancer = composeEnhancers(applyMiddleware(...middleware))

export default function configureStore(initialState?: object) {
  return createStore(
    rootReducer,
    initialState,
    enhancer
  )
}
