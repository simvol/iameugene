import { createSelector } from 'reselect';

/**
 * Direct selector to the headerContainer state domain
 */
const selectHeaderContainerDomain = () => state => state.get('header');

/**
 * Other specific selectors
 */


/**
 * Default selector used by HeaderContainer
 */

const selectHeaderContainer = () => createSelector(
  selectHeaderContainerDomain(),
  (substate) => substate.toJS()
);

export default selectHeaderContainer;
export {
  selectHeaderContainerDomain,
};
