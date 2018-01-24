/*
 *
 * UsersListContainer reducer
 *
 */

import { fromJS } from 'immutable';
import initialState from '../../../_shared/initialState';
const findIndex = require('lodash/findIndex');

import {
  REQUEST_USERS_SUCCEEDED,
  REQUEST_DELETE_USER_SUCCEEDED
} from './constants';

function usersListContainerReducer(state = fromJS(initialState.usersList), action) {
  switch (action.type) {
    case REQUEST_USERS_SUCCEEDED:
      return state
        .set('list', action.users)
        .update('totalUsers', totalUsers => action.totalUsers);
    case REQUEST_DELETE_USER_SUCCEEDED:
      var index = state.get('list').findIndex( item => item.id === action.id);
      return state.set('list', state.get('list').filter((_, item) => item !== index));  // '_' is used for current item in array.
    default:
      return state;
  }
}

export default usersListContainerReducer;
