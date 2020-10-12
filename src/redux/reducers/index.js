import { combineReducers } from 'redux';
import auth from './auth';
import common from "./common";
import games from './games';
import users from './users';
import provinces from "./provinces";
import {history} from "../store";

export default combineReducers({
    auth,
    common,
    games,
    users,
    provinces
});