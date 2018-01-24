import { createSelector } from 'reselect';

/**
 * Direct selector to the dashboardContainer state domain
 */
const selectDashboardContainerDomain = () => state => state.get('dashboardContainer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by DashboardContainer
 */

const selectDashboardContainer = () => createSelector(
  selectDashboardContainerDomain(),
  (substate) => Object.assign(substate.toJS())
);

export default selectDashboardContainer;
export {
  selectDashboardContainerDomain,
};
