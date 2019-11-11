import { all } from "redux-saga/effects";
import {
    getData,
    newProduct,
    getProducts,
    deleteProduct
} from "./watcher";

export default function* rootSaga() {
    yield all([
        getData(),
        newProduct(),
        getProducts(),
        deleteProduct()
    ]);
};
