/*
 *
 * UserDetailsContainer actions
 *
 */

import {
  REQUEST_USER,
  REQUEST_USER_SUCCEEDED,
  REQUEST_USER_FAILED,
  RESET_USER,  

  REQUEST_APPLICATION,
  REQUEST_APPLICATION_SUCCEEDED,
  REQUEST_APPLICATION_FAILED,

  ADD_APPLICATION,
  REMOVE_APPLICATION,

  REQUEST_CHANGE_PASSWORD,
  REQUEST_CHANGE_PASSWORD_SUCCEEDED,
  REQUEST_CHANGE_PASSWORD_FAILED,

  REQUEST_UPLOAD_PICTURE,
  REQUEST_UPLOAD_PICTURE_SUCCEEDED,
  REQUEST_UPLOAD_PICTURE_FAILED,

  REQUEST_SAVE_USER,
  REQUEST_SAVE_USER_SUCCEEDED,
  REQUEST_SAVE_USER_FAILED,

} from './constants';

export function requestUser(id) {
  return {
    type: REQUEST_USER,
    id
  };
}

export function requestUserSucceeded(details) {
  return {
    type: REQUEST_USER_SUCCEEDED,
    details,
  };
}

export function requestUserFailed(message) {
  return {
    type: REQUEST_USER_FAILED,
    message,
  };
}

export function resetUser() {
  return {
    type: RESET_USER,
  };
}

export function requestApplication(id) {
  return {
    type: REQUEST_APPLICATION,
    id
  };
}

export function requestApplicationSucceeded(details) {
  return {
    type: REQUEST_APPLICATION_SUCCEEDED,
    details,
  };
}

export function requestApplicationFailed(message) {
  return {
    type: REQUEST_APPLICATION_FAILED,
    message,
  };
}

export function addApplication(id) {
  return {
    type: ADD_APPLICATION,
    id,
  };
}

export function removeApplication(id) {
  return {
    type: REMOVE_APPLICATION,
    id,
  };
}

export function requestChangePassword(data) {
  return {
    type: REQUEST_CHANGE_PASSWORD,
    data
  };
}

export function requestChangePasswordSucceeded(message) {
  return {
    type: REQUEST_CHANGE_PASSWORD_SUCCEEDED,
    message,
  };
}

export function requestChangePasswordFailed(message) {
  return {
    type: REQUEST_CHANGE_PASSWORD_FAILED,
    message,
  };
}

export function requestUploadPicture(id, data) {
  return {
    type: REQUEST_UPLOAD_PICTURE,
    id,
    data
  };
}

export function requestUploadPictureSucceeded(image) {
  return {
    type: REQUEST_UPLOAD_PICTURE_SUCCEEDED,
    image,
  };
}

export function requestUploadPictureFailed(message) {
  return {
    type: REQUEST_UPLOAD_PICTURE_FAILED,
    message,
  };
}


export function requestSaveUser(data) {
  return {
    type: REQUEST_SAVE_USER,
    data,
  };
}

export function requestSaveUserSucceeded(message) {
  return {
    type: REQUEST_SAVE_USER_SUCCEEDED,
    message,
  };
}

export function requestSaveUserFailed(message) {
  return {
    type: REQUEST_SAVE_USER_FAILED,
    message,
  };
}