import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../constant/actionTypes";

import {
    _getData, 
    _newProduct
} from "./worker";

export function* getData() { yield takeEvery(actionTypes.GET_DATA_REQUEST, _getData); };
export function* newProduct() { yield takeEvery(actionTypes.NEW_PRODUCT_REQUEST, _newProduct); };