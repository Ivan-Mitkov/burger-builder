import * as actionTypes from './actionTypes';

export const authStart =()=>{
    return {
        type:actionTypes.AUTH_START
    }
}
export const authSuccess =(authData)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        payload:authData
    }
}
export const authFail =(err)=>{
    return {
        type:actionTypes.AUTH_FAIL,
       payload:err
    }
}

//async
export const auth =(email,password)=>{
    return dispatch=>{
        //here the user is authenticated
        dispatch(authStart());
    }
}