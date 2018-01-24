// import { take, call, put, select } from 'redux-saga/effects';
import { REQUEST_APPLICATIONS, FETCH_APPLICATIONS } from '../constants';
import { call, put, throttle } from 'redux-saga/effects';
import { requestApplicationsSucceeded, requestApplicationsFailed } from '../actions';
import { ApiSettings } from '../../../../_shared/config/environment';
import { FILTER_DELAY } from '../../../../_shared/constants';
import toastr from 'toastr';
import { debug } from 'util';

// Individual exports for testing
function fetchApplicationsFromServer(options) {
  var url = "";

  if (ApiSettings.firebase === true) {
    url = `${ApiSettings.searchPrefix}applications.json`;
  } else {
    const { page, size, filter } = options;
    url = `${ApiSettings.searchPrefix}/applications/${page}/${size}/${filter}`;
  }

  return fetch(url)
    .then(res => res.json());
}

function* fetchApplications(actions) {
  try {
    const res = yield call(fetchApplicationsFromServer, actions.pagination);
    yield put(requestApplicationsSucceeded(res.applications, res.paging.count));
  } catch (e) {
    // console.log(e);
    yield put(requestApplicationsFailed(e));
  }
}

export function* fetchApplicationsSaga() {
  // yield takeLatest(FILTER_DELAY, REQUEST_APPLICATIONS, fetchApplications);
  yield throttle(FILTER_DELAY, [REQUEST_APPLICATIONS, FETCH_APPLICATIONS], fetchApplications);
}

// All sagas to be loaded
export default fetchApplicationsSaga;
