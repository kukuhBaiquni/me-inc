import { put, call } from "redux-saga/effects";
import * as actionTypes from "../constant/actionTypes";
import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

export function* _getData(payload) {
    const config = {...payload.config, url};
    try {
        var response = yield call(async () => {
            const res = await axios(config);
            return res;
        })
        console.log(response);
        yield put({
            type: actionTypes.GET_DATA_SUCCESS,
            data: response.data.message
        })
    }catch (error) {
        console.log("api call yield error: ", error);
    }
};

export function* _newProduct(payload) {
    const config = {...payload.config, url: url + "/new-product"};
    try {
        const response = yield call(async () => {
            const res = await axios(config);
            return res;
        });
        yield put({
            type: actionTypes.NEW_PRODUCT_SUCCESS,
            data: response.data
        });
        yield put({
            type: actionTypes.PRODUCT_RESET
        });
    }catch (error) {
        if(error.response) {
            yield put({
                type: actionTypes.NEW_PRODUCT_ERROR,
                message: error.response.data.message
            });
        }else{
            yield put({
                type: actionTypes.NEW_PRODUCT_ERROR,
                message: "Unable connect to server"
            });
        }
    }
};

export function* _getProducts(payload) {
    const config = {...payload.config, url: url + "/get-products"};
    try {
        const response = yield call(async () => {
            const res = await axios(config);
            return res;
        });
        yield put({
            type: actionTypes.GET_PRODUCT_SUCCESS,
            data: response.data
        });
        yield put({
            type: actionTypes.PRODUCT_RESET
        });
    }catch (error) {
        if(error.response) {
            yield put({
                type: actionTypes.GET_PRODUCT_ERROR,
                message: error.response.data.message
            });
        }else{
            yield put({
                type: actionTypes.GET_PRODUCT_ERROR,
                message: "Unable connect to server"
            });
        }
    }
};

export function* _editProduct(payload) {
    const config = {...payload.config, url: url + "/edit-product/" + payload.params};
    try {
        const response = yield call(async () => {
            const res = await axios(config);
            return res;
        });
        yield put({
            type: actionTypes.EDIT_PRODUCT_SUCCESS,
            data: response.data
        });
        yield put({
            type: actionTypes.PRODUCT_RESET
        });
    }catch (error) {
        if(error.response) {
            yield put({
                type: actionTypes.EDIT_PRODUCT_ERROR,
                message: error.response.data.message
            });
        }else{
            yield put({
                type: actionTypes.EDIT_PRODUCT_ERROR,
                message: "Unable connect to server"
            });
        }
    }
};

export function* _deleteProduct(payload) {
    const config = {...payload.config, url: url + "/delete-product/" + payload.params};
    try {
        const response = yield call(async () => {
            const res = await axios(config);
            return res;
        });
        yield put({
            type: actionTypes.DELETE_PRODUCT_SUCCESS,
            data: response.data
        });
        yield put({
            type: actionTypes.PRODUCT_RESET
        });
    }catch (error) {
        if(error.response) {
            yield put({
                type: actionTypes.DELETE_PRODUCT_ERROR,
                message: error.response.data.message
            });
        }else{
            yield put({
                type: actionTypes.DELETE_PRODUCT_ERROR,
                message: "Unable connect to server"
            });
        }
    }
};

export function* _getDistrict(payload) {
    const config = {...payload.config, url: url + "/get-district"};
    try {
        const response = yield call(async () => {
            const res = await axios(config);
            return res;
        });
        yield put({
            type: actionTypes.GET_DISTRICT_SUCCESS,
            data: response.data
        });
        yield put({
            type: actionTypes.ZONE_RESET
        });
    }catch (error) {
        if(error.response) {
            yield put({
                type: actionTypes.GET_DISTRICT_ERROR,
                message: error.response.data.message
            });
        }else{
            yield put({
                type: actionTypes.GET_DISTRICT_ERROR,
                message: "Unable connect to server"
            });
        }
    }
};

export function* _getVillage(payload) {
    const config = {...payload.config, url: url + "/get-village/" + payload.params};
    try {
        const response = yield call(async () => {
            const res = await axios(config);
            return res;
        });
        yield put({
            type: actionTypes.GET_VILLAGE_SUCCESS,
            data: response.data
        });
        yield put({
            type: actionTypes.ZONE_RESET
        });
    }catch (error) {
        if(error.response) {
            yield put({
                type: actionTypes.GET_VILLAGE_ERROR,
                message: error.response.data.message
            });
        }else{
            yield put({
                type: actionTypes.GET_VILLAGE_ERROR,
                message: "Unable connect to server"
            });
        }
    }
};

export function* _getCustomer(payload) {
    const config = {...payload.config, url: url + "/get-customer"};
    try {
        const response = yield call(async () => {
            const res = await axios(config);
            return res;
        });
        yield put({
            type: actionTypes.GET_CUSTOMER_SUCCESS,
            data: response.data
        });
        yield put({
            type: actionTypes.CUSTOMER_RESET
        });
    }catch (error) {
        if(error.response) {
            yield put({
                type: actionTypes.GET_CUSTOMER_ERROR,
                message: error.response.data.message
            });
        }else{
            yield put({
                type: actionTypes.GET_CUSTOMER_ERROR,
                message: "Unable connect to server"
            });
        }
    }
};

export function* _newCustomer(payload) {
    const config = {...payload.config, url: url + "/new-customer"};
    try {
        const response = yield call(async () => {
            const res = await axios(config);
            return res;
        });
        yield put({
            type: actionTypes.NEW_CUSTOMER_SUCCESS,
            data: response.data
        });
        yield put({
            type: actionTypes.CUSTOMER_RESET
        });
    }catch (error) {
        if(error.response) {
            yield put({
                type: actionTypes.NEW_CUSTOMER_ERROR,
                message: error.response.data.message
            });
        }else{
            yield put({
                type: actionTypes.NEW_CUSTOMER_ERROR,
                message: "Unable connect to server"
            });
        }
    }
};
