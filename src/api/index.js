import {create} from 'apisauce';
import { LOGOUT } from '../redux/actionTypes';
import { signOut } from '../services/auth';
import { getFromLocal } from '../services/localStorage';

const api = create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: `${window.location.origin}/api`,
  timeout: 20000,
});

export const apiSetup = (dispatch) => {
  api.addMonitor(response => {
    if (response.status === 401) {
      const user = getFromLocal('currentUser');
      if (user) {
        dispatch({ type: LOGOUT, payload: signOut() });
      }
    }
  });
}

export default api;