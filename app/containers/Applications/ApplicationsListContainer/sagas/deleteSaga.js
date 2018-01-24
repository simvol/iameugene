import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { REQUEST_DELETE_APPLICATION } from '../constants';
import { requestApplications, deleteApplicationSucceeded, deleteApplicationFailed } from '../actions';
import { ApiSettings } from '../../../../_shared/config/environment';
import toastr from 'toastr';

function deleteApplicationFromServer(id) {
  return fetch(`${ApiSettings.searchPrefix}admin/applications/${id}`, {
    method: 'DELETE'
  });
}

function* deleteApplication(action) {
  const { id } = action;
  try {
    const details = yield call(deleteApplicationFromServer, id);
    yield put(deleteApplicationSucceeded(id));
    toastr.success('The application was deleted.', 'Success');
  } catch (e) {
    yield put(deleteApplicationFailed(e));
    toastr.error('Something went wrong. Please try again later...', 'Error');
  }
}

export function* deleteSaga() {

  //I think if we add superstar to yield the next line of code won't be executed untill all yield are done in the function that we called after yield*
  yield* takeLatest(REQUEST_DELETE_APPLICATION, deleteApplication);
  //executed after all yield in fetchDetails ?? maybe...
}

// All sagas to be loaded
export default deleteSaga;