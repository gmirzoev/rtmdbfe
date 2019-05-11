import { AnyAction } from 'redux'
import { Auth } from 'constants/actionTypes'
import { ILoginAction } from 'state/actions/auth'
import { fulfilled, pending, rejected } from './utils'
import { IPayload } from './interfaces'

export interface IAuthState {
  readonly user: IPayload<ILoginAction> | null;
  readonly pending: boolean;
}

export const initialState: IAuthState = {
  user: JSON.parse(sessionStorage.getItem('user') as string),
  pending: false
}

export default function authReducer(state: IAuthState = initialState,
                                    action: AnyAction): IAuthState {
  switch (action.type) {
    case pending(Auth.LOGIN):
      return {
        ...state,
        pending: true
      }
    case fulfilled(Auth.LOGIN):
      return {
        ...state,
        user: action.payload,
        pending: false
      }
    case rejected(Auth.LOGIN):
      return {
        ...state,
        user: null,
        pending: false
      }
    case pending(Auth.LOGOUT):
      return {
        ...state,
        pending: true
      }
    default:
      return state
  }
}

/* LOCAL SELECTORS */
export const selectUser = (state: IAuthState) => state.user
export const selectPending = (state: IAuthState) => state.pending
