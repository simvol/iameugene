import { createSelector } from 'reselect';

/**
 * Direct selector to the applicationsListContainer state domain
 */
const selectApplicationsListContainerDomain = () => state => state.get('applicationsList');

/**
 * Other specific selectors
 */
const selectRequestsDomain = () => state => state.get('requests');

/**
 * Default selector used by ApplicationsListContainer
 */

const selectApplicationsListContainer = () => createSelector(
  selectApplicationsListContainerDomain(),
  selectRequestsDomain(),
  (substate, requestsSubstate) => Object.assign(substate.toJS(), requestsSubstate.toJS())
);

export default selectApplicationsListContainer;
export {
  selectApplicationsListContainerDomain,
};
