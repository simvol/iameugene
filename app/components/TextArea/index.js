/**
*
* TextArea
*
*/

import React from 'react';


import styles from './styles.css';

function TextArea({ label, name, value, placeholder, error, errorMessage, size, onChange, maxlength, rows }) {
  let classes = `${styles.textArea} col-md-${size}`;
  classes += value && value.length > 0 && error === true ? ` ${styles.error}` : ``;

  function handleOnChange(event){
    onChange(event, error);
  }

  return (
    <div className={ classes }>
      <div>{label}</div>
      <textarea
        type="text"
        name={name}
        className="form-control"
        placeholder={placeholder}
        value={value || ''}
        onChange={handleOnChange}
        maxLength={maxlength}
        rows={rows}  
      />
      <small>{errorMessage}</small>
    </div>
  );
}

TextArea.propTypes = {
  label: React.PropTypes.string,
  value: React.PropTypes.any,
  placeholder: React.PropTypes.string,
  errorMessage: React.PropTypes.string,
  size: React.PropTypes.string,
};

export default TextArea;
