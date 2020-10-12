import { combineReducers } from 'redux';
import auth from './auth';
import common from "./common";
import games from './games';
import users from './users';
import provinces from "./provinces";
import {adminReducer} from "react-admin";
import { connectRouter } from 'connected-react-router'
import {history} from "../store";

export default combineReducers({
    router: connectRouter(history),
    admin: adminReducer,
    auth,
    common,
    games,
    users,
    provinces
});