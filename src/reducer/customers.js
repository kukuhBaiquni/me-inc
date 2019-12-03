import * as actionTypes from '../constant/actionTypes';

let initialState = {
    data: [],
    success: false,
    error: false,
    processing: false,
    message: ""
};

export default function customers(state = initialState, action) {
    switch (action.type) {

        case actionTypes.NEW_CUSTOMER_REQUEST:
        return Object.assign({}, state, {
            success: false,
            processing: true,
            error: false,
            message: action.message
        });

        case actionTypes.NEW_CUSTOMER_SUCCESS:
        return Object.assign({}, state, {
            data: [action.data.data, ...state.data],
            success: true,
            processing: false,
            error: false,
            message: action.data.message
        });

        case actionTypes.NEW_CUSTOMER_ERROR:
        return Object.assign({}, state, {
            success: false,
            processing: false,
            error: true,
            message: action.message
        });

        case actionTypes.GET_CUSTOMER_REQUEST:
        return Object.assign({}, state, {
            success: false,
            processing: true,
            error: false,
            message: action.message
        });

        case actionTypes.GET_CUSTOMER_SUCCESS:
        return Object.assign({}, state, {
            data: [...state.data, ...action.data.data],
            success: true,
            processing: false,
            error: false,
            message: action.data.message
        });

        case actionTypes.GET_CUSTOMER_ERROR:
        return Object.assign({}, state, {
            success: false,
            processing: false,
            error: true,
            message: action.message
        });

        case actionTypes.CUSTOMER_RESET:
        return Object.assign({}, state, {
            success: false,
            processing: false,
            error: false
        });

        default:
        return state;
    }
};