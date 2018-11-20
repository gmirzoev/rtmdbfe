import * as deepFreeze from 'deep-freeze'
import { Generic } from 'constants/actionTypes'
import { fulfilled, pending, rejected } from './utils'
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
    const sampleAction = { type: pending(Generic.FETCH_TMDB_CONF) }
    expect(reducer(previousState, sampleAction)).toEqual(initialState)
  })

  it('should handle GET_TMDB_CONFIG_FULFILLED action', () => {
    const previousState: IInitState = deepFreeze({
      isInitialized: false,
      error: false
    })
    const sampleAction = { type: fulfilled(Generic.FETCH_TMDB_CONF) }
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
    const sampleAction = { type: rejected(Generic.FETCH_TMDB_CONF) }
    const expectedResult: IInitState = {
      ...previousState,
      isInitialized: true,
      error: true
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })
})
