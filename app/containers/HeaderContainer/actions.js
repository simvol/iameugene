/*
 *
 * HeaderContainer actions
 *
 */

import {
  REQUEST_USER,
  REQUEST_USER_SUCCEEDED,
  REQUEST_USER_FAILED,
} from './constants';

export function requestUser() {
  return {
    type: REQUEST_USER,
  };
}

export function requestUserSucceeded(user) {
  return {
    type: REQUEST_USER_SUCCEEDED,
    user
  };
}

export function requestUserFailed(message) {
  return {
    type: REQUEST_USER_FAILED,
    message
  };
}