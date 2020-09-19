import {ASYNC_START, LOGIN, LOGOUT, SIGNUP} from '../actionTypes';

const initialState = {
  isAuthorized: localStorage.getItem('isAuthorized') || false,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case LOGIN:
      //ver que no setee siempre en true el isAuthorized
      return {
        ...state,
        isAuthorized: action.response === 200//true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthorized: false,
      };
    case ASYNC_START:
      if (action.subtype === LOGIN || action.subtype === SIGNUP) {
        return { ...state, inProgress: true };
      }
      break;
    case SIGNUP:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
        // isAuthorized: action.response === 200,
      };
    default:
      return state;
  }
  return state;
}
