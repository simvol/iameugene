/**
*
* A
*
*/

import React from 'react';
import styles from './styles.css';

function A({ link, navigateTo }) {
  return (
    <span onClick={() => navigateTo(link.url)} className={styles.a}>
      {link.name}
    </span>
  );
}

A.propTypes = {
  navigateTo: React.PropTypes.func.isRequired,
  link: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
  }),
};

export default A;
