import { ASYNC_START, GAMES_PAGE_LOADED, GAMES_PAGE_UNLOADED, 
    GET_GAMES, CREATE_GAME, GET_GAME, MOVE_GAUCHOS, CHANGE_SPECIALIZATION, ATTACK_TOWN,
    PASS_TURN, SURRENDER } 
    from '../actionTypes';
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
        case CHANGE_SPECIALIZATION:
        case ATTACK_TOWN:
        case PASS_TURN:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.message : null,
                activeGame: action.payload,
                gameChanged: true,
            }
        case 'MAP_UPDATED':
            return {
                ...state,
                gameChanged: false,
            }
        case CREATE_GAME:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.message : null,
            }
        case SURRENDER:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.message : null,
                redirectTo: '/games'
            }
        default:
            return state;
    }
}
