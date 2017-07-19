import {
  SEARCH_MOVIE_PENDING,
  SEARCH_MOVIE_FULFILLED,
  SEARCH_MOVIE_REJECTED,
} from 'constants/actionTypes';

export const initialState = {
  isFetching: false,
  items: [],
  pages: 0,
  error: false,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_MOVIE_PENDING:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case SEARCH_MOVIE_FULFILLED:
      return {
        ...state,
        isFetching: false,
        items: action.payload.movies,
        pages: action.payload.pages,
      };
    case SEARCH_MOVIE_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return state;
  }
};

export default searchReducer;
