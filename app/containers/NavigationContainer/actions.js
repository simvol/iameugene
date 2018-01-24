/*
 *
 * NavigationContainer actions
 *
 */

import {
  EXPAND_MENU,
} from './constants';

export function openSideMenu(open) {
  return {
    type: EXPAND_MENU,
    open
  };
}
