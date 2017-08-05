import { HIDE_NAVIGATION, TOGGLE_NAVIGATION } from 'constants/actionTypes';

const initialState = {
  isNavigationVisible: false,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case HIDE_NAVIGATION:
      return {
        ...state,
        isNavigationVisible: false,
      };
    case TOGGLE_NAVIGATION:
      return {
        ...state,
        isNavigationVisible: !state.isNavigationVisible,
      };
    default:
      return state;
  }
};

export default uiReducer;
