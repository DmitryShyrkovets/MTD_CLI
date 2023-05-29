import * as constants from './constants';

const initialState = {
    notes: [
        {
            id: null,
            userId: null,
            category: null,
            name: null,
            text: null
        },
    ],
};

export const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.SET_NOTES:
            return {
                ...state,
                notes: action.payload,
            };
        case constants.CLEAN_NOTES:
            return {
                ...state,
                notes: [],
            };
        default:
            return state;
    }
};