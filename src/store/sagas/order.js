import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* purchaseBurgerSaga(action) {
  try {
    const res = yield axios.post(
      `/orders.json?auth=${action.token}`,
      action.orderData
    );
    yield put(actions.purchaseBurgerSuccess(res.data.name, action.orderData));
  } catch (err) {
    yield put(actions.purchaseBurgerFail(err));
  }
}

export function* fetchOrdersSaga(action) {
  try {
    yield put(actions.fetchOrdersStart());
    const queryParams = yield `?auth=${
      action.token
    }&orderBy="userId"&equalTo="${action.userId}"`;
    const res = yield axios.get(`/orders.json${queryParams}`);
    const fetchedOrders = [];
    for (let key in res.data) {
      fetchedOrders.push({
        id: key,
        ...res.data[key]
      });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (err) {
    yield put(actions.fetchOrdersFail(err));
  }
}
