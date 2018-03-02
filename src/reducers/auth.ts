import { AnyAction } from 'redux'
import {
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  LOGOUT_PENDING,
  LOGOUT_REJECTED,
  LOGOUT_FULFILLED
} from 'constants/actionTypes'

export interface IAuthState {
  readonly isFetching: boolean,
  readonly user: string | null,
  readonly error: boolean
}

export const initialState = {
  isFetching: false,
  user: sessionStorage.getItem('user'),
  error: false
}

export default function authReducer(state: IAuthState = initialState, action: AnyAction): IAuthState {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        isFetching: true,
        error: false
      }
    case LOGIN_FULFILLED:
      return {
        ...state,
        isFetching: false,
        user: action.payload.user
      }
    case LOGIN_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case LOGOUT_PENDING:
      return {
        ...state,
        isFetching: true,
        error: false
      }
    case LOGOUT_FULFILLED:
      return {
        ...initialState
      }
    case LOGOUT_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}
