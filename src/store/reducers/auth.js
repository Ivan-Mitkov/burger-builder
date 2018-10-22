import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
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
        error: actions.err,
        loading:false
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: actions.idToken,
        userId: actions.userId,
        error: null,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
