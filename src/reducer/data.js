import * as actionTypes from '../constant/actionTypes';

let initialState = {
    data: ''
};

export default function data(state = initialState, action) {
    switch (action.type) {

        case actionTypes.GET_DATA_SUCCESS:
            return action.data;

        default:
        return state;
    }
};
