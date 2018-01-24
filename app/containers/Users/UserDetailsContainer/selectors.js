import { createSelector } from 'reselect';

/**
 * Direct selector to the userDetailsContainer state domain
 */
const selectUserDetailsContainerDomain = () => state => state.get('userDetails');

/**
 * Other specific selectors
 */
const selectRequestsDomain = () => state => state.get('requests');
const selectListsDomain = () => state => state.get('lists');

/**
 * Default selector used by UserDetailsContainer
 */
const selectUserDetailsContainer = () => createSelector(
  selectUserDetailsContainerDomain(),
  selectRequestsDomain(),
  selectListsDomain(),
  ( substate, requests, lists ) => Object.assign( substate.toJS(), requests.toJS(), lists.toJS() )
);

export default selectUserDetailsContainer;
export {
  selectUserDetailsContainerDomain,
};
