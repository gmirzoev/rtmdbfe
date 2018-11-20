import rootReducer from 'reducers'
import { applyMiddleware, compose, createStore } from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'

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
