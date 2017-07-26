import {
  GET_APP_CONFIG_PENDING,
  GET_APP_CONFIG_FULFILLED,
  GET_APP_CONFIG_REJECTED,
} from 'constants/actionTypes';

const initialState = {
  requests: null,
};

const initReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APP_CONFIG_PENDING:
      return {
        ...state,
        requests: state.requests === null ? 1 : state.requests + 1,
      };
    case GET_APP_CONFIG_FULFILLED:
    case GET_APP_CONFIG_REJECTED:
      return {
        ...state,
        requests: state.requests > 1 ? state.requests - 1 : 0,
      };
    default:
      return state;
  }
};

export default initReducer;
