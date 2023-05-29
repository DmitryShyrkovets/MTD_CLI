import * as ActionTypes from './constants';

export const SetUser = (payload) => ({
    type: ActionTypes.SET_USER,
    payload,
});

export const CleanUser = (payload) => ({
    type: ActionTypes.CLEAN_USER,
    payload,
});