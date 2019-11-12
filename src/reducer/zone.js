import * as actionTypes from '../constant/actionTypes';

let initialState = {
    district: [],
    village: [],
    success: false,
    error: false,
    processing: false
};

export default function zone(state = initialState, action) {
    switch (action.type) {

        case actionTypes.GET_DISTRICT_REQUEST:
        return Object.assign({}, state, {
            success: false,
            processing: true,
            error: false
        });

        case actionTypes.GET_DISTRICT_SUCCESS:
        return Object.assign({}, state, {
            district: action.data.data,
            success: true,
            processing: false,
            error: false
        });

        case actionTypes.GET_DISTRICT_ERROR:
        return Object.assign({}, state, {
            success: false,
            processing: false,
            error: true
        });

        case actionTypes.GET_VILLAGE_REQUEST:
        return Object.assign({}, state, {
            success: false,
            processing: true,
            error: false
        });

        case actionTypes.GET_VILLAGE_SUCCESS:
        return Object.assign({}, state, {
            village: action.data.data,
            success: true,
            processing: false,
            error: false
        });

        case actionTypes.GET_VILLAGE_ERROR:
        return Object.assign({}, state, {
            success: false,
            processing: false,
            error: true
        });

        case actionTypes.ZONE_RESET:
        return Object.assign({}, state, {
            success: false,
            processing: false,
            error: false
        });

        default:
        return state;
    }
};