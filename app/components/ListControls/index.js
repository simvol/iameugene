/**
*
* ListControls
*
*/

import React from 'react';
import InputText from '../InputText';
import styles from './styles.css';

function ListControls({ navigateTo, location, refreshClick, details, filterChange, filterValue, placeholder }) {
  return (
    <div className={`${styles.listControls} row`}>
      <InputText 
        label=''
        value={filterValue}
        name='filterValue'
        onChange={filterChange}
        placeholder={placeholder}
        className='mt-m'
        size='6'
      />
      <div className="col-md-1 mt-m pull-right button-width">
        <a className="btn btn-primary" onClick={() => navigateTo(`${location.pathname}/new`)}><i className="fa fa-plus-circle mr-ss"></i> Create new</a>
      </div>
      <div className="col-md-1 mt-m pull-right button-width">
        <a className="btn btn-primary" onClick={refreshClick} ><i className="fa fa-refresh mr-ss" ></i> Refresh</a>
      </div>
    </div>
  );
}

export default ListControls;
