import { combineReducers } from 'redux';
import {userReducer} from "./user/reducer";
import {noteReducer} from "./note/reducer";
export const appReducers =  {
    user: userReducer,
    note: noteReducer,
}

export const rootReducer = combineReducers({ ...appReducers });