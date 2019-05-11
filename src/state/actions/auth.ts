import { toastr } from 'react-redux-toastr'
import { Auth } from 'constants/actionTypes'
import { Utils } from 'utils'
import { IAction } from './interfaces'

interface IUser {
  name: string;
  login: string;
  role: string;
}

export type ILoginAction = IAction<Auth.LOGIN, () => Promise<IUser>>
export type ILogoutAction = IAction<Auth.LOGOUT, () => Promise<void>>

export function login(uLogin: string): ILoginAction {
  return {
    type: Auth.LOGIN,
    async payload() {
      try {
        await Utils.wait(500) // add some delay
        const users: IUser[] = JSON.parse(localStorage.getItem('users') || '[]')
        const user = users.find(u => u.login === uLogin.toLowerCase())
        if (!user) {
          throw new Error('User not found')
        }
        sessionStorage.setItem('user', JSON.stringify(user))
        return user
      } catch (e) {
        toastr.error('Error', e.message)
        throw e
      }
    }
  }
}

export function logout(): ILogoutAction {
  return {
    type: Auth.LOGOUT,
    async payload() {
      try {
        await Utils.wait(500)
        sessionStorage.removeItem('user')
      } catch (e) {
        toastr.error('Error', e.message)
        throw e
      }
    }
  }
}
