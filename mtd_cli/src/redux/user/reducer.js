import * as constants from './constants';

const initialState = {
    profile: {
        id: null,
        email: null,
    }
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.SET_USER:
            return {
                ...state,
                profile: action.payload,
            };
        case constants.CLEAN_USER:
            return {
                ...state,
                profile: {},
            };
        default:
            return state;
    }
};