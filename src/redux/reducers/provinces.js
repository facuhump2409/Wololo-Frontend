import {GET_PROVINCES} from '../actionTypes';

const initialState = {
    provinces: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROVINCES:
            return {
                ...state,
                errors: action.error ? (action.payload.message ? action.payload.message : action.payload)
                    : null,
                provinces: action.payload
            }
        default:
            return state;
    }
}
