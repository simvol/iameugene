/*
 *
 * NavigationContainer reducer
 *
 */

import { fromJS } from 'immutable';
import initialState from '../../_shared/initialState';
import {
  EXPAND_MENU,
} from './constants';

function navigationContainerReducer(state = fromJS(initialState.sidemenu), action) {
  switch (action.type) {
    case EXPAND_MENU:
      return state.set('expanded', action.open);
    default:
      return state;
  }
}

export default navigationContainerReducer;
