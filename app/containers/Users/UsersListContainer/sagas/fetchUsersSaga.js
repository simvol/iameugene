// import { take, call, put, select } from 'redux-saga/effects';
import { REQUEST_USERS, FETCH_USERS } from '../constants';
import { call, put, throttle } from 'redux-saga/effects';
import { requestUsersSucceeded, requestUsersFailed } from '../actions';
import {ApiSettings} from '../../../../_shared/config/environment';
import { FILTER_DELAY } from '../../../../_shared/constants';

// Individual exports for testing
function fetchUsersFromServer(options) {
  var url = "";
  
  if (ApiSettings.firebase === true) {
    url = `${ApiSettings.searchPrefix}users.json`;
  } else {
    const { page, size, filter } = options;
    url = `${ApiSettings.searchPrefix}admin/users/${page}/${size}/${filter}`;
  }

  return fetch(url)
    .then(res => res.json());
}

function* fetchUsers(action) {
  try {
    const result = yield call(fetchUsersFromServer, action.options);
    yield put(requestUsersSucceeded(result.users, result.paging.count));
  } catch (e) {
    yield put(requestUsersFailed(e.message));
  }
}

export function* fetchUsersSaga() {
  yield throttle(FILTER_DELAY, [FETCH_USERS, REQUEST_USERS], fetchUsers);
}

// All sagas to be loaded
export default fetchUsersSaga;