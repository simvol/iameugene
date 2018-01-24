/**
*
* GridList
*
*/

import React from 'react';
import Grid from '../Grid';
import PageHeader from '../PageHeader';
import ListControls from '../ListControls';

import styles from './styles.css';

function GridList({ listData, filterChange, filterValue, columnsDef, ajaxRequestsInProgress, breadcrumbs, navigateTo, location, createNew, onPageSizeChange, onPageChange, pagination, refreshClick, filterPlaceholder, onSortChange }) {
  const classes = `${styles.gridList}`;
  let grid = '';
  
  // If GridList didn't receive columnsDef from parent
  // we are making it here. We display all properties.
  if (!columnsDef && listData.length > 0) {
    columnsDef = [];
    
    for (let property in listData[0]) {
      let displayName = splitCamelCase(property);

      let columnDef = {
        dataField: property,
        displayName: displayName,
      };

      //Id is unique key and its hidden in the grid
      if (property === 'id'){
        columnDef.isKey = true;
        columnDef.hideSelectColumn = true;
      }

      if (property === 'displayName') {
        columnDef.dataSort = true;
        columnDef.dataFormat = 'link';
      }
      
      columnsDef.push(columnDef);
    }
  }

  function splitCamelCase(string) {
    let sentence = string
      .replace(/([A-Z])/g, ' $1')
      .toLowerCase()
      .replace(/^./, function(str) { return str.toUpperCase(); });

    return sentence;
  }

  grid = columnsDef ? <Grid data={listData}
                            columns={columnsDef}
                            navigateTo={navigateTo}
                            location={location}
                            onPageSizeChange={onPageSizeChange}
                            onPageChange={onPageChange}
                            pagination={pagination}
                            onSortChange={onSortChange}
                      />
                    : 'No columnsDef';

  return (
    <div className={classes}>

      <PageHeader loading={ajaxRequestsInProgress > 0} breadcrumbs={breadcrumbs} navigateTo={navigateTo} />

      <ListControls navigateTo={navigateTo} location={location} refreshClick={refreshClick} filterChange={filterChange} filterValue={filterValue} placeholder={filterPlaceholder}/>

      <div className="row">
        <div className="col-md-12 mt-m">
          { ajaxRequestsInProgress > 0 && listData.length === 0 && <div>Loading...</div>}
          { ajaxRequestsInProgress === 0 && listData.length === 0 &&
            <div onClick={refreshClick} className="no-grid-results clickable"><i className="fa fa-times no-results-x"></i>There is no data to show with the selected search filters.</div>}
          { listData.length > 0 && grid }
        </div>
      </div>
    </div>
  );
}

GridList.propTypes = {
  listData: React.PropTypes.array.isRequired,
  columnsDef: React.PropTypes.array,
  ajaxRequestsInProgress: React.PropTypes.number.isRequired,
  breadcrumbs: React.PropTypes.array.isRequired,
  location: React.PropTypes.object.isRequired,
};

export default GridList;
