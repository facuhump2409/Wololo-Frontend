import {LOGIN, LOGOUT, SIGNUP} from './actionTypes';
import { login,signOut,signUp } from '../services/auth';

export const loginUser = (loginInfo) => {
  return function (dispatch) {
    return login(loginInfo).then (response => function(){
      dispatch({ type: LOGIN , payload: response}) //asi tenemos la respuesta de la API
    }).catch(err => console.log("Error Password or email are incorrect")) //dispatch({error})
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
