import * as ActionTypes from './constants';

export const SetNotes = (payload) => ({
    type: ActionTypes.SET_NOTES,
    payload,
});

export const CleanNotes = (payload) => ({
    type: ActionTypes.CLEAN_NOTES,
    payload,
});