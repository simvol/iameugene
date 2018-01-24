/*
 *
 * ApplicationsListContainer actions
 *
 */

import {
  REQUEST_APPLICATIONS,
  REQUEST_APPLICATIONS_SUCCEEDED,
  REQUEST_APPLICATIONS_FAILED,
  FETCH_APPLICATIONS,

  REQUEST_DELETE_APPLICATION,
  REQUEST_DELETE_APPLICATION_SUCCEEDED,
  REQUEST_DELETE_APPLICATION_FAILED,
} from './constants';

export function requestApplications(pagination) {
  return {
    type: REQUEST_APPLICATIONS,
    pagination
  };
}

export function fetchApplications(pagination) {
  return {
    type: FETCH_APPLICATIONS,
    pagination
  };
}

export function requestApplicationsSucceeded(applications, totalApplications) {
  return {
    type: REQUEST_APPLICATIONS_SUCCEEDED,
    applications,
    totalApplications,
  };
}

export function requestApplicationsFailed(message) {
  return {
    type: REQUEST_APPLICATIONS_FAILED,
    message,
  };
}

export function deleteApplication(id) {
  return {
    type: REQUEST_DELETE_APPLICATION,
    id
  };
}

export function deleteApplicationSucceeded(id) {
  return {
    type: REQUEST_DELETE_APPLICATION_SUCCEEDED,
    id
  };
}

export function deleteApplicationFailed(message) {
  return {
    type: REQUEST_DELETE_APPLICATION_FAILED,
    message,
  };
}