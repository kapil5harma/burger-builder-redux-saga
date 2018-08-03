import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* initIngredientsSaga(action) {
  try {
    const res = yield axios.get(
      'https://react-burger-builder-5fa6a.firebaseio.com/ingredients.json'
    );
    yield put(actions.setIngredients(res.data));
  } catch (err) {
    yield put(actions.fetchIngredientsFailed());
  }
}
