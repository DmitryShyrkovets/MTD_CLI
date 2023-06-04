import * as ActionTypes from './constants';

export const SetNotes = (payload) => ({
    type: ActionTypes.SET_NOTES,
    payload,
});

export const CreateNote = (payload) => ({
    type: ActionTypes.CREATE_NOTE,
    payload,
});

export const CleanNotes = (payload) => ({
    type: ActionTypes.CLEAN_NOTES,
    payload,
});

export const SetFlag = (payload) => ({
    type: ActionTypes.SET_FLAG,
    payload,
});

export const ShowCreateForm = (payload) => ({
    type: ActionTypes.SHOW_CREATE_FORM,
    payload,
});

export const HideCreateForm = (payload) => ({
    type: ActionTypes.HIDE_CREATE_FORM,
    payload,
});