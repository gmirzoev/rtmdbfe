import { AnyAction } from 'redux'
import { Ui } from 'constants/actionTypes'

export interface IUiState {
  readonly navigationVisible: boolean;
}

export const initialState: IUiState = {
  navigationVisible: false
}

export default function uiReducer(state: IUiState = initialState, action: AnyAction): IUiState {
  switch (action.type) {
    case Ui.HIDE_NAVIGATION:
      return {
        ...state,
        navigationVisible: false
      }
    case Ui.TOGGLE_NAVIGATION:
      return {
        ...state,
        navigationVisible: !state.navigationVisible
      }
    default:
      return state
  }
}

/* LOCAL SELECTORS */
export const selectNavigationVisible = (state: IUiState) => state.navigationVisible
