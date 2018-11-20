import { Auth } from 'constants/actionTypes'
import { Utils } from 'utils'

export function login(uLogin: string, uPassword: string) {
  return {
    type: Auth.LOGIN,
    payload: async () => {
      await Utils.wait(500) // add some delay
      const users: IUser[] = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(u => u.login === uLogin.toLowerCase() && u.password === uPassword)
      if (!user) {
        return Utils.handleError('User not found')
      }
      sessionStorage.setItem('user', JSON.stringify(user))
      return { user }
    }
  }
}

export function logout() {
  return {
    type: Auth.LOGOUT,
    payload: async () => {
      await Utils.wait(200)
      sessionStorage.removeItem('user')
      return true
    }
  }
}
