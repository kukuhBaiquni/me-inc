import * as actionTypes from "../constant/actionTypes";

let initialState = {
    data: [],
    success: false,
    processing: false,
    error: false,
    message: ""
};

export default function products(state = initialState, action) {
    switch (action.type) {

        case actionTypes.NEW_PRODUCT_REQUEST:
        return Object.assign({}, state, {
            success: false,
            processing: true,
            error: false,
            message: action.message
        });

        case actionTypes.NEW_PRODUCT_SUCCESS:
        return Object.assign({}, state, {
            data: [...state.data, action.data.data],
            success: true,
            processing: false,
            error: false,
            message: action.data.message
        });

        case actionTypes.NEW_PRODUCT_ERROR:
        return Object.assign({}, state, {
            success: false,
            processing: false,
            error: true,
            message: action.message
        });

        case actionTypes.GET_PRODUCT_REQUEST:
        return Object.assign({}, state, {
            success: false,
            processing: true,
            error: false,
            message: action.message
        });

        case actionTypes.GET_PRODUCT_SUCCESS:
        return Object.assign({}, state, {
            data: [...state.data, ...action.data.data],
            success: true,
            processing: false,
            error: false,
            message: action.data.message
        });

        case actionTypes.GET_PRODUCT_ERROR:
        return Object.assign({}, state, {
            success: false,
            processing: false,
            error: true,
            message: action.message
        });

        case actionTypes.DELETE_PRODUCT_REQUEST:
        return Object.assign({}, state, {
            success: false,
            processing: true,
            error: false,
            message: action.message
        });

        case actionTypes.DELETE_PRODUCT_SUCCESS:
        return Object.assign({}, state, {
            data: state.data.filter(x => x.productId !== action.data.data.productId),
            success: true,
            processing: false,
            error: false,
            message: action.data.message
        });

        case actionTypes.DELETE_PRODUCT_ERROR:
        return Object.assign({}, state, {
            success: false,
            processing: false,
            error: true,
            message: action.message
        });

        case actionTypes.PRODUCT_RESET:
        return Object.assign({}, state, {
            success: false,
            processing: false,
            error: false
        });

        default:
        return state;
    }
};
