import { LOGIN } from 'constants/actionTypes';
import { toastr } from 'react-redux-toastr';

export const login = (ulogin, upassword) => {
  const user = JSON.parse(localStorage.getItem('users'))
    .filter(u => u.login === ulogin.toLowerCase() && u.password === Number.parseInt(upassword, 10))[0];

  return {
    type: LOGIN,
    payload: new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!user) {
          const msg = 'User not found';
          toastr.error('Error', msg);
          return reject(msg);
        }

        return resolve({ user });
      }, 1000);
    }),
  };
};

export const logout = () => {};
