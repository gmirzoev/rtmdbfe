import { Movies } from 'constants/actionTypes'
import { pending, fulfilled, rejected } from 'state/reducers'
import reducer, { initialState, IMoviesState } from '../movies'

describe('Movies reducer', () => {
  it('should return initial state', () => {
    const previousState = undefined
    const sampleAction = { type: undefined }
    expect(reducer(previousState, sampleAction)).toEqual(initialState)
  })

  it('should handle GET_MOVIES_PENDING', () => {
    const previousState: IMoviesState = { ...initialState }
    const sampleAction = { type: pending(Movies.FETCH_MOVIES) }
    const expectedResult: IMoviesState = {
      ...initialState,
      fetching: true,
      error: false
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })

  it('should handle GET_MOVIES_FULFILLED', () => {
    const previousState: IMoviesState = { ...initialState }
    const sampleMovies = [
      { id: '1', title: 'Some movie1', overview: 'Movie description1', poster_path: '' },
      { id: '2', title: 'Some movie2', overview: 'Movie description2', poster_path: '' },
      { id: '3', title: 'Some movie3', overview: 'Movie description3', poster_path: '' },
      { id: '4', title: 'Some movie4', overview: 'Movie description4', poster_path: '' }
    ]
    const sampleAction = {
      type: fulfilled(Movies.FETCH_MOVIES),
      payload: {
        movies: sampleMovies,
        pages: sampleMovies.length
      }
    }
    const expectedResult: IMoviesState = {
      ...initialState,
      fetching: false,
      items: sampleMovies,
      pages: sampleMovies.length
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })

  it('should handle GET_MOVIES_REJECTED', () => {
    const previousState: IMoviesState = { ...initialState }
    const sampleAction = { type: rejected(Movies.FETCH_MOVIES) }
    const expectedResult: IMoviesState = {
      ...initialState,
      fetching: false,
      error: true
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })
})
