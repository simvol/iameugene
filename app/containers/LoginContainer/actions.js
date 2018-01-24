/*
 *
 * LoginContainer actions
 *
 */

import {
  REQUEST_APP_INFO,
  REQUEST_APP_INFO_SUCCEEDED,
  REQUEST_APP_INFO_FAILURE,

  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,

  REQUEST_USER_IMAGE,
  USER_IMAGE_SUCCESS
} from './constants';

export function requestAppInfo() {
  return {
    type: REQUEST_APP_INFO,
  };
}

export function requestAppInfoSucceeded(appInfo) {
  return {
    type: REQUEST_APP_INFO_SUCCEEDED,
    appInfo,
  };
}

export function requestAppInfoFailed(message) {
  return {
    type: REQUEST_APP_INFO_FAILURE,
    message,
  };
}

export function loginRequest(payload) {
  return {
    type: LOGIN_REQUEST,
    payload
  };
}

export function loginSuccess(tokenInfo, userInfo) {
  return {
    type: LOGIN_REQUEST_SUCCESS,
    tokenInfo,
    userInfo
  };
}

export function loginFailure(message) {
  return {
    type: LOGIN_REQUEST_FAILURE,
    message
  };
}

export function requestUserImage(userEmail){
  return {
    type: REQUEST_USER_IMAGE,
    userEmail
  };
}

export function userImageSuccess(imageUrl){
  return {
    type: USER_IMAGE_SUCCESS,
    imageUrl
  };
}
