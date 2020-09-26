import {
    REDIRECT,
    LOGOUT,
    SETTINGS_SAVED, LOGIN, CREATE_GAME
} from '../actionTypes';
import {SIGNUP} from "../actionTypes";
import {initialState} from "./utils";

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
        case CREATE_GAME:
            return {
                ...state,
                redirectTo: action.error ? null : '/games',
                // currentUser: action.error ? null : action.payload
            };
        default:
            return state;
    }
};
