import { all, call, takeLatest, delay, put } from 'redux-saga/effects';
import {
  FETCH_<%= STATE_NAME %>,
/* new-constant-import-goes-here */
} from './constants';
import {
  fetch<%= stateShortName %>Error,
  fetch<%= stateShortName %>Success,
  /* new-action-import-goes-here */
} from './actions';


import { <%= stateLower %> } from '@/api'

function* fetch<%= stateShortName %>Saga() {

  try {
    const response = yield call(<%= stateLower %>.get<%= stateShortName %>);
    const { status, data } = response;

    if (status === 200) {
      yield delay(100)
      yield put(fetch<%= stateShortName %>Success(data));
    } else {
      yield put(fetch<%= stateShortName %>Error('Sorry! An error occured!'));
    }
  } catch (error) {
    yield put(fetch<%= stateShortName %>Error('Sorry! An error occured!'));
  }
}

/* new-saga-goes-here */

export default function* <%= sagaName %>() {
  yield all([
    takeLatest(FETCH_<%= STATE_NAME %>, fetch<%= stateShortName %>Saga),
    /* new-saga-registration-goes-here */
  ]);
}
