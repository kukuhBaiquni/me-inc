import { put, call } from "redux-saga/effects";
import * as actionTypes from "../constant/actionTypes";
import axios from "axios";

const url = "http://192.168.43.24:8080/api/v1/";

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
    const config = {...payload.config, url: url + "new-product"};
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
        yield put({
            type: actionTypes.NEW_PRODUCT_ERROR,
            message: error.response.data.message
        });
    }
};

export function* _getProducts(payload) {
    const config = {...payload.config, url: url + "get-products"};
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
        yield put({
            type: actionTypes.GET_PRODUCT_ERROR,
            message: error.response.data.message
        });
    }
};

export function* _deleteProduct(payload) {
    const config = {...payload.config, url: url + "delete-product/" + payload.data};
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
        console.log(error)
        yield put({
            type: actionTypes.DELETE_PRODUCT_ERROR,
            message: error.response.data.message
        });
    }
};