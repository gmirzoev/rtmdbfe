import { AnyAction } from 'redux'
import {
  GET_TMDB_CONFIG_PENDING,
  GET_TMDB_CONFIG_FULFILLED,
  GET_TMDB_CONFIG_REJECTED
} from 'constants/actionTypes'

export interface IInitState {
  readonly isInitialized: boolean
  readonly error: boolean
}

export const initialState = {
  isInitialized: false,
  error: false
}

export default function initReducer(state: IInitState = initialState, action: AnyAction): IInitState {
  switch (action.type) {
    case GET_TMDB_CONFIG_PENDING:
      return { ...initialState }
    case GET_TMDB_CONFIG_FULFILLED:
      return {
        ...state,
        isInitialized: true
      }
    case GET_TMDB_CONFIG_REJECTED:
      return {
        ...state,
        isInitialized: true,
        error: true
      }
    default:
      return state
  }
}
