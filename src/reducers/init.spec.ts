import * as deepFreeze from 'deep-freeze'
import {
  GET_TMDB_CONFIG_PENDING,
  GET_TMDB_CONFIG_FULFILLED,
  GET_TMDB_CONFIG_REJECTED
} from 'constants/actionTypes'
import reducer, { initialState, IInitState } from './init'

describe('Init reducer', () => {
  it('should return initial state', () => {
    const previousState = undefined
    const sampleAction = { type: undefined }
    expect(reducer(previousState, sampleAction)).toEqual(initialState)
  })

  it('should handle GET_TMDB_CONFIG_PENDING action', () => {
    const previousState: IInitState = deepFreeze({
      isInitialized: true,
      error: false
    })
    const sampleAction = { type: GET_TMDB_CONFIG_PENDING }
    expect(reducer(previousState, sampleAction)).toEqual(initialState)
  })

  it('should handle GET_TMDB_CONFIG_FULFILLED action', () => {
    const previousState: IInitState = deepFreeze({
      isInitialized: false,
      error: false
    })
    const sampleAction = { type: GET_TMDB_CONFIG_FULFILLED }
    const expectedResult: IInitState = {
      ...previousState,
      isInitialized: true
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })

  it('should handle GET_TMDB_CONFIG_REJECTED action', () => {
    const previousState: IInitState = deepFreeze({
      isInitialized: false,
      error: false
    })
    const sampleAction = { type: GET_TMDB_CONFIG_REJECTED }
    const expectedResult: IInitState = {
      ...previousState,
      isInitialized: true,
      error: true
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })
})
