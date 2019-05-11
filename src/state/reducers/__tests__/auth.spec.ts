import { Auth } from 'constants/actionTypes'
import { fulfilled, pending, rejected } from '../utils'
import reducer, { initialState, IAuthState } from '../auth'

// TODO: better previousState for tests
describe('Auth reducer', () => {
  it('should return initial state', () => {
    const previousState = undefined
    const sampleAction = { type: undefined }
    expect(reducer(previousState, sampleAction)).toEqual(initialState)
  })

  it('should handle LOGIN_PENDING action', () => {
    const previousState: IAuthState = {
      user: null,
      pending: false
    }
    const sampleAction = { type: pending(Auth.LOGIN) }
    const expectedResult: IAuthState = {
      ...previousState,
      pending: true
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })

  it('should handle LOGIN_FULFILLED action', () => {
    const previousState: IAuthState = {
      user: null,
      pending: true
    }
    const mockUser = { name: 'John', role: 'user', login: 'john' }
    const sampleAction = {
      type: fulfilled(Auth.LOGIN),
      payload: mockUser
    }
    const expectedResult: IAuthState = {
      ...previousState,
      pending: false,
      user: mockUser
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })

  it('should handle LOGIN_REJECTED action', () => {
    const previousState: IAuthState = {
      user: null,
      pending: true
    }
    const sampleAction = { type: rejected(Auth.LOGIN) }
    const expectedResult: IAuthState = {
      ...previousState,
      pending: false
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })

  it('should handle LOGOUT_PENDING action', () => {
    const previousState: IAuthState = {
      user: { name: 'John', role: 'user', login: 'john' },
      pending: false
    }
    const sampleAction = { type: pending(Auth.LOGOUT) }
    const expectedResult: IAuthState = {
      ...previousState,
      pending: true
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })
})
