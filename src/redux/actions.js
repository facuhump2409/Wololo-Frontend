import { LOGIN } from './actionTypes';
import { login } from '../services/auth';

export const loginUser = (loginInfo) => {
  return dispatch => {
    login(loginInfo).then(() => dispatch({
      type: LOGIN
    })).catch(err => console.log('hello'));
  }
}