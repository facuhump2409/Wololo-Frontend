import { createStore, applyMiddleware, compose,combineReducers } from 'redux';
import rootReducer from './reducers'
import {localStorageMiddleware, promiseMiddleware} from "./middleware";
import { routerMiddleware } from 'react-router-redux'
import { createBrowserHistory } from "history";

const history =  createBrowserHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const myRouterMiddleware = routerMiddleware(history);
// const resettableAppReducer = (state, action) =>
//     rootReducer(action.type !== USER_LOGOUT ? state : undefined, action);

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(promiseMiddleware,localStorageMiddleware,myRouterMiddleware)));