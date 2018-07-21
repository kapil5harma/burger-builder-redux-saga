import * as actionTypes from './actionTypes';
import axios from '../../../node_modules/axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password) => {
  console.log('email: ', email);
  console.log('password: ', password);
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    console.log('authData: ', authData);
    axios
      .post(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD85gOp3lLd3s9s55F9JSCnDI6-q5qi2Vw',
        authData
      )
      .then(res => {
        console.log('res: ', res);
        dispatch(authSuccess(Response.data));
      })
      .catch(err => {
        console.log('err: ', err);
        dispatch(authFail(err));
      });
  };
};
