/**
*
* YesNoGrid
*
*/

import React from 'react';


import styles from './styles.css';

function YesNoGrid({ value, uniqueId, enabled }) {
  const checked = value ? `${styles.checked}` : '';
  const classes = `${styles.yesNoGrid} ${checked}`;

  return (
    <div className={classes}>
      <div>
        <input
          type="checkbox"
          checked={value}
          id={uniqueId}
          readOnly
        />
        <label htmlFor={uniqueId} className={`${ enabled ? '' : styles.faded } ewew`}>
            <span></span>
            <span></span>
        </label>
      </div>
    </div>
  );
}

YesNoGrid.propTypes = {
  value: React.PropTypes.bool,
  uniqueId: React.PropTypes.string.isRequired,
  enabled: React.PropTypes.any,
};

export default YesNoGrid;
