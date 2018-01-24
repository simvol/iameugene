/**
*
* CreatedUpdatedFooter
*
*/

import React from 'react';


import styles from './styles.css';

function CreatedUpdatedFooter({ createDate, createBy, updateDate, lastUpdateDate, both }) {

  // console.log('lastUpdateBy', lastUpdateBy);
  // console.log('createBy', createBy);
  // console.log('createDate', createDate);
  // console.log('lastUpdateDate', lastUpdateDate);

  return (
    <div className={styles.createdUpdatedFooter}>
      <hr/>
      <div className='row'>
        <div className='col-md-12'>
          { !lastUpdateDate &&
            <label>Created on: {createDate} by <b>{createBy}</b></label> }
          
          { lastUpdateDate &&
            <label>Updated on: {lastUpdateDate} by <b>{lastUpdateBy}</b></label> }
        </div>
      </div>
    </div>
  );
}

export default CreatedUpdatedFooter;
