import { REQUEST_USER } from './../constants';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { requestUserSucceeded, requestUserFailed } from './../actions';

import {ApiSettings} from '../../../_shared/config/environment';

// Individual exports for testing
function fetchUserFromServer() {
  return fetch(`${ApiSettings.searchPrefix}users/currentuser`)
    .then(res => res.json());
}

function* fetchUser() {
  try {
    const user = yield call(fetchUserFromServer);
    if (user) {
      yield put(requestUserSucceeded(user));
    } else {
      window.location.href = "/signin"; 
    }
  } catch (e) {
    yield put(requestUserFailed(e.message));
    window.location.href = "/signin"; 
  }
}

// Individual exports for testing
export function* fetchUserSaga() {
  yield* takeLatest(REQUEST_USER, fetchUser);
}

export default fetchUserSaga;