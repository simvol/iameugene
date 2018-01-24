/**
*
* Button
*
*/

import React from 'react';
import FontAwesome from 'react-fontawesome';

import styles from './styles.css';

function Button({ label, color, onClick, disabled, className, icon }) {
  let classes = `${styles.button} ${className || ''} btn btn-${color}`;
  let fa = icon ? <FontAwesome name={icon} /> : null;
  return (
    <button className={classes} onClick={onClick} disabled={disabled}>{fa}{label}</button>
  );
}

Button.propTypes = {
  label: React.PropTypes.string.isRequired,
  color: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool,
  icon: React.PropTypes.string,
};

export default Button;
