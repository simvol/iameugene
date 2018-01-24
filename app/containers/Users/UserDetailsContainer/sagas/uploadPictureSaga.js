import { call, put, fork } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { REQUEST_UPLOAD_PICTURE } from '../constants';
import { requestUploadPictureSucceeded, requestUploadPictureFailed } from '../actions';
import { ApiSettings } from '../../../../_shared/config/environment';
import toastr from 'toastr';

function uploadPictureToServer(payload) {
  return fetch(`${ApiSettings.searchPrefix}blob/images`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
  .then(response => response.json());
}

function* uploadPicture(action) {
  const { id, data } = action;

  let imgName = `imgUserId${id}.png`;
  let croppedBytes = data.replace("data:image/png;base64,", "");  

  let payload = {
    "files": [{
        "name": imgName,
        "value": {
          "fileName": imgName,
          "mediaType": 'png',
          "buffer": croppedBytes
        }
      }]
  };

  try {
    const res = yield call(uploadPictureToServer, payload);
    if (res && res.ok === false) {
      yield put(requestUploadPictureFailed());
      toastr.error(e.message, 'Error');      
    } else {
      yield put(requestUploadPictureSucceeded(res));
      toastr.info('Please save the profile to update the picture.', 'Success');
    }
  } catch (e) {
    yield put(requestUploadPictureFailed(e));
    toastr.error(e.message, 'Error');
  }
}

export function* uploadPictureSaga() {
  yield* takeLatest(REQUEST_UPLOAD_PICTURE, uploadPicture);
}

// All sagas to be loaded
export default uploadPictureSaga;