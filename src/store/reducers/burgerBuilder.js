import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
  salad: 12.5,
  bacon: 17.5,
  cheese: 10,
  meat: 30
};

const initialState = {
  ingredients: null,
  totalPrice: 100,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      };
      const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
      );
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
      return updateObject(state, updatedState);
    case actionTypes.REMOVE_INGREDIENT:
      const updatedIng = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
      };
      const updatedIngs = updateObject(state.ingredients, updatedIng);
      const updatedStat = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
      return updateObject(state, updatedStat);
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        totalPrice: 100,
        error: false
      });
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });
    default:
      return state;
  }
};

export default reducer;
