import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import ui from './uiReducer';
import movies from './moviesReducer';
import search from './searchReducer';

const rootReducer = combineReducers({
  form: reduxFormReducer,
  ui,
  movies,
  search,
});

export default rootReducer;
