import { LOGIN } from './actionTypes';
import { login } from '../services/auth';
import { logout } from '../services/auth';

// export const loginUser = (loginInfo) => {
//   return function(dispatch) {
//     login(loginInfo).then(() => dispatch({
//       type: LOGIN
//     })).catch(err => console.log('hello'));
//   }
// }

export const loginUser = (loginInfo) => {
  return {
    type: LOGIN,
    // payload: 
  }
}
export const logOut = (token) => {
  //logOut()
  return {
    type: LOGOUT
  }
}