import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/"
};
const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: actions.error,
        loading: false
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: actions.idToken,
        userId: actions.userId,
        error: null,
        loading: false
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null
      };
     case actionTypes.SET_AUTH_REDIRECT_PATH:
     return{
       ...state,
       authRedirectPath:actions.payload
     } 
    default:
      return state;
  }
};

export default reducer;
