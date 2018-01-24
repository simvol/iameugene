/**
*
* GridFooter
*
*/

import React from 'react';
import { OPTIONS_LIST } from '../../_shared/constants';
import GridPageButtons from '../GridPageButtons';

import styles from './styles.css';

function GridFooter({onPageSizeChange, onPageChange, pagination}) {

  let totalPages; 

  const { total, size, page } = pagination;

  calculateTotalPages();

  function calculateTotalPages(){
    let l_totalPages = [];
    let numberOfPages = Math.ceil(total/size);
    for (var index = 1; index <= numberOfPages; index++) {
      let element = {
        value: index,
        isDisabled: false
      }
      l_totalPages.push(element);      
    }
    l_totalPages[page-1].isDisabled = true;
    totalPages = l_totalPages;
  }
  return (
    <div className={`${styles.gridFooter} row mb-l`}>
      <div className={`col-md-2`}>
        <select onChange={onPageSizeChange} defaultValue={size} className={styles.select_dd} >
          {OPTIONS_LIST.map(function (item) {
            return <option key={item.value} value={item.value} > {item.value} </option>  
          })
          }       
        </select>
      </div>
      <div className='col-md-3 col-md-offset-7'>
        <button className={`${styles.page_num_btn} btn btn-success fa fa-backward`} onClick={onPageChange} value={page-1} disabled={totalPages[0].isDisabled}></button>
        {
          totalPages.map(function (item, i) {
            return <button type='button' className={`${styles.page_num_btn} btn btn-primary`} onClick={onPageChange} key={i} value={item.value} disabled={item.isDisabled} >{item.value}</button>
          })
        }
        <button className={`${styles.page_num_btn} btn btn-success fa fa-forward`} onClick={onPageChange} value={page+1} disabled={totalPages[totalPages.length - 1].isDisabled}></button> </div>
    </div>
  );
}

GridFooter.propTypes = {
  onPageSizeChange: React.PropTypes.func.isRequired,
  onPageChange: React.PropTypes.func.isRequired,
  pagination: React.PropTypes.shape({
    total: React.PropTypes.number.isRequired, //total data count
    size: React.PropTypes.number.isRequired, // data per page
    page: React.PropTypes.number.isRequired, // current page
  })
};

export default GridFooter;
