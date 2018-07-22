import * as actionTypes from './actionTypes';
import axios from '../../../node_modules/axios';

export const logOut = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeOut = expiresIn => {
  console.log('expiresIn: ', expiresIn);
  return dispatch => {
    setTimeout(() => {
      dispatch(logOut());
      // Because expireIn property returned from Firebase backend is in seconds.
      // And, milliseconds = seconds * 1000
    }, expiresIn * 1000);
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
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    const FIREBASE_API_KEY = 'AIzaSyD85gOp3lLd3s9s55F9JSCnDI6-q5qi2Vw';

    //SignUp URL
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${FIREBASE_API_KEY}`;

    if (!isSignUp) {
      //SignIn URL
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${FIREBASE_API_KEY}`;
    }

    axios
      .post(url, authData)
      .then(res => {
        // console.log('res: ', res);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeOut(res.data.expiresIn));
      })
      .catch(err => {
        // console.log('err: ', err);
        // console.log('err.response: ', err.response);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};
