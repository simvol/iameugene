import { createSelector } from 'reselect';

/**
 * Direct selector to the usersListContainer state domain
 */
const selectUsersListContainerDomain = () => state => state.get('usersList');

/**
 * Other specific selectors
 */
const selectRequestsDomain = () => state => state.get('requests');
const userPrefrences = () => state => state.get('userPrefrences');

/**
 * Default selector used by UsersListContainer
 */

const selectUsersListContainer = () => createSelector(
  selectUsersListContainerDomain(),
  selectRequestsDomain(),
  (substate, requestsSubstate) => Object.assign(substate.toJS(), requestsSubstate.toJS())
);

export default selectUsersListContainer;
export {
  selectUsersListContainerDomain,
};
