import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../constant/actionTypes';

import {
    _getData
} from './worker';

export function* getData() { yield takeEvery(actionTypes.GET_DATA_REQUEST, _getData); };