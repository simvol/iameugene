import { call, put, fork } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { ADD_APPLICATION } from '../constants';
import { requestApplicationSucceeded, requestApplicationFailed } from '../actions';
import { ApiSettings } from '../../../../_shared/config/environment';
import toastr from 'toastr';

function fetchApplicationFromServer(id) {
  let url = "";
  if (ApiSettings.firebase === true) {
    url = `${ApiSettings.searchPrefix}applications/applications/${id}.json`;
  } else {
    url = `${ApiSettings.searchPrefix}admin/applications/${id}`;
  }
  return fetch(url)
    .then(response => response.json())
}

function* fetchApplication(action) {
  const { id } = action;
  try {
    const details = yield call(fetchApplicationFromServer, id);
    yield put(requestApplicationSucceeded(details));
  } catch (e) {
    yield put(requestApplicationFailed(e));
  }
}

export function* addApplicationSaga() {
  yield* takeLatest(ADD_APPLICATION, fetchApplication);
}

// All sagas to be loaded
export default addApplicationSaga;