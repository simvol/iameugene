/**
*
* InputText
*
*/

import React from 'react';


import styles from './styles.css';

function InputText({ label, name, value, placeholder, errorMessage, size, onChange, className, number }) {
  let classes = `${styles.inputText} col-md-${size} ${className ||''}`;
  classes += errorMessage && errorMessage.length > 0 ? ` ${styles.error}` : ``;

  let type = number ? 'number' : 'text';

  function handleOnChange(event){
    onChange(event);
  }

  return (
    <div className={ classes }>
      <div>{label}</div>
      <input
        type={type}
        name={name}
        className="form-control"
        placeholder={placeholder}
        value={value || ''}
        onChange={handleOnChange}/>
      <small>{errorMessage}</small>
    </div>
  );
}

InputText.propTypes = {
  label: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.any.isRequired,
  placeholder: React.PropTypes.string,
  errorMessage: React.PropTypes.string,
  size: React.PropTypes.string,
  onChange: React.PropTypes.func,
  className: React.PropTypes.string,
  number: React.PropTypes.bool
};

export default InputText;
