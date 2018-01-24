/**
*
* Link
*
*/

import React from 'react';
import FontAwesome from 'react-fontawesome';

import styles from './styles.css';

function Link({ link, navigateTo }) {
  const icon = link.icon ? <FontAwesome name={link.icon} /> : null;
  return (
    <div className={styles.link} onClick={() => navigateTo(link.url)} >
      {icon}
      <span>
        {link.name}
      </span>
    </div>
  );
}

Link.propTypes = {
  navigateTo: React.PropTypes.func.isRequired,
  link: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string,
  }),
};

export default Link;
