/*
 *
 * ApplicationDetailsContainer actions
 *
 */

import {
  REQUEST_APPLICATION,
  REQUEST_APPLICATION_SUCCEEDED,
  REQUEST_APPLICATION_FAILED,

  REQUEST_SAVE_APPLICATION,
  REQUEST_SAVE_APPLICATION_SUCCEEDED,
  REQUEST_SAVE_APPLICATION_FAILED,
} from './constants';

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

export function saveApplication(data) {
  return {
    type: REQUEST_SAVE_APPLICATION,
    data
  };
}

export function saveApplicationSucceeded(message) {
  return {
    type: REQUEST_SAVE_APPLICATION_SUCCEEDED,
    message,
  };
}

export function saveApplicationFailed(message) {
  return {
    type: REQUEST_SAVE_APPLICATION_FAILED,
    message,
  };
}