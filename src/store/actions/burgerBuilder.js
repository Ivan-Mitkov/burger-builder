import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    payload: ingredients
  };
};

export const fetchIngredientFailed = () => {
  return {
    type: actionTypes.FETCH_ING_FAILED
  };
};
export const initIngredients = () => {
  return dispatch => {
    axios
      .get("https://react-my-burger-abb69.firebaseio.com/ingredients.json")
      .then(response => {
          console.log('FETCHED: ',response.data)
        dispatch(setIngredients(response.data));
      })
      .catch(err => {
        dispatch(fetchIngredientFailed());
      });
  };
};
