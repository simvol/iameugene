//import { take, call, put, select } from 'redux-saga/effects';
import {
  loginSaga,
  fetchAppInfoSaga,
  fetchUserImageURLSaga
} from './login-sagas';

// All sagas to be loaded
export default [
  fetchAppInfoSaga,
  loginSaga,
  fetchUserImageURLSaga
];
