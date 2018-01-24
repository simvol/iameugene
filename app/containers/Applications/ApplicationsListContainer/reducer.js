/*
 *
 * ApplicationsListContainer reducer
 *
 */

import { fromJS } from 'immutable';
import initialState from '../../../_shared/initialState';

import {
  REQUEST_APPLICATIONS_SUCCEEDED,
  REQUEST_DELETE_APPLICATION_SUCCEEDED
} from './constants';

function applicationsListContainerReducer(state = fromJS(initialState.applicationsList), action) {
  switch (action.type) {
    case REQUEST_APPLICATIONS_SUCCEEDED:    
      return state
        .set('list', action.applications)
        .update('totalApplications', totalApplications => action.totalApplications);
    case REQUEST_DELETE_APPLICATION_SUCCEEDED:
      var index = state.get('list').findIndex( item => item.id === action.id);
      return state.set('list', state.get('list').filter((_, item) => item !== index));  // '_' is used for current item in array.
        
    default:
      return state;
  }
}

export default applicationsListContainerReducer;
