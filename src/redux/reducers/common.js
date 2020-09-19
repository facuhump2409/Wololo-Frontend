import {
    REDIRECT,
    LOGOUT,
    SETTINGS_SAVED,
} from '../actionTypes';
import {SIGNUP} from "../actionTypes";

const defaultState = {
    appName: 'Conduit',
    token: null,
    viewChangeCounter: 0
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case REDIRECT:
            return { ...state, redirectTo: null };
        case LOGOUT:
            return { ...state, redirectTo: '/', token: null, currentUser: null };
        case SIGNUP:
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                currentUser: action.error ? null : action.payload.username
            };
        default:
            return state;
    }
};
