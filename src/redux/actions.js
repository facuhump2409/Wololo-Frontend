import {LOGIN, LOGOUT, SIGNUP} from './actionTypes';
import { login,signOut,signUp } from '../services/auth';

// export const loginUser = loginInfo => {
//   return function(dispatch) {
//   dispatch({ type: LOGIN , payload: login(loginInfo)}) //asi tenemos la respuesta de la API
// }};

// export const signUpUser = (signupInfo) => {
//   return function(dispatch) {
//     signUp(signupInfo).then(() => dispatch({
//       type: SIGNUP
//     })).catch(err => console.log('hello'));
//   }
// }
//
// export const signOutUser = () => {
//   return function(dispatch) {
//     login(signOut).then(() => dispatch({
//       type: LOGOUT
//     })).catch(err => console.log('hello'));
//   }
// }
