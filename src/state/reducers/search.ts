import { AnyAction } from 'redux'
import { Movies } from 'constants/actionTypes'
import { IMovie } from 'components/MoviesList'
import { pending, fulfilled, rejected } from './utils'

export interface ISearchState {
  readonly items: IMovie[];
  readonly pages: number;
  readonly fetching: boolean;
  readonly error: boolean;
}

export const initialState: ISearchState = {
  items: [],
  pages: 0,
  fetching: false,
  error: false
}

export default function searchReducer(state: ISearchState = initialState,
                                      action: AnyAction): ISearchState {
  switch (action.type) {
    case pending(Movies.SEARCH_MOVIE):
      return {
        ...state,
        fetching: true,
        error: false
      }
    case fulfilled(Movies.SEARCH_MOVIE):
      return {
        ...state,
        fetching: false,
        items: action.payload.movies,
        pages: action.payload.pages
      }
    case rejected(Movies.SEARCH_MOVIE):
      return {
        ...state,
        fetching: false,
        error: true
      }
    default:
      return state
  }
}

/* LOCAL SELECTORS */
export const selectMovies = (state: ISearchState) => state.items
export const selectFetching = (state: ISearchState) => state.fetching
