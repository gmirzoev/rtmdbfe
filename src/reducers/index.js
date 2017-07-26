import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import init from './initReducer';
import auth from './authReducer';
import ui from './uiReducer';
import movies from './moviesReducer';
import search from './searchReducer';

const rootReducer = combineReducers({
  init,
  auth,
  ui,
  movies,
  search,
  form: reduxFormReducer,
  toastr: toastrReducer,
});

export default rootReducer;
