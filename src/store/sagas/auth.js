import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import * as actions from '../actions/index';

export function* logOutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('userId');
  yield localStorage.removeItem('expirationDate');
  yield put(actions.logOutSucceed());
}

export function* checkAuthTimeOutSaga(action) {
  yield delay(action.expiresIn * 1000);
  yield put(actions.logOut());
}
