import { combineReducers, AnyAction } from 'redux'
import reduxFormReducer, { FormState } from 'redux-form/lib/reducer'
import { reducer as toastrReducer, ToastrState } from 'react-redux-toastr'
import { LOGOUT_FULFILLED } from 'constants/actionTypes'
import init, { IInitState } from './init'
import auth, { IAuthState } from './auth'
import ui, { IUiState } from './ui'
import movies, { IMoviesState } from './movies'
import search, { ISearchState } from './search'

export interface IAppState {
  readonly init: IInitState,
  readonly auth: IAuthState,
  readonly ui: IUiState,
  readonly movies: IMoviesState,
  readonly search: ISearchState,
  readonly form: FormState,
  readonly toastr: ToastrState
}

const appReducer = combineReducers<object|undefined>({
  init,
  auth,
  ui,
  movies,
  search,
  form: reduxFormReducer,
  toastr: toastrReducer
})

export default function rootReducer (state: IAppState, action: AnyAction) {
  if (action.type === LOGOUT_FULFILLED) {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}
