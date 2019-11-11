import { all } from "redux-saga/effects";
import {
    getData,
    newProduct
} from "./watcher";

export default function* rootSaga() {
    yield all([
        getData(),
        newProduct()
    ]);
};
