import {GAMES_STATS, GET_SCOREBOARD, USER_STATS} from '../actionTypes';
import {initialState} from "./utils";


export default function(state = initialState, action) {
    switch(action.type) {
        case USER_STATS:
            return {
                ...state,
                selectedUser: action.payload
            }
        case GAMES_STATS:
            return {
                ...state,
                gamesStats: action.payload
            }
        case GET_SCOREBOARD:
            return {
                ...state,
                topPlayers: action.payload
            }
        default:
            return state;
    }
    return state;
}
