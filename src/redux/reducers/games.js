import {ASYNC_START, GAMES, GAMES_PAGE_LOADED, GAMES_PAGE_UNLOADED} from '../actionTypes';
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
        default:
            return state;
    }
    return state;
}
