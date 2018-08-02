import * as actionTypes from './actionTypes';
// import axios from '../../../node_modules/axios';

export const logOut = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};

export const logOutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeOut = expiresIn => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expiresIn: expiresIn
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password, isSignUp) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    isSignUp: isSignUp
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    // console.log('token: ', token);
    if (!token) {
      dispatch(logOut());
    } else {
      const expirationDate = localStorage.getItem('expirationDate');
      if (expirationDate < new Date()) {
        dispatch(logOut());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeOut(
            (new Date(expirationDate).getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
