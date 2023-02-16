import {
  loginWithEmailPassword,
  logoutFirebase,
  signInWithGoogle,
} from '../../../src/firebase/providers'
import {
  checkingCredentials,
  login,
  logout,
} from '../../../src/store/auth/authSlice'
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from '../../../src/store/auth/thunks'
import { clearNotesLogout } from '../../../src/store/journal'
import { demoUser } from '../../fixtures/authFixtures'

jest.mock('../../../src/firebase/providers')

describe('Test on Auth Thunks', () => {
  const dispatch = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test('should invoke checkingCredentials', async () => {
    await checkingAuthentication()(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
  })

  test('startGoogleSignIn should call checkingCredentials and login', async () => {
    const loginData = { ok: true, ...demoUser }
    await signInWithGoogle.mockResolvedValue(loginData)

    await startGoogleSignIn()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })

  test('startGoogleSignIn should call checkingCredentials and logout', async () => {
    const loginData = { ok: false, errorMessage: 'Google Error' }
    await signInWithGoogle.mockResolvedValue(loginData)

    await startGoogleSignIn()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
  })

  test('startLoginWithEmailPassword should call checkingCredentials and login', async () => {
    const loginData = { ok: true, ...demoUser }
    const formData = { email: demoUser.email, password: '1234' }

    await loginWithEmailPassword.mockResolvedValue(loginData)

    await startLoginWithEmailPassword(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })

  test('startLogout should call logoutFirebase, clearNotes and logout', async () => {
    await startLogout()(dispatch)

    expect(logoutFirebase).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
    expect(dispatch).toHaveBeenCalledWith(logout())
  })
})
