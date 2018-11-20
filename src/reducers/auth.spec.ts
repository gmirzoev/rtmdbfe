import * as deepFreeze from 'deep-freeze'
import { Auth } from 'constants/actionTypes'
import { fulfilled, pending, rejected } from './utils'
import reducer, { initialState, IAuthState } from './auth'

// TODO: better previousState for tests
describe('Auth reducer', () => {
  it('should return initial state', () => {
    const previousState = undefined
    const sampleAction = { type: undefined }
    expect(reducer(previousState, sampleAction)).toEqual(initialState)
  })

  it('should handle LOGIN_PENDING action', () => {
    const previousState: IAuthState = deepFreeze({
      user: null,
      isFetching: false,
      error: true
    })
    const sampleAction = { type: pending(Auth.LOGIN) }
    const expectedResult: IAuthState = {
      ...previousState,
      isFetching: true,
      error: false
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })

  it('should handle LOGIN_FULFILLED action', () => {
    const previousState: IAuthState = deepFreeze({
      user: null,
      isFetching: true,
      error: false
    })
    const mockUser = JSON.stringify({ name: 'John', role: 'user', login: 'john', password: 123 })
    const sampleAction = {
      type: fulfilled(Auth.LOGIN),
      payload: { user: mockUser }
    }
    const expectedResult: IAuthState = {
      ...previousState,
      isFetching: false,
      user: mockUser
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })

  it('should handle LOGIN_REJECTED action', () => {
    const previousState: IAuthState = deepFreeze({
      user: null,
      isFetching: true,
      error: false
    })
    const sampleAction = { type: rejected(Auth.LOGIN) }
    const expectedResult: IAuthState = {
      ...previousState,
      isFetching: false,
      error: true
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })

  it('should handle LOGOUT_PENDING action', () => {
    const previousState: IAuthState = deepFreeze({
      user: JSON.stringify({ name: 'John' }),
      isFetching: false,
      error: true
    })
    const sampleAction = { type: pending(Auth.LOGOUT) }
    const expectedResult: IAuthState = {
      ...previousState,
      isFetching: true,
      error: false
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })

  it('should handle LOGOUT_FULFILLED action', () => {
    const previousState: IAuthState = deepFreeze({
      user: JSON.stringify({ name: 'John' }),
      isFetching: true,
      error: false
    })
    const sampleAction = { type: fulfilled(Auth.LOGOUT) }
    expect(reducer(previousState, sampleAction)).toEqual(initialState)
  })

  it('should handle LOGOUT_REJECTED action', () => {
    const previousState: IAuthState = deepFreeze({
      user: JSON.stringify({ name: 'John' }),
      isFetching: true,
      error: false
    })
    const sampleAction = { type: rejected(Auth.LOGOUT) }
    const expectedResult: IAuthState = {
      ...previousState,
      isFetching: false,
      error: true
    }
    expect(reducer(previousState, sampleAction)).toEqual(expectedResult)
  })
})
