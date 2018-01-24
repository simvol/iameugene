/*
 *
 * Shared actions
 *
 */

import {
    REQUEST_LIST_SUCCEEDED,
    REQUEST_LIST_FAILED,
    TOGGLE_SPINNER
} from './constants';

export function requestListSucceeded(name, list) {
    return {
        type: REQUEST_LIST_SUCCEEDED,
        name,
        list,
    };
}

export function requestListFailed(name, message) {
    return {
        type: REQUEST_LIST_FAILED,
        name,
        message,
    };
}

export function showLoading(isLoading) {
    return{
        type: TOGGLE_SPINNER,
        isLoading
    };
}
