import * as actionTypes from './actions'

const initialState={
    //we are still not using DB so we need some initial ingredients
    ingredients: {
          salad: 0,
          bacon: 0,
          cheese: 0,
          meat: 0
      },
    totalPrice: 4,
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
        return{
            ...state,
            ingredients:{
                ...state.ingredients,
                //dynamically override given property doesn't create array just access property
                //get old number add 1 and assign to this property 
                [action.ingredientName]:state.ingredients[action.ingredientName]+1
            }

        }
        case actionTypes.REMOVE_INGREDIENT:
        return{
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingredientName]:state.ingredients[action.ingredientName]-1
            }
        }
        
    }
    return state;
}

export default reducer;