import { AnyAction } from 'redux'
import { Generic } from 'constants/actionTypes'
import { fulfilled, pending, rejected } from './utils'

export interface IInitState {
  readonly isInitialized: boolean;
  readonly error: boolean;
}

export const initialState = {
  isInitialized: false,
  error: false
}

export default function initReducer(state: IInitState = initialState,
                                    action: AnyAction): IInitState {
  switch (action.type) {
    case pending(Generic.FETCH_TMDB_CONF):
      return { ...initialState }
    case fulfilled(Generic.FETCH_TMDB_CONF):
      return {
        ...state,
        isInitialized: true
      }
    case rejected(Generic.FETCH_TMDB_CONF):
      return {
        ...state,
        isInitialized: true,
        error: true
      }
    default:
      return state
  }
}
