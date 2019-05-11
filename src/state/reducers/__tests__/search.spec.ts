import { Movies } from 'constants/actionTypes'
import { pending, fulfilled, rejected } from 'state/reducers'
import reducer, { initialState, ISearchState } from '../search'

describe('Search reducer', () => {
  it('should return initial state', () => {
    const previousState = undefined
    const sampleAction = { type: undefined }
    expect(reducer(previousState, sampleAction)).toEqual(initialState)
  })

  it('should handle SEARCH_MOVIE_PENDING', () => {
    const previousState: ISearchState = { ...initialState }
    const sampleAction = { type: pending(Movies.SEARCH_MOVIE) }
    const expectedResult: ISearchState = {
      ...initialState,
      fetching: true,
      error: false
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })

  it('should handle SEARCH_MOVIE_FULFILLED', () => {
    const previousState: ISearchState = { ...initialState }
    const sampleMovies = [
      { id: '1', title: 'Some movie1', overview: 'Movie description1', poster_path: '' },
      { id: '2', title: 'Some movie2', overview: 'Movie description2', poster_path: '' },
      { id: '3', title: 'Some movie3', overview: 'Movie description3', poster_path: '' },
      { id: '4', title: 'Some movie4', overview: 'Movie description4', poster_path: '' }
    ]
    const sampleAction = {
      type: fulfilled(Movies.SEARCH_MOVIE),
      payload: {
        movies: sampleMovies,
        pages: sampleMovies.length
      }
    }
    const expectedResult: ISearchState = {
      ...initialState,
      fetching: false,
      items: sampleMovies,
      pages: sampleMovies.length
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })

  it('should handle SEARCH_MOVIE_REJECTED', () => {
    const previousState: ISearchState = { ...initialState }
    const sampleAction = { type: rejected(Movies.SEARCH_MOVIE) }
    const expectedResult: ISearchState = {
      ...initialState,
      fetching: false,
      error: true
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })
})
