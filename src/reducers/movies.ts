import { AnyAction } from 'redux'
import {
  GET_MOVIES_PENDING,
  GET_MOVIES_FULFILLED,
  GET_MOVIES_REJECTED
} from 'constants/actionTypes'
import { IMovie } from 'components/MoviesList'

export interface IMoviesState {
  readonly isFetching: boolean
  readonly items: ReadonlyArray<IMovie>
  readonly pages: number
  readonly error: boolean
}

export const initialState = {
  isFetching: false,
  items: [],
  pages: 0,
  error: false
}

export default function moviesReducer(state: IMoviesState = initialState, action: AnyAction): IMoviesState {
  switch (action.type) {
    case GET_MOVIES_PENDING:
      return {
        ...state,
        isFetching: true,
        error: false
      }
    case GET_MOVIES_FULFILLED:
      return {
        ...state,
        isFetching: false,
        items: action.payload.movies,
        pages: action.payload.pages
      }
    case GET_MOVIES_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}
