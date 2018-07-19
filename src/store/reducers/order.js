import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

// Outsourced Purchase Init case to this separate function:
const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};

// Outsourced Purchase Burger Start case to this separate function:
const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true });
};

// Outsourced Purchase Burger Success case to this separate function:
const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
};

// Outsourced Purchase Burger Fail case to this separate function:
const purchaseBurgerFail = (state, action) => {
  return updateObject(state, { loading: false });
};

// Outsourced Fetch Orders Start case to this separate function:
const fetchOrdersStart = (state, action) => {
  return updateObject(state, { loading: true });
};

// Outsourced Fetch Orders Success case to this separate function:
const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false
  });
};

// Outsourced Fetch Orders Fail case to this separate function:
const fetchOrdersFail = (state, action) => {
  return updateObject(state, { loading: false });
};

// Main Reducer function that would be exported from this file:
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);

    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);

    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);

    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);

    default:
      return state;
  }
};

export default reducer;
