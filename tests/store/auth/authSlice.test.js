import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from '../../../src/store/auth/authSlice'
import {
  authenticatedState,
  demoUser,
  initialState,
} from '../../fixtures/authFixtures'

describe('Test on authSlice', () => {
  test('should return the initial state', () => {
    const state = authSlice.reducer(initialState, {})
    expect(authSlice.name).toBe('auth')
    expect(state).toEqual(initialState)
  })

  test('should perform authentication', () => {
    const state = authSlice.reducer(initialState, login(demoUser))
    expect(state).toEqual({
      status: 'authenticated',
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    })
  })

  test('should perform the logout without arguments', () => {
    const state = authSlice.reducer(authenticatedState, logout())

    expect(state).toEqual({
      status: 'no-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined,
    })
  })

  test('should perform the logout', () => {
    const errorMessage = 'No Valid Credentials'
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    )

    expect(state).toEqual({
      status: 'no-authenticated',
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: errorMessage,
    })
  })

  test('should call checkingCredentials', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials)

    expect(state.status).toBe('checking')
  })
})
