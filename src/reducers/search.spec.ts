import * as deepFreeze from 'deep-freeze'
import {
  SEARCH_MOVIE_PENDING,
  SEARCH_MOVIE_FULFILLED,
  SEARCH_MOVIE_REJECTED,
} from 'constants/actionTypes'
import reducer, { initialState, ISearchState } from './search'

describe('Search reducer', () => {
  it('should return initial state', () => {
    const previousState = undefined
    const sampleAction = { type: undefined }
    expect(reducer(previousState, sampleAction)).toEqual(initialState)
  })

  it('should handle SEARCH_MOVIE_PENDING', () => {
    const previousState: ISearchState = deepFreeze({ ...initialState })
    const sampleAction = { type: SEARCH_MOVIE_PENDING }
    const expectedResult: ISearchState = {
      ...initialState,
      isFetching: true,
      error: false
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })

  it('should handle SEARCH_MOVIE_FULFILLED', () => {
    const previousState: ISearchState = deepFreeze({ ...initialState })
    const sampleMovies = [
      { id: '1', title: 'Some movie1', overview: 'Movie description1', poster_path: '' },
      { id: '2', title: 'Some movie2', overview: 'Movie description2', poster_path: '' },
      { id: '3', title: 'Some movie3', overview: 'Movie description3', poster_path: '' },
      { id: '4', title: 'Some movie4', overview: 'Movie description4', poster_path: '' }
    ]
    const sampleAction = {
      type: SEARCH_MOVIE_FULFILLED,
      payload: {
        movies: sampleMovies,
        pages: sampleMovies.length
      }
    }
    const expectedResult: ISearchState = {
      ...initialState,
      isFetching: false,
      items: sampleMovies,
      pages: sampleMovies.length
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })

  it('should handle SEARCH_MOVIE_REJECTED', () => {
    const previousState: ISearchState = deepFreeze({ ...initialState })
    const sampleAction = { type: SEARCH_MOVIE_REJECTED }
    const expectedResult: ISearchState = {
      ...initialState,
      isFetching: false,
      error: true
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })
})
