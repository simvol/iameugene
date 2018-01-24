/**
*
* GridPageButtons
*
*/

import React from 'react';


import styles from './styles.css';

function GridPageButtons({ pageNoSelected, totalPages }) {
  return (
    <div className={styles.gridPageButtons}>
      <button className={`${styles.page_num_btn} btn btn-success`} onClick={pageNoSelected} value="previous" disabled={totalPages[0].isDisabled}>Previous</button>
      {
        totalPages.map(function (item) {
          return <button type='button' className={`${styles.page_num_btn} btn btn-primary`} onClick={pageNoSelected} key={item.value} value={item.value} disabled={item.isDisabled} >{item.value}</button>
        })
      }
      <button className={`${styles.page_num_btn} btn btn-success`} onClick={pageNoSelected} value="next" disabled={totalPages[totalPages.length - 1].isDisabled}>Next</button>
    </div>
  );
}

export default GridPageButtons;
