/**
*
* InputPassword
*
*/

import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import styles from './styles.css';

function InputPassword({ label, name, value, placeholder, errorMessage, size, onChange }) {
  let classes = `${styles.inputPassword} col-md-${size}`;
  classes += errorMessage && errorMessage.length > 0 ? ` ${styles.error}` : ``;
  
  return (
    <div className={ classes }>
      <div>{label}</div>
      <input
        type="password"
        name={name}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}/>
      <small>{errorMessage}</small>
    </div>
  );
}

export default InputPassword;
