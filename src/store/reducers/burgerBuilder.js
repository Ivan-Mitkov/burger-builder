import * as actionTypes from "../actions/actionTypes";

const initialState = {
  //we are still not using DB so we need some initial ingredients
  // ingredients: {
  //   salad: 0,
  //   bacon: 0,
  //   cheese: 0,
  //   meat: 0
  // },
  ingredients: null,
  totalPrice: 4,
  error: false,
  //storing info for building burger for sign up after making burger
  building: false
};
const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          //dynamically override given property doesn't create array just access property
          //get old number add 1 and assign to this property
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
        totalPrice: 4,
        //in case we have error before
        error: false,
        building:false
      };

    case actionTypes.FETCH_ING_FAILED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
