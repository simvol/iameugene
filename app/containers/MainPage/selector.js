import { createSelector } from 'reselect';

/**
 * Other specific selectors
 */
const selectRequestsDomain = () => state => state.get('requests');
const selectSidemenuDomain = () => state => state.get('sidemenu');

/**
 * Default selector used by ApplicationDetailsContainer
 */

const selectHomeContainer = () => createSelector(
  selectRequestsDomain(),
  selectSidemenuDomain(),
  (substate, sidemenu) => Object.assign(substate.toJS(), sidemenu.toJS())
);

export default selectHomeContainer;
export {
    selectHomeContainer,
};
