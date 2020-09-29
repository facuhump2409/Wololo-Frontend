import {ASYNC_START, LOGIN, LOGIN_PAGE_LOADED, LOGIN_PAGE_UNLOADED, LOGOUT, SIGNUP} from '../actionTypes';
import {initialState} from "./utils";


export default function(state = initialState, action) {
  switch(action.type) {
    case LOGOUT:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.message : null,
        isAuthorized: false,
      };
    case ASYNC_START:
      if (action.subtype === LOGIN || action.subtype === SIGNUP) {
        return { ...state, inProgress: true, errors: null };
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
    case LOGIN_PAGE_UNLOADED:
    case LOGIN_PAGE_LOADED:
      return {
        ...state,
        errors: null
      }
    default:
      return state;
  }
  return state;
}
