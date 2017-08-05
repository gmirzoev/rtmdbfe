import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { LOGOUT_FULFILLED } from 'constants/actionTypes';
import init from './initReducer';
import auth from './authReducer';
import ui from './uiReducer';
import movies from './moviesReducer';
import search from './searchReducer';

const appReducer = combineReducers({
  init,
  auth,
  ui,
  movies,
  search,
  form: reduxFormReducer,
  toastr: toastrReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_FULFILLED) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
