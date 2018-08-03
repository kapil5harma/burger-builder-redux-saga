import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';

import * as actions from '../actions/index';

export function* logOutSaga(action) {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'userId');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield put(actions.logOutSucceed());
}

export function* checkAuthTimeOutSaga(action) {
  yield delay(action.expiresIn * 1000);
  yield put(actions.logOut());
}

export function* authUserSaga(action) {
  console.log('action: ', action);

  yield put(actions.authStart());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };

  const FIREBASE_API_KEY = 'AIzaSyD85gOp3lLd3s9s55F9JSCnDI6-q5qi2Vw';

  //SignUp URL
  let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${FIREBASE_API_KEY}`;

  if (!action.isSignUp) {
    //SignIn URL
    url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${FIREBASE_API_KEY}`;
  }
  try {
    const res = yield axios.post(url, authData);
    const expirationDate = yield new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );
    yield localStorage.setItem('token', res.data.idToken);
    yield localStorage.setItem('userId', res.data.localId);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthTimeOut(res.data.expiresIn));
  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.logOut());
  } else {
    const expirationDate = yield localStorage.getItem('expirationDate');
    if (expirationDate < new Date()) {
      yield put(actions.logOut());
    } else {
      const userId = yield localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeOut(
          (new Date(expirationDate).getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
