import { createSelector } from 'reselect';

/**
 * Direct selector to the navigationContainer state domain
 */
const selectNavigationContainerDomain = () => state => state.get('sidemenu');

/**
 * Other specific selectors
 */
const selectRouterContainerDomain = () => state => state.get('route');

/**
 * Default selector used by NavigationContainer
 */

const selectNavigationContainer = () => createSelector(
  selectNavigationContainerDomain(),
  selectRouterContainerDomain(),
  (substate, route) => { return Object.assign({}, substate.toJS(), route.toJS()) }
);

export default selectNavigationContainer;
export {
  selectNavigationContainerDomain,
};
