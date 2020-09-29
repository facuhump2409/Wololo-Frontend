import { GET_USERS } from '../actionTypes';

const initialState = {
  users: [],
  inProgress: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_USERS:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? (action.payload.message ? action.payload.message : action.payload)
         : null,
        users: action.payload
      }
      default: 
        return state;
  }
  return state;
}
