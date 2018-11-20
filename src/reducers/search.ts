import { AnyAction } from 'redux'
import {
  SEARCH_MOVIE_FULFILLED,
  SEARCH_MOVIE_PENDING,
  SEARCH_MOVIE_REJECTED,
} from 'constants/actionTypes'
import { IMovie } from 'components/MoviesList'

export interface ISearchState {
  readonly isFetching: boolean;
  readonly items: IMovie[];
  readonly pages: number;
  readonly error: boolean;
}

export const initialState = {
  isFetching: false,
  items: [],
  pages: 0,
  error: false
}

export default function searchReducer(state: ISearchState = initialState,
                                      action: AnyAction): ISearchState {
  switch (action.type) {
    case SEARCH_MOVIE_PENDING:
      return {
        ...state,
        isFetching: true,
        error: false
      }
    case SEARCH_MOVIE_FULFILLED:
      return {
        ...state,
        isFetching: false,
        items: action.payload.movies,
        pages: action.payload.pages
      }
    case SEARCH_MOVIE_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}
