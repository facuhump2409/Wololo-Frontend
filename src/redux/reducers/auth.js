import {ASYNC_START, LOGIN, LOGOUT, SIGNUP} from '../actionTypes';
import {initialState} from "./utils";


export default function(state = initialState, action) {
  switch(action.type) {
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
    case LOGIN:
    case SIGNUP:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.message : null,
        isAuthorized: !action.error,
      };
    default:
      return state;
  }
  return state;
}
