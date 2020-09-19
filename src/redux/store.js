import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers'
import {localStorageMiddleware, promiseMiddleware} from "./middleware";
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createHistory();

const myRouterMiddleware = routerMiddleware(history);

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(promiseMiddleware,localStorageMiddleware,myRouterMiddleware)));