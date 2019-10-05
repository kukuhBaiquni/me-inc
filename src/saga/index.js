import { all } from 'redux-saga/effects';
import {
    getData
} from './watcher';

export default function* rootSaga() {
    yield all([
        getData()
    ]);
};
