import {
    ASYNC_START,
    ASYNC_END,
    LOGIN,
    LOGOUT,
    SIGNUP
} from './actionTypes';

const promiseMiddleware = store => next => action => {
    if (isPromise(action.payload)) {
        store.dispatch({ type: ASYNC_START, subtype: action.type });

        action.payload.then((res) => {
            if (res.ok) {
                console.log('RESULT', res);
                action.payload = res;
                store.dispatch({ type: ASYNC_END, promise: action.payload });
                store.dispatch(action);
            }
            else {
                const error = res
                console.log('ERROR', error);
                action.error = true;
                action.payload = error.data;
                // if (!action.skipTracking) {
                //     store.dispatch({ type: ASYNC_END, promise: action.payload });
                // }
                store.dispatch({ type: ASYNC_END, promise: action.payload });
                store.dispatch(action);
            }
            })
        return;
    }

    next(action);
};

const localStorageMiddleware = store => next => action => {
    if ((action.type === SIGNUP || action.type === LOGIN) && !action.error) {
        localStorage.setItem('isAuthorized', true);
    } else if (action.type === LOGOUT) {
        localStorage.setItem('isAuthorized', false);
    }

    next(action);
};

function isPromise(v) {
    return v && typeof v.then === 'function';
}


export { promiseMiddleware, localStorageMiddleware }
