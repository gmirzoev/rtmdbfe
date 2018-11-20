import { AnyAction } from 'redux'
import { HIDE_NAVIGATION, TOGGLE_NAVIGATION } from 'constants/actionTypes'

export interface IUiState {
  readonly isNavigationVisible: boolean;
}

export const initialState = {
  isNavigationVisible: false
}

export default function uiReducer(state: IUiState = initialState, action: AnyAction): IUiState {
  switch (action.type) {
    case HIDE_NAVIGATION:
      return {
        ...state,
        isNavigationVisible: false
      }
    case TOGGLE_NAVIGATION:
      return {
        ...state,
        isNavigationVisible: !state.isNavigationVisible
      }
    default:
      return state
  }
}
