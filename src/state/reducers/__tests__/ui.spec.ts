import { Ui } from 'constants/actionTypes'
import reducer, { initialState, IUiState } from '../ui'

describe('Ui reducer', () => {
  it('should return initial state', () => {
    const previousState = undefined
    const sampleAction = { type: undefined }
    expect(reducer(previousState, sampleAction)).toEqual(initialState)
  })

  it('should handle HIDE_NAVIGATION action', () => {
    const previousState: IUiState = { navigationVisible: true }
    const sampleAction = { type: Ui.HIDE_NAVIGATION }
    const expectedResult: IUiState = {
      ...previousState,
      navigationVisible: false
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })

  it('should handle TOGGLE_NAVIGATION action', () => {
    const previousState: IUiState = { navigationVisible: false }
    const sampleAction = { type: Ui.TOGGLE_NAVIGATION }
    const expectedResult: IUiState = {
      ...previousState,
      navigationVisible: true
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })
})
