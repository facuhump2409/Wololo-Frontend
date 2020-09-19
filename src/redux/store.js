import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers'
// import thunk from 'redux-thunk';
import {localStorageMiddleware, promiseMiddleware} from "./middleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(rootReducer, composeEnhancers(applyMiddleware(promiseMiddleware,localStorageMiddleware)));