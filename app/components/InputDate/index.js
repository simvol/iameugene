/**
*
* InputDate
*
*/

import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';

import styles from './styles.css';

function InputDate({ label, name, value, placeholder, error, errorMessage, size, onChange }) {
  let classes = `${styles.inputDate} col-md-${size}`;
  classes += value && value.length > 0 && error === true ? ` ${styles.error}` : ``;
  
  // let selectedDay = value ? value.toString() : '';
  
  function handleOnChange(date){

    // fake event because handleInputChange receives an event
    onChange({target:{
        value: date.toDate(),
        name: 'birthday'
      }
    });
  }

  const datePickerProps = {
    enableOutsideDays: true,
  };

  let selectedDay = value 
    ? moment(value).format('DD/MM/YYYY') 
    : '';
  // format="DD/MM/YYYY"
  return (
    <div className={classes}>
      <div>{label}</div>
      <DayPickerInput
        name="birthday"
        placeholder="DD/MM/YYYY"
        value={selectedDay || ''}
        onDayChange={handleOnChange}
        className={`${styles.input} form-control`}
      />
    </div>
  );
}

export default InputDate;
