/*
 *
 * UserDetailsContainer reducer
 *
 */

import { fromJS, toJS } from 'immutable';
import initialState from '../../../_shared/initialState';

import {
  REQUEST_USER_SUCCEEDED,
  REQUEST_APPLICATION_SUCCEEDED,
  REMOVE_APPLICATION,
  REQUEST_UPLOAD_PICTURE_SUCCEEDED,
  RESET_USER,
} from './constants';

function userDetailsContainerReducer(state = fromJS(initialState.userDetails), action) {
  switch (action.type) {
    case REQUEST_USER_SUCCEEDED:
      if (!action.details.applications) {
        action.details.applications = []; //firebase workaround
      }
      return state.set('userDetails', fromJS(action.details));
    case REQUEST_APPLICATION_SUCCEEDED:
      return state
        .set('applicationDetails', fromJS(action.details))
        .updateIn(['userDetails', 'applications'], arr => arr.push(fromJS({
          applicationId: action.details.id,
          clientId: action.details.clientId,
          displayName: action.details.displayName,
          applicationIsActive: action.details.isActive,
          userApplicationIsActive: true //default once added
        })));
    case REMOVE_APPLICATION:
      return state
        .updateIn(['userDetails', 'applications'], arr => {
          return arr.filter(el => el.get('applicationId') !== action.id);
        });
    case REQUEST_UPLOAD_PICTURE_SUCCEEDED:
      return state.setIn(['userDetails', 'profilePictureUrl'], action.image);
    case RESET_USER:
      return state.set('userDetails', fromJS({'applications':[]}));
    default:
      return state;
  }
}

export default userDetailsContainerReducer;
