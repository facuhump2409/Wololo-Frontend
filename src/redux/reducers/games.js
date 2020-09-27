import {
    ASYNC_START, GAMES_PAGE_LOADED, GAMES_PAGE_UNLOADED,
    GET_GAMES, CREATE_GAME, GET_GAME, MOVE_GAUCHOS, CHANGE_SPECIALIZATION, ATTACK_TOWN, LOGIN, SIGNUP, REDIRECT_GAME
}
    from '../actionTypes';
import {initialState} from "./utils";


export default function(state = initialState, action) {
    const validAsyncSubtypes = [GET_GAMES,ATTACK_TOWN,CREATE_GAME,GAMES_PAGE_LOADED]
    switch(action.type) {
        case ASYNC_START:
            if (validAsyncSubtypes.includes(action.subtype)) { //no olvidar especificar los casos que tiene que hacer sino siempre setea in progress
                return { ...state, inProgress: true, errors: null };
            }
            break;
        case GAMES_PAGE_UNLOADED:
            return {
                ...state,
                errors: null
            }
        case GAMES_PAGE_LOADED:
            return {
                ...state,
                games: action.payload.games,
                inProgress: false,
                errors: null
            }
        case REDIRECT_GAME:
            return{
                ...state,
                finishedCreation: false
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
                finishedCreation: !action.error
            }
        
        default:
            return state;
    }
    return state;
}
