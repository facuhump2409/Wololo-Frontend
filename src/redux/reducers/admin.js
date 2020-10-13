import {GAMES_STATS, USER_STATS} from '../actionTypes';
import {initialState} from "./utils";


export default function(state = initialState, action) {
    switch(action.type) {
        case USER_STATS:
        case GAMES_STATS:
            return {
                ...state,
                gamesStats: action.payload
            }
        default:
            return state;
    }
    return state;
}
