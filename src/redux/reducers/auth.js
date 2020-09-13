import { LOGIN,LOGOUT } from '../actionTypes';

const initialState = {
  isAuthorized: false,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case LOGIN:
      console.log("entre")
      return {
        ...state,
        isAuthorized: true,
      };
    case LOGOUT:
      console.log("entre")
      return {
        ...state,
        isAuthorized: false,
      };
    default:
      return state;
  }
}

export const activeAuthorization = state => state.auth.isAuthorized