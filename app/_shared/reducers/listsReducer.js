import initialState from '../initialState';
import { fromJS } from 'immutable';

import {
    REQUEST_LIST_SUCCEEDED,
} from '../constants';

function listsReducer(state = fromJS(initialState.lists), action) {
    switch (action.type) { 
        case REQUEST_LIST_SUCCEEDED:
            return state.set(action.name, action.list);
        default:
            return state;
    }
}

export default listsReducer;
