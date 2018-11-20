import { AnyAction } from 'redux'
import { Auth } from 'constants/actionTypes'
import { fulfilled, pending, rejected } from './utils'

export interface IAuthState {
  readonly isFetching: boolean;
  readonly user: string | null;
  readonly error: boolean;
}

export const initialState = {
  isFetching: false,
  user: sessionStorage.getItem('user'),
  error: false
}

export default function authReducer(state: IAuthState = initialState,
                                    action: AnyAction): IAuthState {
  switch (action.type) {
    case pending(Auth.LOGIN):
      return {
        ...state,
        isFetching: true,
        error: false
      }
    case fulfilled(Auth.LOGIN):
      return {
        ...state,
        isFetching: false,
        user: action.payload.user
      }
    case rejected(Auth.LOGIN):
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case pending(Auth.LOGOUT):
      return {
        ...state,
        isFetching: true,
        error: false
      }
    case fulfilled(Auth.LOGOUT):
      return {
        ...initialState
      }
    case rejected(Auth.LOGOUT):
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}
