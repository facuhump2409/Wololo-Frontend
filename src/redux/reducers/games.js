import { GET_GAMES } from '../actionTypes';

const initialState = {
  games: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_GAMES:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.message : null,
        games: action.payload
      }
      default: 
        return state;
  }
}
