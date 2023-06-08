import * as constants from './constants';
import moment from 'moment'

const initialState = {
    notes: [
        {
            id: null,
            userId: null,
            name: null,
            description: null,
            isDone: null,
            createAt: null,
            doneAt: null
        },
    ],
    detail: {
        id: null,
        userId: null,
        name: null,
        description: null,
        isDone: null,
        createAt: null,
        doneAt: null
    },
    flag: false,
    showCreateForm: false,
    showUpdateForm: false,
};

export const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.SET_NOTES:
            return {
                ...state,
                notes: action.payload,
            };
        case constants.CREATE_NOTE:
            return {
                ...state,
                flag: !state.flag,
                showCreateForm: false
            };
        case constants.UPDATE_NOTE:
            return {
                ...state,
                showUpdateForm: false,
                flag: !state.flag,
            };
        case constants.CLEAN_NOTES:
            return {
                ...state,
                notes: [],
            };
        case constants.SET_DETAIL:
            return {
                ...state,
                detail: action.payload
            };
        case constants.SET_FLAG:
            return {
                ...state,
                flag: !state.flag
            };
        case constants.SHOW_CREATE_FORM:
            return {
                ...state,
                showCreateForm: true
            };
        case constants.HIDE_CREATE_FORM:
            return {
                ...state,
                showCreateForm: false
            };
        case constants.SHOW_UPDATE_FORM:
            return {
                ...state,
                showUpdateForm: true
            };
        case constants.HIDE_UPDATE_FORM:
            return {
                ...state,
                showUpdateForm: false
            };
        default:
            return state;
    }
};