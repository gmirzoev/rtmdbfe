import { TOGGLE_NAVIGATION_VISIBILITY } from 'constants/actionTypes';

const initialState = {
  isNavigationVisible: true,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NAVIGATION_VISIBILITY:
      return {
        ...state,
        isNavigationVisible: !state.isNavigationVisible,
      };
    default:
      return state;
  }
};

export default uiReducer;
