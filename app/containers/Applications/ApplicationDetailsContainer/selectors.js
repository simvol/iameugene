import { createSelector } from 'reselect';

/**
 * Direct selector to the applicationDetailsContainer state domain
 */
const selectApplicationDetailsContainerDomain = () => state => state.get('applicationDetails');

/**
 * Other specific selectors
 */
const selectRequestsDomain = () => state => state.get('requests');

/**
 * Default selector used by ApplicationDetailsContainer
 */

const selectApplicationDetailsContainer = () => createSelector(
  selectApplicationDetailsContainerDomain(),
  selectRequestsDomain(),
  (substate, requestsSubstate) => Object.assign(substate.toJS(), requestsSubstate.toJS())
);

export default selectApplicationDetailsContainer;
export {
  selectApplicationDetailsContainerDomain,
};
