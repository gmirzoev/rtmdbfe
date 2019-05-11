import { AnyAction } from 'redux'
import { Generic } from 'constants/actionTypes'
import { fulfilled, pending, rejected } from './utils'

export interface IInitState {
  readonly initialized: boolean;
  readonly error: boolean;
}

export const initialState = {
  initialized: false,
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
        initialized: true
      }
    case rejected(Generic.FETCH_TMDB_CONF):
      return {
        ...state,
        initialized: true,
        error: true
      }
    default:
      return state
  }
}

/* LOCAL SELECTORS */
export const selectInitialized = (state: IInitState) => state.initialized
export const selectError = (state: IInitState) => state.error
