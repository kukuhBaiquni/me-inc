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
    console.log(config)
    try {
        const response = yield call(async () => {
            const res = await axios(config);
            return res;
        });
        console.log(response);
        // yield put({
        //     type: actionTypes.GET_DATA_SUCCESS,
        //     data: response.data.message
        // });
    }catch (error) {
        console.log("api call yield error: ", error);
    }
};