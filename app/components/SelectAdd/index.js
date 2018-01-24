/**
*
* SelectAdd
*
*/

import React from 'react';
import Select from 'react-select';

import styles from './styles.css';

function SelectAdd({options, selected, onChange, onAdd, loading}) {
  function mapOurProps (selected) {
    //we usually get event object on change, so we fake it here
    onChange({
      target: {
        name: 'selectedApplication',
        type: null,
        value: selected
      }
    });
  }

  return (
    <div className={`${styles.selectAdd} select-add row`}>
      <div className="col-md-8 pr-n">  
        <Select
          name="userApplicationsDropdown"
          placeholder="Search applications"
          value={selected}
          options={options}
          onChange={mapOurProps}
          isLoading={loading}
        />
      </div>
      <div className="col-md-2 pl-s">
        <button onClick={onAdd} className='btn btn-success'>Add</button>
      </div>
    </div>
  );
}

export default SelectAdd;
