import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'; // eslint-disable-line

const middleware = [thunk, promiseMiddleware()];

if (window.APP_CONFIG.ENV !== 'production') {
  middleware.push(reduxImmutableStateInvariant());
}

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  typeof window === 'object' &&
  window.APP_CONFIG.ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
/* eslint-enable */

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
);

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    enhancer,
  );
}
