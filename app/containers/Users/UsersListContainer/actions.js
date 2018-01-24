/*
 *
 * UsersListContainer actions
 *
 */

import {
  REQUEST_USERS,
  REQUEST_USERS_SUCCEEDED,
  REQUEST_USERS_FAILED,
  FETCH_USERS,

  REQUEST_DELETE_USER,
  REQUEST_DELETE_USER_SUCCEEDED,
  REQUEST_DELETE_USER_FAILED
} from './constants';

export function requestUsers(options) {
  return {
    type: REQUEST_USERS,
    options
  };
}

export function fetchUsers(options) {
  return {
    type: FETCH_USERS,
    options
  };
}

export function requestUsersSucceeded(users, totalUsers) {
  return {
    type: REQUEST_USERS_SUCCEEDED,
    users,
    totalUsers
  };
}

export function requestUsersFailed(message) {
  return {
    type: REQUEST_USERS_FAILED,
    message,
  };
}

export function deleteUser(id) {
  return {
    type: REQUEST_DELETE_USER,
    id
  };
}

export function deleteUserSucceeded(id) {
  return {
    type: REQUEST_DELETE_USER_SUCCEEDED,
    id
  };
}

export function deleteUserFailed(message) {
  return {
    type: REQUEST_DELETE_USER_FAILED,
    message
  };
}
