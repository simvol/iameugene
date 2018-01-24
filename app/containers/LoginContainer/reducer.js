/*
 *
 * LoginContainer reducer
 *
 */

import { fromJS } from 'immutable';
import initialState from '../../_shared/initialState';
import {getCookie, createCookie, eraseCookie} from '../../_shared/services/cookie-provider';

import {
  REQUEST_APP_INFO_SUCCEEDED,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
  USER_IMAGE_SUCCESS
} from './constants';

function loginContainerReducer(state = fromJS(initialState.loginContainer), action) {
  switch (action.type) {
    case REQUEST_APP_INFO_SUCCEEDED:
      return state
        .update('appInfo', appInfo => appInfo = action.appInfo);
    case LOGIN_REQUEST_SUCCESS:
      createCookie("tk", action.tokenInfo.tokenId, 1); 
      action.userInfo.rememberMe == true ? localStorage.setItem('userEmail', JSON.stringify({userEmail: action.userInfo.userEmail})) : localStorage.removeItem('userEmail'); 
      let redirectPath = getCookie("redirectPath");
      window.location.href = redirectPath ? redirectPath : "/"; 
      return state
        .update('isFailed', isFailed => isFailed = false);
    case LOGIN_REQUEST_FAILURE:
      if(getCookie("tk")) eraseCookie("tk");
      localStorage.getItem('userEmail') != undefined ? localStorage.removeItem('userEmail') : '';
      return state
        .update('isFailed', isFailed => isFailed = true);
    case USER_IMAGE_SUCCESS:
      return state
        .update('userImgURL', imgURL => imgURL = action.imageUrl);
    default:
      return state;
  }
}

export default loginContainerReducer;
