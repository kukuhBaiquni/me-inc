import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../constant/actionTypes";

import {
    _getData,
    _newProduct,
    _getProducts,
    _editProduct,
    _deleteProduct,
    _getDistrict,
    _getVillage,
    _getCustomer,
    _newCustomer
} from "./worker";

export function* getData() { yield takeEvery(actionTypes.GET_DATA_REQUEST, _getData); };

export function* newProduct() { yield takeEvery(actionTypes.NEW_PRODUCT_REQUEST, _newProduct); };
export function* getProducts() { yield takeEvery(actionTypes.GET_PRODUCT_REQUEST, _getProducts); };
export function* editProduct() { yield takeEvery(actionTypes.EDIT_PRODUCT_REQUEST, _editProduct); };
export function* deleteProduct() { yield takeEvery(actionTypes.DELETE_PRODUCT_REQUEST, _deleteProduct); };

export function* getDistrict() { yield takeEvery(actionTypes.GET_DISTRICT_REQUEST, _getDistrict); };
export function* getVillage() { yield takeEvery(actionTypes.GET_VILLAGE_REQUEST, _getVillage); };

export function* getCustomer() { yield takeEvery(actionTypes.GET_CUSTOMER_REQUEST, _getCustomer); };
export function* newCustomer() { yield takeEvery(actionTypes.NEW_CUSTOMER_REQUEST, _newCustomer); };
