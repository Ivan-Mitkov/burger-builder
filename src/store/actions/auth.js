import * as actionTypes from "./actionTypes";
import axios from "axios";
import { API_KEY } from "../../consts";

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
export const authFail = err => {
  return {
    type: actionTypes.AUTH_FAIL,
    err: err
  };
};

//async
export const auth = (email, password) => {
  return dispatch => {
    //here the user is authenticated
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    console.log('Auth data1',authData)
    axios.post(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`,
      authData
    ).then(response=>{   
        console.log(response);
        console.log('Auth data3',authData);
        dispatch(authSuccess(response.data))
    })
    .catch(err=>{
        console.log(err);
        console.log('Auth data2',authData);
        dispatch(authFail(err))
    });
  };
};
