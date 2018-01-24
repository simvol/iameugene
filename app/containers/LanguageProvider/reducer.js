/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable';
import initialState from '../../_shared/initialState';
import {
  CHANGE_LOCALE,
} from './constants';

function languageProviderReducer(state = fromJS(initialState.language), action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return state
        .set('locale', action.locale);
    default:
      return state;
  }
}

export default languageProviderReducer;
