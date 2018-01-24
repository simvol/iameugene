import initialState from '../initialState';
import { fromJS } from 'immutable';
import { TOGGLE_SPINNER } from '../constants';


function loadingReducer(state = fromJS(initialState.requests), action) {
  const requesting = action.type.indexOf('REQUEST_') !== -1;
  const succeeded = requesting && action.type.indexOf('_SUCCEEDED') !== -1;
  const failed = requesting && action.type.indexOf('_FAILED') !== -1;
  const loadingBar = action.type.indexOf(TOGGLE_SPINNER) !== -1;
  const fetching = action.type.indexOf('FETCH_') !== -1;

  if (fetching) {
    return state.set('ajaxRequestsInProgress', 1).set('showSpinner', false); //fetching will be fired many times, so we just set it to 1 always (next 'succeeded' will decrement it)
  }

  if (requesting && !succeeded && !failed) {
    return state.set('ajaxRequestsInProgress', state.get('ajaxRequestsInProgress') + 1);
  } else if (succeeded || failed) {
    if ( state && state.get('ajaxRequestsInProgress') === 0) { // prevent from going to -1 (some requests don't fire initial request action)
      return state.set('ajaxRequestsInProgress', 0);
    }
    return state.set('ajaxRequestsInProgress', state.get('ajaxRequestsInProgress') - 1);
  }

  if (loadingBar) {
    return state.set('showSpinner', action.isLoading);
  }

  return state;
}

export default loadingReducer;
