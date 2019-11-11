import * as actionTypes from "../constant/actionTypes";

let initialState = {
    data: [],
    success: false,
    processing: false,
    error: false,
    message: ""
};

export default function data(state = initialState, action) {
    switch (action.type) {

        case actionTypes.NEW_PRODUCT_REQUEST:
        return Object.assign({}, state, {
            success: false,
            processing: true,
            error: false,
            message: ""
        });;

        case actionTypes.NEW_PRODUCT_SUCCESS:
        return Object.assign({}, state, {
            data: [...state.data, action.data.data],
            success: true,
            processing: false,
            error: false,
            message: action.data.message
        });;

        case actionTypes.NEW_PRODUCT_ERROR:
        return Object.assign({}, state, {
            success: false,
            processing: false,
            error: true,
            message: action.data.message
        });;

        case actionTypes.NEW_PRODUCT_RESET:
        return initialState;

        default:
        return state;
    }
};
