import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { REQUEST_CHANGE_PASSWORD } from '../constants';
import { requestChangePasswordSucceeded, requestChangePasswordFailed } from '../actions';
import { ApiSettings } from '../../../../_shared/config/environment';
import toastr from 'toastr';

function changePasswordOnServer(data) {
  return fetch(`${ApiSettings.searchPrefix}admin/users/changepassword/${data.id}`, {
    method: 'PUT',
    body: '"' + data.pswd + '"',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
  .then(res => res)
}

function* changePassword(action) {
  const { data } = action;
  let sMsg = 'Password changed successfully.',
      eMsg = 'Couldn\t update password. Please try again later...';

  try {
    const res = yield call(changePasswordOnServer, data);
    if (res && res.statusText === 'OK'){
      yield put(requestChangePasswordSucceeded());
      toastr.success(sMsg, 'Success');
    } else {
      yield put(requestChangePasswordFailed());
      toastr.error(eMsg, 'Error');
    }
    
  } catch (e) {
    yield put(requestChangePasswordFailed(e));
    toastr.error(eMsg, 'Error');    
  }
}

export function* changePasswordSaga() {
  yield* takeLatest(REQUEST_CHANGE_PASSWORD, changePassword);
}

// All sagas to be loaded
export default changePasswordSaga;