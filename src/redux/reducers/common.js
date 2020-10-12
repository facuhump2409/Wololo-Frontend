import {
    REDIRECT,
    LOGOUT,
    SETTINGS_SAVED, LOGIN, CREATE_GAME, REDIRECT_GAME, PASS_TURN
} from '../actionTypes';
import {SIGNUP} from "../actionTypes";
import {initialState} from "./utils";
import {getFromLocal} from "../../services/localStorage";

export default (state = initialState, action) => {
    switch (action.type) {
        case REDIRECT:
            return { ...state, redirectTo: null };
        case LOGOUT:
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                // currentUser: null
            };
        case LOGIN:
        case SIGNUP:
        case REDIRECT_GAME:
            return {
                ...state,
                redirectTo: action.error ? null : getFromLocal('isAdmin') ? '/admin' : '/games',
                // currentUser: action.error ? null : action.payload
            };
        default:
            return state;
    }
    return state;
};
