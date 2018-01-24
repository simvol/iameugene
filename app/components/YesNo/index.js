/**
*
* YesNo
*
*/

import React from 'react';


import styles from './styles.css';

function YesNo({ label, name, value, onChange, uniqueId }) {
  const checked = value ? `${styles.checked}` : '';
  const classes = `${styles.yesNo} ${checked}`;
  
  return (
    <div className={classes}>
      <div>
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={value}
          onChange={onChange}
          id={uniqueId}
        />
        <label htmlFor={uniqueId}>
            <span></span>
            <span></span>
        </label>
      </div>
      <div>{label}</div>
    </div>
  );
}

YesNo.propTypes = {
  label: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.bool,
  onChange: React.PropTypes.func.isRequired,
  uniqueId: React.PropTypes.string.isRequired,
};

export default YesNo;
