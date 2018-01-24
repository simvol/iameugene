/*
 *
 * ApplicationDetailsContainer reducer
 *
 */

import { fromJS } from 'immutable';
import initialState from '../../../_shared/initialState';
import toastr from 'toastr';

import {
  REQUEST_APPLICATION_SUCCEEDED,
  REQUEST_SAVE_APPLICATION_SUCCEEDED,
} from './constants';

function applicationDetailsContainerReducer(state = fromJS(initialState.applicationDetails), action) {
  switch (action.type) {
    case REQUEST_APPLICATION_SUCCEEDED:
      return state.set('applicationDetails', action.details);
    default:
      return state;
  }
}

export default applicationDetailsContainerReducer;
