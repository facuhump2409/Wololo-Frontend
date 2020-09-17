import {LOGIN, LOGOUT, SIGNUP} from './actionTypes';
import { login,signOut,signUp } from '../services/auth';

export const loginUser = (loginInfo) => {
  return function(dispatch) {
    login(loginInfo).then((response) => dispatch({
      type: LOGIN
    })).catch(err => console.log('Catch Error => ',err));
  }
}

export const signUpUser = (signupInfo) => {
  return function(dispatch) {
    signUp(signupInfo).then(() => dispatch({
      type: SIGNUP
    })).catch(err => console.log('hello'));
  }
}

export const signOutUser = () => {
  return function(dispatch) {
    login(signOut).then(() => dispatch({
      type: LOGOUT
    })).catch(err => console.log('hello'));
  }
}
