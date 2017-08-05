// @flow
import { LOGIN, LOGOUT } from 'constants/actionTypes';
import { toastr } from 'react-redux-toastr';

export const login = (uLogin: string, uPassword: string) => {
  const users = localStorage.getItem('users') || '[]';
  const user = JSON.parse(users)
    .filter(u => u.login === uLogin.toLowerCase() && u.password === Number.parseInt(uPassword, 10))[0];

  return {
    type: LOGIN,
    payload: new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!user) {
          const msg = 'User not found';
          toastr.error('Error', msg);
          return reject(msg);
        }

        localStorage.setItem('user', JSON.stringify(user));
        return resolve({ user });
      }, 1000);
    }),
  };
};

export const logout = () => ({
  type: LOGOUT,
  payload: new Promise(resolve => {
    localStorage.removeItem('user');
    return resolve();
  }),
});
