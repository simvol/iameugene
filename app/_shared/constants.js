export const CREATED_UPDATED_TIME = 'mmm dd, yyyy - hh:MMtt';

export const REQUEST_LIST_SUCCEEDED = 'REQUEST_LIST_SUCCEEDED';
export const REQUEST_LIST_FAILED = 'REQUEST_LIST_FAILED';

export const URL_RGX = "^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$";
export const EMAIL_RGX = "^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.[A-z]{2,12}|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$";
export const APP_ID_RGX = "^[ABCDEFGHIJKLMNOPQRSTUVWXYZa-z0-9\-]+$";
export const PSWD_RGX = "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$";
export const MIN_PASSWORD_LENGTH = 8;
export const SCROLL_THROTTLE = 1;
export const FILTER_DELAY = 1000;
export const SORT_OPTIONS = { DATE_DESC: 'date%20desc', DATE_ASC: 'date%20asc'};

export const OPTIONS_LIST = [{value: 10}, {value: 25}, {value: 50}, {value: 100}];

export const TOGGLE_SPINNER  = "TOGGLE_SPINNER";
