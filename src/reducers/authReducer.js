import {
  LOGIN_PENDING, LOGIN_FULFILLED, LOGIN_REJECTED,
  LOGOUT_PENDING, LOGOUT_REJECTED,
} from 'constants/actionTypes';

const initialState = {
  isFetching: false,
  user: localStorage.getItem('user'),
  error: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case LOGIN_FULFILLED:
      return {
        ...state,
        isFetching: false,
        user: action.payload.user,
      };
    case LOGIN_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case LOGOUT_PENDING:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case LOGOUT_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return state;
  }
};

export default authReducer;
