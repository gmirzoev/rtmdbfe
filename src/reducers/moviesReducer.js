import {
  GET_MOVIES_PENDING,
  GET_MOVIES_FULFILLED,
  GET_MOVIES_REJECTED,
} from 'constants/actionTypes';

export const initialState = {
  isFetching: false,
  items: [],
  pages: 0,
  error: false,
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES_PENDING:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case GET_MOVIES_FULFILLED:
      return {
        ...state,
        isFetching: false,
        items: action.payload.movies,
        pages: action.payload.pages,
      };
    case GET_MOVIES_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return state;
  }
};

export default moviesReducer;
