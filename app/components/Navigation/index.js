/**
*
* Navigation
*
*/

import React from 'react';
import Sidemenu from '../Sidemenu';
// import Link from '../Link';

import styles from './styles.css';

function Navigation({ expanded, expand, menu, navigateTo, locationBeforeTransitions }) {
  const classes = `${styles.navigation}`;

  return (
    <div className={classes}>
      <Sidemenu expanded={expanded} expand={expand} links={menu} navigateTo={navigateTo} location={locationBeforeTransitions.pathname} />
    </div>
  );
}

Navigation.propTypes = {
  navigateTo: React.PropTypes.func.isRequired,
  menu: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
  })),
};

export default Navigation;
