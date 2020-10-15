import {
    ASYNC_START,
    ASYNC_END,
    LOGIN,
    LOGOUT,
    SIGNUP
} from './actionTypes';
import { saveToLocal, removeFromLocal } from '../services/localStorage'

const promiseMiddleware = store => next => action => {
    if (isPromise(action.payload)) {
        store.dispatch({ type: ASYNC_START, subtype: action.type });

        // const currentView = store.getState().viewChangeCounter;
        // const skipTracking = action.skipTracking;
        action.payload.then((res) => {
            if (res.ok) {
                // const currentState = store.getState()
                // if (!skipTracking && currentState.viewChangeCounter !== currentView) {
                //     return
                // }
                console.log('RESULT', res);
                action.payload = res.data;
                store.dispatch({ type: ASYNC_END });
                store.dispatch(action);
            }
            else {
                // const currentState = store.getState()
                // if (!skipTracking && currentState.viewChangeCounter !== currentView) {
                //     return
                // }
                const error = res
                console.log('ERROR', error);
                action.error = true;
                action.payload = error.data;
                // if (!action.skipTracking) {
                //     store.dispatch({ type: ASYNC_END, promise: action.payload });
                // }
                store.dispatch({ type: ASYNC_END});
                store.dispatch(action);
            }
            })
        return;
    }

    next(action);
};

const authLocalStorage = (action) => {
    if(!action.error) {
        saveToLocal('isAuthorized', 'true');
        saveToLocal('currentUser', action.payload);
        saveToLocal('isAdmin',action.payload.username === 'admin') //esto es temporal hasta que back lo empiece a mandar
        //TODO cambiar esto
    } else {
        saveToLocal('isAuthorized', 'false');
    }
}

const storageActions = {
    [SIGNUP]: (action) => authLocalStorage(action),
    [LOGIN]: (action) => authLocalStorage(action),
    [LOGOUT]: () => {        
        saveToLocal('isAuthorized', 'false');
        saveToLocal('isAdmin', 'false');
        removeFromLocal('currentUser');
    },
    authorizedAction: (action) => { }
}

const localStorageMiddleware = store => next => action => {
    storageActions[action.type] ? storageActions[action.type](action) : storageActions.authorizedAction(action);
    next(action);
};

function isPromise(v) {
    return v && typeof v.then === 'function';
}


export { promiseMiddleware, localStorageMiddleware }
