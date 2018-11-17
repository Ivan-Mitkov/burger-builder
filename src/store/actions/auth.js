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
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
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
    }, expirationTime * 1000);
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
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        //saving in loval storage
        localStorage.setItem("token", response.data.idToken);
        //saving expiration
        localStorage.setItem("expirationDate", expirationDate);

        localStorage.setItem("userId", response.data.localId);
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

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    payload: path
  };
};

export const authCheckState = () => {
  //dispatch for returning multiple actions
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));

      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            ((expirationDate.getTime() - new Date().getTime())/1000)
          )
        );
      }
    }
  };
};
