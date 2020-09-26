import {ASYNC_START, GAMES_PAGE_LOADED, GAMES_PAGE_UNLOADED, GET_GAMES, CREATE_GAME, GET_GAME, MOVE_GAUCHOS} from '../actionTypes';
import {initialState} from "./utils";


export default function(state = initialState, action) {
    switch(action.type) {
        case ASYNC_START:
            return { ...state, inProgress: true, errors: null };
        case GAMES_PAGE_UNLOADED:
            return {
                ...state,
                errors: null
            }
        case GAMES_PAGE_LOADED:
            return {
                ...state,
                games: action.payload.games,
                errors: null
            }
        case GET_GAMES:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.message : null,
                games: action.payload
            }
        case GET_GAME:
        case MOVE_GAUCHOS:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.message : null,
                activeGame: action.payload
            }
        case CREATE_GAME:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.message : null,
            }
        
        default:
            return state;
    }
}
