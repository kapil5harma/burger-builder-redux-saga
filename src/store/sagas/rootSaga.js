import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logOutSaga, checkAuthTimeOutSaga, authUserSaga } from './auth';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeOutSaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logOutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
}
