import * as deepFreeze from 'deep-freeze'
import { HIDE_NAVIGATION, TOGGLE_NAVIGATION } from 'constants/actionTypes'
import reducer, { initialState, IUiState } from './ui'

describe('Ui reducer', () => {
  it('should return initial state', () => {
    const previousState = undefined
    const sampleAction = { type: undefined }
    expect(reducer(previousState, sampleAction)).toEqual(initialState)
  })

  it('should handle HIDE_NAVIGATION action', () => {
    const previousState: IUiState = deepFreeze({ isNavigationVisible: true })
    const sampleAction = { type: HIDE_NAVIGATION }
    const expectedResult: IUiState = {
      ...previousState,
      isNavigationVisible: false
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })

  it('should handle TOGGLE_NAVIGATION action', () => {
    const previousState: IUiState = deepFreeze({ isNavigationVisible: false })
    const sampleAction = { type: TOGGLE_NAVIGATION }
    const expectedResult: IUiState = {
      ...previousState,
      isNavigationVisible: true
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })
})
