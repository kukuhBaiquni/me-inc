import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../constant/actionTypes";

import {
    _getData, 
    _newProduct,
    _getProducts,
    _deleteProduct
} from "./worker";

export function* getData() { yield takeEvery(actionTypes.GET_DATA_REQUEST, _getData); };
export function* newProduct() { yield takeEvery(actionTypes.NEW_PRODUCT_REQUEST, _newProduct); };
export function* getProducts() { yield takeEvery(actionTypes.GET_PRODUCT_REQUEST, _getProducts); };
export function* deleteProduct() { yield takeEvery(actionTypes.DELETE_PRODUCT_REQUEST, _deleteProduct); };