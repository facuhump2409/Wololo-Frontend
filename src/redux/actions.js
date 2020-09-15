import { LOGIN,LOGOUT } from './actionTypes';
import { login,logout } from '../services/auth';

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
export const signOutUser = () => {
  //logOut()
  return {
    type: LOGOUT
  }
}