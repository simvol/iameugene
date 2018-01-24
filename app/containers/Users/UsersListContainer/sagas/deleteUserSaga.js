// import { take, call, put, select } from 'redux-saga/effects';
import { REQUEST_DELETE_USER } from '../constants';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { deleteUserSucceeded, deleteUserFailed } from '../actions';
import {ApiSettings} from '../../../../_shared/config/environment';
import toastr from 'toastr';

// Individual exports for testing
function deleteUserFromServer(id) {
  return fetch(`${ApiSettings.searchPrefix}admin/users/${id}`,{
    method: 'DELETE'
    });
}

function* deleteUser(action) {
  try {
    yield call(deleteUserFromServer, action.id);
    yield put(deleteUserSucceeded(action.id));
    toastr.success('User was deleted successfully.', 'Success');
  } catch (e) {
    yield put(deleteUserFailed(e.message));
    toastr.error('Something went wrong. Please try again later.', 'Error');
  }
}

export function* deleteUserSaga() {
  yield* takeLatest(REQUEST_DELETE_USER, deleteUser);
}

// All sagas to be loaded
export default deleteUserSaga;