import * as actionTypes from "./actionTypes";
import axios from "axios";
import { API_KEY } from "../../consts";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};
export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};
export const authFail = err => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err
  };
};
export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

//async
//check timeout token

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      //after the expiration time call logout action
      dispatch(logout());
      //expiration time is in seconds but setTimout think it=s milliscunds so *1000
    }, expirationTime*1000);
  };
};
export const auth = (email, password, isSignUp) => {
  return dispatch => {
    //here the user is authenticated
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
    if (!isSignUp) {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
    }
    axios
      .post(url, authData)
      .then(response => {
        // console.log(response);
        //for timout dispatch propperty of the response and get this in checkTimeout()
        dispatch(checkAuthTimeout(response.data.expiresIn));
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        
      })
      .catch(err => {
        // console.log(err);
        // dispatch(authFail(err));
        //accessing error
        // console.log('err ',err.response);
        dispatch(authFail(err.response.data.error));
      });
  };
};
