import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { LoginPage } from '../../../src/auth/pages/LoginPage'
import { authSlice } from '../../../src/store/auth/authSlice'
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from '../../../src/store/auth/thunks'
import { notAuthenticatedState } from '../../fixtures/authFixtures'

const mockStartGoogleSignIn = jest.fn()
const mockStartLoginWithEmailPassword = jest.fn()

startLoginWithEmailPassword

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword:
    ({ email, password }) =>
    () =>
      mockStartLoginWithEmailPassword({ email, password }),
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(),
}))

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
})

describe('Test on <LoginPage />', () => {
  beforeEach(() => jest.clearAllMocks())

  test('should render the component correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)
  })

  test('Google Button should call startGoogleSignIn', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    const googleBtn = screen.getByLabelText('google-btn')
    fireEvent.click(googleBtn)

    expect(mockStartGoogleSignIn).toHaveBeenCalled()
  })

  test('Submit should call startLoginWithEmailPassword', () => {
    const email = 'fernando@google.com'
    const password = '123456'

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    const emailField = screen.getByRole('textbox', { name: 'Email' })
    fireEvent.change(emailField, { target: { name: 'email', value: email } })

    const passwordField = screen.getByTestId('password')
    fireEvent.change(passwordField, {
      target: { name: 'password', value: password },
    })

    const loginForm = screen.getByLabelText('submit-form')
    fireEvent.submit(loginForm)

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email,
      password,
    })
  })
})
