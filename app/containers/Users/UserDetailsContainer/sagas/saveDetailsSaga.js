import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { REQUEST_SAVE_USER } from '../constants';
import { requestUser, requestSaveUserSucceeded, requestSaveUserFailed } from '../actions';
import { ApiSettings } from '../../../../_shared/config/environment';
import toastr from 'toastr';
import { replace }  from 'react-router-redux';

function saveDetailsToServer(data) {
  let url = data.id ? `${ApiSettings.searchPrefix}admin/users/${data.id}` : `${ApiSettings.searchPrefix}admin/users`;
  let method = data.id ? 'PUT' : 'POST';

  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
}

function* saveDetails(action) {
  const { data } = action;
  let sMsg = 'New user created.',
      eMsg = 'Couldn\'t create new user.';

  if (data.id) {
    sMsg = 'The user successfully updated.';
    eMsg = 'Couldn\'t update the user';
  }

  try {
    const res = yield call(saveDetailsToServer, data);
    if (res && res.id){
      yield put(replace(`/users/${res.id}`));
      yield put(requestSaveUserSucceeded());
      yield put(requestUser(res.id));
      toastr.success(sMsg, 'Success');
    } else {
      yield put(requestSaveUserFailed());
      eMsg = res.message || eMsg;
      toastr.error(eMsg, 'Error');
    }
    
  } catch (e) {
    yield put(requestSaveUserFailed(e));
    toastr.error(eMsg, 'Error');    
  }
}

export function* saveDetailsSaga() {
  yield* takeLatest(REQUEST_SAVE_USER, saveDetails);
}

// All sagas to be loaded
export default saveDetailsSaga;