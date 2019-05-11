import { AnyAction } from 'redux'
import { Movies } from 'constants/actionTypes'
import { IMovie } from 'components/MoviesList'
import { pending, fulfilled, rejected } from './utils'

export interface IMoviesState {
  readonly items: ReadonlyArray<IMovie>;
  readonly pages: number;
  readonly fetching: boolean;
  readonly error: boolean;
}

export const initialState: IMoviesState = {
  items: [],
  pages: 0,
  fetching: false,
  error: false
}

export default function moviesReducer(state: IMoviesState = initialState,
                                      action: AnyAction): IMoviesState {
  switch (action.type) {
    case pending(Movies.FETCH_MOVIES):
      return {
        ...state,
        fetching: true,
        error: false
      }
    case fulfilled(Movies.FETCH_MOVIES):
      return {
        ...state,
        fetching: false,
        items: action.payload.movies,
        pages: action.payload.pages
      }
    case rejected(Movies.FETCH_MOVIES):
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
export const selectMovies = (state: IMoviesState) => state.items
export const selectPages = (state: IMoviesState) => state.pages
export const selectFetching = (state: IMoviesState) => state.fetching
export const selectError = (state: IMoviesState) => state.error
