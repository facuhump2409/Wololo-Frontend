import {
    ASYNC_START,
    CONFIGURATION_UPDATE,
    GAMES_STATS,
    GET_CONFIGURATION,
    GET_SCOREBOARD, LOGIN, SHOWED_MESSAGE, SIGNUP,
    USER_STATS
} from '../actionTypes';
import {initialState} from "./utils";


export default function(state = initialState, action) {
    switch(action.type) {
        case SHOWED_MESSAGE:
            return {
                ...state,
                showFinishMessage: true
            }
        case ASYNC_START:
            if (action.subtype === CONFIGURATION_UPDATE) {
                return {
                    ...state,
                    inProgress: true,
                };
            }
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
        case GET_CONFIGURATION:
            return {
                ...state,
                configuration: action.payload
            }
        case CONFIGURATION_UPDATE:
            return {
                ...state,
                inProgress: false,
                showFinishMessage: true
            }
        default:
            return state;
    }
    return state;
}
