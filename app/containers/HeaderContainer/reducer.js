/*
 *
 * HeaderContainer reducer
 *
 */

import { fromJS } from 'immutable';
import initialState from '../../_shared/initialState';

import {
  REQUEST_USER_SUCCEEDED,
} from './constants';

function headerContainerReducer(state = fromJS(initialState.header), action) {
  switch (action.type) {
    case REQUEST_USER_SUCCEEDED:
      return state.set('currentUser', fromJS(action.user));
    default:
      return state;
  }
}

export default headerContainerReducer;
