import { createSelector } from 'reselect';

/**
 * Direct selector to the loginContainer state domain
 */
const selectLoginContainerDomain = () => state => state.get('loginContainer');

/**
 * Other specific selectors
 */
const selectRequestsDomain = () => state => state.get('requests');

/**
 * Default selector used by LoginContainer
 */

const selectLoginContainer = () => createSelector(
  selectLoginContainerDomain(),
  selectRequestsDomain(),
  (substate, requestsSubstate) => Object.assign(substate.toJS(), requestsSubstate.toJS())
);

export default selectLoginContainer;
export {
  selectLoginContainerDomain,
};
