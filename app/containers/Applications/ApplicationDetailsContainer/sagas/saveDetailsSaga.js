import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { REQUEST_SAVE_APPLICATION } from '../constants';
import { requestApplication, saveApplicationSucceeded, saveApplicationFailed } from '../actions';
import { ApiSettings } from '../../../../_shared/config/environment';
import toastr from 'toastr';
import { replace }  from 'react-router-redux';

function saveDetailsFromServer(data) {
  let url = data.id ? `${ApiSettings.searchPrefix}admin/applications/${data.id}` : `${ApiSettings.searchPrefix}admin/applications`;
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
  let sMsg = 'New application created.',
      eMsg = 'Couldn\'t create new application.';

  if (data.id) {
    sMsg = 'The application successfully updated.';
    eMsg = 'Couldn\'t update the application';
  }

  try {
    const res = yield call(saveDetailsFromServer, data);
    // console.log('res', res);
    if (res && res.id){
      yield put(replace(`/applications/${res.id}`));
      yield put(saveApplicationSucceeded());
      yield put(requestApplication(res.id));
      toastr.success(sMsg, 'Success');
    } else {
      yield put(saveApplicationFailed());
      eMsg = res.message || eMsg;
      toastr.error(eMsg, 'Error');
    }
    
  } catch (e) {
    yield put(saveApplicationFailed(e));
    eMsg = e.message || eMsg;
    toastr.error(eMsg, 'Error');
  }
}

export function* saveDetailsSaga() {
  yield* takeLatest(REQUEST_SAVE_APPLICATION, saveDetails);
}

// All sagas to be loaded
export default saveDetailsSaga;